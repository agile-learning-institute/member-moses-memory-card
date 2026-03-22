# Get latest Amazon Linux 2023 AMI
data "aws_ami" "amazon_linux" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["al2023-ami-*-x86_64"]
  }

  filter {
    name   = "virtualization-type"
    values = ["hvm"]
  }
}

# IAM role so EC2 can pull from ECR
resource "aws_iam_role" "ec2_role" {
  name = "memory-card-ec2-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "memory-card-ec2-role"
  }
}

resource "aws_iam_role_policy" "ecr_pull" {
  name = "ecr-pull-policy"
  role = aws_iam_role.ec2_role.id

  policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Action = [
          "ecr:GetAuthorizationToken",
          "ecr:BatchCheckLayerAvailability",
          "ecr:GetDownloadUrlForLayer",
          "ecr:BatchGetImage"
        ]
        Resource = "*"
      }
    ]
  })
}

resource "aws_iam_instance_profile" "ec2_profile" {
  name = "memory-card-ec2-profile"
  role = aws_iam_role.ec2_role.name
}

resource "aws_instance" "k3s_server" {
  ami                    = data.aws_ami.amazon_linux.id
  instance_type          = var.instance_type
  key_name               = aws_key_pair.k3s.key_name
  vpc_security_group_ids = [aws_security_group.k3s_server.id]
  subnet_id              = aws_subnet.public.id
  iam_instance_profile   = aws_iam_instance_profile.ec2_profile.name

  root_block_device {
    volume_size = 30
    volume_type = "gp3"
  }

  user_data = <<-USERDATA
    #!/bin/bash
    set -e

    # Update system
    yum update -y

    # Create 1GB swap file (safety net for t3.micro)
    dd if=/dev/zero of=/swapfile bs=1M count=1024
    chmod 600 /swapfile
    mkswap /swapfile
    swapon /swapfile
    echo '/swapfile swap swap defaults 0 0' >> /etc/fstab

    # Install K3s with minimal resource usage
    curl -sfL https://get.k3s.io | INSTALL_K3S_EXEC="server \
      --disable traefik \
      --disable metrics-server \
      --disable local-storage \
      --kubelet-arg=max-pods=20" sh -

    # Wait for K3s to be ready
    sleep 30
    until kubectl get nodes 2>/dev/null | grep -q "Ready"; do
      sleep 5
    done

    # Install AWS CLI v2
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "/tmp/awscliv2.zip"
    yum install -y unzip
    unzip /tmp/awscliv2.zip -d /tmp
    /tmp/aws/install
    rm -rf /tmp/awscliv2.zip /tmp/aws

    # Set up ECR credentials for K3s (containerd)
    REGION="${var.aws_region}"
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    ECR_URI="$${ACCOUNT_ID}.dkr.ecr.$${REGION}.amazonaws.com"

    # Create registries config for K3s
    mkdir -p /etc/rancher/k3s
    cat > /etc/rancher/k3s/registries.yaml <<EOF
    mirrors:
      "$${ECR_URI}":
        endpoint:
          - "https://$${ECR_URI}"
    EOF

    # Create ECR credential refresh script
    cat > /usr/local/bin/refresh-ecr-token.sh <<'SCRIPT'
    #!/bin/bash
    REGION=$(curl -s http://169.254.169.254/latest/meta-data/placement/region)
    ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
    ECR_URI="$${ACCOUNT_ID}.dkr.ecr.$${REGION}.amazonaws.com"
    PASSWORD=$(aws ecr get-login-password --region $${REGION})

    cat > /etc/rancher/k3s/registries.yaml <<REGEOF
    mirrors:
      "$${ECR_URI}":
        endpoint:
          - "https://$${ECR_URI}"
    configs:
      "$${ECR_URI}":
        auth:
          username: AWS
          password: "$${PASSWORD}"
    REGEOF

    systemctl restart k3s
    SCRIPT
    chmod +x /usr/local/bin/refresh-ecr-token.sh

    # Run the credential refresh now
    /usr/local/bin/refresh-ecr-token.sh

    # Set up cron to refresh ECR token every 6 hours
    echo "0 */6 * * * root /usr/local/bin/refresh-ecr-token.sh" >> /etc/crontab

    # Make kubectl available without sudo for ec2-user
    mkdir -p /home/ec2-user/.kube
    cp /etc/rancher/k3s/k3s.yaml /home/ec2-user/.kube/config
    chown -R ec2-user:ec2-user /home/ec2-user/.kube
    echo 'export KUBECONFIG=/home/ec2-user/.kube/config' >> /home/ec2-user/.bashrc

    echo "K3s setup complete!"
  USERDATA

  tags = {
    Name = "memory-card-k3s-server"
  }
}
