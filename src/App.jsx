import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

function App() {
  return <BrowserRouter><div className="app">
    <header className="site-header"><div className="container header-content">
      <Link className="brand" to="/">Shopy</Link>
      <nav className="nav-links"><Link to="/">Home</Link><Link to="/cart">Cart</Link></nav>
    </div></header>
    <main><Routes><Route path="/" element={<Home />} /><Route path="/cart" element={<Cart />} /></Routes></main>
    <footer className="site-footer"><p>Shopy &copy; 2026</p></footer>
  </div></BrowserRouter>;
}
export default App;