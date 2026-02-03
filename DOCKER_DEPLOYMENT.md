# Docker Deployment to Amazon ECR

This guide documents the steps to containerize the Memory Card Game and deploy it to Amazon ECR.

## Prerequisites

### 1. Install Docker

Download and install Docker Desktop for macOS:
- [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/)

Verify installation:
```bash
docker --version
```

### 2. Install AWS CLI

Using Homebrew (recommended for macOS):
```bash
brew install awscli
```

Or download directly from AWS:
```bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
```

Verify installation:
```bash
aws --version
```

---

## Configuration

### 3. Configure AWS CLI

Run the configure command and enter your credentials:
```bash
aws configure
```

You'll be prompted for:
| Prompt | Value |
|--------|-------|
| AWS Access Key ID | Your access key |
| AWS Secret Access Key | Your secret key |
| Default region name | `eu-north-1` |
| Default output format | `json` |

To verify your configuration:
```bash
aws sts get-caller-identity
```

---

## Build & Deploy

### 4. Build the Docker Image

Navigate to the project directory and build:
```bash
cd /Users/olara/repos/ALI_Odin_Projects/member-moses-memory-card

docker build -t utamu-assignment .
```

To test the image locally (optional):
```bash
docker run -p 8080:80 utamu-assignment
# Visit http://localhost:8080 in your browser
```

### 5. Authenticate Docker with Amazon ECR

```bash
aws ecr get-login-password --region eu-north-1 | docker login --username AWS --password-stdin 391821045179.dkr.ecr.eu-north-1.amazonaws.com
```

Expected output:
```
Login Succeeded
```

> **Note:** ECR login tokens expire after 12 hours. Re-run this command if you get authentication errors.

### 6. Tag the Image for ECR

```bash
docker tag utamu-assignment:latest 391821045179.dkr.ecr.eu-north-1.amazonaws.com/wodpachua/utamu-assignment:latest
```

### 7. Push to Amazon ECR

```bash
docker push 391821045179.dkr.ecr.eu-north-1.amazonaws.com/wodpachua/utamu-assignment:latest
```

---

## Quick Deploy Script

For convenience, you can run all steps at once:

```bash
#!/bin/bash

# Variables
REGION="eu-north-1"
ACCOUNT_ID="391821045179"
REPO_NAME="wodpachua/utamu-assignment"
IMAGE_TAG="latest"
ECR_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO_NAME"

# Build
echo "Building Docker image..."
docker build -t utamu-assignment .

# Login to ECR
echo "Logging into ECR..."
aws ecr get-login-password --region $REGION | docker login --username AWS --password-stdin $ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com

# Tag
echo "Tagging image..."
docker tag utamu-assignment:latest $ECR_URI:$IMAGE_TAG

# Push
echo "Pushing to ECR..."
docker push $ECR_URI:$IMAGE_TAG

echo "✅ Deployment complete!"
echo "Image URI: $ECR_URI:$IMAGE_TAG"
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| `no basic auth credentials` | Re-run the ECR login command (Step 5) |
| `repository does not exist` | Create it: `aws ecr create-repository --repository-name wodpachua/utamu-assignment --region eu-north-1` |
| `access denied` | Check IAM permissions for ECR access |
| `build hangs forever` | Remove `--watch` from build script in `package.json` |

---

## Useful Commands

```bash
# List local Docker images
docker images

# List running containers
docker ps

# Stop a container
docker stop <container_id>

# Remove an image
docker rmi <image_name>

# View ECR repositories
aws ecr describe-repositories --region eu-north-1

# List images in ECR repository
aws ecr list-images --repository-name wodpachua/utamu-assignment --region eu-north-1
```

---

## Project Docker Files

| File | Purpose |
|------|---------|
| `Dockerfile` | Multi-stage build: Node.js for building, Nginx for serving |
| `.dockerignore` | Excludes unnecessary files from the build context |
| `nginx.conf` | Nginx configuration for serving the SPA |
