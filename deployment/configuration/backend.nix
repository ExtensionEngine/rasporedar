{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/virtualisation/amazon-image.nix> ];
  ec2.hvm = true;

  networking.hostName = "rasporedar-backend";

  nix.trustedUsers = [ "@wheel" ];
  security.sudo.wheelNeedsPassword = false;

  users.users.rasporedar = {
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" ];

    openssh.authorizedKeys.keys = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGHeS9LRxPeUFrTL/80ucq4tyYwadWBw45wRdJpPh9+N bdeak@extensionengine.com"
    ];
  };

  services.openssh = {
    passwordAuthentication = false;
  };

  virtualisation.docker.enable = true;

  environment.systemPackages = with pkgs; [
    # system utils
    curl
    wget
    htop
    git
    vim
    tmux
    neofetch
    # app dependencies
    docker
  ];
}
