interface BlueButtonProps {
  label: string
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
  isLoading: boolean
}

const BlueButton = ({ label, onClick, isLoading }: BlueButtonProps) => {
  return (
    <div className=' w-full'>
      <button
        onClick={onClick}
        className='active:bg-blue-800 hover:bg-blue-700 font-medium text-sm w-full bg-blue-600 text-white p-2 rounded-md  select-none disabled:opacity-80 disabled:cursor-not-allowed h-11'
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex justify-center">
             <svg
            className='w-5 h-5 animate-spin'
            width='20'
            height='20'
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24ZM11.9415 20.2537C16.4675 20.2537 20.1366 16.5846 20.1366 12.0585C20.1366 7.5325 16.4675 3.86342 11.9415 3.86342C7.41542 3.86342 3.74634 7.5325 3.74634 12.0585C3.74634 16.5846 7.41542 20.2537 11.9415 20.2537Z'
              fill='white'
              fill-opacity='0.44'
            />
            <path
              fill-rule='evenodd'
              clip-rule='evenodd'
              d='M20.3683 20.6006C22.6085 18.4206 24 15.3728 24 12C24 5.37258 18.6274 0 12 0L11.9415 0.000139729V3.86342C16.4675 3.86343 20.1366 7.53251 20.1366 12.0585C20.1366 14.3509 19.1954 16.4234 17.6784 17.9107L20.3683 20.6006Z'
              fill='white'
            />
          </svg>
          </div>
         
        ) : (
          label
        )}
      </button>
    </div>
  )
}

export default BlueButton
