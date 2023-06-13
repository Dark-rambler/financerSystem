import { RiMoneyCnyBoxFill } from 'react-icons/ri'
import { TbMoon } from 'react-icons/tb'
import UserMenu from '../menus/UserMenu'
import { useLoginStore } from '../store/loginStore'

const Navbar = () => {
  const { isLoggedIn } = useLoginStore()

  return (
    <div className=' h-16 bg-white border-b border-gray-200 px-5'>
      <div className='relative flex justify-center items-center h-full'>
        <div></div>
        <div className='flex items-center space-x-2'>
          <RiMoneyCnyBoxFill className='text-[40px] text-blue-600' />
          <p className=' font-bold text-gray-800 text-lg'>Finanzas</p>
        </div>
        <div className='absolute right-1 flex space-x-5'>
          <div className='select-none w-9 h-9 border transition border-gray-300 rounded-md flex items-center justify-center hover:cursor-pointer hover:bg-gray-100 '>
            <TbMoon className='text-gray-900 text-xl ' />
          </div>
          {isLoggedIn && <UserMenu />}
        </div>
      </div>
    </div>
  )
}

export default Navbar
