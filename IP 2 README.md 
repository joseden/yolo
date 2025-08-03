YOLO E-commerce Containerization Project Explanation
# 1. Choice of Base Images
## Frontend Container

Base Image: nginx:alpine

Reasoning:

Node 16 did not require openSSL , Node 17+ require openSSL
Alpine Linux provides minimal footprint (~5MB base)
Nginx is industry-standard for serving static files
Built-in gzip compression and caching capabilities
Total image size: ~25MB (compared to ~150MB with node:16)

## Backend Container

Base Image: node:16-alpine

Reasoning:
Alpine variant reduces image size from ~900MB to ~110MB
Node 16 is LTS (Long Term Support) ensuring stability
Contains only essential packages for running Node.js


## Database Container
Base Image: mongo:5.0

Reasoning:

Version 5.0 is stable and well-documented
Official MongoDB image ensures compatibility
Includes necessary tools for database management


2. Dockerfile Directives Explanation

Backend Dockerfile Directivesdockerfile

FROM node:16-alpine
# Lightweight Node.js base

WORKDIR /usr/src/app
# Sets working directory in container

COPY package*.json ./
# Copies package files first (layer caching)

RUN npm ci --only=production # Installs only production dependencies
COPY . .
# Copies application code

EXPOSE 5000
# Documents the port (doesn't publish)

CMD ["node", "server.js"] 
# Container startup command


Frontend Dockerfile Directives (Multi-stage)

dockerfile
# Build Stage
FROM node:16-alpine AS builder 
# Temporary build environment

WORKDIR /usr/src/app
# Sets working directory in container

COPY package*.json ./
# Copies package files first (layer caching)

RUN npm ci
# Install all dependencies for build

COPY . .
RUN npm run build
# Creates optimized production build

# Production Stage

FROM nginx:alpine

# Minimal web server

COPY --from=builder /app/build /usr/share/nginx/html 
# Copy only built files

EXPOSE 80
# Nginx default port

# 3. Docker-Compose Networking

Bridge Network Implementation

Network Name: yolo-network

Type: Custom bridge network

Benefits:
Automatic DNS resolution between containers
Isolation from default bridge network
Containers communicate using service names

Port Allocation
services:

mongodb:
ports: ["27017:27017"] # Host:Container - MongoDB default

backend:
ports: ["5000:5000"] # API server port

frontend:
ports: ["3000:80"] # Map host 3000 to nginx 80

Reasoning:
Standard ports for each service type
Avoids conflicts with common development tools
Frontend maps to port 80 inside container (nginx default)

# 4. Volume Definition and Usage

MongoDB Data Volume

yaml
volumes:
mongo-data:

driver: local

Purpose:
Persists database files across container restarts
Stores data in /data/db inside container
Survives docker-compose down commands
Only removed with docker-compose down -v


Benefits:
Product data remains after container recreation
Enables backup strategies
Separates data from container lifecycle


# Debugging Measures Applied
## Issue 1: MongoDB Connection Failed
Error: MongoNetworkError: failed to connect to server [localhost:27017]
Root Cause: Backend trying to connect to localhost instead of container name

Solution:
javascript// Fixed connection string to use container name
const mongoUri = process.env.MONGO_URI || 'mongodb://admin:secret@mongodb:27017/yolo?authSource=admin';

## Issue 2: Undefined Variable Error
Error: ReferenceError: MONGODB_URI is not defined

Root Cause: Typo in variable name

Solution:
javascript// Changed from
mongoose.connect(MONGODB_URI, {...})
// To
mongoose.connect(mongoUri, {...})

## Issue 3: Frontend Cannot Reach Backend
Error: net::ERR_CONNECTION_REFUSED in browser console
Root Cause: Frontend configured with wrong API URL
Solution:
yaml# Fixed in docker-compose.yaml
environment:
  REACT_APP_API_URL: http://localhost:5000  # Changed from 3000 to 5000

## Issue 4: Docker Compose Syntax Error
Error: yaml: line 44: found character that cannot start any token

Root Cause: Incorrect indentation of volumes section

Solution:
yaml# Moved volumes to root level
volumes:
  mongodb-data:

networks:
  yolo-network:
    driver: bridge

# Verification Commands Used

bash# Check logs for each service
docker-compose logs mongodb | grep "ready"
docker-compose logs backend | grep "Database connected"
docker-compose logs frontend

# Verify data persistence
docker-compose down
docker-compose up -d
# Products still exist after restart 


# 7. Docker Image Tag Naming Standards

Naming Convention Adopted

[dockerhub-username]/[service-name]:[version]

Implemented Tags

# Backend Images
joseden/yolo-backend:v1.0.0   
joseden/yolo-backend:latest    

# Frontend Images  
joseden/yolo-frontend:v1.0.0  
joseden/yolo-frontend:latest   


# 8. Gitflow 

1. cleared files
2. client frontend dockerfile
3. revert base image 16 and npm dependencies
4. backend dockerfile created
5. client dockerfile port reverted to 80
6. added local mongodb service
7. added bankend service and corrected syntax of yaml
8. added frontend service
9. delete miscellaneous comments
10. docker network bridge
11. correct syntax
12. revert to previous file
13. docker login, tag, push image successful
14. First READ.ME update
15. Complete READ.ME

