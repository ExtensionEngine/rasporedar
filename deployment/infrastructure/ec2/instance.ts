import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import { Network } from "./network";

export function createInstance(
  instanceType: pulumi.Input<string>,
  ami: pulumi.Input<string>,
  network: Network,
  keyPair: aws.ec2.KeyPair,
  instanceName = pulumi.getProject()
) {
  const instance = new aws.ec2.Instance(instanceName, {
    ami,
    instanceType,
    subnetId: network.subnet.id,
    vpcSecurityGroupIds: [network.securityGroup.id],
    keyName: keyPair.keyName,
  });

  return instance;
}
