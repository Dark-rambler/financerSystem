import Navbar from '../components/navbar/Navbar'


interface MainLayoutProps {
    children: React.ReactNode
}

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <div className='h-screen'>
            <Navbar />
            {children}
        </div>


    )
}

export default MainLayout
