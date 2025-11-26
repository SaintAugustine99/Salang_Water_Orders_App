import React from 'react';
import { ChevronRight, Leaf, Users, Award } from 'lucide-react';

const HomePage = ({ setPage }: { setPage: (page: string) => void }) => (
  <div className="animate-fadeIn">
    {/* Hero Section */}
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1920"
          srcSet="https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=640 640w,
                  https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1200 1200w,
                  https://images.unsplash.com/photo-1548839140-29a749e1cf4d?auto=format&fit=crop&q=80&w=1920 1920w"
          sizes="100vw"
          alt="Pure Water Background"
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
          width="1920"
          height="1080"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/40 to-slate-900/80"></div>
      </div>

      <div className="relative z-20 text-center px-4 max-w-5xl mx-auto animate-slideUp">
        <div className="inline-flex items-center gap-2 mb-8 px-6 py-2 bg-white/10 backdrop-blur-md rounded-full text-white text-sm font-medium tracking-wider border border-white/20">
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
          PREMIUM WATER DELIVERY
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-white mb-8 leading-tight tracking-tight">
          Salang Water
        </h1>

        <p className="text-xl md:text-2xl text-blue-50 italic font-light mb-12 max-w-2xl mx-auto leading-relaxed">
          "Delicateness in each drop. Experience the purest form of hydration delivered to your doorstep."
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={() => setPage('order')}
            className="group px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold text-lg transition-all shadow-lg shadow-blue-900/30 flex items-center justify-center min-w-[200px]"
          >
            Order Refill
            <ChevronRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          <button
            onClick={() => setPage('custom')}
            className="px-10 py-5 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/30 rounded-full font-bold text-lg transition-all min-w-[200px]"
          >
            Custom Events
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/50">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>

    {/* Stats Section */}
    <section className="py-20 bg-white relative z-10 -mt-10 rounded-t-[3rem] shadow-xl">
      <div className="max-w-[95%] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">10k+</div>
            <div className="text-slate-500 font-medium">Happy Customers</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">99.9%</div>
            <div className="text-slate-500 font-medium">Purity Guaranteed</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-blue-600 mb-2">24/7</div>
            <div className="text-slate-500 font-medium">Delivery Support</div>
          </div>
        </div>
      </div>
    </section>

    {/* Features Grid */}
    <section className="py-24 bg-slate-50">
      <div className="max-w-[95%] mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Why Choose Salang?</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
            <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <Award size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">KEBS Certified</h3>
            <p className="text-slate-600 leading-relaxed">
              Rigorous 7-step filtration process ensuring every drop meets the highest international safety standards.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <Leaf size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Eco-Cycle System</h3>
            <p className="text-slate-600 leading-relaxed">
              We don't just deliver; we reclaim. Our closed-loop recycling system ensures zero plastic waste to landfills.
            </p>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
            <div className="w-20 h-20 bg-purple-50 text-purple-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 mx-auto">
              <Users size={40} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Community Focus</h3>
            <p className="text-slate-600 leading-relaxed">
              Supported by our "Maji Mtaani" initiative, helping low-income households access clean, affordable water.
            </p>
          </div>
        </div>
      </div>
    </section>

    {/* CTA Section */}
    <section className="py-24 bg-blue-600 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-white mb-8">Ready to Experience Purity?</h2>
        <p className="text-xl text-white mb-12">Join thousands of satisfied customers who trust Salang Water for their daily hydration.</p>
        <button
          onClick={() => setPage('order')}
          className="px-12 py-5 bg-white text-blue-600 rounded-full font-bold text-xl hover:bg-blue-50 transition-colors shadow-xl"
        >
          Order Now
        </button>
      </div>
    </section>
  </div>
);

export default HomePage;