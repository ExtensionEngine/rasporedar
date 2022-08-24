import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export enum Ami {
  Debian,
}

export function findAmi(ami: Ami) {
  const amiArgs = {
    [Ami.Debian]: {
      owners: ["136693071363"], // https://wiki.debian.org/Cloud/AmazonEC2Image/Bullseye
      mostRecent: true,
      filters: [
        { name: "name", values: ["debian-11*"] },
        { name: "architecture", values: ["x86_64"] },
      ],
    },
  };

  const amiSearchResult = aws.ec2.getAmi(amiArgs[ami]);

  return pulumi.output(amiSearchResult);
}
