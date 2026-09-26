import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowLeft, Truck, Package, RotateCcw } from 'lucide-react';

export const ProductDetails = () => {
  const { productId } = useParams();
  const { products, addToCart } = useShop();
  const [quantity, setQuantity] = useState(1);

  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/" className="btn btn-outline" style={{ marginTop: '24px' }}>Return home</Link>
      </div>
    );
  }

  const handleAdd = () => {
    addToCart(product.id, quantity);
    // Could add a toast notification here
  };

  const getStockText = (stock) => {
    if (stock === 0) return "Sold out";
    if (stock <= 2) return `Only ${stock} left in stock`;
    return "In stock";
  };

  return (
    <div className="product-page">
      <div className="container">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Back to products
        </Link>
        
        <div className="product-layout">
          <div className="product-image-container relative">
            {product.image ? (
              <img src={product.image} alt={product.name} className="main-image" />
            ) : (
              <div className="main-image bg-brand-border/40" style={{ aspectRatio: '1/1' }}></div>
            )}
          </div>
          
          <div className="product-details">
            <div className="meta">
              <span className="category">{product.category}</span>
              <span className={`stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>{getStockText(product.stock)}</span>
            </div>
            
            <h1 className="title">{product.name}</h1>
            <div className="price">${product.price.toFixed(2)}</div>
            
            <p className="description">{product.description}</p>
            
            <div className="actions">
              {product.stock > 0 && (
                <div className="quantity-selector">
                  <button 
                    className="qty-btn" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >-</button>
                  <span className="qty-val">{quantity}</span>
                  <button 
                    className="qty-btn" 
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  >+</button>
                </div>
              )}
              <button 
                className="btn btn-primary add-btn"
                disabled={product.stock === 0}
                onClick={handleAdd}
              >
                {product.stock === 0 ? 'Sold out' : 'Add to cart'}
              </button>
            </div>

            <div className="shipping-info">
              <div className="info-item">
                <Truck size={20} className="info-icon" />
                <div>
                  <strong>Free shipping</strong>
                  <p>On orders over $100.</p>
                </div>
              </div>
              <div className="info-item">
                <Package size={20} className="info-icon" />
                <div>
                  <strong>Local delivery</strong>
                  <p>2-3 business days within Nepal.</p>
                </div>
              </div>
              <div className="info-item">
                <RotateCcw size={20} className="info-icon" />
                <div>
                  <strong>Simple returns</strong>
                  <p>14-day return policy.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .product-page {
          padding: 40px 0 80px;
        }
        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: var(--color-gray);
          margin-bottom: 32px;
          transition: color 0.2s;
        }
        .back-link:hover {
          color: var(--color-charcoal);
        }
        .product-layout {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        .product-image-container {
          background-color: var(--color-offwhite);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        .main-image {
          width: 100%;
          height: auto;
          display: block;
        }
        .meta {
          display: flex;
          justify-content: space-between;
          margin-bottom: 16px;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .category {
          color: var(--color-gray);
        }
        .stock {
          color: var(--color-charcoal);
          font-weight: 600;
        }
        .out-of-stock {
          color: var(--color-red);
        }
        .title {
          font-size: 3rem;
          margin-bottom: 16px;
          line-height: 1.1;
        }
        .price {
          font-size: 1.5rem;
          font-weight: 600;
          margin-bottom: 32px;
        }
        .description {
          font-size: 1.125rem;
          line-height: 1.6;
          color: var(--color-gray);
          margin-bottom: 48px;
        }
        .actions {
          display: flex;
          gap: 16px;
          margin-bottom: 48px;
        }
        .quantity-selector {
          display: flex;
          align-items: center;
          border: 1px solid var(--color-border);
          border-radius: 4px;
          background-color: var(--color-offwhite);
        }
        .qty-btn {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          color: var(--color-gray);
          transition: background-color 0.2s;
        }
        .qty-btn:hover {
          background-color: var(--color-cream);
        }
        .qty-val {
          width: 48px;
          text-align: center;
          font-weight: 600;
        }
        .add-btn {
          flex: 1;
          height: 48px;
          font-size: 1.125rem;
        }
        .shipping-info {
          border-top: 1px solid var(--color-border);
          padding-top: 32px;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .info-item {
          display: flex;
          gap: 16px;
          align-items: flex-start;
        }
        .info-icon {
          color: var(--color-gold);
          flex-shrink: 0;
        }
        .info-item strong {
          display: block;
          margin-bottom: 4px;
        }
        .info-item p {
          color: var(--color-gray);
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .product-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .title {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </div>
  );
};
