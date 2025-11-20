import React, { useState } from 'react';
import { Droplets, ShoppingBag, Menu, X } from 'lucide-react';

interface NavigationProps {
  activePage: string;
  setPage: (page: string) => void;
  cartCount: number;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, setPage, cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const NavLink = ({ name, page }: { name: string; page: string }) => (
    <button 
      onClick={() => { setPage(page); setIsOpen(false); }}
      className={`text-sm font-medium tracking-wide transition-colors duration-300 ${
        activePage === page ? 'text-blue-600 font-bold' : 'text-slate-600 hover:text-blue-500'
      }`}
    >
      {name.toUpperCase()}
    </button>
  );

  return (
    <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => setPage('home')}>
            <div className="w-10 h-10 bg-blue-600 rounded-tl-xl rounded-br-xl flex items-center justify-center text-white mr-3">
              <Droplets size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-2xl font-serif font-bold text-slate-900 tracking-tight">Salang Water</h1>
              <p className="text-[10px] text-blue-600 font-medium tracking-widest uppercase">Pure & Sustainable</p>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <NavLink name="Home" page="home" />
            <NavLink name="Our Mission" page="about" />
            <NavLink name="Order Refill" page="order" />
            <NavLink name="Custom Events" page="custom" />
            <NavLink name="Contact" page="contact" />
            
            <button 
              onClick={() => setPage('cart')}
              className="relative p-2 text-slate-600 hover:text-blue-600 transition-colors"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setPage('cart')}
              className="mr-4 relative text-slate-600"
            >
              <ShoppingBag size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 pt-2 pb-6 space-y-4 shadow-xl">
          <div className="flex flex-col space-y-4 mt-4">
            <NavLink name="Home" page="home" />
            <NavLink name="Our Mission" page="about" />
            <NavLink name="Order Refill" page="order" />
            <NavLink name="Custom Events" page="custom" />
            <NavLink name="Contact" page="contact" />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;