YOLO E-commerce Deployment with Vagrant & Ansible

# Project Overview
This project implements automated deployment of a containerized e-commerce platform using Configuration Management principles. The YOLO application consists of a React frontend, Node.js backend, and MongoDB database, all deployed using Ansible automation within a Vagrant-provisioned Docker environment.

# Problems Encountered & Solutions Implemented

1. Port Collision Issues - 

Problem : Vagrant failed to start due to port conflicts with existing containers . 

Root Cause: Multiple Docker containers were already using the same ports (3000, 5000, 27017)

Lesson Learned: Always check for port conflicts before deployment and implement port detection automation.

2.  SSH Connectivity Failures 

Problem: Vagrant couldn't establish SSH connection to Docker container

Root Cause: SSH service not properly initialized in Docker container due to systemd issues

Lesson Learned: Direct Docker connection is more reliable than SSH for containerized environments.


3. Docker Daemon Connectivity Issues

Problem: Docker-in-Docker setup failed with daemon connection errors

Root Cause: Docker daemon not accessible inside container due to missing socket

Lesson Learned: Docker socket mounting is essential for Docker-in-Docker operations.

4. Container Naming Mismatches 

Problem: Ansible inventory pointing to non-existent container names after restarts

Root Cause: Vagrant generates unique container names with timestamps

Lesson Learned: Implement dynamic inventory management for containerized deployments.


5. Disk Space Limitations 


Problem: VirtualBox VM creation failed due to insufficient disk space (100% usage - 170G/181G used)

Root Cause: Accumulated cache files and unused containers consuming disk space

Lesson Learned: Regular disk space monitoring and cleanup automation is essential.

6. Service Management in Containers 

Problem: Systemd service management failing inside Docker containers

Root Cause: Docker containers don't support traditional systemd service management

Lesson Learned: Container environments require adapted service management approaches.

7. Network Connectivity and Port Mapping

Problem: Application accessible via direct ports but not through mapped ports

Root Cause: Port mapping conflicts and network interface binding issues

Lesson Learned: Test multiple access methods and document the working configuration.


# Deployment Commands & Usage

Initial Deployment

# 1. Clone repository and navigate to project directory
git clone <repository-url>
cd yolo

# 2. Start Vagrant environment
vagrant up

# 3. If SSH provisioning fails, use direct Docker approach
docker ps  # Get container name
echo "[all]" > hosts
echo "<container_name> ansible_connection=docker ansible_user=root" >> hosts

# 4. Test connection
ansible all -i hosts -m ping

# 5. Run deployment
ansible-playbook -i hosts playbook.yml



# Key Learnings & DevOps Insights

1. Container Orchestration Challenges

Lesson: Docker-in-Docker requires careful network and permission configuration
Best Practice: Use Docker socket mounting for reliable container operations
Application: Essential for CI/CD pipelines and development environments

2. Network Configuration Complexity

Lesson: Port mapping and network interface binding require thorough testing
Best Practice: Test multiple access methods and document working configurations
Application: Critical for microservices and distributed application deployments

3. Infrastructure Automation Resilience

Lesson: Error handling and graceful degradation are essential for reliable automation
Best Practice: Implement comprehensive verification steps and fallback mechanisms
Application: Necessary for production deployment pipelines

4. Resource Management

Lesson: Regular cleanup and monitoring prevent resource exhaustion
Best Practice: Implement automated cleanup and monitoring solutions
Application: Essential for long-running production environments

5. Debugging Containerized Applications

Lesson: Direct container access and network inspection are invaluable debugging tools
Best Practice: Maintain comprehensive logging and monitoring capabilities
Application: Critical for production troubleshooting and incident response


# Technologies Demonstrated:

1. Vagrant 2.x: Development environment provisioning
2. Ansible 2.x: Configuration management and automation
3. Docker 26.x: Containerization and orchestration
4. Ubuntu 20.04 LTS: Base operating system
5. MongoDB 5.0: NoSQL database with authentication
6. Node.js 16: Backend API framework
7. React 18: Frontend user interface framework
8. Nginx: Web server and reverse proxy