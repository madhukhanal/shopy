import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { ProductDetails } from './pages/ProductDetails'
import { Cart } from './pages/Cart'
import { Orders } from './pages/Orders'
import { OrderSuccess } from './pages/OrderSuccess'

function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products/:productId" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
