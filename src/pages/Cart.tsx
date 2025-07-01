import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

const Cart: React.FC = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate('/');
    // In a real app, redirect to order confirmation/checkout page
  };

  if (state.items.length === 0) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="mb-6 text-gray-500">Looks like you haven't added anything yet.</p>
        <Link to="/products" className="btn-primary inline-block">Browse Products</Link>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      <div className="space-y-6">
        {state.items.map(({ product, quantity }) => (
          <div key={product.id} className="flex items-center bg-white rounded-lg shadow p-4">
            <img src={product.image} alt={product.name} className="w-20 h-20 object-cover rounded mr-4" />
            <div className="flex-1">
              <Link to={`/product/${product.id}`} className="font-semibold text-gray-900 hover:text-primary-600">
                {product.name}
              </Link>
              <div className="text-gray-500 text-sm mb-2">${product.price.toFixed(2)} each</div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  min={1}
                  max={product.stock}
                  value={quantity}
                  onChange={e => updateQuantity(product.id, Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                  className="w-20 input-field"
                />
                <button
                  onClick={() => removeItem(product.id)}
                  className="p-2 rounded hover:bg-gray-100 text-gray-500 hover:text-red-600 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="ml-4 font-semibold text-gray-900">
              ${(product.price * quantity).toFixed(2)}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <div className="text-lg font-semibold">Subtotal: ${state.total.toFixed(2)}</div>
        <button onClick={handleCheckout} className="btn-primary">Checkout</button>
      </div>
    </main>
  );
};

export default Cart; 