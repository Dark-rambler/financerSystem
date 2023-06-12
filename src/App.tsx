import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import { Routes, Route } from 'react-router-dom'

function App () {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <MainLayout>
            <Login />
          </MainLayout>
        }
      />
      <Route path='/deposit-order'  element={
          <MainLayout>
          </MainLayout>
      }/>
    </Routes>
  )
}

export default App
