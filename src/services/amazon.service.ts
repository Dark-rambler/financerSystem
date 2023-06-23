import S3 from 'aws-sdk/clients/s3.js'


const s3 = new S3({
    endpoint: `https://${accountid}.r2.cloudflarestorage.com`,
    accessKeyId: `${access_key_id}`,
    secretAccessKey: `${access_key_secret}`,
    signatureVersion: 'v4',
  });
  
  console.log(
    await s3.listBuckets().promise()
  );
 
  console.log(
    await s3.listObjects({ Bucket: 'my-bucket-name' }).promise()
  );
 
  //=> }