import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'dayjs/locale/es';
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import {DatesProvider} from '@mantine/dates'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
    <DatesProvider settings={{ locale: 'es', firstDayOfWeek: 1, weekendDays: [0] }}>
    <App />
    </DatesProvider>
   
      <Toaster/>
    </BrowserRouter>
  </React.StrictMode>
)
