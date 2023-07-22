import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'

const ViewDocument = ({ url, label }: { url: string; label: string }) => {
  return (
    <div
      className='bg-gray-100 hover:bg-gray-200 p-2 flex space-x-3 rounded-md hover:cursor-pointer'
      onClick={() => {
        window.open(url)
      }}
    >
      <BsFillFileEarmarkPdfFill size={20} color={'#dc2626'} />
      <p className='text-sm'>{label}</p>
    </div>
  )
}

export default ViewDocument
