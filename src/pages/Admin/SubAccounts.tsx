import { Input, Button } from '@mantine/core'
import { TbSearch, TbPlus } from 'react-icons/tb'

import SubAccountTable from '../../components/table/admin/SubAccountTable'

import { useSubAccount } from '../../hooks/useSubAccount'
import DeleteModal from '../../components/modals/DeleteModal'

import RegisterSubAccountModal from '../../components/modals/admin/RegisterSubAccountModal'

const SubAccounts = () => {
  const subAccount = useSubAccount()

  const openModal = () => {
    subAccount.open()
  }

  return (
    <>
      <div className='w-full p-10 space-y-5 h-full'>
        <div className='flex justify-between'>
          <div className='flex items-end '>
            <h1 className='font-bold text-md'>SUBCUENTAS FINANCIERAS</h1>
          </div>
          <div className='flex space-x-4'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              onChange={subAccount.onFilterTextBoxChanged}
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
              Registrar nueva subcuenta financiera
            </Button>
          </div>
        </div>

        <div className='h-[calc(100%-60px)] overflow-y-auto max-2xl:border-x-2 '>
          <SubAccountTable
            subAccount={subAccount}
            gridRef={subAccount.gridRef}
          />
        </div>
      </div>
      <RegisterSubAccountModal
        subAccount={subAccount}
        opened={subAccount.opened}
        close={subAccount.close}
      />
      <DeleteModal
        label={'Subcuenta financiera'}
        opened={subAccount.openedDelete}
        close={subAccount.handlersDelete.close}
        onDelete={subAccount.onDeleteBranchOffice}
      />
    </>
  )
}

export default SubAccounts
