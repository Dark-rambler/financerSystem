const SetPasswordError = () => {
  return (
    <div className=' h-screen w-screen flex items-center justify-center bg-gray-200'>
      <div className='space-y-2'>
        <h1 className=' text-2xl text-center'>
          El link para crear tu contraseña ha expirado o no es válido
        </h1>
        <h1 className=' text-2xl text-center'>
          Ponte en contacto con el administrador para solicitar uno nuevo 🐘
        </h1>
      </div>
    </div>
  )
}

export default SetPasswordError
