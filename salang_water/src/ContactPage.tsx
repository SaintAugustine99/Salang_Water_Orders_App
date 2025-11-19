import React from 'react';
import { Phone, MapPin } from 'lucide-react';

const ContactPage = () => (
  <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 animate-fadeIn">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Get in Touch</h2>
        <p className="text-lg text-slate-600 mb-8">
          Have a question about our sustainability practices or need a quick delivery? 
          Reach us directly on WhatsApp or visit our depot.
        </p>
        
        <div className="space-y-6">
          <a href="#" className="flex items-center p-4 bg-green-50 text-green-700 rounded-xl hover:bg-green-100 transition-colors">
            <Phone size={24} className="mr-4" />
            <span className="font-bold">Chat on WhatsApp</span>
          </a>
          <div className="flex items-center p-4 bg-slate-50 text-slate-700 rounded-xl">
            <MapPin size={24} className="mr-4" />
            <span>Salang Water Depot, South B Shopping Center</span>
          </div>
        </div>
      </div>
      
      {/* Map Placeholder */}
      <div className="bg-slate-200 rounded-3xl min-h-[300px] flex items-center justify-center">
        <p className="text-slate-500 font-medium">Interactive Map Component Loading...</p>
      </div>
    </div>
  </div>
);

export default ContactPage;