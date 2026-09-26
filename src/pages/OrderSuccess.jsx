import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

export const OrderSuccess = () => {
  const location = useLocation();
  const orderId = location.state?.orderId;

  if (!orderId) {
    return <Navigate to="/" />;
  }

  return (
    <div className="success-page">
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div className="success-icon">
          <CheckCircle size={64} />
        </div>
        
        <h1 style={{ marginBottom: '16px', fontSize: '2.5rem' }}>Thank you for your order!</h1>
        <p className="text-muted" style={{ fontSize: '1.125rem', marginBottom: '32px' }}>
          Your order <strong>{orderId}</strong> has been placed successfully and is now being processed.
        </p>

        <div className="actions">
          <Link to="/orders" className="btn btn-primary" style={{ marginRight: '16px' }}>View Orders</Link>
          <Link to="/" className="btn btn-outline">Continue Shopping</Link>
        </div>
      </div>
      
      <style>{`
        .success-page {
          padding: 120px 0;
        }
        .success-icon {
          color: var(--color-navy);
          margin-bottom: 32px;
          display: flex;
          justify-content: center;
        }
        .actions {
          display: flex;
          justify-content: center;
          gap: 16px;
        }
        @media (max-width: 600px) {
          .actions {
            flex-direction: column;
          }
          .actions .btn {
            margin-right: 0 !important;
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
