import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export enum Ami {
  Debian,
  NixOS,
}

export function findAmi(ami: Ami) {
  const amiArgs = {
    [Ami.Debian]: {
      // https://wiki.debian.org/Cloud/AmazonEC2Image/Bullseye
      owners: ["136693071363"],
      mostRecent: true,
      filters: [
        { name: "name", values: ["debian-11*"] },
        { name: "architecture", values: ["x86_64"] },
      ],
    },
    [Ami.NixOS]: {
      // http://jackkelly.name/blog/archives/2020/08/30/building_and_importing_nixos_amis_on_ec2/
      owners: ["080433136561"],
      mostRecent: true,
      filters: [
        { name: "name", values: ["NixOS-22.05*"] },
        { name: "architecture", values: ["x86_64"] },
      ],
    },
  };

  const amiSearchResult = aws.ec2.getAmi(amiArgs[ami]);

  return pulumi.output(amiSearchResult).id;
}
