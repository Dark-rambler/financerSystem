import { NavLink } from 'react-router-dom';
import { BsFillFileEarmarkPdfFill } from 'react-icons/bs'


const ViewDocument = ({ url, label }: { url: string; label: string }) => {
  return (
    <NavLink to={url} target='_blank'>
          <div
      className='bg-gray-100 hover:bg-gray-200 p-2 flex space-x-3 rounded-md hover:cursor-pointer'
    >
      <BsFillFileEarmarkPdfFill size={20} color={'#dc2626'} />
      <p className='text-sm'>{label}</p>
    </div>
    </NavLink>

  )
}

export default ViewDocument
