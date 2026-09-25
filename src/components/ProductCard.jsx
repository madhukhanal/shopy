function ProductCard({ product, onAddToCart }) {
  return (
    <article className="product-card">
      <img className="product-image" src={product.image} alt={product.name} />
      <div className="product-card-content">
        <span className="product-category">{product.category}</span>
        <h3>{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-card-footer">
          <strong>${product.price.toFixed(2)}</strong>
          <button type="button" onClick={() => onAddToCart(product)}>Add to Cart</button>
        </div>
      </div>
    </article>
  );
}
export default ProductCard;