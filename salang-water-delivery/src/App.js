import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import OrderTracking from './components/OrderTracking';
import AdminPanel from './components/AdminPanel';
import { CartProvider } from './context/CartContext';

function App() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Service Worker registration for offline functionality
  useEffect(() => {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
      navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
          console.log('SW registered: ', registration);
        })
        .catch((registrationError) => {
          console.log('SW registration failed: ', registrationError);
        });
    }
  }, []);

  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          {/* Offline indicator */}
          {!isOnline && (
            <div className="bg-red-500 text-white text-center py-2 text-sm font-medium safe-area-top">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>You're offline. Some features may not work.</span>
              </div>
            </div>
          )}
          
          {/* Main app header */}
          <Header />
          
          {/* Main content area */}
          <main className="pb-20 safe-area-bottom">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/orders/:orderId" element={<OrderTracking />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          {/* Install PWA prompt */}
          <InstallPrompt />
        </div>
      </Router>
    </CartProvider>
  );
}

// PWA Install Prompt Component
function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallPrompt(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowInstallPrompt(false);
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    setDeferredPrompt(null);
  };

  if (!showInstallPrompt) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-slide-up">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-kenya-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">💧</span>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Install AquaKenya</h3>
              <p className="text-xs text-gray-600">Add to home screen for quick access</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={handleDismiss}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <button
              onClick={handleInstallClick}
              className="bg-kenya-blue-600 text-white text-xs px-3 py-1 rounded font-medium hover:bg-kenya-blue-700 transition-colors"
            >
              Install
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;