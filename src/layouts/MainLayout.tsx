import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import { Stack } from '@mantine/core'

const MainLayout = () => {
  return (
    <Stack className='h-screen' spacing={0}>
      <div className='min-h-16'>
        <Navbar />
      </div>

      <Outlet />
    </Stack>
  )
}

export default MainLayout
