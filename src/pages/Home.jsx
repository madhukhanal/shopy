import { useMemo, useState } from "react";
import products from "../data/products";
import ProductGrid from "../components/ProductGrid";

function Home({ onAddToCart, inventory }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOption, setSortOption] = useState("default");
  const [priceRange, setPriceRange] = useState("all");
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  const categories = ["All", ...new Set(products.map((product) => product.category))];

  const filteredProducts = useMemo(() => {
    const search = searchTerm.trim().toLowerCase();

    const matchingProducts = products.filter((product) => {
      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
      const matchesSearch =
        !search ||
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search);
      const matchesPrice =
        priceRange === "all" ||
        (priceRange === "under-25" && product.price < 25) ||
        (priceRange === "25-75" && product.price >= 25 && product.price <= 75) ||
        (priceRange === "over-75" && product.price > 75);
      const stock = inventory[product.id] ?? product.stock;
      const matchesAvailability =
        availabilityFilter === "all" ||
        (availabilityFilter === "in-stock" && stock > 0) ||
        (availabilityFilter === "low-stock" && stock > 0 && stock <= 3) ||
        (availabilityFilter === "sold-out" && stock === 0);

      return matchesCategory && matchesSearch && matchesPrice && matchesAvailability;
    });

    return [...matchingProducts].sort((a, b) => {
      if (sortOption === "name-asc") return a.name.localeCompare(b.name);
      if (sortOption === "price-low") return a.price - b.price;
      if (sortOption === "price-high") return b.price - a.price;
      return 0;
    });
  }, [searchTerm, selectedCategory, sortOption, priceRange, availabilityFilter, inventory]);

  function clearFilters() {
    setSearchTerm("");
    setSelectedCategory("All");
    setSortOption("default");
    setPriceRange("all");
    setAvailabilityFilter("all");
  }

  const activeFilterCount = [
    selectedCategory !== "All",
    priceRange !== "all",
    availabilityFilter !== "all",
    sortOption !== "default",
    Boolean(searchTerm),
  ].filter(Boolean).length;
  const hasActiveFilters = activeFilterCount > 0;

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <div className="hero-copy">
            <p className="eyebrow">Curated for everyday living</p>
            <h1>Find things you&apos;ll love.</h1>
            <p className="hero-description">
              A small, useful collection for everyday life — with clear prices, live stock, and a simple checkout.
            </p>
            <a className="hero-button" href="#products">Shop now <span aria-hidden="true">→</span></a>
            <div className="hero-trust">
              <span><strong>{products.length}</strong> products</span>
              <span><strong>Free</strong> local demo</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Featured Shopy products">
            <div className="hero-card hero-card-main">
              <img src={products[2].image} alt="Wireless headphones" />
              <div><span>Featured</span><strong>Wireless Headphones</strong></div>
            </div>
            <div className="hero-card hero-card-small">
              <img src={products[6].image} alt="Smart watch" />
              <div><span>New</span><strong>Smart Watch</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="value-strip" aria-label="Shopy benefits">
        <div className="container value-grid">
          <div><span className="value-icon">01</span><div><strong>Curated selection</strong><p>Useful products, not endless clutter.</p></div></div>
          <div><span className="value-icon">02</span><div><strong>Simple checkout</strong><p>A focused cart and clear order summary.</p></div></div>
          <div><span className="value-icon">03</span><div><strong>Built for any screen</strong><p>A polished experience from desktop to mobile.</p></div></div>
        </div>
      </section>

      <section className="products-section" id="products" aria-labelledby="products-heading">
        <div className="container">
          <div className="section-heading products-heading">
            <div>
              <p className="eyebrow">The collection</p>
              <h2 id="products-heading">Shop everyday favorites</h2>
            </div>
            <p className="results-count" aria-live="polite">Showing <strong>{filteredProducts.length}</strong> of {products.length}</p>
          </div>

          <div className="filters-panel">
            <div className="filter-top-row">
              <label className="search-field">
                <span>Search products</span>
                <div className="input-shell">
                  <span className="field-icon" aria-hidden="true">⌕</span>
                  <input type="search" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search by name or description..." />
                  {searchTerm && <button type="button" className="clear-search" onClick={() => setSearchTerm("")} aria-label="Clear search">×</button>}
                </div>
              </label>

              <label>
                <span>Price</span>
                <select value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                  <option value="all">Any price</option>
                  <option value="under-25">Under $25</option>
                  <option value="25-75">$25 – $75</option>
                  <option value="over-75">Over $75</option>
                </select>
              </label>

              <label>
                <span>Availability</span>
                <select value={availabilityFilter} onChange={(e) => setAvailabilityFilter(e.target.value)}>
                  <option value="all">All products</option>
                  <option value="in-stock">In stock</option>
                  <option value="low-stock">Low stock</option>
                  <option value="sold-out">Sold out</option>
                </select>
              </label>

              <label>
                <span>Sort by</span>
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                  <option value="default">Featured</option>
                  <option value="name-asc">Name: A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </label>

              <button className="filter-clear-button" type="button" onClick={clearFilters} disabled={!hasActiveFilters}>
                Clear <span>{activeFilterCount}</span>
              </button>
            </div>

            <div className="category-filter" aria-label="Filter by category">
              <span className="filter-label">Category</span>
              <div className="category-pills">
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={selectedCategory === category ? "category-pill active" : "category-pill"}
                    onClick={() => setSelectedCategory(category)}
                    aria-pressed={selectedCategory === category}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {hasActiveFilters && (
              <div className="active-filters" aria-label="Active filters">
                <span>Active filters</span>
                {searchTerm && <button type="button" onClick={() => setSearchTerm("")}>Search: {searchTerm} ×</button>}
                {selectedCategory !== "All" && <button type="button" onClick={() => setSelectedCategory("All")}>{selectedCategory} ×</button>}
                {priceRange !== "all" && <button type="button" onClick={() => setPriceRange("all")}>{priceRange === "under-25" ? "Under $25" : priceRange === "25-75" ? "$25 – $75" : "Over $75"} ×</button>}
                {availabilityFilter !== "all" && <button type="button" onClick={() => setAvailabilityFilter("all")}>{availabilityFilter === "in-stock" ? "In stock" : availabilityFilter === "low-stock" ? "Low stock" : "Sold out"} ×</button>}
              </div>
            )}
          </div>

          <ProductGrid products={filteredProducts} onAddToCart={onAddToCart} inventory={inventory} />
        </div>
      </section>
    </>
  );
}

export default Home;
