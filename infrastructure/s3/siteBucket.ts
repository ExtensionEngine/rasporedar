import * as aws from "@pulumi/aws";

export function createSiteBucket(bucketName: string) {
  const siteBucket = new aws.s3.Bucket(bucketName, {
    website: {
      indexDocument: "index.html",
      errorDocument: "index.html",
    },
  });

  new aws.s3.BucketPolicy(bucketName, {
    bucket: siteBucket.bucket,
    policy: siteBucket.bucket.apply(publicReadPolicyForBucket),
  });

  return siteBucket;
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
