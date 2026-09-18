import React from 'react';
import { Link } from 'react-router-dom';
import customCtaBg from '../assets/custom_cta_bg.png';

export default function CTA() {
  return (
    <section
      className="relative py-10 md:py-12 px-6 sm:px-12 lg:px-16 overflow-hidden bg-cover bg-right bg-no-repeat border-t border-[#C89B3C]/10 bg-[#0E0E3B]"
      style={{ backgroundImage: `url(${customCtaBg})` }}
    >
      {/* Background rich navy gradient overlay to keep left side readable and expose right side Buddha face */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0E0E3B] via-[#0E0E3B]/95 to-[#0E0E3B]/20 pointer-events-none" />

      <div className="max-w-[1550px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12 relative z-10">
        
        {/* Left Column: Title, description, and button */}
        <div className="w-full lg:w-[35%] space-y-4 text-left lg:pr-4 shrink-0">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#C89B3C] leading-tight">
            Let's Create Something<br />
            Meaningful Together
          </h2>
          
          <p className="text-slate-300 text-xs sm:text-sm max-w-sm font-medium leading-relaxed">
            Have a custom requirement? Our experts are here to turn your ideas into timeless masterpieces.
          </p>

          <div className="pt-1">
            <Link
              to="/custom-order"
              className="inline-flex justify-center items-center px-6 py-3 bg-[#C89B3C] hover:bg-[#B8862B] text-white font-bold uppercase tracking-wider text-[11px] sm:text-xs rounded-lg transition-all duration-300 hover:scale-[1.02] cursor-pointer shadow-md"
            >
              GET A FREE CONSULTATION
            </Link>
          </div>
        </div>

        {/* Steps container: 3 steps horizontally on md/lg, vertical on mobile */}
        <div className="w-full lg:w-[60%] flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 lg:pl-6">
          
          {/* Step 1: Share Your Idea */}
          <div className="flex-1 w-full flex flex-col items-center text-center space-y-3 px-2">
            <svg className="w-9 h-9 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m11.314 11.314l-.707.707M12 5a7 7 0 00-7 7c0 2.9 1.76 5.39 4.3 6.46a1 1 0 01.7.94v1.6a1 1 0 001 1h2a1 1 0 001-1v-1.6a1 1 0 01.7-.94c2.54-1.07 4.3-3.56 4.3-6.46a7 7 0 00-7-7z" />
            </svg>
            <div className="space-y-1">
              <h3 className="text-white text-xs sm:text-sm font-bold tracking-wide">
                Share Your Idea
              </h3>
              <p className="text-slate-400 text-[15px] leading-relaxed font-medium">
                Tell us what you envision.
              </p>
            </div>
          </div>

          {/* Divider 1 */}
          <div className="hidden md:block w-[1px] h-16 bg-slate-700/50 self-center" />

          {/* Step 2: We Design & Craft */}
          <div className="flex-1 w-full flex flex-col items-center text-center space-y-3 px-2">
            <svg className="w-9 h-9 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94L14.7 6.3z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.3 14.7L6.3 17.7M17.7 6.3l-3 3" />
            </svg>
            <div className="space-y-1">
              <h3 className="text-white text-xs sm:text-sm font-bold tracking-wide">
                We Design & Craft
              </h3>
              <p className="text-slate-400 text-[15px] leading-relaxed font-medium">
                Designed with precision <br /> and handcrafted with care.
              </p>
            </div>
          </div>

          {/* Divider 2 */}
          <div className="hidden md:block w-[1px] h-16 bg-slate-700/50 self-center" />

          {/* Step 3: Delivered With Care */}
          <div className="flex-1 w-full flex flex-col items-center text-center space-y-3 px-2">
            <svg className="w-9 h-9 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 7l10 4 10-4-10-4zM2 7v10l10 4M22 7v10l-10 4M12 11v10" />
            </svg>
            <div className="space-y-1">
              <h3 className="text-white text-xs sm:text-sm font-bold tracking-wide">
                Delivered With Care
              </h3>
              <p className="text-slate-400 text-[15px] leading-relaxed font-medium">
                Safe packaging and <br /> timely delivery.
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
