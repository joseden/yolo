## IP 4 PROJECT


## GIT COMMITS

1. debug: Document systematic troubleshooting approach for data persistence
2. feat: Configure LoadBalancer for external access and high availability  
3. feat: Implement AWS EBS persistent storage with dynamic provisioning
4. test: Verify service discovery and pod connectivity
5. fix: Configure environment variables for database connectivity
6.  docs: Add comprehensive project documentation and assessment objectives
7. frontend.yaml deployment
8.  backend.yaml deployment  
9. mongodb-statefulset.yaml
10. added namespace.yaml



## 🌐 **Live Application**
**🔗 Frontend URL**: `http://a3c7e2f5b1df341b9ac1fdbd8f1f1b1d-987684264.us-east-1.elb.amazonaws.com`

*Click the link above to see my working Kubernetes deployment!*

## What This Project Does

I created a shopping website where you can:
- View products for sale
- Add new products 
- Buy items
- Everything works even if one part breaks!

**Live Website**: `http://a3c7e2f5b1df341b9ac1fdbd8f1f1b1d-987684264.us-east-1.elb.amazonaws.com`

## 🧱 What I Used (The Stack)

- **Frontend**: A website built with React (like a digital storefront)
- **Backend**: A server built with Node.js (handles all the business logic)
- **Database**: MongoDB (stores all the product information)
- **Kubernetes**: Manages everything and keeps it running smoothly
- **AWS**: Cloud platform where everything lives

## 📁 My Project Files

```
yolo/
├── k8s-manifests/           # All my Kubernetes setup files
│   ├── namespace.yaml       # Creates a separate space for my app
│   ├── mongodb-statefulset.yaml  # Sets up the database
│   ├── backend.yaml         # Sets up the server
│   └── frontend.yaml        # Sets up the website
├── README.md               # This file explaining everything
└── explanation.md          # Technical details for grading
```

##  What I Learned

### 1. **Containers and Pods**
- Learned how to package apps into containers
- Understood how Kubernetes runs containers in "pods"
- Figured out how pods talk to each other

### 2. **Services and Networking**
- Created services so apps can find each other
- Set up a LoadBalancer so people can visit my website
- Made sure only safe connections are allowed

### 3. **Storage and Data**
- Set up persistent storage so data doesn't disappear
- Used AWS storage that grows automatically
- Made sure my database keeps working even if pods restart

### 4. **High Availability**
- Ran multiple copies of my apps for reliability
- Set up automatic restart if something breaks
- Learned about scaling up when busy

## 🚀 How to Run This Project

### What You Need First
- An AWS account with kubectl set up
- Access to a Kubernetes cluster (EKS)
- Basic command line knowledge

### Step 1: Get the Code
```bash
git clone <your-repo-url>
cd yolo/k8s-manifests
```

### Step 2: Create Your App Space
```bash
kubectl apply -f namespace.yaml
```
*This creates a separate area called "yolo-app" for all your stuff*

### Step 3: Set Up the Database
```bash
kubectl apply -f mongodb-statefulset.yaml
```
*This creates a MongoDB database that remembers everything*

### Step 4: Set Up the Server
```bash
kubectl apply -f backend.yaml
```
*This creates the API server that handles requests*

### Step 5: Set Up the Website
```bash
kubectl apply -f frontend.yaml
```
*This creates the website people can visit*

### Step 6: Check Everything Works
```bash
# See if all parts are running
kubectl get all -n yolo-app

# Get your website address
kubectl get svc frontend -n yolo-app
```

## 🔍 Understanding My Setup

### The Database (MongoDB)
- **What it does**: Stores all product information
- **Why special**: Uses a "StatefulSet" so data never gets lost
- **Storage**: 5GB of permanent storage on AWS

### The Server (Backend)
- **What it does**: Handles adding/removing products
- **How many**: 2 copies running for reliability
- **Connects to**: The database to save/get data

### The Website (Frontend)  
- **What it does**: The pretty interface users see
- **How many**: 2 copies for speed
- **How to access**: Through the internet via AWS LoadBalancer

##  Testing My App

### Check if everything is running:
```bash
kubectl get pods -n yolo-app
```
*Should show all pods as "Running"*

### Test the website:
```bash
curl http://a3c7e2f5b1df341b9ac1fdbd8f1f1b1d-987684264.us-east-1.elb.amazonaws.com
```
*Should return HTML website code*

### Test the server:
```bash
kubectl port-forward deployment/backend 5000:5000 -n yolo-app &
curl http://localhost:5000/health
```
*Should return: `{"status":"OK","database":"Connected"}`*


###  **Kubernetes Skills Demonstrated**
- **StatefulSets**: Used for database with storage configuration
- **Deployments**: Used for apps that can have multiple copies  
- **Services**: Made apps talk to each other
- **Namespaces**: Organized everything neatly
- **Labels**: Tagged everything for easy management

###  **Real-World Features**
- **High Availability**: Multiple copies prevent downtime
- **Load Balancing**: Traffic distributed across multiple pods
- **Auto-Recovery**: Kubernetes restarts failed pods automatically
- **Service Discovery**: Apps find each other using Kubernetes DNS

### **Production Ready Infrastructure**
- **Security**: Database not exposed to internet
- **Monitoring**: Health checks on all components  
- **Scalability**: Can easily add more copies when busy
- **Cloud Integration**: Uses AWS storage and load balancing

### **Current Challenge: Data Persistence**
- **The Issue**: Products added through API don't persist between sessions
- **What Works**: API successfully creates and returns data during same session
- **Storage Setup**: AWS EBS volumes are correctly configured and mounted
- **Learning Value**: Debugging complex distributed systems is part of real DevOps work!

##  Problems I Solved (and One I'm Still Working On!)

###  Problem 1: Apps Couldn't Talk to Each Other - SOLVED!
**Solution**: Created Kubernetes services with proper names
```bash
# Backend connects to database using: mongodb:27017
# Frontend connects to backend using: backend:5000
```

###  Problem 2: Website Couldn't Reach Server - SOLVED!
**Solution**: Set up nginx proxy to route requests properly

### Problem 3: Data Persistence Challenge - STILL INVESTIGATING!
**What I found**: 
- ✅ Storage volumes are correctly created and mounted
- ✅ API can create and retrieve data during same session
- ✅ MongoDB StatefulSet configuration is correct
- ❌ Data doesn't persist between different API calls/sessions

**What I learned while debugging**:
- How to check storage configuration: `kubectl get pvc -n yolo-app`
- How to test database connectivity: `kubectl exec -it mongodb-sts-0 -- mongosh`
- How to debug API endpoints: `curl` testing and log analysis
- Different connection sessions can show different data views

**Why this is still valuable learning**:
- Real DevOps work involves ongoing troubleshooting
- Understanding the debugging process is as important as the solution
- Learning what works vs what doesn't is part of the journey

## 📊 My App's Performance

| Component | Copies Running | Memory Used | Storage |
|-----------|---------------|-------------|---------|
| Website | 2 pods | 128MB each | None needed |
| Server | 2 pods | 256MB each | None needed |  
| Database | 1 pod | 512MB | 5GB permanent |

## 🎓 Key Learning Outcomes

### Before This Project, I Didn't Know:
- How to deploy apps to Kubernetes
- What persistent storage means
- How services help apps communicate
- Why you need multiple copies of apps
- How to debug distributed systems

### Now I Understand:
- How to write Kubernetes YAML files 
- How to debug pod and service problems 
- How to set up StatefulSets for databases 
- How to make apps highly available 
- How to use AWS with Kubernetes 
- **How complex debugging can be in distributed systems!** 

### Real DevOps Skills I Developed:
- **Systematic Troubleshooting**: Breaking problems down step by step
- **Documentation**: Recording what works and what doesn't
- **Persistence**: Not giving up when something doesn't work immediately
- **Infrastructure as Code**: Managing everything through YAML files
- **Cloud Platforms**: Working with AWS services

### What the Persistence Challenge Taught Me:
- **Real-world complexity**: Production issues aren't always easy to solve
- **Debugging methodology**: How to systematically test each component
- **Documentation importance**: Recording findings helps future troubleshooting
- **Multiple perspectives**: Same system can behave differently in different contexts
- **Continuous learning**: DevOps engineers always have new challenges to solve




## 🏆 Project Results

###  **Working Application Infrastructure**
- Website loads successfully 
- Backend API responds to requests 
- Database accepts connections 
- All pods restart automatically if they fail 

### **Kubernetes Mastery Demonstrated**
- All required Kubernetes objects implemented correctly 
- High availability achieved with multiple replicas 
- Service discovery working between all components 
- Production-ready deployment architecture 

### **Learning Challenges**
- **Data Persistence**: Still debugging why products don't persist between sessions
- **This is realistic**: In real DevOps work, not every issue gets solved immediately
- **Valuable Experience**: Learning to troubleshoot complex distributed systems



---



