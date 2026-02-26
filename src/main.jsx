import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Routes from './Routes/Routes.jsx'
import { RouterProvider } from 'react-router'
import AuthProvider from './Contexts/AuthProvider/AuthProvider.jsx'
import { Toaster } from 'react-hot-toast'
import QueryProvider from './Contexts/QueryProvider/QueryProvider.jsx'
import 'aos/dist/aos.css';
import Aos from 'aos'
import ScrollToTopButton from './Components/ScrollToTopButton/ScrollToTopButton.jsx'

// Initialize AOS
Aos.init({
  duration: 800,
  easing: 'ease-in-out',
  once: false,
  mirror: true,
  offset: 100,
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryProvider>
      <AuthProvider>
        <RouterProvider router={Routes}>
        </RouterProvider>
        <ScrollToTopButton />
        <Toaster position='top-center' containerStyle={{
          top: 120
        }} />
      </AuthProvider>
    </QueryProvider>
  </StrictMode>
)
