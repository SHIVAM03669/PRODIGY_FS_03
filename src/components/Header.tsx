import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Search, Menu, X, User, Heart, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { state } = useCart();
  const { state: authState, logout } = useAuth();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 w-full gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 flex-shrink-0">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">LS</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Local Store</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6 ml-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors">Products</Link>
            <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition-colors">Categories</Link>
            <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors">Contact</Link>
            {authState.user?.role === 'admin' && (
              <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors">Admin</Link>
            )}
          </nav>

          {/* Search Bar */}
          <div className="hidden md:flex flex-shrink w-full max-w-xs mx-6">
            <form onSubmit={handleSearch} className="w-full">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
            {/* User Account */}
            {authState.isAuthenticated ? (
              <div className="hidden md:flex items-center space-x-2">
                <span className="text-sm text-gray-700 whitespace-nowrap">Hi, {authState.user?.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Logout</span>
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
                <User className="h-5 w-5" />
                <span className="text-sm">Login</span>
              </Link>
            )}

            {/* Wishlist */}
            <Link to="/wishlist" className="hidden md:flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
              <Heart className="h-5 w-5" />
              <span className="text-sm">Wishlist</span>
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm hidden md:inline">Cart</span>
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-primary-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/products" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Products</Link>
              <Link to="/categories" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Categories</Link>
              <Link to="/about" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              {authState.user?.role === 'admin' && (
                <Link to="/admin" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Admin</Link>
              )}
              {authState.isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-700">Hi, {authState.user?.name}</span>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="flex items-center space-x-1 text-gray-700 hover:text-primary-600 transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              ) : (
                <Link to="/login" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Login</Link>
              )}
              <Link to="/wishlist" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Wishlist</Link>
              <Link to="/cart" className="text-gray-700 hover:text-primary-600 transition-colors" onClick={() => setIsMenuOpen(false)}>Cart</Link>
            </nav>
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mt-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </form>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header; 