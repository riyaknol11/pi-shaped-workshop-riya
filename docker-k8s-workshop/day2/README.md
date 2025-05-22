# Kubernetes Deployment Guide: Hello API

This guide demonstrates Kubernetes architecture, scheduling, and node affinity using a simple Hello World API.

## What You'll Learn

- How to deploy applications to Kubernetes
- Resource management with requests and limits
- Node affinity and pod scheduling
- Production-ready deployment practices

## Prerequisites

Make sure you have these installed:
- `kubectl` (Kubernetes command-line tool)
- `minikube` (Local Kubernetes cluster)
- `docker` (Container runtime)

---

## Application Overview

Our sample application is a simple Node.js REST API that:
- Returns "Hello, World!" message
- Runs on port 8080
- Includes timestamp in response
- Uses Docker image: `ghcr.io/riyaknol11/hello-api-task:latest`

---

## Step-by-Step Deployment

### 1. Start Your Local Kubernetes Cluster

```bash
# Start minikube
minikube start

# Verify cluster is running
kubectl cluster-info
```

### 2. Prepare Node for Affinity Testing

```bash
# Add a label to identify production nodes
kubectl label nodes minikube environment=production

# Verify the label was added
kubectl get nodes --show-labels
```

### 3. Deploy the Application

![alt text](<Screenshot from 2025-05-22 15-49-08.png>)

Apply the deployment:

```bash
# Deploy to Kubernetes
kubectl apply -f hello-api-deployment.yaml

# Wait for deployment to complete
kubectl rollout status deployment/hello-api-deployment
```

### 4. Verify Pod Placement

```bash
# Check where pods are scheduled
kubectl get pods -o wide

# Get detailed information about pod scheduling
kubectl describe pods -l app=hello-api

# Check deployment status
kubectl get deployments
```
![alt text](<Screenshot from 2025-05-22 15-51-33.png>)

### 5. Test the Application

```bash
# Get service URL (minikube specific)
minikube service hello-api-service --url

# Alternative: Use port forwarding
kubectl port-forward service/hello-api-service 8080:80

# Test the API endpoint
curl http://localhost:8080
```

Expected response:
```json
{
  "message": "Hello, World!",
  "timestamp": "2025-05-22T10:30:45.123Z"
}
```

---


### Node Affinity

```yaml
affinity:
  nodeAffinity:
    preferredDuringSchedulingIgnoredDuringExecution:
    - weight: 100
      preference:
        matchExpressions:
        - key: environment
          operator: In
          values:
          - production
```

This tells Kubernetes: "I prefer pods to run on nodes labeled with `environment=production`"

### Tolerations

```yaml
tolerations:
- key: "dedicated"
  operator: "Equal"
  value: "api-workload"
  effect: "NoSchedule"
```

This allows pods to run on nodes that have been "tainted" for specific workloads.

---

## Monitoring and Troubleshooting

### Check Resource Usage

```bash
# Monitor pod resource consumption
kubectl top pods

# Monitor node resource consumption
kubectl top nodes
```

### View Events and Logs

```bash
# Check recent cluster events
kubectl get events --sort-by='.lastTimestamp'

# View pod logs
kubectl logs -l app=hello-api

# Follow logs in real-time
kubectl logs -f deployment/hello-api-deployment
```

### Scaling Operations

```bash
# Scale up the deployment
kubectl scale deployment hello-api-deployment --replicas=5

# Scale down the deployment
kubectl scale deployment hello-api-deployment --replicas=2
```

---

## Questions

### 1. Why do we set requests and limits for CPU/memory in a production-grade product?

**Resource Requests:**
- **Guaranteed Performance**: Ensures your app gets the minimum resources it needs to function properly
- **Better Scheduling**: Kubernetes can make smarter decisions about where to place your pods
- **Prevents Starvation**: Protects your app from being starved of resources by other applications

**Resource Limits:**
- **Prevents Resource Hogging**: Stops one application from consuming all available resources and crashing other apps
- **Cost Control**: Helps predict and control infrastructure costs by capping maximum resource usage
- **System Stability**: Prevents memory leaks or CPU spikes from bringing down entire nodes
- **Fair Sharing**: Ensures multiple applications can coexist peacefully on the same infrastructure

### 2. When would a product team apply node affinity in Kubernetes?

**Common Use Cases:**

1. **Hardware Requirements**: 
   - GPU-intensive apps need nodes with GPUs
   - Memory-intensive apps need high-memory nodes

2. **Data Locality**:
   - Database applications running closer to storage
   - Applications needing to be in specific geographic regions

3. **Cost Optimization**:
   - Running non-critical workloads on cheaper spot instances
   - Using different instance types for different workload types

4. **Security Prupose**:
   - For Sensitive workloads to run on dedicated and isolated nodes

5. **Performance Optimization**:
   - CPU-intensive apps on high-performance compute nodes
   - Network-intensive apps on nodes with better network connectivity

6. **Environment Separation**:
   - Production workloads on production-grade nodes
   - Development/testing on lower-spec nodes

---

## Cleanup

Cleanup after use:

```bash
# Delete the deployment and service
kubectl delete -f hello-api-deployment.yaml

# Stop minikube
minikube stop

# Delete minikube cluster (optional)
minikube delete
```
