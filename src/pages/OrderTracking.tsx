import React, { useState } from 'react';

const OrderTracking: React.FC = () => {
  const [tracking, setTracking] = useState('');
  const [result, setResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate order tracking result
    setResult(tracking ? `Order #${tracking} is in transit.` : null);
  };

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Order Tracking</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-6">
        <input
          type="text"
          placeholder="Enter tracking number"
          value={tracking}
          onChange={e => setTracking(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="btn-primary">Track Order</button>
      </form>
      {result && <div className="bg-white rounded-lg shadow p-4 text-center">{result}</div>}
    </main>
  );
};

export default OrderTracking; 