import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import ProductGrid from './components/ProductGrid';
import { products } from './data/products';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Search from './pages/Search';
import Categories from './pages/Categories';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import OrderTracking from './pages/OrderTracking';
import Contact from './pages/Contact';
import Reviews from './pages/Reviews';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/AdminDashboard';
import Loader from './components/Loader';

// Placeholder pages
const Home = () => (
  <main className="max-w-7xl mx-auto px-4 py-8">
    <ProductGrid products={products} title="Featured Products" />
    <div className="flex justify-center mt-12"><Loader /></div>
  </main>
);

const Products = () => (
  <main className="max-w-7xl mx-auto px-4 py-8">
    <ProductGrid products={products} title="All Products" />
    <div className="flex justify-center mt-12"><Loader /></div>
  </main>
);

const About = () => (
  <main className="max-w-3xl mx-auto px-4 py-8">
    <div className="text-center text-gray-500">About page coming soon...</div>
    <div className="flex justify-center mt-12"><Loader /></div>
  </main>
);

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route path="/search" element={<Search />} />
              <Route path="/order-tracking" element={<OrderTracking />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
          </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
};

export default App; 