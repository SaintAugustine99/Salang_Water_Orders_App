import React from 'react';

const AboutPage = () => (
  <div className="pt-20 animate-fadeIn">
    <section className="bg-slate-50 py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Our Sustainable Promise</h2>
        <p className="text-xl text-slate-600 leading-relaxed">
          At Salang Water, we believe clean water shouldn't cost the earth. Our mission goes beyond hydration—we are building a <span className="text-blue-600 font-bold">sustainable water infrastructure</span> for Kenya.
        </p>
      </div>
    </section>

    <section className="py-20 max-w-7xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div>
          <img 
            src="https://images.unsplash.com/photo-1536939459926-301728717817?auto=format&fit=crop&q=80&w=800" 
            alt="Community Water" 
            className="rounded-3xl shadow-2xl"
          />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Empowering Low Income Communities</h3>
          <p className="text-slate-600 mb-6">
            Access to clean water is a right, not a luxury. Through our innovative "Maji Mtaani" micro-subscription model, we allow families to pay small daily amounts for guaranteed weekly deliveries, eliminating the high upfront cost of bulk water.
          </p>
          
          <h3 className="text-2xl font-bold text-slate-900 mb-4 mt-8">The Salang Cycle</h3>
          <ul className="space-y-4">
            {[
              "Source: Sustainable aquifer management",
              "Process: Solar-powered filtration",
              "Delivery: Route-optimized electric tuk-tuks",
              "Return: 100% Bottle reclamation policy"
            ].map((item, i) => (
              <li key={i} className="flex items-center text-slate-700">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  </div>
);

export default AboutPage;