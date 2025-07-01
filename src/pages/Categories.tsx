import React, { useState } from 'react';
import { categories, products } from '../data/products';
import ProductGrid from '../components/ProductGrid';

const Categories: React.FC = () => {
  const [selected, setSelected] = useState('All');
  const filtered = selected === 'All' ? products : products.filter(p => p.category === selected);

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Categories</h2>
      <div className="flex flex-wrap gap-2 mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelected(cat)}
            className={`px-4 py-2 rounded-lg font-medium border transition-colors ${selected === cat ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <ProductGrid products={filtered} title={selected === 'All' ? 'All Products' : selected} />
    </main>
  );
};

export default Categories; 