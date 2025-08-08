import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = () => {
  const { getItemCount, total } = useCart();
  const location = useLocation();
  const cartItemCount = getItemCount();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50 safe-area-top">
      <div className="max-w-md mx-auto px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-4">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 gradient-kenya rounded-full flex items-center justify-center shadow-sm">
              {/* Water Drop SVG Icon */}
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l-2 4c-4 8-4 10 0 14 2 2 6 2 8 0 4-4 4-6 0-14l-6-4z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Salang Water</h1>
              <p className="text-xs text-gray-500">Pure Water Delivery</p>
            </div>
          </Link>
          
          {/* Cart Button */}
          <Link 
            to="/cart" 
            className="relative p-3 text-gray-600 hover:text-kenya-blue-600 transition-colors touch-target rounded-lg hover:bg-gray-50"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4" />
            </svg>
            
            {/* Cart Badge */}
            {cartItemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-kenya-blue-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-medium shadow-sm">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            )}
            
            {/* Cart Total (shown when items in cart) */}
            {cartItemCount > 0 && total > 0 && (
              <div className="absolute -bottom-8 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-lg whitespace-nowrap">
                KSh {total.toLocaleString()}
              </div>
            )}
          </Link>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex border-t border-gray-100">
          <NavTab 
            to="/" 
            icon={<HomeIcon />} 
            label="Home" 
            isActive={isActive('/')} 
          />
          <NavTab 
            to="/cart" 
            icon={<CartIcon />} 
            label={`Cart (${cartItemCount})`} 
            isActive={isActive('/cart')}
            badge={cartItemCount > 0 ? cartItemCount : null}
          />
          {location.pathname.startsWith('/orders/') && (
            <NavTab 
              to={location.pathname} 
              icon={<PackageIcon />} 
              label="Tracking" 
              isActive={true} 
            />
          )}
        </div>
      </div>
      
      {/* Quick Actions Bar (shown on home page) */}
      {location.pathname === '/' && (
        <div className="bg-kenya-blue-50 border-t border-kenya-blue-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center space-x-2 text-kenya-blue-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Fast 2-4 hour delivery</span>
              </div>
              <div className="flex items-center space-x-2 text-kenya-blue-700">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>M-Pesa payments</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Cart Summary Bar (shown when cart has items and not on cart page) */}
      {cartItemCount > 0 && !isActive('/cart') && !isActive('/checkout') && (
        <div className="bg-kenya-green-50 border-t border-kenya-green-100">
          <div className="max-w-md mx-auto px-4 py-3">
            <Link to="/cart" className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-kenya-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-bold">{cartItemCount}</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-kenya-green-900">
                    {cartItemCount} item{cartItemCount !== 1 ? 's' : ''} in cart
                  </p>
                  <p className="text-xs text-kenya-green-700">
                    Total: KSh {total.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-kenya-green-700">
                <span className="text-sm font-medium">View Cart</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

// Icon Components
const HomeIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const CartIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5H21M7 13v8a2 2 0 002 2h8a2 2 0 002-2v-8m-8 0V9a2 2 0 012-2h4a2 2 0 012 2v4" />
  </svg>
);

const PackageIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
  </svg>
);

// Navigation Tab Component
const NavTab = ({ to, icon, label, isActive, badge }) => {
  return (
    <Link 
      to={to} 
      className={`flex-1 py-3 text-center text-sm font-medium border-b-2 transition-colors touch-target relative ${
        isActive 
          ? 'text-kenya-blue-600 border-kenya-blue-600' 
          : 'text-gray-500 border-transparent hover:text-gray-700'
      }`}
    >
      <div className="flex items-center justify-center space-x-1">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      {badge && (
        <span className="absolute -top-1 right-1/4 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center text-xs">
          {badge > 9 ? '9+' : badge}
        </span>
      )}
    </Link>
  );
};

export default Header;