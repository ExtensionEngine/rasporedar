import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createKeyPair(keyName: string) {
  const config = new pulumi.Config();

  const keyPair = new aws.ec2.KeyPair(keyName, {
    publicKey: config.require("sshPublicKey"),
  });

  return keyPair;
}
