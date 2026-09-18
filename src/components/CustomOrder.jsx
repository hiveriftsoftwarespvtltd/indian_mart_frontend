import React, { useState } from 'react';
import { api } from '../utils/api';
import customBannerBg from '../assets/custom_design_banner_bg.png';
import artisanCraftImg from '../assets/artisan_craft.png';

// SVGs
import svg1 from '../assets/01.svg';
import svg2 from '../assets/02.svg';
import svg3 from '../assets/03.svg';
import svg4 from '../assets/04.svg';
import svg5 from '../assets/05.svg';
import svg6 from '../assets/06.svg';
import svg7 from '../assets/07.svg';
import svg8 from '../assets/08.svg';

export default function CustomOrder({ showForm = false, showHero = false }) {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    material: 'FRP (Fiberglass)',
    size: '3 Feet',
    finish: 'Bronze/Copper Finish',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email || '');
      formData.append('subject', 'Custom Order Request');
      formData.append('message', `Material: ${form.material}\nTarget Height: ${form.size}\nFinish Preference: ${form.finish}\n\nEnquiry Notes: ${form.message}`);
      await api.enquiries.create(formData);
      
      const waMessage = `Hi! I want to request a Custom Order.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || 'N/A'}\n*Material Choice:* ${form.material}\n*Target Height:* ${form.size}\n*Finish:* ${form.finish}\n*Requirements:* ${form.message}`;
      const waUrl = `https://wa.me/918506865563?text=${encodeURIComponent(waMessage)}`;
      
      setSubmitted(true);
      setForm({
        name: '',
        phone: '',
        email: '',
        material: 'FRP (Fiberglass)',
        size: '3 Feet',
        finish: 'Bronze/Copper Finish',
        message: ''
      });
      window.open(waUrl, '_blank');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      alert('Failed to submit consultation request: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    { 
      title: 'Requirement Discussion', 
      desc: 'We connect to understand your space, dimensions, design preferences, and spiritual intent.',
      icon: svg1 
    },
    { 
      title: 'Concept Design', 
      desc: 'Our design studio creates detailed sketches or 3D mockups for your validation and feedback.',
      icon: svg2 
    },
    { 
      title: 'Material Selection', 
      desc: 'Choose from weather-resistant fiberglass (FRP), premium concrete castings, natural stone, or metals.',
      icon: svg3 
    },
    { 
      title: 'Hand Crafting', 
      desc: 'Master sculptors meticulously carve and refine the details to ensure anatomical and spiritual perfection.',
      icon: svg4 
    },
    { 
      title: 'Finishing & Polishing', 
      desc: 'Artisans apply selected textures, sandstone finishes, antique metal patinas, or gold leaf gilding manually.',
      icon: svg5 
    },
    { 
      title: 'Quality Inspection', 
      desc: 'A rigid inspection check on facial aesthetics, stability, color uniformity, and structural integrity.',
      icon: svg6 
    },
    { 
      title: 'Safe Packaging', 
      desc: 'Heavy-duty multi-layered protective foam wrapping and secure wooden crates prevent transit damage.',
      icon: svg7 
    },
    { 
      title: 'Timely Delivery', 
      desc: 'Safe shipping through reliable logistics networks with door-to-door tracking and secure offloading.',
      icon: svg8 
    }
  ];

  return (
    <div className="w-full bg-[#faf8f5]">
      {/* Hero Banner (Shown only if showHero is true) */}
      {showHero && (
        <section 
          className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-8 text-center bg-cover bg-center overflow-hidden bg-no-repeat bg-[#0E0E3B]"
          style={{ backgroundImage: `url(${customBannerBg})` }}
        >
          <div className="absolute inset-0 bg-[#0E0E3B]/80 z-0" />
          <div className="relative max-w-4xl mx-auto space-y-5 z-10 text-center">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.3em] text-[#C89B3C] block">
              Bespoke Artistry & Custom Statues
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white leading-tight">
              Bring Your Spiritual Vision <br className="hidden sm:inline" /> To Life
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Collaborate directly with our studio to design and craft premium customized Buddha statues, garden sculptures, murals, and temple decor tailored to your dimensions.
            </p>
          </div>
        </section>
      )}

      {/* Main Content Split Section (Shown only if showForm is true) */}
      {showForm && (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 max-w-[1750px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* LEFT: Capabilities Description */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div className="space-y-3">
                <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] text-[#C89B3C] block">
                  Bespoke Design Suite
                </span>
                <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0E0E3B] leading-tight">
                  Any Size. Any Material. Any Finish.
                </h2>
                <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-medium">
                  At Indian Dhamma Art, we transform conceptual ideas into spiritual masterpieces. From private luxury gardens to public meditation centers, our sculptures are crafted to meet the exact architectural guidelines of your space.
                </p>
              </div>

              {/* Customization Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Box 1 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] mb-2 font-serif font-black">
                    ✥
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-800">Custom Height</h4>
                  <p className="text-[11.5px] text-slate-500 leading-normal">
                    Statues can be scaled from compact 2-foot indoor models to monumental 20-foot outdoor installations.
                  </p>
                </div>

                {/* Box 2 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] mb-2 font-serif font-black">
                    ✥
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-800">Bespoke Finish</h4>
                  <p className="text-[11.5px] text-slate-500 leading-normal">
                    Select sandstone finishes, antique metal patinas, gold leaf gilding, or contemporary glossy color tones.
                  </p>
                </div>

                {/* Box 3 */}
                <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-2">
                  <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] mb-2 font-serif font-black">
                    ✥
                  </div>
                  <h4 className="font-serif font-bold text-sm text-slate-800">Premium Materials</h4>
                  <p className="text-[11.5px] text-slate-500 leading-normal">
                    High-grade weather-resistant fiberglass (FRP), premium concrete castings, natural stone, or brass alloy.
                  </p>
                </div>

              </div>

              {/* Artisan Image Banner */}
              <div className="relative group overflow-hidden rounded-3xl border border-slate-100 shadow-sm">
                <img 
                  src={artisanCraftImg} 
                  alt="Master Artisans Crafting Buddha Statues" 
                  className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur-sm border border-slate-100 rounded-2xl p-4 max-w-sm">
                  <span className="text-[9px] font-black tracking-widest text-[#C89B3C] uppercase block mb-0.5">Studio Workshop</span>
                  <p className="text-[11.5px] font-bold text-slate-800 leading-snug">
                    Every statue is hand-refined, detailed, and checked under rigid quality control before dispatch.
                  </p>
                </div>
              </div>

            </div>

            {/* RIGHT: Consultation Form */}
            <div className="lg:col-span-5 w-full">
              <div className="bg-[#FCF5EA] border border-[#C89B3C]/35 rounded-3xl p-6 sm:p-8 shadow-sm space-y-5 text-left">
                <div className="space-y-1.5 pb-3 border-b border-[#C89B3C]/20">
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#5A3E1B]">
                    Request a Consultation
                  </h3>
                  <p className="text-xs text-[#7D5A30] font-medium leading-relaxed">
                    Provide your requirements below. Our design consultant will call you to discuss custom pricing and render draft designs.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {submitted && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-semibold px-3 py-2.5 rounded-xl text-center">
                      ✓ Request Sent! WhatsApp details are loading...
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A3E1B] block">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      className="w-full bg-white border border-[#C89B3C]/20 focus:border-[#C89B3C] rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A3E1B] block">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="Your Phone Number"
                      className="w-full bg-white border border-[#C89B3C]/20 focus:border-[#C89B3C] rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A3E1B] block">Email Address (Optional)</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      className="w-full bg-white border border-[#C89B3C]/20 focus:border-[#C89B3C] rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Dropdowns Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    
                    {/* Material dropdown */}
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A3E1B] block">Material Preference</label>
                      <select
                        name="material"
                        value={form.material}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#C89B3C]/20 focus:border-[#C89B3C] rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors"
                      >
                        <option value="FRP (Fiberglass)">FRP (Fiberglass)</option>
                        <option value="Brass / Metal Alloy">Brass / Metal Alloy</option>
                        <option value="Cast Stone / GFRC">Cast Stone / GFRC</option>
                        <option value="Natural Sandstone">Natural Sandstone</option>
                        <option value="Hand-carved Wood">Hand-carved Wood</option>
                      </select>
                    </div>

                    {/* Size dropdown */}
                    <div className="space-y-1">
                      <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A3E1B] block">Target Height/Size</label>
                      <select
                        name="size"
                        value={form.size}
                        onChange={handleChange}
                        className="w-full bg-white border border-[#C89B3C]/20 focus:border-[#C89B3C] rounded-xl px-3 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors"
                      >
                        <option value="Under 2 Feet">Under 2 Feet (Tabletop)</option>
                        <option value="3 Feet">3 Feet (Medium)</option>
                        <option value="4 Feet">4 Feet (Garden)</option>
                        <option value="5 to 6 Feet">5 to 6 Feet (Lifesize)</option>
                        <option value="8 to 10 Feet">8 to 10 Feet (Monumental)</option>
                        <option value="Above 12 Feet">Above 12 Feet (Grand Temple)</option>
                      </select>
                    </div>

                  </div>

                  {/* Finish dropdown */}
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A3E1B] block">Preferred Finish/Color</label>
                    <select
                      name="finish"
                      value={form.finish}
                      onChange={handleChange}
                      className="w-full bg-white border border-[#C89B3C]/20 focus:border-[#C89B3C] rounded-xl px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors"
                    >
                      <option value="Bronze/Copper Finish">Bronze/Copper Finish (Classic)</option>
                      <option value="Sandstone Texture">Sandstone Texture (Rustic)</option>
                      <option value="Gold-Leaf Gilding">Gold-Leaf Gilding (Ornate)</option>
                      <option value="Black Marble Glossy">Black Marble Glossy (Modern)</option>
                      <option value="Custom Colors">Other / Custom Pantone Colors</option>
                    </select>
                  </div>

                  {/* Textarea */}
                  <div className="space-y-1">
                    <label className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-[#5A3E1B] block">Special Requirements / Custom Notes *</label>
                    <textarea
                      name="message"
                      required
                      rows="3"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Describe custom size, colors, or indoor/outdoor placement..."
                      className="w-full bg-white border border-[#C89B3C]/20 focus:border-[#C89B3C] rounded-xl px-4 py-2.5 text-sm text-slate-800 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 inline-flex items-center justify-center gap-2 px-5 py-3.5 bg-[#0E0E3B] hover:bg-[#1a1a4a] text-white text-xs sm:text-sm font-extrabold uppercase tracking-widest rounded-xl transition-all duration-300 shadow-md disabled:opacity-50 hover:scale-[1.01]"
                  >
                    {loading ? 'Submitting...' : 'Submit & Discuss on WhatsApp'}
                  </button>

                </form>
              </div>
            </div>

          </div>
        </section>
      )}

      {/* 3. Manufacturing Timeline steps */}
      <section className={`${showForm ? 'bg-white border-t border-b border-slate-100' : 'bg-[#faf8f5]'} py-14 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12`}>
        <div className="max-w-[1750px] mx-auto space-y-10">
          
          {/* Section Heading */}
          <div className="text-center space-y-3">
            <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] text-[#C89B3C] block">
              Step-by-step Execution
            </span>
            <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-bold text-slate-800 tracking-wide uppercase">
              Our Custom Manufacturing Process
            </h3>
            <div className="w-16 h-[1.5px] bg-[#C89B3C] mx-auto mt-2" />
          </div>

          {/* Upgraded 8-Step Grid Cards Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 max-w-[1600px] mx-auto">
            {steps.map((step, idx) => (
              <div 
                key={idx} 
                className="group bg-white border border-slate-200/60 rounded-2xl p-6 hover:border-[#C89B3C]/50 hover:bg-[#FCF5EA]/35 transition-all duration-300 shadow-sm hover:shadow-md text-left flex flex-col justify-between min-h-[220px] sm:min-h-[240px] cursor-default"
              >
                <div className="space-y-4">
                  {/* Card Header: Step count & Outline Icon */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3.5 group-hover:border-[#C89B3C]/20 transition-colors">
                    <span className="font-serif text-3xl sm:text-4xl font-black text-[#C89B3C]/30 group-hover:text-[#C89B3C]/70 transition-colors duration-300">
                      0{idx + 1}
                    </span>
                    <div className="w-20 h-20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                      <img src={step.icon} alt={step.title} className="w-full h-full object-contain" />
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="space-y-2">
                    <h4 className="font-serif text-base sm:text-lg font-bold text-slate-800 leading-snug group-hover:text-[#0E0E3B] transition-colors">
                      {step.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-normal">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
