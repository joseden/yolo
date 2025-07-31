Stage 2 Explanation
Execution Order

common role: Docker setup and network creation
mongodb role: Database deployment
backend role: API deployment
frontend role: UI deployment

Variables (group_vars/all/main.yml)

app_name: Application identifier
Ports: Centralized port configuration
Paths: Build paths for containers

Roles
Each component has its own role for:

Modularity
Reusability
Independent deployment

Tags

setup: Infrastructure setup
mongodb/database: Database deployment
backend/api: Backend service
frontend/ui: Frontend application

Blocks
Used for:

Grouping related tasks
Error handling
Applying tags to multiple tasks

Ansible Modules

docker_network: Network management
docker_image: Building images
docker_container: Container lifecycle
wait_for: Service readiness
debug: Information display
