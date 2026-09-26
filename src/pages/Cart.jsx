import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Trash2 } from 'lucide-react';

export const Cart = () => {
  const { cart, updateCartQuantity, removeFromCart, placeOrder } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: ''
  });
  const [errors, setErrors] = useState({});

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15;
  const total = subtotal + shipping;
  const amountToFreeShipping = Math.max(0, 100 - subtotal);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Valid email is required';
    if (!formData.address) newErrors.address = 'Delivery address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const orderId = placeOrder(formData);
    navigate('/order-success', { state: { orderId } });
  };

  if (cart.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Your cart is empty</h2>
        <p className="text-muted" style={{ margin: '16px 0 32px' }}>Looks like you haven't added anything yet.</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Cart</h1>
        
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="item-image" />
                <div className="item-details">
                  <div className="item-header">
                    <Link to={`/products/${item.id}`} className="item-name">{item.name}</Link>
                    <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <div className="item-price">${item.price.toFixed(2)}</div>
                  <div className="item-stock">
                    {item.stock < item.quantity ? (
                      <span className="text-red">Only {item.stock} available</span>
                    ) : (
                      <span className="text-muted">In stock</span>
                    )}
                  </div>
                  <div className="quantity-selector">
                    <button 
                      className="qty-btn" 
                      onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    >-</button>
                    <span className="qty-val">{item.quantity}</span>
                    <button 
                      className="qty-btn" 
                      onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="checkout-sidebar">
            <div className="order-summary">
              <h3>Order Summary</h3>
              
              {amountToFreeShipping > 0 ? (
                <div className="shipping-progress">
                  You're ${(amountToFreeShipping).toFixed(2)} away from free shipping.
                </div>
              ) : (
                <div className="shipping-progress success">
                  You've unlocked free shipping!
                </div>
              )}

              <div className="summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="summary-row total-row">
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <h3>Delivery Details</h3>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  className={`input ${errors.name ? 'error' : ''}`}
                  value={formData.name}
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
                {errors.name && <span className="error-text">{errors.name}</span>}
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  className={`input ${errors.email ? 'error' : ''}`}
                  value={formData.email}
                  onChange={e => setFormData({...formData, email: e.target.value})}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
              <div className="form-group">
                <label>Delivery Address</label>
                <textarea 
                  className={`input ${errors.address ? 'error' : ''}`}
                  rows="3"
                  value={formData.address}
                  onChange={e => setFormData({...formData, address: e.target.value})}
                ></textarea>
                {errors.address && <span className="error-text">{errors.address}</span>}
              </div>
              <button type="submit" className="btn btn-primary btn-block">Place Order</button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        .cart-page {
          padding: 40px 0 80px;
        }
        .cart-page h1 {
          font-size: 2.5rem;
          margin-bottom: 48px;
        }
        .cart-layout {
          display: grid;
          grid-template-columns: 1fr 400px;
          gap: 64px;
        }
        
        .cart-item {
          display: flex;
          gap: 24px;
          padding: 24px 0;
          border-bottom: 1px solid var(--color-border);
        }
        .cart-item:first-child {
          padding-top: 0;
        }
        .item-image {
          width: 120px;
          height: 120px;
          object-fit: cover;
          border-radius: 8px;
          border: 1px solid var(--color-border);
        }
        .item-details {
          flex: 1;
        }
        .item-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        .item-name {
          font-size: 1.125rem;
          font-weight: 600;
        }
        .remove-btn {
          color: var(--color-gray);
          transition: color 0.2s;
        }
        .remove-btn:hover {
          color: var(--color-red);
        }
        .item-price {
          font-size: 1.125rem;
          margin-bottom: 8px;
        }
        .item-stock {
          font-size: 0.875rem;
          margin-bottom: 16px;
        }
        .text-red { color: var(--color-red); }
        .text-muted { color: var(--color-gray); }

        .quantity-selector {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: 4px;
          background-color: var(--color-offwhite);
        }
        .qty-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-charcoal);
        }
        .qty-btn:disabled {
          color: var(--color-gray);
          opacity: 0.5;
        }
        .qty-btn:not(:disabled):hover {
          background-color: var(--color-cream);
        }
        .qty-val {
          width: 32px;
          text-align: center;
          font-size: 0.875rem;
        }

        .checkout-sidebar {
          background-color: var(--color-offwhite);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 32px;
        }
        .order-summary h3, .checkout-form h3 {
          font-size: 1.25rem;
          margin-bottom: 24px;
          font-family: var(--font-serif);
        }
        .shipping-progress {
          background-color: var(--color-cream);
          padding: 12px;
          border-radius: 4px;
          font-size: 0.875rem;
          text-align: center;
          margin-bottom: 24px;
          color: var(--color-navy);
        }
        .shipping-progress.success {
          background-color: rgba(228, 177, 83, 0.1);
          color: var(--color-gold);
          font-weight: 600;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          color: var(--color-gray);
        }
        .total-row {
          color: var(--color-charcoal);
          font-weight: 600;
          font-size: 1.25rem;
          border-top: 1px solid var(--color-border);
          padding-top: 16px;
          margin-top: 16px;
        }

        .checkout-form {
          margin-top: 48px;
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-size: 0.875rem;
          font-weight: 600;
        }
        .input.error {
          border-color: var(--color-red);
        }
        .error-text {
          color: var(--color-red);
          font-size: 0.75rem;
          margin-top: 4px;
          display: block;
        }
        .btn-block {
          width: 100%;
          padding: 16px;
          font-size: 1.125rem;
          margin-top: 32px;
        }

        @media (max-width: 1024px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 600px) {
          .cart-item {
            flex-direction: column;
          }
          .item-image {
            width: 100%;
            height: auto;
            aspect-ratio: 1;
          }
        }
      `}</style>
    </div>
  );
};
