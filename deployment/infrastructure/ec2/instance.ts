import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

import { Network } from "./network";
import { Output } from "@pulumi/pulumi";

export function createInstance(
  instanceType: pulumi.Input<string>,
  volumeSize: number,
  ami: pulumi.Input<string>,
  network: Network,
  key: aws.ec2.KeyPair,
  userDataPath: string = "",
  instanceName = pulumi.getProject()
) {
  let userData;
  if (userDataPath) {
    const config = new pulumi.Config();
    userData = fs
      .readFileSync(userDataPath, "utf8")
      // replace variables `{{ var }}` in user data
      .replace(/{{ ([^ ]+) }}/g, (original, matched) => {
        let r = config.require(matched);
        return r ? r : "";
      });
  }

  const instance = new aws.ec2.Instance(instanceName, {
    ami,
    instanceType,
    subnetId: network.subnet.id,
    vpcSecurityGroupIds: [network.securityGroup.id],
    ebsBlockDevices: [
      {
        deviceName: "/dev/xvda",
        volumeSize,
      },
    ],
    keyName: key.keyName,
    userData,
    userDataReplaceOnChange: true,
  });

  return instance;
}
