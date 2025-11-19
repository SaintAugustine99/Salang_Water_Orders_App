import React from 'react';
import { ShoppingBag } from 'lucide-react';

// Mock Products Data
const PRODUCTS = [
  { id: 1, name: "20L Refill (Exchange)", price: 100, type: 'refill', image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 2, name: "20L New Bottle + Water", price: 500, type: 'new', image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 3, name: "10L Disposable (6-Pack)", price: 350, type: 'pack', image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=300&h=300" },
  { id: 4, name: "Dispenser Cleaning", price: 200, type: 'service', image: "https://images.unsplash.com/photo-1585676623638-a26d30a52278?auto=format&fit=crop&q=80&w=300&h=300" },
];

const OrderPage = ({ addToCart }: { addToCart: (product: any) => void }) => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-4">Order Refill</h2>
        <p className="text-slate-600">Select your preferred water package. Free delivery for orders above KES 1000.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow border border-slate-100 overflow-hidden">
            <div className="h-64 bg-slate-100 relative group">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900">
                KES {product.price}
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-900 mb-2">{product.name}</h3>
              <button 
                onClick={() => addToCart(product)}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-colors flex items-center justify-center"
              >
                <ShoppingBag size={18} className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;