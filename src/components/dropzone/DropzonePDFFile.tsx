import { Dropzone,  PDF_MIME_TYPE } from "@mantine/dropzone"
import { Group, Text } from "@mantine/core"
import { TbFileCheck, TbFileUpload, TbFileX } from "react-icons/tb"

import { useDepositOrderReport } from "../../hooks/useDepositOrderReport"
import { BsFillFileEarmarkPdfFill } from "react-icons/bs"

interface DropzonePDFFileProps {
    depositOrderReport: ReturnType<typeof useDepositOrderReport>
}

const DropzonePDFFile = ({depositOrderReport}: DropzonePDFFileProps) => {
  return (
    <Dropzone
    onDrop={files => {
      depositOrderReport.setFile(files[0])
    }}
    onReject={files => {
      console.log(files)
      depositOrderReport.setFile(null)
    }}
    className={`${
      depositOrderReport.isSubmited && !depositOrderReport.file
        ? 'border-red-500'
        : ''
    }`}
    maxSize={50 * 1024 ** 2}
    accept={PDF_MIME_TYPE}
    maxFiles={1}
  >
    <Group
      position='center'
      spacing='xl'
      style={{ minHeight: '110px', pointerEvents: 'none' }}
    >
      <Dropzone.Accept>
        <TbFileCheck size={50} color={'#2563eb'} className={'stroke-1'} />
      </Dropzone.Accept>
      <Dropzone.Reject>
        <TbFileX size={50} color={'#dc2626'} className={'stroke-1'} />
      </Dropzone.Reject>
      <Dropzone.Idle>
        {depositOrderReport.file ? (
          <>
            <BsFillFileEarmarkPdfFill size={40} color={'#dc2626'} />
          </>
        ) : (
          <TbFileUpload
            size={50}
            color={
              depositOrderReport.isSubmited && !depositOrderReport.file
                ? '#dc2626'
                : '#374151'
            }
            className={'stroke-1'}
          />
        )}
      </Dropzone.Idle>

      {depositOrderReport.file ? (
        <div>
          <Text size='xl' inline>
            {depositOrderReport.file.name}
          </Text>
          <Text size='sm' color='dimmed' inline mt={7}>
            {Number(depositOrderReport.file.size / 1024 / 1024).toFixed(
              3
            )}{' '}
            MB
          </Text>
        </div>
      ) : (
        <div>
          <Text
            size='xl'
            inline
            color={
              depositOrderReport.isSubmited && !depositOrderReport.file
                ? '#dc2626'
                : '#171717'
            }
          >
            Arrastre el documento aqui o haga click para seleccionar
          </Text>
          <Text size='sm' color='dimmed' inline mt={7}>
            Solo se permite un documento en formato PDF, el documento no
            debe exceder los 50 mb.
          </Text>
        </div>
      )}
    </Group>
  </Dropzone>
  )
}

export default DropzonePDFFile