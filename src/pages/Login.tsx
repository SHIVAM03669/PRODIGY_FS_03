import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, state } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(email, password);
    if (success) {
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
  };

  if (state.isAuthenticated) {
    navigate('/');
    return null;
  }

  return (
    <main className="max-w-md mx-auto px-4 py-12">
      <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="input-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="input-field"
          required
        />
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          disabled={state.isLoading}
          className="btn-primary w-full disabled:bg-gray-300"
        >
          {state.isLoading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <div className="mt-4 text-center">
        <p className="text-gray-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:underline">
            Register here
          </Link>
        </p>
      </div>
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600 mb-2">Demo accounts:</p>
        <p className="text-xs text-gray-500">Admin: admin@example.com / admin123</p>
        <p className="text-xs text-gray-500">User: user@example.com / user123</p>
      </div>
    </main>
  );
};

export default Login; 