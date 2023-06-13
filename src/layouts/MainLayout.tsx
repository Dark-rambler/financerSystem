import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'

const MainLayout = () => {
  return (
    <div className='h-screen'>
      <Navbar />
      <Outlet />
    </div>
  )
}

export default MainLayout
