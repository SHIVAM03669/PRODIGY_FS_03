import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { Trash2 } from 'lucide-react';
import ProductCard from '../components/ProductCard';

const Wishlist: React.FC = () => {
  const { state, removeItem } = useWishlist();

  if (state.items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Wishlist</h2>
        <p className="mb-6 text-gray-500">Your wishlist is empty. Start adding products you love!</p>
        <Link to="/products" className="btn-primary inline-block">Browse Products</Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Your Wishlist</h2>
        <button
          onClick={() => {
            // Clear wishlist functionality could be added here
            console.log('Clear wishlist');
          }}
          className="text-red-600 hover:text-red-700 text-sm"
        >
          Clear All
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {state.items.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard product={product} showQuickView={false} />
            <button
              onClick={() => removeItem(product.id)}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-red-50 text-red-600 hover:text-red-700 transition-colors"
              title="Remove from wishlist"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </main>
  );
};

export default Wishlist; 