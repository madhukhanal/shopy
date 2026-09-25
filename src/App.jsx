import { BrowserRouter, Link, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Cart from "./pages/Cart"

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <header className="header">
          <div className="container header-content">
            <Link to="/" className="logo">Shopy</Link>
            <nav className="nav" aria-label="Main navigation">
              <Link to="/">Home</Link>
              <Link to="/cart">Cart</Link>
            </nav>
          </div>
        </header>

        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </main>

        <footer className="footer">
          <div className="container">
            <p>© 2026 Shopy. Built with React.</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  )
}

export default App
