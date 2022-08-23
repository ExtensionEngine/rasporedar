import { createSiteBucket } from "./s3/siteBucket";

const siteBucket = createSiteBucket("rasporedar-frontend");

export const bucketName = siteBucket.id;
export const websiteUrl = siteBucket.websiteEndpoint;
