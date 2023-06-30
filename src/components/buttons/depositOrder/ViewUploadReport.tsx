import { Tooltip, ActionIcon } from '@mantine/core'
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'

interface ViewAndUploadReportProps {
    url?: string
}

const ViewUploadReport = ({url}: ViewAndUploadReportProps) => {
  return (
    <Tooltip label={'Ver documento'}>
      <ActionIcon
        className='bg-gray-100 hover:bg-gray-200'
        onClick={() => {
          window.open(
            `https://pub-32a96368cbbd4a5583b6334c5bc7fe4a.r2.dev/TECHOBOL/ODF4-24.pdf`
          )
        }}
      >
        <BsFillFileEarmarkPdfFill size={20} color={'#dc2626'} />
      </ActionIcon>
    </Tooltip>
  )
}

export default ViewUploadReport
