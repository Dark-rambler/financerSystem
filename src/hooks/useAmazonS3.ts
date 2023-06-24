import { S3Client, S3 } from "@aws-sdk/client-s3";
import { useEffect, useState } from 'react'

export const useAmazonS3 = () => {
  const [s3, setS3] = useState<S3Client | null>(null)

  useEffect(() => {
    console.log('useAmazonS3')
    const S3 = new S3Client({
        region: "auto",
        endpoint: `https://${import.meta.env.VITE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
        credentials: {
            accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
            secretAccessKey: import.meta.env.VITE_ACCESS_KEY_SECRET,
        },
    });
    setS3(S3)
    console.log(S3)
  }, [])

  return s3
}
