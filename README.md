# Bible Character Memory Game  

This project is a memory card game built using React and TypeScript. It allows users to test their memory by matching pairs of Bible characters.  

## Table of Contents  

- [Installation](#setup--install)  
- [Running](#Run)  
- [Features](#features)  
- [Contributing](#contributing)  
- [License](#license)  
- [Acknowledgements](#acknowledgements)  

## Setup & Install  

To get started with the project, clone the repository and install the dependencies:  

```bash
git clone https://git@github.com:agile-learning-institute/member-moses-memory-card.git   
cd member-moses-memory-card  
npm install  
```

## Run  

To run and test it:  

```bash
npm run dev   
```

Open your browser and navigate to `http://localhost:3000` to see the application in action.  

Checkout a [live preview here](https://bible-characters-game.netlify.app/)  

## Features

- Interactive memory card game  
- Dynamic character cards  
- Responsive design  
- Score tracking  

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

Contributions are welcome! Please fork the repository and create a pull request with your changes.  

## License  

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.  

## Acknowledgements  

- React documentation  
- TypeScript documentation    
- Open-source libraries, tools and resources  