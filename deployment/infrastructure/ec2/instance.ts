import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import * as fs from "fs";

import { Network } from "./network";

export function createInstance(
  instanceType: pulumi.Input<string>,
  ami: pulumi.Input<string>,
  network: Network,
  volumeSize: number,
  userDataPath: string = "",
  instanceName = pulumi.getProject()
) {
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
    userData: userDataPath && fs.readFileSync(userDataPath, "utf8"),
    userDataReplaceOnChange: true,
  });

  return instance;
}
