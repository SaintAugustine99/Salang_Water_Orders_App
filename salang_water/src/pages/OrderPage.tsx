import React from 'react';
import { ShoppingBag, Info } from 'lucide-react';

// Updated Products Data with Specific Stock Photos
const PRODUCTS = [
  {
    id: 1,
    name: "20L Refill (Exchange)",
    price: 100,
    type: 'refill',
    image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&q=80&w=600&h=800",
    description: "Exchange your empty bottle for a fresh refill."
  },
  {
    id: 2,
    name: "20L New Bottle + Water",
    price: 400,
    type: 'new',
    image: "https://images.unsplash.com/photo-1616118132534-381148898bb4?auto=format&fit=crop&q=80&w=600&h=800",
    description: "Purchase a brand new 20L bottle filled with Salang Water."
  },
  {
    id: 3,
    name: "10L Bottle",
    price: 200,
    type: 'pack',
    image: "https://images.unsplash.com/photo-1625740822008-e45a8a9d1691?auto=format&fit=crop&q=80&w=600&h=800",
    description: "Convenient 10L bottle for events or travel."
  },
  {
    id: 4,
    name: "5L Bottle Crate of 4",
    price: 400,
    type: 'pack',
    image: "https://images.unsplash.com/photo-1603393001288-4b3177c9a471?auto=format&fit=crop&q=80&w=600&h=800",
    description: "Crate of 4 x 5L bottles."
  },
  {
    id: 5,
    name: "1L Bottle Crate of 12",
    price: 450,
    type: 'pack',
    image: "https://images.unsplash.com/photo-1602143407151-11115cdbf6e0?auto=format&fit=crop&q=80&w=600&h=800",
    description: "Crate of 12 x 1L bottles."
  },
  {
    id: 6,
    name: "500ml Bottle Crate of 24",
    price: 450,
    type: 'pack',
    image: "https://images.unsplash.com/photo-1559839914-17a54a96660e?auto=format&fit=crop&q=80&w=600&h=800",
    description: "Crate of 24 x 500ml bottles."
  },
  {
    id: 7,
    name: "Dispenser Cleaning",
    price: 200,
    type: 'service',
    image: "https://images.unsplash.com/photo-1585676623638-a26d30a52278?auto=format&fit=crop&q=80&w=600&h=800",
    description: "Professional cleaning service for your water dispenser."
  },
];

const OrderPage = ({ addToCart }: { addToCart: (product: any) => void }) => {
  return (
    <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 animate-fadeIn">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-6">Order Refill</h2>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Select your preferred water package. We offer free delivery for all orders above KES 1000 within Nairobi.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {PRODUCTS.map(product => (
          <div key={product.id} className="bg-white rounded-3xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col">
            <div className="h-72 bg-slate-50 relative overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                width="600"
                height="800"
                loading="lazy"
              />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold text-slate-900 shadow-sm">
                KES {product.price}
              </div>
              {product.type === 'refill' && (
                <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-sm flex items-center">
                  <Info size={12} className="mr-1" /> Exchange Required
                </div>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 mb-2">{product.name}</h3>
              <p className="text-slate-500 text-sm mb-6 line-clamp-2 flex-grow">{product.description}</p>

              <button
                onClick={() => addToCart(product)}
                className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-2xl font-bold transition-all duration-300 flex items-center justify-center shadow-lg shadow-slate-900/20 hover:shadow-blue-600/30 transform active:scale-95"
              >
                <ShoppingBag size={20} className="mr-2" /> Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderPage;