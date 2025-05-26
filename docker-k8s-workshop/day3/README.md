Kubernetes Networking and Service Discovery Demo
Project Overview
This project demonstrates Kubernetes networking concepts including different service types (ClusterIP, NodePort, LoadBalancer) and Ingress routing. The demo uses a simple web application to showcase service discovery and traffic routing patterns.


Deployment Steps Followed
1. Initial Setup
Started with custom Node.js application but encountered ImagePullBackOff issues with custom image. Solution: Switched to nginx:alpine for reliable demonstration.
2. Service Creation
Applied all service configurations and updated services to match nginx port (80).
3. Ingress Setup
Enabled ingress controller, applied ingress configuration, and configured local DNS.

![Created a Deployment with Nginx](<Screenshot from 2025-05-26 12-45-39.png>)

Service Types and Configurations
1. ClusterIP Service

Purpose: Internal cluster communication only
Access: Via port-forwarding or from within cluster
Configuration: demo-app-clusterip (Port 80)
Testing:
bashkubectl port-forward service/demo-app-clusterip 8080:80
curl http://localhost:8080


2. NodePort Service

Purpose: External access via node IP and static port
Access: http://<NODE_IP>:30080
Configuration: demo-app-nodeport (NodePort 30080)
Testing:
bashcurl http://192.168.49.2:30080


3. LoadBalancer Service

Purpose: External access via cloud provider load balancer
Access: External IP (pending in minikube) + fallback NodePort 31742
Configuration: demo-app-loadbalancer
Testing:
bash# Via LoadBalancer (if external IP available)
curl http://<EXTERNAL_IP>

    # Via NodePort fallback
curl http://192.168.49.2:31742


4. Ingress

Purpose: HTTP routing with path/host-based rules
Access: http://demo-app.local
Configuration: Path-based routing with multiple hosts
Testing:
bashcurl http://demo-app.local
curl http://demo-app.local/api

Deployment Status

![All services endpoints](<Screenshot from 2025-05-26 12-46-56.png>)

Testing Commands

!(<Screenshot from 2025-05-26 13-05-24.png>)
!(<Screenshot from 2025-05-26 13-06-09.png>)

Verify Deployment

!(<Screenshot from 2025-05-26 12-47-51.png>)



Questions 
# 1. How would you expose an internal microservice (e.g., user-auth) differently than a public-facing frontend in a Kubernetes-based product?

Internal Microservice (user-auth):

    Uses ClusterIP service type
    Only accessible inside the Kubernetes cluster
    No external IP or port exposure
    Other services talk to it using internal DNS name

Public Frontend:

    Uses LoadBalancer or Ingress
    Gets external IP that users can access from internet
    Has proper security like SSL certificates
    Rate limiting and firewall protection

Explained using Example:

    Auth service: Only your app's backend can access or talk to it.
    Public Frontend: Can be accessed by everyone on internet


# 2. Why use Ingress instead of LoadBalancer for each microservice?
Cost & Management problem of loadbalancer:

    Each LoadBalancer will cost Separate cloud bill
    10 services would result to usage of 10 LoadBalancers
    Multiple LoadBalancers would need Multiple IP addresses to remember
    Need separate SSL certificates for each
    Hard to apply same security rules everywhere

Ingress benefits:
    Cheaper: One load balancer handles all services
    Easier: One IP address, one SSL certificate
    Smarter: Can route traffic based on URL paths



Note: This demo used nginx:alpine for reliable demonstration after encountering image pull issues with the custom Node.js application. Will be adding the deployment using app.js as well.

