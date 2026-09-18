import React from 'react';
import gameImg from '../assets/game.jpeg';
import artisanCraft from '../assets/artisan_craft.png';
import collectionWooden from '../assets/collection_wooden.png';
import collectionBrass from '../assets/collection_brass.png';

export default function CraftDevotion() {
  return (
    <section className="bg-white py-12 sm:py-16 md:py-20 px-4 sm:px-8 lg:px-12 border-b border-slate-100">
      <div className="max-w-[1550px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text content (35% width on desktop) */}
          <div className="lg:col-span-4 space-y-5 lg:space-y-6">
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-accent block">
              CRAFTED WITH DEVOTION
            </span>
            
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-semibold text-slate-900 leading-tight">
              The Art Behind <br className="hidden sm:inline" />
              Every Masterpiece
            </h2>
            
            <div className="h-[2px] w-12 bg-accent/40 rounded-full" />
            
            <p className="font-sans text-slate-600 text-[13px] sm:text-sm leading-relaxed sm:leading-loose">
              From the first sketch to the final polish, every step is performed with devotion by our expert artisans. We believe a statue is not just a product, it's an emotion that brings peace, positivity and divine energy.
            </p>
            
            <div className="pt-2">
              <a
                href="/custom-order#process"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#0E0E3B] hover:bg-[#1a1a4a] text-white text-xs font-bold uppercase tracking-widest rounded transition-all duration-300 shadow-sm hover:shadow-md"
              >
                SEE OUR PROCESS
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </a>
            </div>
          </div>
          
          {/* Right Column: Image Grid Collage (65% width on desktop) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-stretch">
              
              {/* Image 1: Left tall/square image */}
              <div className="sm:col-span-5 h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-slate-100/50 group">
                <img
                  src={gameImg}
                  alt="Artisan sculpting white marble Buddha"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
              {/* Image 2 & 3: Middle stacked column */}
              <div className="sm:col-span-3 flex flex-col gap-4">
                <div className="h-[132px] sm:h-[172px] md:h-[192px] rounded-2xl overflow-hidden shadow-sm border border-slate-100/50 group">
                  <img
                    src={artisanCraft}
                    alt="Elderly artisan chiseling stone Buddha"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="h-[132px] sm:h-[172px] md:h-[192px] rounded-2xl overflow-hidden shadow-sm border border-slate-100/50 group">
                  <img
                    src={collectionWooden}
                    alt="Detailed handcrafted wooden Buddha statue"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
              </div>
              
              {/* Image 4: Right tall image */}
              <div className="sm:col-span-4 h-[280px] sm:h-[360px] md:h-[400px] rounded-2xl overflow-hidden shadow-sm border border-slate-100/50 group">
                <img
                  src={collectionBrass}
                  alt="Finished golden brass Buddha statue"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
