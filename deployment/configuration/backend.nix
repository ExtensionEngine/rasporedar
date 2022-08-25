{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/virtualisation/amazon-image.nix> ];
  ec2.hvm = true;

  networking.hostName = "rasporedar-backend";

  nix.trustedUsers = [ "@wheel" ];
  security.sudo.wheelNeedsPassword = false;

  users.users.rasporedar = {
    isNormalUser = true;
    extraGroups = [ "wheel" ];

    openssh.authorizedKeys.keys = [
      "ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIGHeS9LRxPeUFrTL/80ucq4tyYwadWBw45wRdJpPh9+N bdeak@extensionengine.com"
    ];
  };

  services.openssh = {
    passwordAuthentication = false;
  };

  environment.systemPackages = with pkgs; [
    curl
    wget
    htop
    neofetch
    git
    vim
    tmux
    ripgrep
  ];
}
