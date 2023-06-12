interface EmailInputProps {
  email: string
  setEmail: (email: string) => void
}

const EmailInput = ({ email, setEmail }: EmailInputProps) => {
  return (
    <div className='space-y-2'>
      <div className='flex space-x-1'>
        <p className='text-sm font-semibold text-slate-800'>Email</p>
        <span className='text-xs text-red-500'>*</span>
      </div>

      <input
        className='w-full border border-slate-200 focus:outline-blue-600 rounded-md p-2 text-sm px-3'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
    </div>
  )
}

export default EmailInput
