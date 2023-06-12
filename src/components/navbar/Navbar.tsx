import  { RiMoneyCnyBoxFill} from 'react-icons/ri'
import {TbMoon} from 'react-icons/tb'

const Navbar = () => {
  return (

    <div className=" h-16 bg-white border-b border-slate-200 px-5">
      <div className=" flex justify-between items-center h-full">
        <div></div>
        <div className="flex items-center space-x-2">
          <RiMoneyCnyBoxFill className="text-[40px] text-blue-600"/>
            <p className=' font-bold text-slate-800 text-lg'>Finanzas</p> 
        </div>
        <div>
          <div className='w-9 h-9 border transition border-slate-300 rounded-md flex items-center justify-center hover:cursor-pointer hover:bg-slate-100 '>
              <TbMoon className='text-slate-900 text-xl'/>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Navbar