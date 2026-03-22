# Bible Character Memory Game

A memory card game built with React and TypeScript, deployed on AWS using K3s, Terraform, and GitHub Actions CI/CD.

**Live Preview:** [bible-characters-game.netlify.app](https://bible-characters-game.netlify.app/)

## Architecture

```
                    GitHub Actions CI/CD
                    ┌──────────────────────┐
                    │  Build → Push → SSH  │
                    └──────────┬───────────┘
                               │
                    ┌──────────▼───────────┐
                    │   Amazon ECR          │
                    │   (Docker Registry)   │
                    └──────────┬───────────┘
                               │
         ┌─────────────────────▼─────────────────────┐
         │          AWS EC2 (t3.micro)                │
         │          K3s Kubernetes Cluster            │
         │                                           │
         │  ┌─────────────────────────────────────┐  │
         │  │  memory-card namespace              │  │
         │  │  ┌─────────────┐ ┌───────────────┐  │  │
         │  │  │ Nginx (App) │ │ Nginx Exporter│  │  │
         │  │  │   :30080    │ │   :9113       │  │  │
         │  │  └─────────────┘ └───────────────┘  │  │
         │  └─────────────────────────────────────┘  │
         │                                           │
         │  ┌─────────────────────────────────────┐  │
         │  │  monitoring namespace               │  │
         │  │  ┌────────────┐  ┌──────────────┐   │  │
         │  │  │ Prometheus │  │   Grafana     │   │  │
         │  │  │   :30090   │  │   :30030      │   │  │
         │  │  └────────────┘  └──────────────┘   │  │
         │  │  ┌──────────────┐                   │  │
         │  │  │Node Exporter │                   │  │
         │  │  │   :9100      │                   │  │
         │  │  └──────────────┘                   │  │
         │  └─────────────────────────────────────┘  │
         └───────────────────────────────────────────┘
```

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Application | React 18, TypeScript, Vite |
| Containerization | Docker (multi-stage: Node 20 build, Nginx serve) |
| Orchestration | K3s (lightweight Kubernetes) |
| Infrastructure | Terraform on AWS Free Tier |
| CI/CD | GitHub Actions (build, push, deploy) |
| Monitoring | Prometheus + Grafana |
| Registry | Amazon ECR |

## Setup & Install

```bash
git clone https://github.com/agile-learning-institute/member-moses-memory-card.git
cd member-moses-memory-card
pnpm install
```

## Development

```bash
pnpm run dev       # Start dev server at http://localhost:3000
pnpm run build     # Production build
pnpm run test      # Run tests
pnpm run lint      # Lint code
```

## Docker

```bash
docker build -t memory-card-game .
docker run -p 8080:80 memory-card-game
# Visit http://localhost:8080
```

## Cloud Deployment

### Prerequisites
- AWS account with Free Tier
- Terraform installed
- AWS CLI configured (`aws configure`)
- SSH key pair (`ssh-keygen -t ed25519 -f ~/.ssh/k3s-key`)

### 1. Provision Infrastructure
```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
# Edit terraform.tfvars with your values
terraform init
terraform plan
terraform apply
```

### 2. Deploy to K3s
```bash
# Push Docker image to ECR
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin <ECR_URL>
docker build -t <ECR_URL>:latest .
docker push <ECR_URL>:latest

# SSH into EC2 and apply manifests
ssh -i ~/.ssh/k3s-key ec2-user@<EC2_IP>
kubectl apply -f k8s/namespace.yml
kubectl apply -f k8s/app-deployment.yml
kubectl apply -f k8s/app-service.yml
```

### 3. Deploy Monitoring
```bash
kubectl apply -f k8s/monitoring-namespace.yml
kubectl apply -f k8s/prometheus-configmap.yml
kubectl apply -f k8s/prometheus-deployment.yml
kubectl apply -f k8s/prometheus-service.yml
kubectl apply -f k8s/node-exporter-daemonset.yml
kubectl apply -f k8s/grafana-deployment.yml
kubectl apply -f k8s/grafana-service.yml
```

### Access URLs
| Service | URL |
|---------|-----|
| Memory Card Game | `http://<EC2_IP>:30080` |
| Prometheus | `http://<EC2_IP>:30090` |
| Grafana | `http://<EC2_IP>:30030` (admin/MemCard@K3s2026) |

## Design Decisions

| Decision | Reason |
|----------|--------|
| **K3s** over full Kubernetes | Lightweight, runs on t3.micro with 1GB RAM |
| **NodePort** over Ingress | Saves ~100MB RAM by not running Traefik |
| **1GB swap file** | Safety net against out-of-memory on small instance |
| **6h Prometheus retention** | Keeps storage and memory usage low |
| **SSH-based CI/CD deploy** | Simpler and more secure than exposing K3s API |

## Project Structure

```
.github/workflows/     # CI/CD pipeline
terraform/             # Infrastructure as Code (AWS)
k8s/                   # Kubernetes manifests
scripts/               # Deployment scripts
src/                   # React application source
  components/          # React components
  styles/              # CSS styles
  __tests__/           # Unit tests
```

## Features

- Interactive memory card game with Bible characters
- Dynamic character cards with score tracking
- Responsive design
- Automated CI/CD pipeline
- Infrastructure as Code
- Monitoring and observability

## CI/CD

Pushes to `main` run GitHub Actions to test, build, push the Docker image to ECR, and redeploy the container on EC2. Configure these repository secrets and variables:

- `AWS_ROLE_ARN` – IAM role for GitHub OIDC
- `AWS_REGION` – AWS region for ECR/EC2
- `ECR_REGISTRY` – ECR registry (e.g., `123456789012.dkr.ecr.us-east-1.amazonaws.com`)
- `ECR_REPOSITORY` – ECR repo name (e.g., `member-moses-memory-card`)
- `EC2_HOST` – public hostname/IP
- `EC2_USER` – SSH user
- `EC2_SSH_KEY` – private key for SSH (PEM contents)
- `EC2_PORT` *(optional)* – SSH port, defaults to 22
- `CONTAINER_NAME` *(optional)* – container name, defaults to `memory-card-app`

## Contributing  

Contributions are welcome! Fork the repository and create a pull request.

## License

MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgements

- React and TypeScript documentation
- Kubernetes and K3s documentation
- Terraform AWS provider documentation
- Open-source libraries and tools
