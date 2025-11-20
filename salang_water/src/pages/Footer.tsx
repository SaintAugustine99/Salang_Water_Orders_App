import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer = ({ setPage }: { setPage: (page: string) => void }) => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-white mb-6">Salang Water</h3>
            <p className="text-slate-400 leading-relaxed mb-6">
              Delivering purity and health to every household. Experience the difference of premium filtration.
            </p>
            <div className="flex space-x-4">
              <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors text-white">
                <Facebook size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-400 transition-colors text-white">
                <Twitter size={18} />
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors text-white">
                <Instagram size={18} />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => setPage('home')} className="hover:text-blue-400 transition-colors">Home</button>
              </li>
              <li>
                <button onClick={() => setPage('order')} className="hover:text-blue-400 transition-colors">Order Refill</button>
              </li>
              <li>
                <button onClick={() => setPage('custom')} className="hover:text-blue-400 transition-colors">Custom Events</button>
              </li>
              <li>
                <button onClick={() => setPage('careers')} className="hover:text-blue-400 transition-colors">Careers</button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li>
                <button onClick={() => setPage('terms')} className="hover:text-blue-400 transition-colors">Terms & Conditions</button>
              </li>
              <li>
                <button onClick={() => setPage('terms')} className="hover:text-blue-400 transition-colors">Privacy Policy</button>
              </li>
              <li>
                <button onClick={() => setPage('contact')} className="hover:text-blue-400 transition-colors">Contact Support</button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={20} className="mr-3 text-blue-500 shrink-0" />
                <span>123 Water Lane, Industrial Area, Nairobi, Kenya</span>
              </li>
              <li className="flex items-center">
                <Phone size={20} className="mr-3 text-blue-500 shrink-0" />
                <span>+254 712 345 678</span>
              </li>
              <li className="flex items-center">
                <Mail size={20} className="mr-3 text-blue-500 shrink-0" />
                <span>info@salangwater.co.ke</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} Salang Water. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;