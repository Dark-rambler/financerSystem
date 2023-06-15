import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

const MainLayout = () => {
  return (
    <div className='h-screen'>
      <Navbar />
      <div className='h-[calc(100%-64px)]'>
      <Outlet />
      </div>
 
    </div>
  )
}

export default MainLayout
