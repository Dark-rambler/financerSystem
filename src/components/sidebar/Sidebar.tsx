import { Divider } from '@mantine/core'

import {
  TbFileDescription,
  TbTags,
  TbUsers,
  TbHome,
  TbListDetails,
  TbList
} from 'react-icons/tb'

import { NavLink, useLocation } from 'react-router-dom'
import { Roles } from '../../enums/Roles'

import { useLoginStore } from '../store/loginStore'

const Sidebar = ({ isOpen }: { isOpen: boolean }) => {
  const { role } = useLoginStore()
  const location = useLocation()

  return (
    <div
      className={`${isOpen ? 'w-[280px] left-0' : 'left-[-280px]'} 
       transition-all
       h-full fixed 
       border-r 
     border-r-gray-200
     bg-white z-10 
       ease-in-out 
       duration-150
       whitespace-nowrap
       overflow-y-hidden
    `}
    >
      <div className='p-2'>
        <p className='text-xs font-medium text-gray-700'>Finanzas</p>
      </div>

      <div className='px-5 pb-0'>
        <NavLink to={'/techobol/deposit-order'}>
          <div
            className={`${
              location.pathname.includes('deposit-order')
                ? 'bg-gray-100'
                : 'bg-white'
            } select-none hover:cursor-pointer flex items-center space-x-2  pl-5 p-3 hover:bg-gray-100 rounded-md`}
          >
            <div className='bg-blue-100 rounded-md'>
              <TbFileDescription
                size={'25px'}
                color={'#3b82f6'}
                style={{
                  padding: '4px'
                }}
              />
            </div>

            <p className='text-sm text-gray-800'>Ordenes de deposito</p>
          </div>
        </NavLink>
      </div>

      <div className='px-5 pb-3'>
        <div
          className={`${
            location.pathname.includes('expenses') ? 'bg-gray-100' : 'bg-white'
          } select-none hover:cursor-pointer flex items-center space-x-2  pl-5 p-3 hover:bg-gray-100 rounded-md`}
        >
          <div className='bg-red-100 rounded-md'>
            <TbTags
              size={'25px'}
              color={'#b91c1c'}
              style={{
                padding: '4px'
              }}
            />
          </div>

          <p className='text-sm text-gray-800'>Salidas y Gastos</p>
        </div>
      </div>

      {role === Roles.FINANCIAL_MANAGER && (
        <>
          <Divider className='border border-gray-200' />

          <div className='p-2'>
            <p className='text-xs font-medium text-gray-700'>Administrador</p>
          </div>

          <div className='px-5 pb-0'>
            <NavLink to={'/techobol/admin/users'}>
              <div
                className={`${
                  location.pathname.includes('users')
                    ? 'bg-gray-100'
                    : 'bg-white'
                } select-none hover:cursor-pointer flex items-center space-x-2  pl-5 p-3 hover:bg-gray-100 rounded-md`}
              >
                <div className='bg-amber-100 rounded-md'>
                  <TbUsers
                    size={'25px'}
                    color={'#f59e0b'}
                    style={{
                      padding: '4px'
                    }}
                  />
                </div>

                <p className='text-sm text-gray-800'>Usuarios</p>
              </div>
            </NavLink>
          </div>

          {/* <div className='px-5 pb-0'>
  <div className='select-none hover:cursor-pointer flex items-center space-x-2  pl-5 p-3 hover:bg-gray-100 rounded-md'>
    <div className='bg-blue-100 rounded-md'>
      <TbMapPin
        size={'25px'}
        color={'#3b82f6'}
        style={{
          padding: '4px'
        }}
      />
    </div>

    <p className='text-sm text-gray-800'>Regionales</p>
  </div>
</div> */}

          <div className='px-5 pb-0'>
            <NavLink to={'/techobol/admin/branch-offices'}>
              <div
                className={`${
                  location.pathname.includes('branch-offices')
                    ? 'bg-gray-100'
                    : 'bg-white'
                } select-none hover:cursor-pointer flex items-center space-x-2  pl-5 p-3 hover:bg-gray-100 rounded-md`}
              >
                <div className='bg-violet-100 rounded-md'>
                  <TbHome
                    size={'25px'}
                    color={'#8b5cf6'}
                    style={{
                      padding: '4px'
                    }}
                  />
                </div>

                <p className='text-sm text-gray-800'>Sucursales</p>
              </div>
            </NavLink>
          </div>

          <div className='px-5 pb-0'>
            <NavLink to={'/techobol/admin/accounts'}>
              <div
                className={`${
                  location.pathname.endsWith('/accounts')
                    ? 'bg-gray-100'
                    : 'bg-white'
                } select-none hover:cursor-pointer flex items-center space-x-2  pl-5 p-3 hover:bg-gray-100 rounded-md`}
              >
                <div className='bg-red-100 rounded-md'>
                  <TbListDetails
                    size={'25px'}
                    color={'#b91c1c'}
                    style={{
                      padding: '4px'
                    }}
                  />
                </div>

                <p className='text-sm text-gray-800'>Cuentas financieras</p>
              </div>
            </NavLink>
          </div>

          <div className='px-5 pb-3'>
            <NavLink to={'/techobol/admin/sub-accounts'}>
              <div
                className={`${
                  location.pathname.endsWith('sub-accounts')
                    ? 'bg-gray-100'
                    : 'bg-white'
                } select-none hover:cursor-pointer flex items-center space-x-2  pl-5 p-3 hover:bg-gray-100 rounded-md`}
              >
                <div className='bg-blue-100 rounded-md'>
                  <TbList
                    size={'25px'}
                    color={'#3b82f6'}
                    style={{
                      padding: '4px'
                    }}
                  />
                </div>

                <p className='text-sm text-gray-800'>Subcuentas financieras</p>
              </div>
            </NavLink>
          </div>
        </>
      )}
    </div>
  )
}

export default Sidebar
