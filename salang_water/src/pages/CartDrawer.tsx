import React from 'react';
import { X, ShoppingBag } from 'lucide-react';

interface CartItem {
  id: number;
  name: string;
  price: number;
  qty: number;
  image: string;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose, cart, setCart, onCheckout }) => {
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

  return (
    <div className={`fixed inset-0 z-[60] ${isOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={`absolute top-0 right-0 w-full max-w-md h-full bg-white shadow-2xl transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-bold font-serif">Your Cart</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full" aria-label="Close Cart">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center text-slate-500 mt-10">
              <ShoppingBag size={48} className="mx-auto mb-4 opacity-50" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{item.name}</h4>
                  <p className="text-blue-600 font-medium text-sm">KES {item.price}</p>
                </div>
                <div className="flex items-center bg-slate-50 rounded-lg">
                  <button className="px-3 py-1 hover:bg-slate-200 rounded-l-lg" aria-label="Decrease Quantity" onClick={() => {
                    const newCart = cart.map(i => i.id === item.id ? { ...i, qty: Math.max(0, i.qty - 1) } : i).filter(i => i.qty > 0);
                    setCart(newCart);
                  }}>-</button>
                  <span className="px-2 text-sm font-bold">{item.qty}</span>
                  <button className="px-3 py-1 hover:bg-slate-200 rounded-r-lg" aria-label="Increase Quantity" onClick={() => {
                    const newCart = cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i);
                    setCart(newCart);
                  }}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100">
          <div className="flex justify-between mb-4 text-slate-600">
            <span>Subtotal</span>
            <span>KES {subtotal}</span>
          </div>
          <div className="flex justify-between mb-6 text-lg font-bold text-slate-900">
            <span>Total</span>
            <span>KES {subtotal}</span>
          </div>
          <button
            onClick={onCheckout}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 transition-all"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartDrawer;