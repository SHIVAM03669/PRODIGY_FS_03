import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface ProductCardProps {
  product: Product;
  showQuickView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, showQuickView = true }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    addItem(product, 1);
    
    // Simulate a brief delay for better UX
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 500);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : index < rating
            ? 'text-yellow-400 fill-current opacity-50'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div
      className="card group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Stock Badge */}
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded">
            Only {product.stock} left
          </div>
        )}

        {product.stock === 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            Out of Stock
          </div>
        )}

        {/* Quick Actions Overlay */}
        {isHovered && showQuickView && (
          <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center space-x-2 transition-opacity duration-200">
            <button 
              onClick={handleWishlistToggle}
              className={`p-2 rounded-full shadow-lg transition-colors ${
                isInWishlist(product.id)
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors"
            >
              <Eye className="h-5 w-5 text-gray-600" />
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || isAddingToCart}
              className="bg-white p-2 rounded-full shadow-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <ShoppingCart className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Category */}
        <p className="text-sm text-gray-500 mb-1">{product.category}</p>
        
        {/* Product Name */}
        <Link to={`/product/${product.id}`}>
          <h3 className="font-medium text-gray-900 mb-2 hover:text-primary-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-2">
            {renderStars(product.rating)}
          </div>
          <span className="text-sm text-gray-500">({product.reviewCount})</span>
        </div>

        {/* Price */}
        <div className="flex items-center mb-3">
          <span className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through ml-2">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0 || isAddingToCart}
          className="w-full btn-primary disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>
            {isAddingToCart
              ? 'Adding...'
              : product.stock === 0
              ? 'Out of Stock'
              : 'Add to Cart'}
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard; 