import React from 'react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { Package, Truck, CheckCircle } from 'lucide-react';

export const Orders = () => {
  const { orders } = useShop();

  if (orders.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>No orders yet</h2>
        <p className="text-muted" style={{ margin: '16px 0 32px' }}>You haven't placed any orders.</p>
        <Link to="/" className="btn btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="container">
        <h1>Your Orders</h1>
        
        <div className="orders-list">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <div className="order-header">
                <div>
                  <div className="order-id">Order {order.id}</div>
                  <div className="order-date">
                    Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                </div>
                <div className="order-total">${order.total.toFixed(2)}</div>
              </div>

              <div className="order-timeline">
                <div className={`timeline-step ${order.status === 'Processing' ? 'active' : 'completed'}`}>
                  <div className="step-icon"><Package size={16} /></div>
                  <span>Processing</span>
                </div>
                <div className="timeline-step">
                  <div className="step-icon"><Truck size={16} /></div>
                  <span>Shipped</span>
                </div>
                <div className="timeline-step">
                  <div className="step-icon"><CheckCircle size={16} /></div>
                  <span>Delivered</span>
                </div>
              </div>
              <div className="delivery-estimate">
                Estimated Delivery: {new Date(order.deliveryEstimate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>

              <div className="order-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="order-item">
                    <img src={item.image} alt={item.name} className="item-img" />
                    <div className="item-info">
                      <Link to={`/products/${item.id}`} className="item-name">{item.name}</Link>
                      <div className="item-meta">
                        Qty: {item.quantity} × ${item.price.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .orders-page {
          padding: 40px 0 80px;
        }
        .orders-page h1 {
          font-size: 2.5rem;
          margin-bottom: 48px;
        }
        .orders-list {
          display: flex;
          flex-direction: column;
          gap: 32px;
          max-width: 800px;
          margin: 0 auto;
        }
        .order-card {
          background-color: var(--color-offwhite);
          border: 1px solid var(--color-border);
          border-radius: 8px;
          padding: 32px;
        }
        .order-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 32px;
          padding-bottom: 24px;
          border-bottom: 1px solid var(--color-border);
        }
        .order-id {
          font-weight: 600;
          font-size: 1.125rem;
          margin-bottom: 4px;
        }
        .order-date {
          color: var(--color-gray);
          font-size: 0.875rem;
        }
        .order-total {
          font-weight: 600;
          font-size: 1.25rem;
        }

        .order-timeline {
          display: flex;
          justify-content: space-between;
          position: relative;
          margin-bottom: 16px;
        }
        .order-timeline::before {
          content: '';
          position: absolute;
          top: 16px;
          left: 32px;
          right: 32px;
          height: 2px;
          background-color: var(--color-border);
          z-index: 1;
        }
        .timeline-step {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          position: relative;
          z-index: 2;
          color: var(--color-gray);
          font-size: 0.875rem;
        }
        .step-icon {
          width: 32px;
          height: 32px;
          background-color: var(--color-offwhite);
          border: 2px solid var(--color-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .timeline-step.active {
          color: var(--color-charcoal);
          font-weight: 600;
        }
        .timeline-step.active .step-icon {
          border-color: var(--color-navy);
          color: var(--color-navy);
        }
        .timeline-step.completed .step-icon {
          background-color: var(--color-navy);
          border-color: var(--color-navy);
          color: white;
        }

        .delivery-estimate {
          text-align: center;
          color: var(--color-gray);
          font-size: 0.875rem;
          margin-bottom: 32px;
          font-weight: 600;
        }

        .order-items {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .order-item {
          display: flex;
          gap: 16px;
          align-items: center;
        }
        .item-img {
          width: 64px;
          height: 64px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid var(--color-border);
        }
        .item-info {
          flex: 1;
        }
        .item-name {
          font-weight: 600;
          display: block;
          margin-bottom: 4px;
        }
        .item-meta {
          color: var(--color-gray);
          font-size: 0.875rem;
        }

        @media (max-width: 600px) {
          .order-card {
            padding: 24px 16px;
          }
          .order-timeline::before {
            left: 16px;
            right: 16px;
          }
        }
      `}</style>
    </div>
  );
};
