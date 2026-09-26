import React from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { ArrowRight } from 'lucide-react';

const Instagram = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
);
const Twitter = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
);
const Facebook = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

export const Footer = () => {
  return (
    <footer className="bg-brand-offwhite border-t border-brand-border pt-10 pb-6">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-10 mb-8">
          
          {/* Brand Col */}
          <div className="col-span-2 lg:col-span-1 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 mb-3 group">
              <Logo
                className="text-brand-red transition-transform group-hover:scale-105 text-2xl"
                iconSize={28}
              />
            </Link>
            <p className="text-sm text-brand-gray leading-relaxed mb-4">
              A curated collection of useful goods for the everyday, proudly rooted in Nepal.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="p-1.5 rounded-full bg-brand-cream text-brand-charcoal hover:bg-brand-navy hover:text-white transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="p-1.5 rounded-full bg-brand-cream text-brand-charcoal hover:bg-brand-navy hover:text-white transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Twitter" className="p-1.5 rounded-full bg-brand-cream text-brand-charcoal hover:bg-brand-navy hover:text-white transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="col-span-1">
            <h3 className="font-sans font-semibold text-base mb-4 tracking-wide">Shop</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/?category=Clothing" className="text-brand-gray hover:text-brand-navy transition-colors">Clothing</Link></li>
              <li><Link to="/?category=Accessories" className="text-brand-gray hover:text-brand-navy transition-colors">Accessories</Link></li>
              <li><Link to="/?category=Home" className="text-brand-gray hover:text-brand-navy transition-colors">Home Goods</Link></li>
              <li><Link to="/?category=Electronics" className="text-brand-gray hover:text-brand-navy transition-colors">Electronics</Link></li>
              <li><Link to="/?category=Footwear" className="text-brand-gray hover:text-brand-navy transition-colors">Footwear</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="font-sans font-semibold text-base mb-4 tracking-wide">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="text-brand-gray hover:text-brand-navy transition-colors">Our Story</Link></li>
              <li><Link to="/contact" className="text-brand-gray hover:text-brand-navy transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="text-brand-gray hover:text-brand-navy transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-brand-gray hover:text-brand-navy transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/terms" className="text-brand-gray hover:text-brand-navy transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="font-sans font-semibold text-base mb-3 tracking-wide">Stay in touch</h3>
            <p className="text-sm text-brand-gray mb-3">
              Join our mailing list for updates on new arrivals and offers.
            </p>
            <form className="relative group" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Email address" 
                className="w-full pl-3 pr-10 py-2 bg-brand-cream border border-transparent rounded-lg text-sm focus:bg-white focus:border-brand-navy focus:ring-1 focus:ring-brand-navy outline-none transition-all"
                required
              />
              <button 
                type="submit" 
                className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 bg-brand-navy text-white rounded-md hover:bg-brand-red transition-colors"
                aria-label="Subscribe"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
          
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-brand-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-brand-gray text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Shopy. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs sm:text-sm">
            <Link to="/privacy" className="text-brand-gray hover:text-brand-navy transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-brand-gray hover:text-brand-navy transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
