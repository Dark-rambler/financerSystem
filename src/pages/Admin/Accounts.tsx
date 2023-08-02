import { Input, Button } from '@mantine/core'
import { TbSearch, TbPlus } from 'react-icons/tb'

import FinanceAccountTable from '../../components/table/admin/FinanceAccountTable'

import { useAccount } from '../../hooks/useAccount'

import DeleteModal from '../../components/modals/DeleteModal'
import RegisterAccountModal from '../../components/modals/admin/RegisterAccountModal'

const Accounts = () => {
  const account = useAccount()

  const openModal = () => {
    account.open()
  }

  return (
    <>
      <div className='w-full p-10 space-y-5 h-full'>
        <div className='flex justify-between'>
          <div className='flex items-end '>
            <h1 className='font-bold text-md'>CUENTAS FINANCIERAS</h1>
          </div>
          <div className='flex space-x-4'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              onChange={account.onFilterTextBoxChanged}
            />
            <Button
              leftIcon={<TbPlus />}
              size='sm'
              variant='filled'
              color='blue'
              radius={'sm'}
              className='bg-blue-600 hover:bg-blue-700'
              onClick={openModal}
            >
              Registrar nueva cuenta financiera
            </Button>
          </div>
        </div>

        <div className='h-[calc(100%-60px)] overflow-y-auto max-2xl:border-x-2 '>
          <FinanceAccountTable account={account} gridRef={account.gridRef} />
        </div>
      </div>
      <RegisterAccountModal
        account={account}
        opened={account.opened}
        close={account.close}
      />
      <DeleteModal
        label={'Cuenta financiera'}
        opened={account.openedDelete}
        close={account.handlersDelete.close}
        onDelete={account.onDeleteBranchOffice}
        isFemaleArtcle={true}
      />
    </>
  )
}

export default Accounts
