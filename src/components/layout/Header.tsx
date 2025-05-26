import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Heart, Menu, X, Search } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onCartClick: () => void;
  onAuthClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onAuthClick }) => {
  const { state } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="text-2xl font-bold text-gray-800">
            LuxeMarket
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a
              href="/"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Home
            </a>
            <a
              href="/shop"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Shop
            </a>
            <a
              href="/categories"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Categories
            </a>
            <a
              href="/about"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center space-x-4">
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors hidden md:block"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors hidden md:block"
              aria-label="Wishlist"
            >
              <Heart size={20} />
            </button>
            <button
              className="text-gray-700 hover:text-blue-600 transition-colors relative"
              onClick={onCartClick}
              aria-label="Cart"
            >
              <ShoppingCart size={20} />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {state.items.reduce((total, item) => total + item.quantity, 0)}
                </span>
              )}
            </button>
            {isAuthenticated ? (
              <div className="relative group hidden md:block">
                <button className="text-gray-700 hover:text-blue-600 transition-colors flex items-center">
                  <User size={20} />
                  <span className="ml-2">{user?.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <a href="/account" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    My Account
                  </a>
                  <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Orders
                  </a>
                  <a href="/wishlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Wishlist
                  </a>
                  <button 
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="text-gray-700 hover:text-blue-600 transition-colors hidden md:flex items-center"
              >
                <User size={20} />
                <span className="ml-2">Login</span>
              </button>
            )}

            {/* Mobile menu button */}
            <button
              className="text-gray-700 md:hidden"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-4 py-3 space-y-3">
            <a
              href="/"
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
            >
              Home
            </a>
            <a
              href="/shop"
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
            >
              Shop
            </a>
            <a
              href="/categories"
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
            >
              Categories
            </a>
            <a
              href="/about"
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
            >
              About
            </a>
            <a
              href="/contact"
              className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-200"
            >
              Contact
            </a>
            {isAuthenticated ? (
              <>
                <a href="/account" className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-200">
                  My Account
                </a>
                <a href="/orders" className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-200">
                  Orders
                </a>
                <a href="/wishlist" className="block text-gray-700 hover:text-blue-600 transition-colors py-2 border-b border-gray-200">
                  Wishlist
                </a>
                <button 
                  onClick={logout}
                  className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="block w-full text-left text-gray-700 hover:text-blue-600 transition-colors py-2"
              >
                Login / Register
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;