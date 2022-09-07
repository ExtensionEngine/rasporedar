import * as pulumi from "@pulumi/pulumi";
import * as aws from "@pulumi/aws";

export function createSiteBucket(bucketName = pulumi.getProject()) {
  const bucket = new aws.s3.Bucket(bucketName, {
    website: {
      indexDocument: "index.html",
      errorDocument: "index.html",
    },
  });

  new aws.s3.BucketPolicy(bucketName, {
    bucket: bucket.bucket,
    policy: bucket.bucket.apply(publicReadPolicyForBucket),
  });

  return bucket;
}

function publicReadPolicyForBucket(bucketName: string) {
  return JSON.stringify({
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: "*",
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  });
}
