import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // We replaced style.css here
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
