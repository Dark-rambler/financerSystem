import { Outlet } from 'react-router-dom'
import Navbar from '../components/navbar/Navbar'
import { Stack } from '@mantine/core'
import Sidebar from '../components/sidebar/Sidebar'
import { useState } from 'react'

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const handleClickSidebarButton = () => {
    setIsSidebarOpen(value => !value)
  }

  return (
    <Stack className='h-screen' spacing={0}>
      <div className='min-h-16'>
        <Navbar onClickSidebarButton={handleClickSidebarButton} />
      </div>
      <div className='flex h-full overflow-x-auto'>
        <Sidebar isOpen={isSidebarOpen} />

        <div className='w-full' onClick={() => {setIsSidebarOpen(false)}}>
          <Outlet />
        </div>
      </div>
    </Stack>
  )
}

export default MainLayout
