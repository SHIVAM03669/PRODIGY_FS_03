import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';
import { Product, Review } from '../types';
import { useCart } from '../context/CartContext';
import { Star, ShoppingCart } from 'lucide-react';

const mockReviews: Review[] = [
  {
    id: 'r1',
    productId: '1',
    userId: 'u1',
    userName: 'Alice',
    rating: 5,
    comment: 'Great product! Highly recommend.',
    createdAt: new Date('2024-06-01'),
  },
  {
    id: 'r2',
    productId: '1',
    userId: 'u2',
    userName: 'Bob',
    rating: 4,
    comment: 'Good value for money.',
    createdAt: new Date('2024-06-02'),
  },
];

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [reviews, setReviews] = useState<Review[]>(mockReviews.filter(r => r.productId === id));
  const [reviewText, setReviewText] = useState('');
  const [reviewRating, setReviewRating] = useState(5);

  if (!product) {
    return <div className="text-center py-12 text-gray-500">Product not found.</div>;
  }

  const handleAddToCart = () => {
    setIsAdding(true);
    addItem(product, quantity);
    setTimeout(() => setIsAdding(false), 500);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    const newReview: Review = {
      id: Math.random().toString(36).slice(2),
      productId: product.id,
      userId: 'guest',
      userName: 'Guest',
      rating: reviewRating,
      comment: reviewText,
      createdAt: new Date(),
    };
    setReviews([newReview, ...reviews]);
    setReviewText('');
    setReviewRating(5);
  };

  const renderStars = (rating: number) => (
    <span className="flex items-center">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
      ))}
    </span>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Product Image */}
      <div className="bg-white rounded-lg shadow p-4 flex items-center justify-center">
        <img src={product.image} alt={product.name} className="w-full max-w-xs object-contain" />
      </div>
      {/* Product Info */}
      <div>
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <div className="flex items-center mb-2">
          {renderStars(product.rating)}
          <span className="ml-2 text-sm text-gray-500">({product.reviewCount} reviews)</span>
        </div>
        <div className="flex items-center mb-4">
          <span className="text-2xl font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-lg text-gray-500 line-through ml-3">${product.originalPrice.toFixed(2)}</span>
          )}
        </div>
        <p className="mb-4 text-gray-700">{product.description}</p>
        {/* Specifications */}
        {product.specifications && (
          <div className="mb-4">
            <h2 className="font-semibold mb-2">Specifications</h2>
            <ul className="list-disc list-inside text-gray-600">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key}><span className="font-medium">{key}:</span> {value}</li>
              ))}
            </ul>
          </div>
        )}
        {/* Quantity and Add to Cart */}
        <div className="flex items-center space-x-4 mb-6">
          <input
            type="number"
            min={1}
            max={product.stock}
            value={quantity}
            onChange={e => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
            className="w-20 input-field"
            disabled={product.stock === 0}
          />
          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isAdding}
            className="btn-primary flex items-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>{product.stock === 0 ? 'Out of Stock' : isAdding ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
        {/* Stock info */}
        <div className="text-sm text-gray-500 mb-2">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</div>
      </div>
      {/* Reviews Section */}
      <div className="md:col-span-2 mt-8">
        <h2 className="text-xl font-bold mb-4">Customer Reviews</h2>
        <form onSubmit={handleReviewSubmit} className="mb-6 flex flex-col md:flex-row md:items-center gap-2">
          <select
            value={reviewRating}
            onChange={e => setReviewRating(Number(e.target.value))}
            className="input-field w-24"
          >
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r > 1 && 's'}</option>)}
          </select>
          <input
            type="text"
            placeholder="Write a review..."
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
            className="input-field flex-1"
          />
          <button type="submit" className="btn-primary">Submit</button>
        </form>
        <div className="space-y-4">
          {reviews.length === 0 && <div className="text-gray-500">No reviews yet.</div>}
          {reviews.map(r => (
            <div key={r.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex items-center mb-1">
                <span className="font-semibold mr-2">{r.userName}</span>
                {renderStars(r.rating)}
                <span className="ml-2 text-xs text-gray-400">{r.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="text-gray-700">{r.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 