import React from 'react';
import { Product } from '../types';
import ProductCard from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
  showQuickView?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title, showQuickView = true }) => {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 text-lg">No products found</div>
        <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            showQuickView={showQuickView}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;

 