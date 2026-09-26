import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, Home, Package } from 'lucide-react';
import { Logo } from './Logo';
import { useShop } from '../context/ShopContext';

// ─── SearchBar ────────────────────────────────────────────────────────────────
// Self-contained search input with suggestions dropdown.
// Props:
//  - products        array   full product list for suggestions
//  - onSubmit        fn      called with the query string when Enter / suggestion chosen
//  - autoFocus       bool    focus the input on mount
//  - onClose         fn      called when user presses Escape (for mobile overlay)
//  - className       string  wrapper class overrides
const SearchBar = ({ products = [], onSubmit, autoFocus = false, onClose, className = '' }) => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);
  const inputRef = useRef(null);
  const wrapperRef = useRef(null);

  // Auto-focus when mounted (mobile overlay)
  useEffect(() => {
    if (autoFocus && inputRef.current) inputRef.current.focus();
  }, [autoFocus]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Live suggestions — name + description match, max 5
  const suggestions = query.trim().length > 0
    ? products
        .filter(p =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5)
    : [];

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setOpen(false);
      onClose?.();
    }
  };

  const submit = (q) => {
    const trimmed = (q ?? query).trim();
    if (!trimmed) return;
    setOpen(false);
    onSubmit?.(trimmed);
  };

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      {/* Input row */}
      <div className="relative flex items-center">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-gray pointer-events-none z-10" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          placeholder="Search products…"
          autoComplete="off"
          onChange={(e) => { setQuery(e.target.value); setOpen(true); }}
          onFocus={() => { if (query.trim()) setOpen(true); }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') { e.preventDefault(); submit(); }
            handleKeyDown(e);
          }}
          className="w-full pl-9 pr-8 py-2 bg-brand-cream border border-transparent rounded-full text-sm
                     focus:bg-white focus:border-brand-border focus:ring-1 focus:ring-brand-navy
                     outline-none transition-all placeholder:text-brand-gray"
        />
        {/* Clear button — visible only when there's text */}
        {query && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={() => { setQuery(''); setOpen(false); inputRef.current?.focus(); }}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full
                       text-brand-gray hover:text-brand-charcoal hover:bg-brand-border/60
                       transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Suggestions dropdown */}
      {open && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-brand-border
                        rounded-xl shadow-xl overflow-hidden z-[200]">
          {suggestions.map((p) => (
            <button
              key={p.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()} // keep focus on input
              onClick={() => { submit(p.name); }}
              className="flex items-center gap-3 w-full px-3 py-2.5 hover:bg-brand-cream
                         transition-colors text-left group"
            >
              {/* Thumbnail */}
              <div className="w-10 h-10 rounded-md overflow-hidden bg-brand-border/40 flex-shrink-0">
                {p.image
                  ? <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-brand-border/40" />
                }
              </div>
              {/* Name + price */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-brand-charcoal truncate
                              group-hover:text-brand-navy transition-colors">
                  {p.name}
                </p>
                <p className="text-xs text-brand-gray">{p.category} · ${p.price.toFixed(2)}</p>
              </div>
            </button>
          ))}
          {/* "Search for…" footer row */}
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => submit()}
            className="flex items-center gap-2 w-full px-3 py-2.5 border-t border-brand-border
                       text-sm text-brand-gray hover:bg-brand-cream transition-colors"
          >
            <Search size={13} />
            Search for &quot;{query}&quot;
          </button>
        </div>
      )}
    </div>
  );
};

// ─── Header ───────────────────────────────────────────────────────────────────
export const Header = () => {
  const { cartCount, products } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile search on route change
  useEffect(() => {
    setMobileSearchOpen(false);
    setMobileMenuOpen(false);
  }, [location]);

  const handleSearch = useCallback((query) => {
    navigate(`/?q=${encodeURIComponent(query)}`);
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [navigate]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-brand-offwhite transition-shadow duration-300
                   ${scrolled ? 'shadow-sm border-b border-brand-border/50' : ''}`}
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 sm:h-20">

            {/* Left: Logo */}
            <Link
              to="/"
              className="flex flex-col justify-center group flex-shrink-0"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Logo
                className="text-brand-red transition-transform group-hover:scale-105 text-xl sm:text-2xl"
                iconSize={24}
              />
              <span className="text-[10px] sm:text-xs text-brand-gray font-medium tracking-wide hidden sm:block">
                MADE IN NEPAL · 2026
              </span>
            </Link>

            {/* Centre: Desktop SearchBar */}
            <div className="hidden md:flex flex-1 max-w-sm lg:max-w-md mx-6">
              <SearchBar
                products={products}
                onSubmit={handleSearch}
                className="w-full"
              />
            </div>

            {/* Right: Nav links + icons */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Desktop nav links */}
              <nav className="hidden md:flex items-center gap-1 mr-2">
                <Link
                  to="/"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                    ${location.pathname === '/' ? 'text-brand-navy bg-brand-navy/5' : 'text-brand-charcoal hover:bg-black/5'}`}
                >
                  Home
                </Link>
                <Link
                  to="/orders"
                  className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors
                    ${location.pathname === '/orders' ? 'text-brand-navy bg-brand-navy/5' : 'text-brand-charcoal hover:bg-black/5'}`}
                >
                  Orders
                </Link>
              </nav>

              {/* Mobile: Search icon toggle */}
              <button
                className="md:hidden p-2 rounded-full text-brand-charcoal hover:bg-black/5 transition-colors"
                aria-label="Open search"
                onClick={() => setMobileSearchOpen(true)}
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 rounded-full text-brand-charcoal hover:bg-black/5 transition-colors"
                aria-label="Cart"
                onClick={() => setMobileMenuOpen(false)}
              >
                <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-brand-red text-white text-[10px] font-bold
                                   w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-full
                                   border border-brand-offwhite shadow-sm">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 -mr-1 rounded-md text-brand-charcoal hover:bg-black/5 transition-colors"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile Search Overlay ─────────────────────────────────────────────── */}
      {mobileSearchOpen && (
        <div className="fixed inset-0 z-[80] md:hidden flex flex-col">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileSearchOpen(false)}
          />
          {/* Search panel — slides down from top */}
          <div className="relative bg-brand-offwhite shadow-xl px-4 pt-4 pb-5 flex items-center gap-3">
            <SearchBar
              products={products}
              onSubmit={handleSearch}
              autoFocus
              onClose={() => setMobileSearchOpen(false)}
              className="flex-1"
            />
            <button
              aria-label="Close search"
              onClick={() => setMobileSearchOpen(false)}
              className="flex-shrink-0 p-2 rounded-full text-brand-charcoal hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* ── Mobile Drawer Overlay ─────────────────────────────────────────────── */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[60] backdrop-blur-sm md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ── Mobile Drawer ─────────────────────────────────────────────────────── */}
      <div
        className={`fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-brand-offwhite z-[70] shadow-2xl
                    transform transition-transform duration-300 ease-in-out md:hidden flex flex-col
                    ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 sm:p-6 border-b border-brand-border bg-white">
          <span className="font-serif text-xl font-bold">Menu</span>
          <button
            className="p-2 rounded-full bg-brand-cream hover:bg-brand-border text-brand-charcoal transition-colors"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 flex flex-col bg-white overflow-y-auto">
          <Link
            to="/"
            className="flex items-center gap-4 px-6 py-4 border-b border-brand-border hover:bg-brand-cream transition-colors text-brand-charcoal font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Home className="w-5 h-5 text-brand-gray" /> Home
          </Link>
          <Link
            to="/orders"
            className="flex items-center gap-4 px-6 py-4 border-b border-brand-border hover:bg-brand-cream transition-colors text-brand-charcoal font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <Package className="w-5 h-5 text-brand-gray" /> Orders
          </Link>
          <Link
            to="/cart"
            className="flex items-center gap-4 px-6 py-4 border-b border-brand-border hover:bg-brand-cream transition-colors text-brand-charcoal font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="relative">
              <ShoppingCart className="w-5 h-5 text-brand-gray" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-red text-white text-[10px] font-bold
                                 w-4 h-4 flex items-center justify-center rounded-full border border-white">
                  {cartCount}
                </span>
              )}
            </div>
            Cart
          </Link>
        </nav>
      </div>
    </>
  );
};
