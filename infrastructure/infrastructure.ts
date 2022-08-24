import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";
import { createSiteBucket } from "./s3/siteBucket";
import { createNetwork } from "./ec2/network";
import { createKeyPair } from "./ec2/keyPair";
import { findAmi, Ami } from "./ec2/ami";

const project = pulumi.getProject();

const siteBucket = createSiteBucket(`${project}-frontend`);

const net = createNetwork(project);
const key = createKeyPair(project);

const instance = new aws.ec2.Instance("instance", {
  ami: findAmi(Ami.Debian).id,
  instanceType: "t2.micro",
  subnetId: net.subnet.id,
  vpcSecurityGroupIds: [net.securityGroup.id],
  keyName: key.keyName,
});

export const bucketName = siteBucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${siteBucket.websiteEndpoint}`;
export const instanceUrl = pulumi.interpolate`http://${instance.publicIp}`;
