import { Link, useNavigate, useParams } from "react-router-dom";
import products from "../data/products";

function ProductDetails({ inventory, onAddToCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const product = products.find((item) => String(item.id) === productId);
  const stock = product ? inventory?.[product.id] ?? product.stock : 0;

  if (!product) {
    return (
      <section className="page-section">
        <div className="container empty-cart premium-empty">
          <p className="eyebrow">Product</p>
          <h1>Product not found</h1>
          <p>The product you requested is no longer available in this catalog.</p>
          <Link className="hero-button" to="/">Back to shopping <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    );
  }

  const soldOut = stock <= 0;
  const lowStock = stock > 0 && stock <= 2;

  function handleAdd() {
    if (soldOut) return;
    onAddToCart(product);
    navigate("/cart");
  }

  return (
    <section className="page-section product-detail-page">
      <div className="container">
        <Link className="back-link" to="/">← Back to products</Link>
        <div className="product-detail">
          <div className="product-detail-image-wrap">
            <img src={product.image} alt={product.name} />
            {lowStock && <span className="detail-stock-badge">Only {stock} left</span>}
            {soldOut && <span className="detail-stock-badge sold-out">Sold out</span>}
          </div>

          <div className="product-detail-copy">
            <span className="product-category">{product.category}</span>
            <h1>{product.name}</h1>
            <p className="product-detail-price">${product.price.toFixed(2)}</p>
            <p className="product-detail-description">{product.description}</p>

            <div className="detail-points">
              <div><strong>{soldOut ? "Currently unavailable" : lowStock ? `Only ${stock} available` : "In stock"}</strong><span>Live demo inventory</span></div>
              <div><strong>{product.price >= 75 ? "Free shipping" : "Shipping from $6.99"}</strong><span>Calculated at checkout</span></div>
            </div>

            <button className="detail-add-button" type="button" disabled={soldOut} onClick={handleAdd}>
              {soldOut ? "Sold out" : "Add to cart"}
            </button>
            <p className="detail-note">No real payment is processed. This course project demonstrates the complete storefront and order flow.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
