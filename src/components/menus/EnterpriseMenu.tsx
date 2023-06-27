
import { useNavigate } from 'react-router-dom'
import { Menu} from '@mantine/core'

interface EnterpriseMenuProps {
  isTechoBol: boolean
}


const EnterpriseMenu = ({ isTechoBol }: EnterpriseMenuProps) => {
  const navigate = useNavigate()
  return (
    <>
      <Menu shadow='sm' width={175}>
        <Menu.Target>
          {isTechoBol ? (
            <div className=' select-none flex justify-center space-x-2 w-[175px] bg-white hover:bg-gray-100 p-2 hover:cursor-pointer rounded-md'>
              {' '}
              <img
                src='/images/techobolLogo.png'
                width={25}
                // height={20}
                alt='alt'
              />
              <p className=' text-slate-900 font-bold text-[16px]'>TechoBol</p>
            </div>
          ) : (
            <div className='select-none  flex justify-center space-x-2 w-[175px] bg-white hover:bg-gray-100 p-2 hover:cursor-pointer rounded-md'>
              {' '}
              <img src='/images/megadisLogo.png' width={35} alt='alt' />
              <p className=' text-slate-900 font-bold text-[16px]'>Megadis</p>
            </div>
          )}
        </Menu.Target>

        <Menu.Dropdown>
          <Menu.Item
            onClick={
              isTechoBol
                ? () => navigate('/megadis/deposit-order')
                : () => navigate('/techobol/deposit-order')
            }
          >
            {isTechoBol ? (
              <div className='select-none  flex justify-center space-x-2 w-[140px] p-2 hover:cursor-pointer rounded-md'>
                {' '}
                <img src='/images/megadisLogo.png' width={35} alt='alt' />
                <p className=' text-slate-900 font-bold text-[16px]'>Megadis</p>
              </div>
            ) : (
              <div className='select-none flex justify-center space-x-2 w-[140px] p-2 hover:cursor-pointer rounded-md'>
                {' '}
                <img
                  src='/images/techobolLogo.png'
                  width={25}
                  // height={20}
                  alt='alt'
                />
                <p className=' text-slate-900 font-bold text-[16px]'>
                  TechoBol
                </p>
              </div>
            )}
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </>
  )
}

export default EnterpriseMenu
