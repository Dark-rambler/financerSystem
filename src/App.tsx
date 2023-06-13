import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import DepositOrder from './pages/DepositOrder'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useLoginStore } from './components/store/loginStore'

function App () {
  const { isLoggedIn } = useLoginStore()
  return (
    <Routes>
      <Route path='*' element={<Navigate to={'/login'}></Navigate>}></Route>
      <Route element={<MainLayout />}>
        <Route path='/login' element={<Login />} />
        {isLoggedIn && (
          <Route path='/techobol/deposit-order' element={<DepositOrder />} />
        )}
      </Route>
    </Routes>
  )
}

export default App
