import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export type Network = {
  vpc: aws.ec2.Vpc;
  gateway: aws.ec2.InternetGateway;
  subnet: aws.ec2.Subnet;
  routes: aws.ec2.RouteTable;
  securityGroup: aws.ec2.SecurityGroup;
};

export function createNetwork(networkName = pulumi.getProject()): Network {
  const vpc = new aws.ec2.Vpc(networkName, {
    cidrBlock: "10.0.0.0/16",
  });

  const gateway = new aws.ec2.InternetGateway(networkName, {
    vpcId: vpc.id,
  });

  const subnet = new aws.ec2.Subnet(networkName, {
    vpcId: vpc.id,
    cidrBlock: "10.0.1.0/24",
    mapPublicIpOnLaunch: true,
  });

  const routes = new aws.ec2.RouteTable(networkName, {
    vpcId: vpc.id,
    routes: [
      {
        cidrBlock: "0.0.0.0/0",
        gatewayId: gateway.id,
      },
    ],
  });

  new aws.ec2.RouteTableAssociation(networkName, {
    subnetId: subnet.id,
    routeTableId: routes.id,
  });

  const securityGroup = new aws.ec2.SecurityGroup(networkName, {
    vpcId: vpc.id,
    ingress: [
      {
        cidrBlocks: ["0.0.0.0/0"],
        protocol: "tcp",
        fromPort: 22,
        toPort: 22,
      },
      {
        cidrBlocks: ["0.0.0.0/0"],
        protocol: "tcp",
        fromPort: 80,
        toPort: 80,
      },
    ],
    egress: [
      {
        cidrBlocks: ["0.0.0.0/0"],
        fromPort: 0,
        toPort: 0,
        protocol: "-1",
      },
    ],
  });

  return { vpc, gateway, subnet, routes, securityGroup };
}
