// Update src/ContactPage.tsx
import React from 'react';
import { Phone, MapPin, Send } from 'lucide-react';

const ContactPage = () => (
  <div className="pt-24 pb-20 max-w-7xl mx-auto px-4 animate-fadeIn">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Left Side: Contact Info (Existing code) */}
      <div>
        <h2 className="text-4xl font-serif font-bold text-slate-900 mb-6">Get in Touch</h2>
        <p className="text-lg text-slate-600 mb-8">
          Have a question? Send us a message below and we'll get back to you via email.
        </p>
        {/* Existing contact buttons... */}
      </div>
      
      {/* Right Side: The Email Form */}
      <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100">
        <h3 className="text-2xl font-bold mb-6">Send Message</h3>
        
        {/* IMPORTANT: This form tag setup enables Netlify to catch the submission */}
        <form name="contact" method="post" data-netlify="true">
          <input type="hidden" name="form-name" value="contact" />
          
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-slate-700">Name</label>
            <input type="text" name="name" required className="w-full p-3 border rounded-xl bg-slate-50" />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-slate-700">Email</label>
            <input type="email" name="email" required className="w-full p-3 border rounded-xl bg-slate-50" />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-bold mb-2 text-slate-700">Message</label>
            <textarea name="message" rows={4} required className="w-full p-3 border rounded-xl bg-slate-50"></textarea>
          </div>
          
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition flex items-center justify-center">
            <Send size={18} className="mr-2"/> Send Message
          </button>
        </form>
      </div>
    </div>
  </div>
);

export default ContactPage;