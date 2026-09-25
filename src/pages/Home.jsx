import { useMemo, useState } from "react";
import products from "../data/products";
import ProductGrid from "../components/ProductGrid";

function Home({ onAddToCart }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);

      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, selectedCategory]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
  }

  return (
    <>
      <section className="hero">
        <div className="container">
          <p className="eyebrow">Simple shopping, made easy</p>
          <h1>Welcome to Shopy</h1>
          <p>Explore our collection of everyday products and find something you&apos;ll love.</p>
        </div>
      </section>

      <section className="products-section">
        <div className="container">
          <div className="section-heading">
            <div><p className="eyebrow">Our collection</p><h2>Products</h2></div>
            <p>Showing {filteredProducts.length} of {products.length}</p>
          </div>

          <div className="filters">
            <label><span>Search products</span>
              <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by product name..." />
            </label>
            <label><span>Category</span>
              <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </label>
            {(searchTerm || selectedCategory !== "All") && (
              <button className="clear-filters" type="button" onClick={clearFilters}>Clear filters</button>
            )}
          </div>

          <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} />
        </div>
      </section>
    </>
  );
}

export default Home;