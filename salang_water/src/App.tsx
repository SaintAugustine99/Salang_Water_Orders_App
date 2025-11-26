import React, { useState, useEffect, Suspense } from 'react';
import './App.css';

// Component Imports
import Navigation from './pages/Navigation';
import Footer from './pages/Footer';
import CartDrawer from './pages/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import ChatAssistant from './components/ChatAssistant';

// Lazy Load Pages
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const OrderPage = React.lazy(() => import('./pages/OrderPage'));
const CustomOrdersPage = React.lazy(() => import('./pages/CustomOrdersPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const CareersPage = React.lazy(() => import('./pages/CareersPage'));
const TermsPage = React.lazy(() => import('./pages/TermsPage'));

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
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

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
    setShowCheckoutModal(true);
  };

  const handlePaymentSuccess = () => {
    setCart([]); // Clear cart
    setShowCheckoutModal(false);
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
      default: return <HomePage setPage={setActivePage} />;
    }
  };

  // Loading Fallback
  const PageLoader = () => (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="App min-h-screen flex flex-col bg-salang-white font-sans text-slate-800">
      <Navigation
        activePage={activePage}
        setPage={setActivePage}
        cartCount={cart.reduce((acc, item) => acc + item.qty, 0)}
        onOpenCart={() => setIsCartOpen(true)}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        onCheckout={initiateCheckout}
      />

      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        cart={cart}
        totalAmount={cart.reduce((sum, item) => sum + (item.price * item.qty), 0)}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <ChatAssistant />

      <main className="flex-grow">
        <Suspense fallback={<PageLoader />}>
          {renderPage()}
        </Suspense>
      </main>

      <Footer setPage={setActivePage} />
    </div>
  );
}

export default App;
