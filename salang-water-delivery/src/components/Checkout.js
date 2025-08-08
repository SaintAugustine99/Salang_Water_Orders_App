// src/components/Checkout.js
import React from 'react';

const Checkout = () => {
  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-kenya-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">💳</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Checkout</h2>
        <p className="text-gray-600 mb-6">
          M-Pesa integration coming in Phase 3!
        </p>
        <div className="bg-kenya-blue-50 border border-kenya-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-kenya-blue-900 mb-2">Phase 3 Features:</h3>
          <ul className="text-sm text-kenya-blue-800 space-y-1 text-left">
            <li>• M-Pesa STK Push integration</li>
            <li>• Delivery address form</li>
            <li>• Order confirmation</li>
            <li>• Payment processing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Checkout;