function Cart({ cartItems, cartTotal, onUpdateQuantity, onRemove }) {
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

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
                      <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
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
              <button className="checkout-button" type="button">Proceed to Checkout</button>
              <p className="checkout-note">Checkout is a demo feature for this project.</p>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}

export default Cart;