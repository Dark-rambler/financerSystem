import toast from 'react-hot-toast'

const succesToast = (message: string) => {
    toast.success(message, {
        duration: 4000,
        position: 'bottom-right',
        style: {
            backgroundColor: '#16a34a',
            color: '#fff',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#16a34a',
          },
    })
}

const errorToast = (message: string) => {
    toast.error(message, {
        duration: 4000,
        position: 'bottom-right',
        style: {
            backgroundColor: '#dc2626',
            color: '#fff',
        },
        iconTheme: {
            primary: '#fff',
            secondary: '#dc2626',
          },
    })
}

export { succesToast, errorToast }