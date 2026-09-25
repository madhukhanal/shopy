import { useState } from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, onAddToCart, stock }) {
  const [added, setAdded] = useState(false);
  const soldOut = stock <= 0;
  const lowStock = stock > 0 && stock <= 2;

  function handleAddToCart() {
    if (soldOut) return;
    onAddToCart(product);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  }

  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        {(soldOut || lowStock) && <span className={`image-badge ${soldOut ? "sold-out-badge" : ""}`}>{soldOut ? "Sold out" : `Only ${stock} left`}</span>}
      </div>
      <div className="product-card-content">
        <span className="product-category">{product.category}</span>
        <h3><Link className="product-name-link" to={`/products/${product.id}`}>{product.name}</Link></h3>
        <p className="product-description">{product.description}</p>
        <div className="product-stock-line">
          <span className={lowStock ? "stock-warning" : soldOut ? "stock-warning" : "stock-note"}>
            {soldOut ? "Currently unavailable" : lowStock ? `Only ${stock} left in stock` : `${stock} available`}
          </span>
        </div>
        <div className="product-card-footer">
          <div className="product-price-block"><strong>${product.price.toFixed(2)}</strong><Link className="view-product-link" to={`/products/${product.id}`}>View details</Link></div>
          <button className={added ? "added-button" : ""} type="button" disabled={soldOut} onClick={handleAddToCart}>
            {soldOut ? "Sold out" : added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
