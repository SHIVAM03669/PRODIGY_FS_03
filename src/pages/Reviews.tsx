import React from 'react';
import { products } from '../data/products';
import { Star } from 'lucide-react';

// Mock reviews for all products
const allReviews = [
  {
    id: 'r1', productId: '1', userName: 'Alice', rating: 5, comment: 'Great product! Highly recommend.', createdAt: new Date('2024-06-01')
  },
  {
    id: 'r2', productId: '1', userName: 'Bob', rating: 4, comment: 'Good value for money.', createdAt: new Date('2024-06-02')
  },
  {
    id: 'r3', productId: '2', userName: 'Charlie', rating: 5, comment: 'Super comfy and eco-friendly.', createdAt: new Date('2024-06-03')
  },
];

const Reviews: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">All Customer Reviews</h2>
      <div className="space-y-4">
        {allReviews.map(r => {
          const product = products.find(p => p.id === r.productId);
          return (
            <div key={r.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-1">
                <span className="font-semibold mr-2">{r.userName}</span>
                <span className="flex items-center mr-2">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className={`h-4 w-4 ${i < r.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                </span>
                <span className="ml-2 text-xs text-gray-400">{r.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="text-gray-700 mb-1">{r.comment}</div>
              {product && (
                <div className="text-sm text-gray-500">Product: <span className="font-medium">{product.name}</span></div>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default Reviews; 