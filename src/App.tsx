import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import DepositOrder from './pages/DepositOrder'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLoginStore } from './components/store/loginStore'

function App () {
  const { isLoggedIn } = useLoginStore()
  return (
    <Routes>
      <Route path='*' element={<Navigate to={'/login'} />} />
      <Route element={<MainLayout />}>
        <Route
          path='/login'
          element={
            isLoggedIn ? <Navigate to={'/techobol/deposit-order'} /> : <Login />
          }
        />
        {isLoggedIn && (
          <>
            {' '}
            <Route path='/techobol/deposit-order' element={<DepositOrder />} />
            <Route path='/megadis/deposit-order' element={<div className='h-full bg-slate-200'>Holaaa esto es megadis</div>} />
          </>
        )}
      </Route>
    </Routes>
  )
}

export default App
