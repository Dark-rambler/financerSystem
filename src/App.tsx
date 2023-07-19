import { Routes, Route, Navigate } from 'react-router-dom'
import { useLoginStore } from './components/store/loginStore'

import { Roles } from './enums/Roles'

import MainLayout from './layouts/MainLayout'

import Login from './pages/Login'
import DepositOrder from './pages/Techobol/DepositOrder'
import RegisterDepositOrder from './pages/Techobol/RegisterDepositOrder'
import Users from './pages/Admin/Users'
import BranchOffices from './pages/Admin/BranchOffices'
import Accounts from './pages/Admin/Accounts'
import SubAccounts from './pages/Admin/SubAccounts'
import CreateDepositOrderReport from './pages/Techobol/CreateDepositOrderReport'

import SetPassword from './pages/SetPassword'
import SetPasswordError from './pages/SetPasswordError'

import Envelopes from './pages/Techobol/Envelopes'
import Dolars from './pages/Techobol/Dolars'
import Deposits from './pages/Techobol/Deposits'
import Expenses from './pages/Techobol/Expenses'
import MoneyCollections from './pages/Techobol/MoneyCollections'

function App () {
  const { isLoggedIn, role } = useLoginStore()

  return (
    <Routes>
      <Route path='*' element={<Navigate to={'/login'} />} />
      <Route path='/set-password-error' element={<SetPasswordError />} />
      <Route element={<MainLayout />}>
        <Route
          path='/login'
          element={
            isLoggedIn ? <Navigate to={'/techobol/deposit-order'} /> : <Login />
          }
        />
        <Route path='/set-password/:token' element={<SetPassword />} />

        {isLoggedIn && (
          <>
            {' '}
            <Route path='/techobol/deposit-order' element={<DepositOrder />} />
            <Route
              path='/techobol/register-deposit-order'
              element={<RegisterDepositOrder />}
            />
            <Route
              path='/techobol/register-deposit-order'
              element={<RegisterDepositOrder />}
            />
            <Route
              path='/techobol/create-deposit-order-report/:id'
              element={<CreateDepositOrderReport />}
            />
            <Route
              path='/techobol/money-collections'
              element={<MoneyCollections />}
            />
            <Route path='/techobol/expenses' element={<Expenses />} />
            <Route path='/techobol/dolars' element={<Dolars />} />
            <Route path='/techobol/envelopes' element={<Envelopes />} />
            <Route path='/techobol/deposits' element={<Deposits />} />
            
            <Route
              path='/megadis/deposit-order'
              element={
                <div className='h-full bg-slate-200'>
                  Holaaa esto es megadis
                </div>
              }
            />
            {role === Roles.FINANCIAL_MANAGER && (
              <>
                <Route path='/techobol/admin/users' element={<Users />} />
                <Route
                  path='/techobol/admin/branch-offices'
                  element={<BranchOffices />}
                />
                <Route path='/techobol/admin/accounts' element={<Accounts />} />
                <Route
                  path='/techobol/admin/sub-accounts'
                  element={<SubAccounts />}
                />
              </>
            )}
          </>
        )}
      </Route>
    </Routes>
  )
}

export default App
