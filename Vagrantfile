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

  
  config.vm.network "forwarded_port", guest: 3000, host: 3000, auto_correct: true
  config.vm.network "forwarded_port", guest: 5000, host: 5000, auto_correct: true

  config.vm.provision "shell", inline: <<-SHELL
  
    ansible-galaxy collection install community.docker
    
    pip3 install docker
    
    cd /vagrant
    ansible-playbook -i 'localhost,' -c local playbook.yml
    
    # Run health checks
    echo -e "\n\n=== Deployment Status ==="
    docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}" | grep -E "yolo|NAMES"
    
    echo -e "\nTesting endpoints (might take a moment for apps to start):"
    sleep 10  # Wait for services to initialize
    curl -s -o /dev/null -w "Frontend (3000): %{http_code}\n" http://localhost:3000
    curl -s -o /dev/null -w "Backend (5000): %{http_code}\n" http://localhost:5000
    
    echo -e "\n✅ Deployment complete! Access your app at: http://localhost:3000"
  SHELL
end