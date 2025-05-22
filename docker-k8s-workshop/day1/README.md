# Docker Containerization and Github Container Registry

A simple "Hello, World!" REST API containerized with Docker.

## What's in this project?

This is a super basic Express.js API that responds with a friendly JSON message and timestamp when you hit the root endpoint.

## How to run it locally

If you have Node.js installed:

```bash
npm install
npm start
```

With Docker:

```bash
docker build -t hello-api-task .
docker run -p 8080:8080 hello-api-task
```

Then just visit http://localhost:8080 in your browser or run `curl http://localhost:8080`

## Docker & Kubernetes Q&A

### Why is Docker useful in building and deploying microservices?

When building something like an e-commerce or banking app with microservices, Docker provides several benefits:

- **Isolation**: Each microservice runs in its own container with its dependencies, preventing conflicts between services.

- **Consistency**: Containers run the same way in every environment - development, testing, and production - eliminating environment-specific issues.

- **Fast deployment**: Containers start up in seconds, allowing quick scaling during traffic spikes or rolling out new versions.

- **Resource efficiency**: Containers share the host OS kernel and use fewer resources than traditional virtual machines.

- **Simplified dependencies**: All dependencies are packaged within the container, making deployment more reliable.

### What's the difference between a Docker image and a container?

- **Docker image**: The static, read-only template that contains the application code, libraries, dependencies, tools, and other files needed for the application to run.

- **Docker container**: A running instance of an image. Containers are isolated, lightweight runtime environments that have their own filesystem, networking, and isolated process space.

When scaling a web app:
- You build an image once with your application code
- You can create multiple container instances from that same image
- Each container runs independently with its own state and resources
- You can easily scale by starting more containers from the same image as demand increases

### How does Kubernetes complement Docker for running at scale?

Docker is great for individual containers, but Kubernetes adds capabilities needed when running hundreds of containers:

- **Self-healing**: Automatically restarts containers that fail, replaces containers when nodes die, and kills containers that don't respond to health checks.

- **High availability**: Distributes containers across multiple nodes to prevent single points of failure.

- **Load balancing**: Automatically distributes network traffic to ensure containers aren't overloaded.

- **Horizontal scaling**: Can automatically add or remove container instances based on CPU usage or other metrics.

- **Service discovery**: Makes it easy for containers to find and communicate with each other.

- **Configuration management**: Manages application configuration and secrets without rebuilding container images.

Docker packages your applications, while Kubernetes manages their deployment, scaling, and operations when running many containers across multiple hosts.