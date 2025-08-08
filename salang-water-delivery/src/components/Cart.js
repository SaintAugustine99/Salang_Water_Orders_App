import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const {
    items,
    subtotal,
    total,
    deliveryFee,
    discount,
    discountCode,
    minimumOrder,
    updateQuantity,
    removeItem,
    clearCart,
    applyDiscountCode,
    removeDiscount,
    isMinimumOrderMet
  } = useCart();

  const [discountInput, setDiscountInput] = useState('');
  const [discountMessage, setDiscountMessage] = useState('');
  const [isApplyingDiscount, setIsApplyingDiscount] = useState(false);
  const navigate = useNavigate();

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(itemId);
    } else {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handleApplyDiscount = async () => {
    if (!discountInput.trim()) return;
    
    setIsApplyingDiscount(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const result = applyDiscountCode(discountInput.trim());
    setDiscountMessage(result.message);
    
    if (result.success) {
      setDiscountInput('');
      setTimeout(() => setDiscountMessage(''), 3000);
    }
    
    setIsApplyingDiscount(false);
  };

  const handleProceedToCheckout = () => {
    if (isMinimumOrderMet()) {
      navigate('/checkout');
    }
  };

  // Empty cart state
  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-8">
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
          <p className="text-gray-600 mb-6">Add some water products to get started with your order.</p>
          <Link to="/" className="btn-primary">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Your Cart</h2>
        <button
          onClick={clearCart}
          className="text-sm text-red-600 hover:text-red-700 font-medium"
        >
          Clear All
        </button>
      </div>

      {/* Cart Items */}
      <div className="space-y-4 mb-6">
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onQuantityChange={handleQuantityChange}
            onRemove={removeItem}
          />
        ))}
      </div>

      {/* Discount Code Section */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-3">Discount Code</h3>
        
        {discountCode ? (
          <div className="flex items-center justify-between bg-kenya-green-50 border border-kenya-green-200 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <svg className="w-5 h-5 text-kenya-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium text-kenya-green-900">{discountCode} applied</span>
            </div>
            <button
              onClick={removeDiscount}
              className="text-sm text-kenya-green-700 hover:text-kenya-green-800 font-medium"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Enter discount code"
                value={discountInput}
                onChange={(e) => setDiscountInput(e.target.value.toUpperCase())}
                className="input-field flex-1"
                onKeyPress={(e) => e.key === 'Enter' && handleApplyDiscount()}
              />
              <button
                onClick={handleApplyDiscount}
                disabled={!discountInput.trim() || isApplyingDiscount}
                className="btn-secondary whitespace-nowrap"
              >
                {isApplyingDiscount ? 'Applying...' : 'Apply'}
              </button>
            </div>
            
            {discountMessage && (
              <p className={`text-sm ${discountMessage.includes('Invalid') || discountMessage.includes('Minimum') ? 'text-red-600' : 'text-kenya-green-600'}`}>
                {discountMessage}
              </p>
            )}
            
            {/* Available Discount Codes Hint */}
            <div className="text-xs text-gray-500">
              Try: WELCOME10, BULK20, STUDENT, WEEKEND
            </div>
          </div>
        )}
      </div>

      {/* Order Summary */}
      <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium">KSh {subtotal.toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Delivery Fee</span>
            <span className="font-medium">KSh {deliveryFee.toLocaleString()}</span>
          </div>
          
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-kenya-green-600">Discount ({discountCode})</span>
              <span className="font-medium text-kenya-green-600">-KSh {discount.toLocaleString()}</span>
            </div>
          )}
          
          <div className="border-t border-gray-200 pt-2">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-900">Total</span>
              <span className="font-bold text-xl text-kenya-blue-600">KSh {total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Minimum Order Warning */}
      {!isMinimumOrderMet() && (
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <p className="text-sm font-medium text-orange-900">
                Minimum order: KSh {minimumOrder.toLocaleString()}
              </p>
              <p className="text-xs text-orange-700">
                Add KSh {(minimumOrder - subtotal).toLocaleString()} more to proceed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleProceedToCheckout}
          disabled={!isMinimumOrderMet()}
          className={`w-full btn-primary text-lg py-4 ${!isMinimumOrderMet() ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isMinimumOrderMet() ? (
            <>
              Proceed to Checkout
              <svg className="w-5 h-5 ml-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </>
          ) : (
            `Add KSh ${(minimumOrder - subtotal).toLocaleString()} more`
          )}
        </button>
        
        <Link to="/" className="block w-full btn-secondary text-center py-3">
          Continue Shopping
        </Link>
      </div>
      
      {/* Delivery Info */}
      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h4 className="font-medium text-blue-900">Delivery Information</h4>
        </div>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Standard delivery: 2-4 hours</li>
          <li>• Free delivery on orders over KSh 500</li>
          <li>• M-Pesa payment accepted</li>
          <li>• Contact-free delivery available</li>
        </ul>
      </div>
    </div>
  );
};

// Individual Cart Item Component
const CartItem = ({ item, onQuantityChange, onRemove }) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityUpdate = async (newQuantity) => {
    setIsUpdating(true);
    await new Promise(resolve => setTimeout(resolve, 200)); // Small delay for UX
    onQuantityChange(item.id, newQuantity);
    setIsUpdating(false);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4">
      <div className="flex items-start space-x-4">
        {/* Product Image */}
        <div className="w-16 h-16 bg-kenya-blue-50 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
          {item.image}
        </div>
        
        {/* Product Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 line-clamp-1">{item.name}</h4>
          <p className="text-sm text-gray-600 mt-1">KSh {item.price.toLocaleString()} each</p>
          
          {/* Quantity Controls */}
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleQuantityUpdate(item.quantity - 1)}
                disabled={isUpdating}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 touch-target"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              
              <span className="font-medium text-gray-900 min-w-[2rem] text-center">
                {isUpdating ? '...' : item.quantity}
              </span>
              
              <button
                onClick={() => handleQuantityUpdate(item.quantity + 1)}
                disabled={isUpdating}
                className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-600 hover:bg-gray-50 touch-target"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            
            {/* Item Total */}
            <div className="text-right">
              <p className="font-semibold text-gray-900">
                KSh {(item.price * item.quantity).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        
        {/* Remove Button */}
        <button
          onClick={() => onRemove(item.id)}
          className="text-gray-400 hover:text-red-600 p-1 touch-target"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Cart;