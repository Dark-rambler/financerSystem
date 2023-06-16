import { TextInput, Button, Stack } from '@mantine/core'
import {TbMapPin, TbUser} from 'react-icons/tb'

interface SelectRegionalOfficeProps {
    changeStepForward: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const SelectRegionalOffice = ({changeStepForward}: SelectRegionalOfficeProps) => {
  return (
    <Stack spacing={16}>
      <TextInput withAsterisk  icon={<TbMapPin/>} placeholder='Regional' label={'Regional'} />
      <TextInput withAsterisk icon={<TbUser/>} placeholder='Administrador' label={'Administrador'} />
      <Button className='bg-blue-600 hover:bg-blue-700 mt-3' onClick={changeStepForward}>Siguiente</Button>
    </Stack>
  )
}

export default SelectRegionalOffice
