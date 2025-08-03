# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|
  config.vm.provider :docker do |d|
    d.image = "geerlingguy/docker-ubuntu2004-ansible:latest"
    d.has_ssh = true
    d.remains_running = true
    d.ports = ["3001:3000", "5001:5000", "27018:27017"]
    d.cmd = ["/lib/systemd/systemd"]
    d.privileged = true
    d.volumes = ["/var/run/docker.sock:/var/run/docker.sock:rw"]
  end
  
  config.vm.boot_timeout = 300
  
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
  end
end