import { TbEye, TbEyeOff } from 'react-icons/tb'
import { useState } from 'react'

interface PasswordInputProps {
  password: string
  setPassword: (password: string) => void
  label?: string
}

const PasswordInput = ({ password, setPassword, label }: PasswordInputProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)
  return (
    <div className='space-y-2'>
      <div className='flex space-x-1'>
        <p className='text-sm font-medium text-slate-800'>{label ? label : 'Contraseña'}</p>
        <span className='text-xs text-red-600'>*</span>
      </div>

      <div className='flex relative'>
        <input
          className='bg-white w-full border border-slate-300 active:outline-blue-600 hover:outline-blue-600  focus:outline-blue-600 rounded-lg p-2 text-sm px-3'
          type={isPasswordVisible ? 'text' : 'password'}
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div
          className=' absolute right-2 top-2.5'
          onClick={() => setIsPasswordVisible(password => !password)}
        >
          {isPasswordVisible ? (
            <TbEyeOff className='text-slate-600 text-xl hover:cursor-pointer select-none' />
          ) : (
            <TbEye className='text-slate-600 text-xl hover:cursor-pointer select-none' />
          )}
        </div>
      </div>
    </div>
  )
}

export default PasswordInput
