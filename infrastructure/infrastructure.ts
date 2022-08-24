import * as pulumi from "@pulumi/pulumi";
import { createSiteBucket } from "./s3/siteBucket";

const siteBucket = createSiteBucket("rasporedar-frontend");

export const bucketName = siteBucket.id;
export const bucketEndpoint = pulumi.interpolate`http://${siteBucket.websiteEndpoint}`;
