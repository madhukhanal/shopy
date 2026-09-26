import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { SlidersHorizontal, X, ChevronDown, ChevronUp, Check, Filter, ShoppingCart, Hammer, Tag, Sparkles } from 'lucide-react';
import headphonesImg from '../assets/products/wireless_headphones.jpg';
import watchImg from '../assets/products/smart_watch.jpg';

const CATEGORIES = ['Clothing', 'Accessories', 'Electronics', 'Home', 'Footwear'];

const PRICE_RANGES = [
  { id: 'all', label: 'All Prices' },
  { id: 'under50', label: 'Under $50', check: p => p.price < 50 },
  { id: '50to150', label: '$50 - $150', check: p => p.price >= 50 && p.price <= 150 },
  { id: 'over150', label: 'Over $150', check: p => p.price > 150 }
];

export const Home = () => {
  const { products, addToCart } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();
  const collectionRef = useRef(null);
  
  // State for filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [activeCategories, setActiveCategories] = useState(
    searchParams.get('category') ? [searchParams.get('category')] : []
  );
  const [priceFilter, setPriceFilter] = useState('all');
  const [availability, setAvailability] = useState('all'); // all, instock, outofstock
  const [sortBy, setSortBy] = useState('featured');

  // UI state
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    availability: true
  });

  useEffect(() => {
    setSearchQuery(searchParams.get('q') || '');

    // Scroll to the collection section whenever a search query is applied,
    // offsetting by the sticky navbar height (80px) so results aren't hidden.
    if (searchParams.get('q') && collectionRef.current) {
      const NAVBAR_HEIGHT = 80;
      const top = collectionRef.current.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [searchParams]);



  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleCategory = (cat) => {
    setActiveCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const clearFilters = () => {
    setActiveCategories([]);
    setPriceFilter('all');
    setAvailability('all');
    if (searchQuery) {
      setSearchParams({});
      setSearchQuery('');
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products;

    if (searchQuery) {
      result = result.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (activeCategories.length > 0) {
      result = result.filter(p => activeCategories.includes(p.category));
    }

    if (priceFilter !== 'all') {
      const range = PRICE_RANGES.find(r => r.id === priceFilter);
      if (range && range.check) result = result.filter(range.check);
    }

    if (availability === 'instock') result = result.filter(p => p.stock > 0);
    else if (availability === 'outofstock') result = result.filter(p => p.stock === 0);

    if (sortBy === 'price-asc') result = [...result].sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') result = [...result].sort((a, b) => b.price - a.price);
    else if (sortBy === 'name-asc') result = [...result].sort((a, b) => a.name.localeCompare(b.name));

    return result;
  }, [products, searchQuery, activeCategories, priceFilter, availability, sortBy]);

  const hasActiveFilters = activeCategories.length > 0 || priceFilter !== 'all' || availability !== 'all' || searchQuery;

  const removeCategory = (cat) => {
    setActiveCategories(prev => prev.filter(c => c !== cat));
  };

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Categories */}
      <div className="border-b border-brand-border pb-8">
        <button 
          className="flex items-center justify-between w-full font-sans font-semibold text-lg mb-4"
          onClick={() => toggleSection('categories')}
        >
          Categories
          {expandedSections.categories ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.categories && (
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => {
              const isActive = activeCategories.includes(cat);
              return (
                <button
                  key={cat}
                  onClick={() => toggleCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors border ${
                    isActive 
                      ? 'bg-brand-charcoal text-white border-brand-charcoal' 
                      : 'bg-brand-offwhite text-brand-charcoal border-brand-border hover:border-brand-gray'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Price */}
      <div className="border-b border-brand-border pb-8">
        <button 
          className="flex items-center justify-between w-full font-sans font-semibold text-lg mb-4"
          onClick={() => toggleSection('price')}
        >
          Price
          {expandedSections.price ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.price && (
          <div className="grid grid-cols-1 gap-2">
            {PRICE_RANGES.map(range => {
              const isActive = priceFilter === range.id;
              return (
                <button
                  key={range.id}
                  onClick={() => setPriceFilter(range.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                    isActive 
                      ? 'border-brand-navy bg-brand-navy/5 text-brand-navy' 
                      : 'border-brand-border bg-white text-brand-charcoal hover:border-brand-gray'
                  }`}
                >
                  <span className="font-medium text-sm">{range.label}</span>
                  {isActive && <Check size={16} />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <button 
          className="flex items-center justify-between w-full font-sans font-semibold text-lg mb-4"
          onClick={() => toggleSection('availability')}
        >
          Availability
          {expandedSections.availability ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        {expandedSections.availability && (
          <div className="flex bg-brand-border/30 p-1 rounded-lg">
            {['all', 'instock', 'outofstock'].map(type => {
              const labels = { all: 'All', instock: 'In Stock', outofstock: 'Out of Stock' };
              const isActive = availability === type;
              return (
                <button
                  key={type}
                  onClick={() => setAvailability(type)}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    isActive 
                      ? 'bg-white shadow-sm text-brand-navy' 
                      : 'text-brand-gray hover:text-brand-charcoal'
                  }`}
                >
                  {labels[type]}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div>
      {/* Hero */}
      <section className="bg-brand-navy text-brand-offwhite py-10 lg:py-16 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            <div className="max-w-xl">
              <span className="inline-block text-brand-gold font-sans font-semibold tracking-widest text-xs uppercase mb-3">
                Made in Nepal · 2026
              </span>
              <h1 className="text-4xl md:text-5xl leading-[1.1] mb-4 font-serif text-white">
                Useful things,<br />made here.
              </h1>
              <p className="text-lg md:text-xl text-white/80 mb-6 font-sans font-light leading-relaxed max-w-md">
                A small collection of useful pieces for home, work, and the everyday in between — chosen close to home.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="#collection" className="btn bg-brand-offwhite text-brand-navy hover:bg-brand-cream text-base px-6 py-3 shadow-lg shadow-black/10">
                  Shop the Collection
                </a>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-2 sm:gap-3 text-xs sm:text-sm text-white/60 font-medium tracking-wide">
                <span>100% Designed locally</span>
                <span className="text-brand-gold">&middot;</span>
                <span>24h Fast dispatch</span>
                <span className="text-brand-gold">&middot;</span>
                <span>30d Easy Returns</span>
              </div>
            </div>
            
            <div className="hidden lg:block relative h-[400px] w-full">
              <img 
                src={headphonesImg} 
                alt="Wireless Headphones" 
                className="absolute top-0 right-0 w-3/4 h-[280px] object-cover rounded-2xl shadow-2xl z-20 border-4 border-brand-navy"
              />
              <img 
                src={watchImg} 
                alt="Smart Watch" 
                className="absolute bottom-0 left-0 w-2/3 h-[240px] object-cover rounded-2xl shadow-xl z-10 border-4 border-brand-navy"
              />
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-brand-red/10 rounded-full blur-3xl mix-blend-screen"></div>
      </section>



      {/* Collection */}
      <section id="collection" ref={collectionRef} className="bg-brand-offwhite py-24 min-h-screen" style={{ scrollMarginTop: '80px' }}>
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-brand-gold font-bold uppercase tracking-wider text-sm mb-2 block">The Collection</span>
              <h2 className="text-4xl lg:text-5xl font-serif text-brand-charcoal">Shop our goods</h2>
            </div>
            
            <div className="flex items-center gap-4">
              <button 
                className="lg:hidden flex items-center gap-2 px-4 py-2 border border-brand-border rounded-lg bg-white shadow-sm font-medium"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <Filter size={18} /> Filters
              </button>
              
              <div className="relative">
                <select 
                  className="appearance-none pl-4 pr-10 py-2.5 border border-brand-border rounded-lg bg-white focus:outline-none focus:border-brand-navy focus:ring-1 focus:ring-brand-navy shadow-sm cursor-pointer font-medium"
                  value={sortBy}
                  onChange={e => setSortBy(e.target.value)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Active Filters Bar */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-6 p-3 sm:p-4 bg-brand-cream border border-brand-border rounded-lg">
              <span className="text-xs sm:text-sm font-medium text-brand-gray mr-1">Active:</span>
              
              {searchQuery && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-brand-border rounded-full text-xs sm:text-sm shadow-sm">
                  Search: {searchQuery}
                  <button onClick={() => { setSearchParams({}); setSearchQuery(''); }} className="p-0.5 hover:bg-brand-cream rounded-full"><X size={12} /></button>
                </span>
              )}
              
              {activeCategories.map(cat => (
                <span key={cat} className="flex items-center gap-1 px-2.5 py-1 bg-white border border-brand-border rounded-full text-xs sm:text-sm shadow-sm">
                  {cat}
                  <button onClick={() => removeCategory(cat)} className="p-0.5 hover:bg-brand-cream rounded-full"><X size={12} /></button>
                </span>
              ))}

              {priceFilter !== 'all' && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-brand-border rounded-full text-xs sm:text-sm shadow-sm">
                  {PRICE_RANGES.find(r => r.id === priceFilter)?.label}
                  <button onClick={() => setPriceFilter('all')} className="p-0.5 hover:bg-brand-cream rounded-full"><X size={12} /></button>
                </span>
              )}

              {availability !== 'all' && (
                <span className="flex items-center gap-1 px-2.5 py-1 bg-white border border-brand-border rounded-full text-xs sm:text-sm shadow-sm">
                  {availability === 'instock' ? 'In Stock' : 'Out of Stock'}
                  <button onClick={() => setAvailability('all')} className="p-0.5 hover:bg-brand-cream rounded-full"><X size={12} /></button>
                </span>
              )}

              <button onClick={clearFilters} className="text-xs sm:text-sm text-brand-red font-medium hover:underline ml-auto">
                Clear all
              </button>
            </div>
          )}

          <div className="grid lg:grid-cols-[240px_1fr] gap-8 lg:gap-12 items-start">
            {/* Desktop Filters */}
            <aside className="hidden lg:block sticky top-24">
              <div className="flex items-center gap-2 mb-6 text-brand-charcoal font-serif text-xl">
                <SlidersHorizontal size={20} /> Filters
              </div>
              <FilterContent />
            </aside>

            {/* Product Grid */}
            <div className="w-full flex flex-col">
              <div className="mb-4 text-xs sm:text-sm text-brand-gray font-medium">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
              </div>
              
              {filteredProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center text-center py-16 px-4 bg-brand-cream border border-brand-border rounded-xl">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm border border-brand-border">
                    <Filter className="w-6 h-6 text-brand-gray" />
                  </div>
                  {searchQuery ? (
                    <>
                      <h3 className="text-xl font-serif mb-2">No results for &ldquo;{searchQuery}&rdquo;</h3>
                      <p className="text-sm text-brand-gray mb-6 max-w-sm">Check the spelling or try a different term.</p>
                      <button
                        className="btn btn-outline bg-white py-2 text-sm"
                        onClick={() => { setSearchParams({}); setSearchQuery(''); }}
                      >
                        Clear search
                      </button>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-serif mb-2">No products found</h3>
                      <p className="text-sm text-brand-gray mb-6 max-w-sm">Try adjusting your filters to find what you&apos;re looking for.</p>
                      <button className="btn btn-outline bg-white py-2 text-sm" onClick={clearFilters}>Clear all filters</button>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <div className={`grid grid-cols-2 gap-3 sm:gap-6 mx-auto ${
                    filteredProducts.length <= 2 ? 'max-w-xl'
                    : filteredProducts.length === 3 ? 'md:grid-cols-3 max-w-4xl'
                    : filteredProducts.length === 4 ? 'md:grid-cols-2 lg:grid-cols-2 max-w-2xl'
                    : 'md:grid-cols-3 lg:grid-cols-4'
                  }`}>
                    {filteredProducts.map(product => (
                      <div key={product.id} className="group flex flex-col">
                        <div className="relative aspect-square bg-brand-cream rounded-lg overflow-hidden border border-brand-border shadow-sm mb-2 sm:mb-3">
                          <Link to={`/products/${product.id}`} className="block w-full h-full bg-brand-cream relative">
                            {/* FLAG: Products missing a real photo will fallback to this neutral block automatically */}
                            {product.image ? (
                              <img 
                                src={product.image} 
                                alt={product.name} 
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                                onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.nextElementSibling.style.display = 'flex'; }}
                              />
                            ) : null}
                            <div 
                              className="absolute inset-0 bg-brand-border/40" 
                              style={{ display: product.image ? 'none' : 'block' }}
                            />
                          </Link>
                          
                          {/* Badges */}
                          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
                            {product.stock === 0 ? (
                              <div className="px-2 py-0.5 bg-white/95 backdrop-blur-sm text-brand-charcoal border border-brand-border rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-red flex-shrink-0"></span>
                                Sold out
                              </div>
                            ) : (
                              product.stock <= 2 && (
                                <div className="px-2 py-0.5 bg-white/95 backdrop-blur-sm text-brand-charcoal border border-brand-border rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0"></span>
                                  Low stock
                                </div>
                              )
                            )}
                          </div>

                          {/* Desktop Full-width Add Button Overlay */}
                          <button 
                            className="hidden lg:flex absolute bottom-0 left-0 right-0 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 bg-brand-navy/90 text-white backdrop-blur-sm py-3 text-sm shadow-md items-center justify-center gap-2 hover:bg-brand-navy"
                            disabled={product.stock === 0}
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product.id, 1);
                            }}
                          >
                            <ShoppingCart size={16} /> {product.stock === 0 ? 'Sold Out' : 'Add to Cart'}
                          </button>

                          {/* Mobile/Tablet Fixed Round FAB Button */}
                          <button
                            className="lg:hidden absolute bottom-2 right-2 w-9 h-9 bg-brand-red text-white rounded-full shadow-md flex items-center justify-center hover:scale-105 transition-transform disabled:opacity-50 disabled:bg-brand-gray"
                            disabled={product.stock === 0}
                            onClick={(e) => {
                              e.preventDefault();
                              addToCart(product.id, 1);
                            }}
                            aria-label="Add to cart"
                          >
                            <ShoppingCart size={16} />
                          </button>
                        </div>
                        
                        <div className="flex flex-col flex-1 px-1">
                          <span className="text-[10px] sm:text-xs text-brand-gray uppercase tracking-widest font-bold mb-0.5">
                            {product.category}
                          </span>
                          <Link to={`/products/${product.id}`}>
                            <h3 className="text-sm sm:text-base font-medium text-brand-charcoal mb-0.5 truncate group-hover:text-brand-red transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                          <div className="text-sm sm:text-base font-bold text-brand-navy">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>


                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Mobile Filters Drawer */}
      {mobileFiltersOpen && (
        <div 
          className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm lg:hidden"
          onClick={() => setMobileFiltersOpen(false)}
        />
      )}
      
      <div className={`fixed inset-y-0 left-0 w-[85vw] max-w-[360px] bg-brand-offwhite shadow-2xl z-[70] transform transition-transform duration-300 flex flex-col lg:hidden ${mobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between p-6 border-b border-brand-border bg-white">
          <h2 className="font-serif text-2xl font-medium">Filters</h2>
          <button 
            className="p-2 bg-brand-cream hover:bg-brand-border rounded-full transition-colors"
            onClick={() => setMobileFiltersOpen(false)}
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <FilterContent />
        </div>

        <div className="p-6 border-t border-brand-border bg-white flex gap-4">
          <button 
            className="flex-1 btn btn-outline"
            onClick={() => {
              clearFilters();
              setMobileFiltersOpen(false);
            }}
          >
            Clear all
          </button>
          <button 
            className="flex-1 btn btn-primary"
            onClick={() => setMobileFiltersOpen(false)}
          >
            Show results
          </button>
        </div>
      </div>
    </div>
  );
};
