import React, { useState, useEffect } from 'react';
import './App.css';

// Component Imports
import Navigation from './Navigation';
import Footer from './Footer';
import CartDrawer from './CartDrawer';
import HomePage from './HomePage';
import AboutPage from './AboutPage';
import OrderPage from './OrderPage';
import CustomOrdersPage from './CustomOrdersPage';
import ContactPage from './ContactPage';
import CareersPage from './CareersPage';
import TermsPage from './TermsPage';

// Types
interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

function App() {
  // State Management
  const [activePage, setActivePage] = useState('home');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentPhone, setPaymentPhone] = useState('');

  // Persist cart to local storage
  useEffect(() => {
    const savedCart = localStorage.getItem('salangCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('salangCart', JSON.stringify(cart));
  }, [cart]);

  // Handlers
  const addToCart = (product: any) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const initiateCheckout = () => {
    const amount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    if (amount <= 0) {
      alert("Your cart is empty!");
      return;
    }
    setIsCartOpen(false);
    setShowPaymentModal(true);
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paymentPhone) return;

    setShowPaymentModal(false);
    setIsProcessingPayment(true);

    const amount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    try {
      const response = await fetch('/api/mpesa-push', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: paymentPhone,
          amount: amount
        }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ STK Push Sent!\nCheck your phone (${paymentPhone}) to enter your PIN.`);
        setCart([]); // Clear cart on success
      } else {
        console.error("API Error:", data);
        alert(`❌ Payment Failed: ${data.details?.errorMessage || "Unknown error"}`);
      }
    } catch (error) {
      console.error('Connection Error:', error);
      alert('❌ Connection error. Please check your internet.');
    } finally {
      setIsProcessingPayment(false);
      setPaymentPhone('');
    }
  };

  // Page Router
  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage setPage={setActivePage} />;
      case 'about': return <AboutPage />;
      case 'order': return <OrderPage addToCart={addToCart} />;
      case 'custom': return <CustomOrdersPage />;
      case 'contact': return <ContactPage />;
      case 'careers': return <CareersPage />;
      case 'terms': return <TermsPage />;
      case 'cart':
        setIsCartOpen(true);
        return <OrderPage addToCart={addToCart} />;
      default: return <HomePage setPage={setActivePage} />;
    }
  };

  return (
    <div className="App min-h-screen flex flex-col bg-salang-white font-sans text-slate-800">
      <Navigation
        activePage={activePage}
        setPage={setActivePage}
        cartCount={cart.reduce((acc, item) => acc + item.qty, 0)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        onCheckout={initiateCheckout}
      />

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center backdrop-blur-sm animate-fadeIn">
          <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full mx-4 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-blue-600"></div>
            <h3 className="text-2xl font-serif font-bold mb-2 text-slate-900">Confirm Payment</h3>
            <p className="text-slate-600 mb-6">Enter your M-Pesa number to complete the order of <span className="font-bold text-slate-900">KES {cart.reduce((sum, item) => sum + (item.price * item.qty), 0)}</span></p>

            <form onSubmit={handlePaymentSubmit}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">M-Pesa Number</label>
                <input
                  type="tel"
                  placeholder="0712345678"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-slate-50"
                  value={paymentPhone}
                  onChange={(e) => setPaymentPhone(e.target.value)}
                  required
                />
              </div>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(false)}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-colors shadow-lg shadow-blue-200"
                >
                  Pay Now
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Processing Overlay */}
      {isProcessingPayment && (
        <div className="fixed inset-0 bg-black/60 z-[80] flex items-center justify-center backdrop-blur-sm">
          <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col items-center animate-fadeIn max-w-sm w-full mx-4">
            <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
            <h3 className="font-bold text-xl mb-2 text-slate-900">Processing Payment</h3>
            <p className="text-slate-500 text-center">Please check your phone and enter your M-Pesa PIN to complete the transaction.</p>
          </div>
        </div>
      )}

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setPage={setActivePage} />
    </div>
  );
}

export default App;
