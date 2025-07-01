import React from 'react';
import { useLocation } from 'react-router-dom';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Search: React.FC = () => {
  const query = useQuery().get('q')?.toLowerCase() || '';
  const filtered = products.filter(
    p =>
      p.name.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query) ||
      p.tags.some(tag => tag.toLowerCase().includes(query))
  );

  return (
    <main className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Search Results for "{query}"</h2>
      <ProductGrid products={filtered} />
    </main>
  );
};

export default Search; 