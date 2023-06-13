import { TbEye, TbEyeOff } from 'react-icons/tb'
import { useState } from 'react'

interface PasswordInputProps {
  password: string
  setPassword: (password: string) => void
}

const PasswordInput = ({ password, setPassword }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <div className='space-y-2'>
      <div className='flex space-x-1'>
        <p className='text-sm font-semibold text-gray-800'>Contraseña</p>
        <span className='text-xs text-red-500'>*</span>
      </div>

      <div className='flex relative'>
        <input
          className='w-full border border-gray-300 focus:outline-blue-600 rounded-md p-2 text-sm px-3'
          type={isPasswordVisible ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div
          className=' absolute right-2 top-2.5'
          onClick={() => setIsPasswordVisible(password => !password)}
        >
          {isPasswordVisible ? (
            <TbEyeOff className='text-gray-600 text-xl hover:cursor-pointer select-none' />
          ) : (
            <TbEye className='text-gray-600 text-xl hover:cursor-pointer select-none' />
          )}
        </div>
      </div>
    </div>
  )
}

export default PasswordInput
