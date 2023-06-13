import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useLoginStore } from '../store/loginStore'
import useAuthentication from '../../hooks/useAuthentication'
import { NormalIcon } from '../../assets/logout.icon'
import { HoverIcon } from '../../assets/logout.icon'

const UserMenu = () => {
  const { fullName, role } = useLoginStore()
  const {logOut} = useAuthentication()
  return (
    <Menu as='div' className='relative text-left'>
      {({ open }) => (
        <>
          <Menu.Button>
            {' '}
            <div
              className={`${
                open ? 'bg-blue-600 text-white' : 'border border-blue-600'
              }  rounded-full w-9 h-9 flex items-center justify-center text-blue-600 font-bold hover:cursor-pointer hover:bg-blue-600 hover:text-white select-none`}
            >
              {fullName.charAt(0).toUpperCase()}
            </div>
          </Menu.Button>
          <Transition
            as={Fragment}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items className='border whitespace-nowrap border-gray-200 bg-white shadow-md rounded-md absolute mt-2 right-2 flex flex-col'>
              <Menu.Item>
                {({ active }) => (
                  <div className='px-4 py-3 border-b border-gray-200'>
                    <p className='text-sm text-gray-800'>{fullName}</p>
                    <p className='text-xs text-gray-500'>{role}</p>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button onClick={logOut} className='flex items-center space-x-2 hover:text-white m-1 text-left text-sm font-gray-800  p-2 hover:bg-blue-600 hover:rounded-md bg-white rounded-b-md'>
                    {active ? (<HoverIcon />) : (<NormalIcon />)}
                    
                    <p>Cerrar sesión</p>
                  </button>
                )}
              </Menu.Item>
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  )
}

export default UserMenu
