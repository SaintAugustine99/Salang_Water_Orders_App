import React from 'react';

const CustomOrdersPage = () => (
  <div className="pt-24 pb-20 max-w-3xl mx-auto px-4 animate-fadeIn">
    <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-slate-100">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4">Custom Event Orders</h2>
        <p className="text-slate-600">
          Weddings, Funerals, Corporate Events. <br/>
          We provide custom-branded bottles with your logo and event details.
        </p>
      </div>

      <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Event Type</label>
            <select className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none">
              <option>Wedding</option>
              <option>Funeral</option>
              <option>Corporate Event</option>
              <option>Birthday / Party</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Expected Guests</label>
            <input type="number" placeholder="e.g. 500" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Custom Label Text</label>
          <input type="text" placeholder="e.g. Sarah & John's Wedding - 12th Dec" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Upload Logo / Image (Optional)</label>
          <div className="border-2 border-dashed border-slate-200 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
            <p className="text-sm text-slate-500">Click to upload or drag and drop</p>
          </div>
        </div>

        <button className="w-full py-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-lg transition-colors">
          Request Quote
        </button>
      </form>
    </div>
  </div>
);

export default CustomOrdersPage;