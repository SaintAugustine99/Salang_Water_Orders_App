import React, { useState } from 'react';

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input-field"
                placeholder="Enter admin password"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary">
              Login
            </button>
          </form>
          <p className="text-xs text-gray-500 mt-4 text-center">
            Default password: admin123
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Admin Dashboard</h2>
        <p className="text-gray-600 mb-6">
          Welcome, Administrator!
        </p>
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <h3 className="font-semibold text-purple-900 mb-2">Phase 4 Features:</h3>
          <ul className="text-sm text-purple-800 space-y-1 text-left">
            <li>• Order management dashboard</li>
            <li>• Customer management</li>
            <li>• Product inventory</li>
            <li>• Sales analytics</li>
            <li>• Delivery coordination</li>
          </ul>
        </div>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="mt-6 btn-secondary"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;