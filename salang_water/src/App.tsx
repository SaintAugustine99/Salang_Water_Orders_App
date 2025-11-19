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
  const [cart,HB setCart] = useState<CartItem[]>([]);

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

  const handleCheckout = async () => {
    // This function will handle the MPesa integration
    const amount = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const phone = prompt("Please enter your M-Pesa phone number (e.g., 254712345678):");
    
    if (phone && amount > 0) {
      try {
        // We will create this endpoint in Step 3
        const response = await fetch('/.netlify/functions/mpesa-push', {
          method: 'POST',
          body: JSON.stringify({ phone, amount }),
        });
        
        if (response.ok) {
          alert('STK Push sent! Please check your phone to complete payment.');
          setCart([]); // Clear cart on success
          setIsCartOpen(false);
        } else {
          alert('Payment initiation failed. Please try again.');
        }
      } catch (error) {
        console.error('Payment Error:', error);
        alert('Connection error. Please check your internet.');
      }
    }
  };

  // Page Router
  const renderPage = () => {
    switch (activePage) {
      case 'home': return <HomePage setPage={setActivePage} />;
      case 'about': return <AboutPage />;
      case 'order': return <OrderPage addToCart={addToCart} />;
      case 'custom': return <CustomOrdersPage />;
      case 'contact': return <ContactPage />; // We will update this for email
      case 'cart': 
        setIsCartOpen(true);
        return <OrderPage addToCart={addToCart} />; // Fallback to order page underneath
      default: return <HomePage setPage={setActivePage} />;
    }
  };

  return (
    <div className="App min-h-screen flex flex-col bg-white">
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
        onCheckout={handleCheckout}
      />

      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer />
    </div>
  );
}

export default App;
