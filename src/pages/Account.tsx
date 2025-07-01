import React from 'react';
import { Link } from 'react-router-dom';

const Account: React.FC = () => (
  <main className="max-w-3xl mx-auto px-4 py-12 text-center">
    <h2 className="text-2xl font-bold mb-4">Your Account</h2>
    <p className="mb-6 text-gray-500">Account management coming soon.</p>
    <Link to="/products" className="btn-primary inline-block">Browse Products</Link>
  </main>
);

export default Account; 