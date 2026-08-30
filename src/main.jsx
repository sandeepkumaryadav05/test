import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { ShopModalProvider } from './context/ShopComingSoonModal'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopModalProvider>
      <App />
    </ShopModalProvider>
  </React.StrictMode>,
)
