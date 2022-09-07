import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

import * as ec2 from "./ec2";
import * as s3 from "./s3";

const project = pulumi.getProject();

const siteBucket = s3.createSiteBucket(`${project}-frontend`);

const net = ec2.createNetwork();
const key = ec2.createKeyPair();
const ami = ec2.findAmi(ec2.Ami.Debian);
const instance = ec2.createInstance("t2.micro", ami, net, key);

export const bucketName = siteBucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${siteBucket.websiteEndpoint}`;
export const instancePublicIp = pulumi.interpolate`${instance.publicIp}`;
