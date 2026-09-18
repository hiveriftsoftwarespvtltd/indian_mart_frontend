import React from 'react';
import customDesignBg from '../assets/custom_design_banner_bg.png';

export default function CustomDesignBanner() {
  return (
    <section className="bg-white py-8 sm:py-12 px-4 sm:px-6 lg:px-12">
      <div
        className="max-w-[1550px] mx-auto rounded-3xl overflow-hidden bg-cover bg-right border border-slate-900/10 relative min-h-[220px] md:min-h-[260px] flex items-center p-6 sm:p-10 md:p-12"
        style={{ backgroundImage: `url(${customDesignBg})` }}
      >
        {/* Background rich navy overlay for exact color match and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E3B]/98 via-[#0E0E3B]/90 to-[#0E0E3B]/15 pointer-events-none" />

        {/* Content Area */}
        <div className="max-w-xl space-y-4 md:space-y-5 relative z-10 text-left">
          
          {/* Title */}
          <h2 className="font-serif text-2xl sm:text-3xl md:text-[34px] font-bold text-accent leading-tight">
            Looking for Custom Design?
          </h2>
          
          {/* Subtext */}
          <p className="font-sans text-slate-300 text-xs sm:text-sm leading-relaxed max-w-md font-light">
            Share your idea and get a customized statue crafted exactly the way you envision.
          </p>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3.5 pt-2">
            {/* Request Button */}
            <a
              href="/custom-order"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#C89B3C] hover:bg-[#B8862B] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm"
            >
              Request Custom Design
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
            
            {/* Catalogue Button */}
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 border border-white hover:bg-white/10 text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-300 hover:scale-[1.02] shadow-sm"
            >
              Download Catalogue
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
