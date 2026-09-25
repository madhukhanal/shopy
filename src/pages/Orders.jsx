import { Link } from "react-router-dom";

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function readOrders() {
  try { return JSON.parse(localStorage.getItem("shopy-orders") || "[]"); } catch { return []; }
}

function Orders() {
  const orders = readOrders();

  return (
    <section className="page-section">
      <div className="container orders-page">
        <div className="section-heading orders-heading"><div><p className="eyebrow">Account</p><h1>Your orders</h1></div><p>{orders.length} order{orders.length === 1 ? "" : "s"}</p></div>
        {orders.length === 0 ? (
          <div className="empty-cart premium-empty"><span className="empty-icon" aria-hidden="true">×</span><p className="eyebrow">Order history</p><h2>No orders yet</h2><p>Orders you place will appear here with their items, total, delivery address and status.</p><Link className="hero-button" to="/#products">Start shopping <span aria-hidden="true">→</span></Link></div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <article className="order-history-card" key={order.id}>
                <div className="order-history-top"><div><span className="product-category">{formatDate(order.createdAt)}</span><h2>{order.id}</h2></div><span className="status-pill">{order.status}</span></div>
                <div className="order-history-items">{order.items.slice(0, 4).map((item) => <div className="history-item" key={item.id}><img src={item.image} alt="" /><span>{item.name} × {item.quantity}</span></div>)}</div>
                <div className="order-history-bottom"><span>{order.items.reduce((sum, item) => sum + item.quantity, 0)} item(s)</span><strong>${order.total.toFixed(2)}</strong><span>Delivery by {formatDate(order.estimatedDelivery)}</span></div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Orders;
