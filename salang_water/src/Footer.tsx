import React from 'react';
import { Instagram, Facebook, Twitter, Phone, MapPin, CheckCircle } from 'lucide-react';

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
      <div>
        <h3 className="text-white text-lg font-serif font-bold mb-4">Salang Water</h3>
        <p className="text-sm text-slate-400 italic mb-4">"Delicateness in each drop."</p>
        <div className="flex space-x-4">
          <Instagram size={20} className="hover:text-blue-400 cursor-pointer" />
          <Facebook size={20} className="hover:text-blue-400 cursor-pointer" />
          <Twitter size={20} className="hover:text-blue-400 cursor-pointer" />
        </div>
      </div>
      
      <div>
        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Quick Links</h4>
        <ul className="space-y-2 text-sm">
          <li className="hover:text-white cursor-pointer">Order Refill</li>
          <li className="hover:text-white cursor-pointer">Track Delivery</li>
          <li className="hover:text-white cursor-pointer">Maji Mtaani Program</li>
          <li className="hover:text-white cursor-pointer">Recycling Policy</li>
        </ul>
      </div>

      <div>
        <h4 className="text-white font-bold mb-4 uppercase text-xs tracking-wider">Contact</h4>
        <ul className="space-y-2 text-sm">
          <li className="flex items-center"><Phone size={16} className="mr-2"/> +254 700 000 000</li>
          <li className="flex items-center"><MapPin size={16} className="mr-2"/> South B, Nairobi</li>
          <li className="flex items-center text-green-400"><CheckCircle size={16} className="mr-2"/> KEBS Certified</li>
        </ul>
      </div>

      <div className="bg-slate-800 p-4 rounded-lg">
        <h4 className="text-white font-bold mb-2 text-sm">Salang Drops Loyalty</h4>
        <p className="text-xs mb-3">Earn points for every bottle you recycle.</p>
        <div className="w-full bg-slate-700 h-2 rounded-full mb-1">
          <div className="bg-blue-500 h-2 rounded-full w-3/4"></div>
        </div>
        <p className="text-xs text-right text-blue-400">Sign in to view points</p>
      </div>
    </div>
    <div className="text-center text-xs text-slate-600 mt-12 border-t border-slate-800 pt-8">
      &copy; {new Date().getFullYear()} Salang Water Ltd. All rights reserved.
    </div>
  </footer>
);

export default Footer;