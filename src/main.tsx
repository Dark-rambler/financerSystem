import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import 'dayjs/locale/es-us'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { DatesProvider } from '@mantine/dates'
import { MantineProvider } from '@mantine/core'


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <MantineProvider
        theme={{
          colors: {
            blue_tailwind: [
              '#eff6ff',
              '#dbeafe',
              '#bfdbfe',
              '#93c5fd',
              '#60a5fa',
              '#3b82f6',
              '#2563eb',
              '#1d4ed8',
              '#1e40af',
              '#1e3a8a'
            ]
          },
          primaryColor: 'blue_tailwind',
          fontFamily: 'Inter, Open-Sans'
        }}
      >
        <DatesProvider
          settings={{ locale: 'es-us', firstDayOfWeek: 1, weekendDays: [0] }}
        >
          <App />
        </DatesProvider>
      </MantineProvider>

      <Toaster />
    </BrowserRouter>
  </React.StrictMode>
)
