import React, { useState } from 'react';
import luxuryBuddha from '../assets/collection_luxury_buddha.png';

export default function EnquiryPopup({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productName, setProductName] = useState('General Enquiry');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    onSubmit({
      name,
      phone,
      email,
      productName,
      size,
      color,
      message
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs .">
      {/* Backdrop close trigger */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Main Dialog Card Container */}
      <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl relative z-10 grid grid-cols-1 md:grid-cols-12 text-slate-800">

        {/* Absolute Close Cross Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 bg-slate-50 hover:bg-slate-100 rounded-full transition-colors z-20 cursor-pointer"
          aria-label="Close form"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Column Left (Highlights / Product overview) */}
        <div className="md:col-span-5 bg-slate-50/80 p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-100 text-left">

          {/* Header Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5 text-[#cca040]">
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3L1 9l11 6 9-6-9-6zm0 18l-9-5 1.41-1.41L12 18.17l7.59-4.58L21 15l-9 6z" />
              </svg>
              <span className="text-[10px] font-black uppercase tracking-widest">Enquiry Desk</span>
            </div>

            <h2 className="font-serif text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
              Send Enquiry
            </h2>

            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Please fill in the details below. Our technical artisan team will get back to you shortly.
            </p>
          </div>

          {/* Buddha Product Highlight Card */}
          <div className="bg-white border border-slate-100 p-4 rounded-xl shadow-xs my-6 flex items-center gap-4.5">
            <div className="w-18 h-18 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
              <img
                src={luxuryBuddha}
                alt="Meditation Buddha Statue"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-serif font-bold text-slate-900 text-sm leading-tight">Meditation Buddha Statue</h4>
              <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wide">FRP Material • 4 Feet • Bronze Finish</p>
              <a
                href="/collections"
                onClick={(e) => {
                  e.preventDefault();
                  onClose();
                  window.location.href = '/collections';
                }}
                className="inline-block text-[#cca040] hover:text-[#b5892b] text-[10px] font-extrabold uppercase tracking-wider transition-colors pt-0.5"
              >
                View Details &rarr;
              </a>
            </div>
          </div>

          {/* Badges footer list */}
          <div className="grid grid-cols-4 gap-2 pt-2">
            {[
              { label: '100% Secure', desc: 'Enquiry', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
              { label: 'Quick', desc: 'Response', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
              { label: 'Best Price', desc: 'Guarantee', icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
              { label: 'Pan India', desc: 'Delivery', icon: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7' }
            ].map((badge, idx) => (
              <div key={idx} className="flex flex-col items-center text-center space-y-1">
                <span className="p-1.5 bg-[#cca040]/10 text-[#cca040] rounded-lg shrink-0">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d={badge.icon} />
                  </svg>
                </span>
                <span className="text-[8px] font-black text-slate-800 uppercase tracking-tight leading-none">{badge.label}</span>
                <span className="text-[7.5px] font-bold text-slate-400 uppercase tracking-tight leading-none">{badge.desc}</span>
              </div>
            ))}
          </div>

        </div>

        {/* Column Right (Form inputs area) */}
        <form onSubmit={handleSubmit} className="md:col-span-7 p-6 sm:p-8 space-y-5 text-left bg-white">

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

            {/* Full Name */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="w-full bg-white border border-slate-300 focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none transition-colors shadow-xs"
              />
            </div>

            {/* Phone No */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Phone No <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter phone number"
                className="w-full bg-white border border-slate-300 focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none transition-colors shadow-xs"
              />
            </div>

            {/* Email id */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Email id <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="w-full bg-white border border-slate-300 focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none transition-colors shadow-xs"
              />
            </div>

            {/* Message */}
            <div className="space-y-1 sm:col-span-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block mb-1">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows="3"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Please let us know your enquiry message in detail..."
                className="w-full bg-white border border-slate-300 focus:border-[#cca040] focus:ring-1 focus:ring-[#cca040] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-900 placeholder:text-slate-500 placeholder:font-normal focus:outline-none transition-colors leading-relaxed shadow-xs"
              />
            </div>

          </div>

          {/* Submit stack */}
          <div className="space-y-3 pt-3">
            <button
              type="submit"
              className="w-full py-3 bg-[#0E0E3B] hover:bg-[#1a1a4a] text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              Submit Enquiry
            </button>
            <p className="text-xs text-slate-600 font-semibold text-center flex items-center justify-center gap-1">
              <span>🔒</span> We respect your privacy. Your information is safe with us.
            </p>
          </div>

        </form>

      </div>
    </div>
  );
}
