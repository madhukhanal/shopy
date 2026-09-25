import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart({ cartItems, cartTotal, inventory, onUpdateQuantity, onRemove, onPlaceOrder }) {
  const navigate = useNavigate();
  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });
  const [checkoutMessage, setCheckoutMessage] = useState("");
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
  const shipping = cartTotal >= 75 ? 0 : 6.99;
  const orderTotal = cartTotal + shipping;

  function handleChange(event) {
    const { name, value } = event.target;
    setCustomer((currentCustomer) => ({ ...currentCustomer, [name]: value }));
    if (checkoutMessage) setCheckoutMessage("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!customer.name.trim() || !customer.email.trim() || !customer.address.trim()) {
      setCheckoutMessage("Please complete all checkout fields.");
      return;
    }

    const order = onPlaceOrder({
      name: customer.name.trim(),
      email: customer.email.trim(),
      address: customer.address.trim(),
    });
    if (!order) {
      setCheckoutMessage("A cart item is no longer available in the requested quantity. Please review your cart.");
      return;
    }
    navigate(`/order-success?order=${order.id}`);
  }

  if (cartItems.length === 0) {
    return (
      <section className="page-section">
        <div className="container">
          <div className="empty-cart premium-empty">
            <span className="empty-icon" aria-hidden="true">×</span>
            <p className="eyebrow">Shopping bag</p>
            <h1>Your cart is empty</h1>
            <p>Add something you love from the collection and it will appear here.</p>
            <Link className="hero-button" to="/#products">Start shopping <span aria-hidden="true">→</span></Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading cart-heading">
          <div><p className="eyebrow">Shopping bag</p><h1>Your cart</h1></div>
          <p>{itemCount} item{itemCount === 1 ? "" : "s"}</p>
        </div>

        <div className="cart-layout">
          <div className="cart-items">
            {cartItems.map((item) => {
              const remaining = inventory[item.id] ?? 0;
              const atLimit = item.quantity >= remaining;
              return (
                <article className="cart-item" key={item.id}>
                  <div className="cart-image-wrap"><img src={item.image} alt={item.name} /></div>
                  <div className="cart-item-info">
                    <span className="product-category">{item.category}</span>
                    <h2>{item.name}</h2>
                    <p>${item.price.toFixed(2)} each</p>
                    <div className="quantity-controls" aria-label={`Quantity for ${item.name}`}>
                      <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label={`Increase ${item.name} quantity`} disabled={atLimit} onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                    <small className={remaining <= 2 ? "stock-warning" : "stock-note"}>
                      {remaining === 0 ? "Sold out" : remaining <= 2 ? `Only ${remaining} left` : `${remaining} available`}
                    </small>
                  </div>
                  <div className="cart-item-actions">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    <button className="remove-button" type="button" onClick={() => onRemove(item.id)}>Remove</button>
                  </div>
                </article>
              );
            })}
          </div>

          <aside className="cart-summary">
            <div className="shipping-progress">
              <div><span>{cartTotal >= 75 ? "Free shipping unlocked" : `Add $${(75 - cartTotal).toFixed(2)} more for free shipping`}</span><strong>{Math.min(100, (cartTotal / 75) * 100).toFixed(0)}%</strong></div>
              <div className="shipping-progress-track"><span style={{ width: `${Math.min(100, (cartTotal / 75) * 100)}%` }} /></div>
            </div>
            <p className="eyebrow">Order review</p>
            <h2>Summary</h2>
            <div><span>Items</span><strong>{itemCount}</strong></div>
            <div><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div>
            <div><span>Shipping</span><strong>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</strong></div>
            <div className="cart-total"><span>Estimated total</span><strong>${orderTotal.toFixed(2)}</strong></div>

            <form className="checkout-form" onSubmit={handleSubmit}>
              <div className="checkout-title"><h3>Delivery details</h3><span>Secure demo checkout</span></div>
              <label><span>Full name</span><input name="name" value={customer.name} onChange={handleChange} placeholder="Your name" required /></label>
              <label><span>Email</span><input name="email" type="email" value={customer.email} onChange={handleChange} placeholder="you@example.com" required /></label>
              <label><span>Delivery address</span><textarea name="address" value={customer.address} onChange={handleChange} placeholder="Street, city, delivery details" rows="3" required /></label>
              <button className="checkout-button" type="submit">Place order <span aria-hidden="true">→</span></button>
            </form>

            {checkoutMessage && <p className="checkout-message error" role="alert">{checkoutMessage}</p>}
            <p className="checkout-note">Demo checkout: no real payment is processed. Your order is saved locally so you can view its status and items.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default Cart;
