output "ec2_public_ip" {
  description = "Public IP address of the EC2 instance"
  value       = aws_instance.k3s_server.public_ip
}

output "ecr_repository_url" {
  description = "URL of the ECR repository"
  value       = aws_ecr_repository.app.repository_url
}

output "app_url" {
  description = "URL to access the memory card game"
  value       = "http://${aws_instance.k3s_server.public_ip}:30080"
}

output "prometheus_url" {
  description = "URL to access Prometheus"
  value       = "http://${aws_instance.k3s_server.public_ip}:30090"
}

output "grafana_url" {
  description = "URL to access Grafana"
  value       = "http://${aws_instance.k3s_server.public_ip}:30030"
}

output "ssh_command" {
  description = "SSH command to connect to the EC2 instance"
  value       = "ssh -i ~/.ssh/k3s-key ec2-user@${aws_instance.k3s_server.public_ip}"
}
