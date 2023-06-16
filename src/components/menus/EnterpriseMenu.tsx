import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

interface EnterpriseMenuProps {
  isTechoBol: boolean
}

interface TechoBolMenuProps {
  open: boolean
  close (): void
}

const TechoBolMenu = ({ open, close }: TechoBolMenuProps) => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => {
        close()
        navigate('/techobol/deposit-order')
      }}
      className={`${
        open
          ? ' active:bg-slate-300 bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200 shadow-md'
          : 'hover:bg-slate-100 hover:shadow-md'
      } focus:bg-slate-200 bg-slate-200 items-center transition ease-in-out flex w-36 py-2.5 rounded-md font-bold text-md text-slate-800 pl-3 space-x-2.5`}
    >
      <img src='/images/techobolLogo.png' width={23} height={23} alt='alt' />
      <p>TechoBol</p>
    </button>
  )
}

const MegadisMenu = ({ open, close }: TechoBolMenuProps) => {
  const navigate = useNavigate()
  return (
    <button
      onClick={() => {
        close()
        navigate('/megadis/deposit-order')
      }}
      className={`${
        open
          ? ' active:bg-slate-300 bg-slate-100 text-slate-800 border-slate-300 hover:bg-slate-200 shadow-md'
          : 'hover:bg-slate-100 hover:shadow-md'
      } focus:bg-slate-200 bg-slate-200 items-center transition ease-in-out flex w-36 py-2.5 rounded-md font-bold text-md  text-slate-800 pl-3 space-x-2.5`}
    >
      <img src='/images/megadisLogo.png' width={25} height={25} alt='alt' />
      <p>Megadis</p>
    </button>
  )
}

const EnterpriseMenu = ({ isTechoBol }: EnterpriseMenuProps) => {
  return (
    <div>
      <Menu as='div' className={'relative'}>
        {({ open, close }) => (
          <>
            <Menu.Button>
              {isTechoBol ? (
                <TechoBolMenu open={open} close={close} />
              ) : (
                <MegadisMenu open={open} close={close}/>
              )}
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
              <Menu.Items className='absolute mt-1.5 shadow-md rounded-md'>
                <Menu.Item>
                  {({ active }) => (
                    <>
                      {isTechoBol ? (
                        <MegadisMenu open={open} close={close}/>
                      ) : (
                        <TechoBolMenu open={open} close={close}/>
                      )}
                    </>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </>
        )}
      </Menu>
    </div>
  )
}

export default EnterpriseMenu
