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
            `${url}`
          )
        }}
      >
        <BsFillFileEarmarkPdfFill size={20} color={'#dc2626'} />
      </ActionIcon>
    </Tooltip>
  )
}

export default ViewUploadReport
