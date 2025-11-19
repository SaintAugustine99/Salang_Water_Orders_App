import React from 'react';
import { ChevronRight, CheckCircle, Recycle, Heart } from 'lucide-react';

const HomePage = ({ setPage }: { setPage: (page: string) => void }) => (
  <div className="animate-fadeIn">
    {/* Hero Section */}
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-blue-900/20 z-10"></div>
      <img 
        src="https://images.unsplash.com/photo-1523362628408-3c760c24aa6c?auto=format&fit=crop&q=80&w=1920"
        alt="Pure Water"
        className="absolute inset-0 w-full h-full object-cover"
      />
      
      <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
        <div className="inline-block mb-6 px-4 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium tracking-wider border border-white/30">
          PREMIUM WATER DELIVERY
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight">
          Salang Water
        </h1>
        <p className="text-xl md:text-2xl text-blue-50 italic font-light mb-10">
          "Delicateness in each drop"
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button 
            onClick={() => setPage('order')}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center"
          >
            Order Refill <ChevronRight className="ml-2" size={20} />
          </button>
          <button 
            onClick={() => setPage('custom')}
            className="px-8 py-4 bg-white hover:bg-slate-100 text-slate-900 rounded-full font-bold text-lg transition-all flex items-center justify-center"
          >
            Custom Events
          </button>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors group">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <CheckCircle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">KEBS Certified Purity</h3>
            <p className="text-slate-600 leading-relaxed">
              Rigorous 7-step filtration process ensuring every drop meets the highest international safety standards.
            </p>
          </div>
          <div className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors group">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Recycle size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Eco-Cycle System</h3>
            <p className="text-slate-600 leading-relaxed">
              We don't just deliver; we reclaim. Our closed-loop recycling system ensures zero plastic waste to landfills.
            </p>
          </div>
          <div className="text-center p-6 rounded-2xl hover:bg-slate-50 transition-colors group">
            <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
              <Heart size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Community Focus</h3>
            <p className="text-slate-600 leading-relaxed">
              Supported by our "Maji Mtaani" initiative, helping low-income households access clean, affordable water.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
);

export default HomePage;