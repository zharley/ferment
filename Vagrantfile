# vi: set ft=ruby :
Vagrant.configure(2) do |config|
  # Host name of the VM
  config.vm.hostname = "ferment.example.com"

  # Base image for VM
  config.vm.box = "ubuntu/trusty64"

  # Configure private network by DHCP
  config.vm.network "private_network", type: "dhcp"

  # Update /etc/hosts on all active VMs
  config.hostmanager.enabled = true

  # Update host machine's /etc/hosts
  config.hostmanager.manage_host = true

  # Don't ignore private IPs
  config.hostmanager.ignore_private_ip = false

  # Include offline VMs (rather than just active ones)
  config.hostmanager.include_offline = true

  # Use IP resolver to get DHCP configured address
  config.hostmanager.ip_resolver = proc do |vm, resolving_vm|
    `vagrant ssh -c "hostname -I"`.split.last
  end

  # Use shell script for provisioning
  config.vm.provision "shell", inline: File.read('bin/provision'), privileged: false
end
