Vagrant.configure("2") do |config|
  config.vm.provider "docker" do |d|
    d.image = "geerlingguy/docker-ubuntu2004-ansible:latest"
    d.privileged = true
    d.has_ssh = false
    d.remains_running = true
    d.volumes = [
      "/var/run/docker.sock:/var/run/docker.sock",
      "#{Dir.pwd}:/vagrant"
    ]
  end

  config.vm.network "forwarded_port", guest: 3000, host: 3333, auto_correct: true
  config.vm.network "forwarded_port", guest: 5000, host: 5555, auto_correct: true
  config.vm.network "forwarded_port", guest: 27017, host: 27777, auto_correct: true

  config.vm.provision "shell", inline: <<-SHELL
    # Install required components
    apt-get update
    apt-get install -y python3-pip
    pip3 install docker
    
    # Install Ansible Docker collection
    ansible-galaxy collection install community.docker
    
    # Create group_vars directory
    mkdir -p /vagrant/group_vars/all
    
    # Create roles structure
    mkdir -p /vagrant/roles/{common,mongodb,backend,frontend}/tasks
    
    # Run playbook
    cd /vagrant
    ansible-playbook -i 'localhost,' -c local playbook.yml
    
    # Test deployment
    echo -e "\n=== Deployment Test ==="
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep yolo
    
    echo -e "\nEndpoints:"
    echo "Frontend: http://localhost:3333"
    echo "Backend:  http://localhost:5555"
    echo "MongoDB:  mongodb://localhost:27777"
  SHELL
end