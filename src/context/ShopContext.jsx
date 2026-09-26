import React, { createContext, useContext, useState, useEffect } from 'react';
import { products as initialProducts } from '../data/products';

const ShopContext = createContext();

export const useShop = () => useContext(ShopContext);

export const ShopProvider = ({ children }) => {
  // Products are never persisted to localStorage — Vite asset URLs (images) cannot
  // survive JSON serialization and come back as null, breaking product images.
  const [products, setProducts] = useState(initialProducts);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('shopy_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('shopy_orders');
    return saved ? JSON.parse(saved) : [];
  });


  useEffect(() => {
    localStorage.setItem('shopy_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('shopy_orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (productId, quantity = 1) => {
    const product = products.find(p => p.id === productId);
    if (!product || product.stock < quantity) return;

    setCart(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing) {
        return prev.map(item => item.id === productId ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const product = products.find(p => p.id === productId);
    if (!product || product.stock < quantity) return;

    setCart(prev => prev.map(item => item.id === productId ? { ...item, quantity } : item));
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const clearCart = () => setCart([]);

  const placeOrder = (details) => {
    const orderTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newOrder = {
      id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      items: [...cart],
      total: orderTotal,
      details,
      status: 'Processing',
      deliveryEstimate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString()
    };

    // Reduce inventory
    setProducts(prev => prev.map(p => {
      const cartItem = cart.find(c => c.id === p.id);
      if (cartItem) {
        return { ...p, stock: p.stock - cartItem.quantity };
      }
      return p;
    }));

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder.id;
  };

  const value = {
    products,
    cart,
    orders,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    placeOrder,
    cartCount: cart.reduce((sum, item) => sum + item.quantity, 0)
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};
