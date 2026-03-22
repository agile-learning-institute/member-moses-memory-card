variable "aws_region" {
  description = "AWS region to deploy resources"
  type        = string
  default     = "eu-north-1"
}

variable "instance_type" {
  description = "EC2 instance type (t3.micro for free tier in eu-north-1)"
  type        = string
  default     = "t3.micro"
}

variable "ssh_public_key_path" {
  description = "Path to your SSH public key file"
  type        = string
  default     = "~/.ssh/k3s-key.pub"
}

variable "allowed_ssh_cidr" {
  description = "CIDR block allowed to SSH into EC2 (use your IP/32 for security, or 0.0.0.0/0 for coursework)"
  type        = string
  default     = "0.0.0.0/0"
}

variable "ecr_repository_name" {
  description = "Name of the ECR repository"
  type        = string
  default     = "wodpachua/utamu-assignment"
}
