As to the actual code

get your CloudFront distribution id

aws cloudfront list-distributions

Invalidate all files in the distribution, so CloudFront fetches fresh ones

aws cloudfront create-invalidation --distribution-id=S11A16G5KZMEQD --paths /

My actual full release script is


#!/usr/bin/env bash

BUCKET=mysite.com
SOURCE_DIR=dist/

export AWS_ACCESS_KEY_ID=xxxxxxxxxxx
export AWS_SECRET_ACCESS_KEY=xxxxxxxxx
export AWS_DEFAULT_REGION=eu-west-1


echo "Building production"
if npm run build:prod ; then
   echo "Build Successful"
else
  echo "exiting.."
  exit 1
fi


echo "Removing all files on bucket"
aws s3 rm s3://${BUCKET} --recursive


echo "Attempting to upload site .."
echo "Command:  aws s3  sync $SOURCE_DIR s3://$BUCKET/"
aws s3  sync ${SOURCE_DIR} s3://${BUCKET}/
echo "S3 Upload complete"

echo "Invalidating cloudfrond distribution to get fresh cache"
aws cloudfront create-invalidation --distribution-id=S11A16G5KZMEQD --paths / --profile=myawsprofile

echo "Deployment complete" 