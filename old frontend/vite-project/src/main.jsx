import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CustomerLoginPage from "./pages/CustomerLoginPage";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
