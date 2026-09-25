import { useState } from "react";

function Cart({ cartItems, cartTotal, onUpdateQuantity, onRemove }) {
  const [customer, setCustomer] = useState({ name: "", email: "", address: "" });
  const [checkoutMessage, setCheckoutMessage] = useState("");

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  function handleChange(event) {
    const { name, value } = event.target;
    setCustomer((currentCustomer) => ({ ...currentCustomer, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!customer.name || !customer.email || !customer.address) {
      setCheckoutMessage("Please complete all checkout fields.");
      return;
    }
    setCheckoutMessage(`Thanks, ${customer.name}! Your demo order has been prepared.`);
  }

  return (
    <section className="page-section">
      <div className="container">
        <div className="section-heading">
          <div><p className="eyebrow">Shopping bag</p><h1>Your Cart</h1></div>
          <p>{itemCount} item{itemCount === 1 ? "" : "s"}</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <h2>Your cart is empty</h2>
            <p>Add some products from the catalog to get started.</p>
          </div>
        ) : (
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <img src={item.image} alt={item.name} />
                  <div className="cart-item-info">
                    <span className="product-category">{item.category}</span>
                    <h3>{item.name}</h3>
                    <p>${item.price.toFixed(2)} each</p>
                    <div className="quantity-controls">
                      <button type="button" aria-label={`Decrease ${item.name} quantity`} onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" aria-label={`Increase ${item.name} quantity`} onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>
                  </div>
                  <div className="cart-item-actions">
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    <button className="remove-button" type="button" onClick={() => onRemove(item.id)}>Remove</button>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <p className="eyebrow">Order review</p>
              <h2>Checkout Summary</h2>
              <div><span>Products</span><strong>{cartItems.length}</strong></div>
              <div><span>Total items</span><strong>{itemCount}</strong></div>
              <div><span>Subtotal</span><strong>${cartTotal.toFixed(2)}</strong></div>
              <div className="cart-total"><span>Order Total</span><strong>${cartTotal.toFixed(2)}</strong></div>

              <form className="checkout-form" onSubmit={handleSubmit}>
                <h3>Customer details</h3>
                <label><span>Name</span><input name="name" value={customer.name} onChange={handleChange} placeholder="Your name" required /></label>
                <label><span>Email</span><input name="email" type="email" value={customer.email} onChange={handleChange} placeholder="you@example.com" required /></label>
                <label><span>Address</span><textarea name="address" value={customer.address} onChange={handleChange} placeholder="Delivery address" rows="3" required /></label>
                <button className="checkout-button" type="submit">Place Demo Order</button>
              </form>

              {checkoutMessage && <p className="checkout-message" role="status">{checkoutMessage}</p>}
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;
