import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

import { useEffect, useState } from 'react'

export const useAmazonS3 = () => {
  const [s3, setS3] = useState<S3Client>()

  useEffect(() => {
    const S3 = new S3Client({
      region: 'auto',
      endpoint: `https://${
        import.meta.env.VITE_ACCOUNT_ID
      }.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: import.meta.env.VITE_ACCESS_KEY_ID,
        secretAccessKey: import.meta.env.VITE_ACCESS_KEY_SECRET
      }
    })
    setS3(S3)
  }, [])

  const uploadDepositOrderFileOfTechoBol = async (file: File, name: string) => {
    const signedUrl = await getSignedUrl(
      s3 as S3Client,
      new PutObjectCommand({ Bucket: `${import.meta.env.VITE_S3_BUCKET_NAME}`, Key: `TECHOBOL/DEPOSIT_ORDER/${name}.pdf` }),
      { expiresIn: 3600 }
    )

    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: file
    })

    return response
  }

  const uploadDepositOrderReportFileOfTechoBol = async (file: File, name: string) => {
    const signedUrl = await getSignedUrl(
      s3 as S3Client,
      new PutObjectCommand({ Bucket: `${import.meta.env.VITE_S3_BUCKET_NAME}`, Key: `TECHOBOL/DEPOSIT_ORDER_REPORT/${name}.pdf` }),
      { expiresIn: 3600 }
    )

    const response = await fetch(signedUrl, {
      method: 'PUT',
      body: file
    })

    return response
  }

  return {
    s3,
    uploadDepositOrderFileOfTechoBol,
    uploadDepositOrderReportFileOfTechoBol
  }
}
