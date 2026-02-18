import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Contexts/AuthProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import QueryProvider from './Contexts/QueryProvider/QueryProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>

      <AuthProvider>
        <RouterProvider router={Routes}>

        </RouterProvider>
        <Toaster position='top-center' containerStyle={{
          top: 120
        }} />
      </AuthProvider>

    </QueryProvider>



  </StrictMode>
)
