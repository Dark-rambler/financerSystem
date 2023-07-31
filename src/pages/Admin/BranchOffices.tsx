
import { Input, Button } from '@mantine/core'
import { TbSearch, TbPlus } from 'react-icons/tb'

import BranchOfficeTable from '../../components/table/admin/BranchOfficeTable'

import { useBranchOffice } from '../../hooks/useBranchOffice'
import DeleteModal from '../../components/modals/DeleteModal'

import RegisterBrachOfficeModal from '../../components/modals/admin/RegisterBranchOfficeModal'

const BranchOffices = () => {
  const branchOffice = useBranchOffice()

  const openModal = () => {
    branchOffice.open()
  }

  return (
    <>
      <div className='w-full p-10 space-y-5 h-full'>
        <div className='flex justify-between'>
          <div className='flex items-end '>
            <h1 className='font-bold text-md'>SUCURSALES</h1>
          </div>
          <div className='flex space-x-4'>
            <Input
              id='filter-text-box'
              icon={<TbSearch />}
              placeholder={'Buscar..'}
              className='w-72'
              onChange={branchOffice.onFilterTextBoxChanged}
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
              Registrar nueva sucursal
            </Button>
          </div>
        </div>

        <div className='h-[calc(100%-60px)] overflow-y-auto max-2xl:border-x-2 '>
          <BranchOfficeTable branchOffice={branchOffice} gridRef={branchOffice.gridRef} />
        </div>
      </div>
      <RegisterBrachOfficeModal branchOffice={branchOffice} opened={branchOffice.opened} close={branchOffice.close} />
      <DeleteModal
        label={'Sucursal'}
        opened={branchOffice.openedDelete}
        close={branchOffice.handlersDelete.close}
        onDelete={branchOffice.onDeleteBranchOffice}
      />
    </>
  )
}

export default BranchOffices
