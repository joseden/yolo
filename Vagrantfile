Vagrant.configure("2") do |config|
  config.vm.provider "docker" do |d|
    d.image = "geerlingguy/docker-ubuntu2004-ansible:latest"
    d.privileged = true  # IMPORTANT!
    d.has_ssh = false
    d.remains_running = true
    d.create_args = ["--network=host"]
  end
  config.vm.network "forwarded_port", guest: 3000, host: 3000
  config.vm.network "forwarded_port", guest: 5000, host: 5000
  config.vm.network "forwarded_port", guest: 27017, host: 27017
  config.vm.provision "ansible" do |ansible|
    ansible.playbook = "playbook.yml"
    ansible.inventory_path = "hosts"
    ansible.extra_vars = {
      ansible_connection: 'docker',
      ansible_host: 'default'
    }
  end
end
