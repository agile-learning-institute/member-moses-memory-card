resource "aws_key_pair" "k3s" {
  key_name   = "k3s-key"
  public_key = file(var.ssh_public_key_path)

  tags = {
    Name = "memory-card-k3s-key"
  }
}
