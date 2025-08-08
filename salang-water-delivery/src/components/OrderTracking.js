import React from 'react';
import { useParams } from 'react-router-dom';

const OrderTracking = () => {
  const { orderId } = useParams();

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      <div className="text-center py-12">
        <div className="w-24 h-24 bg-kenya-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">📦</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Order Tracking</h2>
        <p className="text-gray-600 mb-6">
          Order ID: {orderId}
        </p>
        <div className="bg-kenya-green-50 border border-kenya-green-200 rounded-lg p-4">
          <h3 className="font-semibold text-kenya-green-900 mb-2">Phase 4 Features:</h3>
          <ul className="text-sm text-kenya-green-800 space-y-1 text-left">
            <li>• Real-time order status</li>
            <li>• Delivery tracking</li>
            <li>• SMS notifications</li>
            <li>• Delivery confirmation</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;