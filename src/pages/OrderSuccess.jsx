import { Link, useSearchParams } from "react-router-dom";

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function OrderSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order");
  let order = null;

  try {
    const orders = JSON.parse(localStorage.getItem("shopy-orders") || "[]");
    order = orders.find((item) => item.id === orderId) || orders[0];
  } catch {
    order = null;
  }

  if (!order) {
    return (
      <section className="page-section"><div className="container"><div className="empty-cart premium-empty">
        <p className="eyebrow">Order center</p><h1>No order found</h1><p>Your order details are not available in this browser session.</p>
        <Link className="hero-button" to="/">Back to shopping <span aria-hidden="true">→</span></Link>
      </div></div></section>
    );
  }

  return (
    <section className="page-section">
      <div className="container order-success-page">
        <div className="order-success-hero">
          <div className="success-check" aria-hidden="true">✓</div>
          <p className="eyebrow">Order confirmed</p>
          <h1>Thanks, {order.customer.name}.</h1>
          <p>Your order has been placed successfully and your cart has been cleared.</p>
          <div className="order-meta"><span>Order <strong>{order.id}</strong></span><span>Placed {formatDate(order.createdAt)}</span></div>
        </div>

        <div className="order-detail-grid">
          <section className="order-card">
            <div className="order-card-heading"><div><p className="eyebrow">Delivery</p><h2>Order status</h2></div><span className="status-pill">Order placed</span></div>
            <div className="status-timeline">
              <div className="status-step current"><span>✓</span><div><strong>Order placed</strong><small>Your order has been received.</small></div></div>
              <div className="status-step"><span>2</span><div><strong>Preparing</strong><small>Items will be prepared for dispatch.</small></div></div>
              <div className="status-step"><span>3</span><div><strong>Out for delivery</strong><small>Estimated delivery: {formatDate(order.estimatedDelivery)}</small></div></div>
            </div>
            <div className="delivery-box"><span>Delivering to</span><strong>{order.customer.address}</strong></div>
          </section>

          <section className="order-card">
            <div className="order-card-heading"><div><p className="eyebrow">What you bought</p><h2>Items</h2></div><span>{order.items.length} product{order.items.length === 1 ? "" : "s"}</span></div>
            <div className="ordered-items">
              {order.items.map((item) => <div className="ordered-item" key={item.id}><img src={item.image} alt={item.name} /><div><strong>{item.name}</strong><span>Qty {item.quantity} · ${item.price.toFixed(2)}</span></div><b>${(item.price * item.quantity).toFixed(2)}</b></div>)}
            </div>
            <div className="order-total-row"><span>Total</span><strong>${order.total.toFixed(2)}</strong></div>
          </section>
        </div>

        <div className="order-actions"><Link className="hero-button" to="/">Continue shopping <span aria-hidden="true">→</span></Link><Link className="secondary-button" to="/orders">View all orders</Link></div>
      </div>
    </section>
  );
}

export default OrderSuccess;
