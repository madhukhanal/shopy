import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

const CART_STORAGE_KEY = "shopy-cart";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (!savedCart) return [];
    try {
      return JSON.parse(savedCart);
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(product) {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productId, quantity) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      ),
    );
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId),
    );
  }

  const cartItemCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems],
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  return (
    <BrowserRouter>
      <div className="app">
        <header className="site-header">
          <div className="container header-content">
            <Link className="brand" to="/" aria-label="Shopy home">Shopy</Link>
            <nav className="nav-links" aria-label="Main navigation">
              <Link to="/">Home</Link>
              <Link className="cart-link" to="/cart">
                Cart <span className="cart-count">{cartItemCount}</span>
              </Link>
            </nav>
          </div>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<Home onAddToCart={addToCart} />} />
            <Route
              path="/cart"
              element={
                <Cart
                  cartItems={cartItems}
                  cartTotal={cartTotal}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeFromCart}
                />
              }
            />
          </Routes>
        </main>

        <footer className="site-footer">
          <p>Shopy &copy; 2026</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;