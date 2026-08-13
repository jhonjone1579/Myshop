import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx' // Import လုပ်ပါ
import { Toaster } from 'react-hot-toast' // Toaster ကို Import လုပ်ပါ
import { BrowserRouter } from 'react-router-dom' // BrowserRouter Import လုပ်ပါ
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <CartProvider>
      <WishlistProvider>
      {/* Toast Notification Container */}
      <Toaster position="top-center" reverseOrder={false} />
      <App />
      </WishlistProvider>
    </CartProvider>
    </BrowserRouter>
  </React.StrictMode>,
)