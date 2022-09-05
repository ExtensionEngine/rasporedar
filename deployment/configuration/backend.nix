{ config, pkgs, ... }:
{
  imports = [ <nixpkgs/nixos/modules/virtualisation/amazon-image.nix> ];
  # ec2.hvm = true;

  nix.trustedUsers = [ "@wheel" ];
  security.sudo.wheelNeedsPassword = false;

  users.users.rasporedar = {
    isNormalUser = true;
    extraGroups = [ "wheel" "docker" ];

    openssh.authorizedKeys.keys = [ "{{ sshPublicKey }}" ];
  };

  networking.hostName = "rasporedar-backend";
  networking.firewall.allowedTCPPorts = [ 80 443 ];

  services.openssh.passwordAuthentication = false;

  services.nginx = {
    enable = true;
    recommendedGzipSettings = true;
    recommendedOptimisation = true;
    recommendedProxySettings = true;
  };

  virtualisation.docker.enable = true;

  environment.etc = {
    ghcr_password.text = "{{ ghcrPassword }}";
  };

  virtualisation.oci-containers = {
    backend = "docker";
    containers = {
      db = {
        image = "postgres:14";
        environment = {
          POSTGRES_DB = "rasporedar";
          POSTGRES_USER = "rasporedar";
          POSTGRES_PASSWORD = "rasporedar";
        };
      };
      backend = {
        login = {
          registry = "ghcr.io";
          username = "{{ ghcrUsername }}";
          passwordFile = "/etc/ghcr_password";
        };
        image = "ghcr.io/extensionengine/rasporedar-backend";
        ports = [ "3001:3001" ];
        environment = {
          POSTGRES_HOST = "db";
          POSTGRES_DB = "rasporedar";
          POSTGRES_USER = "rasporedar";
          POSTGRES_PASSWORD = "rasporedar";
          JWT_SECRET_KEY = "{{ jwtSecretKey }}";
          SALT_ROUNDS = "{{ saltRounds }}";
        };
      };
    };
  };

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
    nginx
    docker
  ];

  system.stateVersion = "22.05";
}
