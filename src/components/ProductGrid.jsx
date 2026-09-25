import ProductCard from "./ProductCard";

function ProductGrid({ products, onAddToCart, inventory }) {
  if (products.length === 0) {
    return (
      <div className="empty-products">
        <h3>No products found</h3>
        <p>Try changing your search, category, or sort option.</p>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} stock={inventory?.[product.id] ?? product.stock} />
      ))}
    </div>
  );
}
export default ProductGrid;