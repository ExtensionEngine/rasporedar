import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import * as ec2 from "./ec2";
import * as s3 from "./s3";

const project = pulumi.getProject();

const siteBucket = s3.createSiteBucket(`${project}-frontend`);

const net = ec2.createNetwork(project);
const key = ec2.createKeyPair(project);
const ami = ec2.findAmi(ec2.Ami.Debian);
const size = "t2.micro";

const instance = new aws.ec2.Instance("instance", {
  ami: ami.id,
  instanceType: size,
  subnetId: net.subnet.id,
  vpcSecurityGroupIds: [net.securityGroup.id],
  keyName: key.keyName,
});

export const bucketName = siteBucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${siteBucket.websiteEndpoint}`;
export const instanceUrl = pulumi.interpolate`http://${instance.publicIp}`;
