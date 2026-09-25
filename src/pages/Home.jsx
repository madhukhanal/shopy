import products from "../data/products";
import ProductGrid from "../components/ProductGrid";

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Simple shopping, made easy</p>
          <h1>Welcome to Shopy</h1>
          <p>
            Explore our collection of everyday products and find something
            you&apos;ll love.
          </p>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Our collection</p>
              <h2>Featured Products</h2>
            </div>
            <p>{products.length} products</p>
          </div>

          <ProductGrid products={products} />
        </div>
      </section>
    </>
  );
}

export default Home;
