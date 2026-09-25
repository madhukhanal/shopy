import { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import OrderSuccess from "./pages/OrderSuccess";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import products from "./data/products";

const CART_STORAGE_KEY = "shopy-cart";
const ORDERS_STORAGE_KEY = "shopy-orders";
const INVENTORY_STORAGE_KEY = "shopy-inventory";

function createInitialInventory() {
  return Object.fromEntries(products.map((product) => [product.id, product.stock]));
}

function readStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function AppShell({ cartItems, cartItemCount, addToCart, updateQuantity, removeFromCart, cartTotal, inventory, placeOrder }) {
  const location = useLocation();
  const orders = readStorage(ORDERS_STORAGE_KEY, []);

  return (
    <div className="app">
      <header className="site-header">
        <div className="container header-content">
          <Link className="brand" to="/" aria-label="Shopy home"><span>shop</span>y</Link>
          <nav className="nav-links" aria-label="Main navigation">
            <Link className={location.pathname === "/" ? "active" : ""} to="/">Home</Link>
            <Link className={location.pathname === "/orders" ? "active" : ""} to="/orders">Orders{orders.length > 0 && <span className="nav-order-count">{orders.length}</span>}</Link>
            <Link className={location.pathname === "/cart" ? "active cart-link" : "cart-link"} to="/cart">
              <span className="cart-icon" aria-hidden="true">bag</span>
              Cart
              <span className="cart-count" aria-label={`${cartItemCount} items in cart`}>{cartItemCount}</span>
            </Link>
          </nav>
        </div>
      </header>

      <main className="page-transition" key={location.pathname}>
        <Routes>
          <Route path="/" element={<Home onAddToCart={addToCart} inventory={inventory} />} />
          <Route path="/cart" element={<Cart cartItems={cartItems} cartTotal={cartTotal} inventory={inventory} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onPlaceOrder={placeOrder} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/products/:productId" element={<ProductDetails inventory={inventory} onAddToCart={addToCart} />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </main>

      <footer className="site-footer">
        <div className="container footer-content">
          <div><Link className="footer-brand" to="/">Shopy</Link><p>Simple shopping. Better products.</p></div>
          <p>Built with React · Course project · 2026</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  const [cartItems, setCartItems] = useState(() => readStorage(CART_STORAGE_KEY, []));
  const [inventory, setInventory] = useState(() => readStorage(INVENTORY_STORAGE_KEY, createInitialInventory()));

  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(INVENTORY_STORAGE_KEY, JSON.stringify(inventory));
  }, [inventory]);

  function addToCart(product) {
    setCartItems((currentItems) => {
      const currentQuantity = currentItems.find((item) => item.id === product.id)?.quantity || 0;
      const available = inventory[product.id] ?? 0;
      if (currentQuantity >= available) return currentItems;

      const existingItem = currentItems.find((item) => item.id === product.id);
      if (existingItem) {
        return currentItems.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...currentItems, { ...product, quantity: 1 }];
    });
  }

  function updateQuantity(productId, quantity) {
    const available = inventory[productId] ?? 0;
    if (quantity <= 0 || available <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((currentItems) => currentItems.map((item) => (
      item.id === productId ? { ...item, quantity: Math.min(quantity, available) } : item
    )));
  }

  function removeFromCart(productId) {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== productId));
  }

  function placeOrder(customer) {
    const hasUnavailableItem = cartItems.some((item) => item.quantity > (inventory[item.id] ?? 0));
    if (hasUnavailableItem) {
      return null;
    }

    const orderItems = cartItems.map((item) => ({ ...item }));
    const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const shipping = subtotal >= 75 ? 0 : 6.99;
    const order = {
      id: `SHP-${Date.now().toString().slice(-8)}`,
      createdAt: new Date().toISOString(),
      status: "Order placed",
      customer,
      items: orderItems,
      subtotal,
      shipping,
      total: subtotal + shipping,
      estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(),
    };

    setInventory((currentInventory) => {
      const nextInventory = { ...currentInventory };
      orderItems.forEach((item) => {
        nextInventory[item.id] = Math.max(0, (nextInventory[item.id] ?? 0) - item.quantity);
      });
      return nextInventory;
    });

    const existingOrders = readStorage(ORDERS_STORAGE_KEY, []);
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify([order, ...existingOrders]));
    setCartItems([]);
    return order;
  }

  const cartItemCount = useMemo(() => cartItems.reduce((total, item) => total + item.quantity, 0), [cartItems]);
  const cartTotal = useMemo(() => cartItems.reduce((total, item) => total + item.price * item.quantity, 0), [cartItems]);

  return (
    <BrowserRouter>
      <AppShell cartItems={cartItems} cartItemCount={cartItemCount} addToCart={addToCart} updateQuantity={updateQuantity} removeFromCart={removeFromCart} cartTotal={cartTotal} inventory={inventory} placeOrder={placeOrder} />
    </BrowserRouter>
  );
}

export default App;
