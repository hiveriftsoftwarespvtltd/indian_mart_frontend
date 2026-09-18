import React from 'react';
import svg1 from '../assets/SVg 01.svg';
import svg2 from '../assets/Svg 02.svg';
import svg3 from '../assets/SVg03.svg';
import svg4 from '../assets/SVg 04.svg';
import svg5 from '../assets/SVG 05.svg';
import svg6 from '../assets/SVg 06.svg';
import svg7 from '../assets/Svg 07.svg';
import svg8 from '../assets/SVg 08.svg';

export default function WhyChooseUs() {
  const colFeatures = [
    { title: 'Premium Materials', icon: svg1 },
    { title: 'Full Devotion', icon: svg2 },
    { title: 'Corporate Decor', icon: svg4 },
    { title: 'Quality Assurance', icon: svg3 }
  ];

  const artFeatures = [
    { title: 'Bulk Manufacturing', icon: svg5 },
    { title: 'Safe Packaging', icon: svg6 },
    { title: 'Worldwide Shipping', icon: svg7 },
    { title: 'Dedicated Support', icon: svg8 }
  ];

  return (
    <section className="bg-[#0E0E3B] py-8 md:py-10 px-4 sm:px-8 md:px-16 border-t border-b border-[#1a1a4a] relative overflow-hidden">

      {/* Central Full-Height Vertical Golden Line Divider */}
      <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-[2px] bg-[#C89B3C] z-10 pointer-events-none opacity-90 shadow-[0_0_8px_rgba(200,155,60,0.4)]" />

      <div className="max-w-[1550px] mx-auto md:px-6 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-8 xl:gap-14 relative">

          {/* Section 1: Collections */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-center font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.16em] text-white pb-2">
              <span className="text-[#C89B3C]">Why</span> Choose Collections
            </h3>

            {/* Boxed Items: Grid on mobile/tablet, Flex with dividers on desktop */}
            <div className="grid grid-cols-2 lg:flex gap-3 lg:gap-0 lg:border lg:border-white/80 lg:rounded-2xl lg:bg-[#0E0E3B]/30 lg:py-6 lg:px-2 lg:divide-x lg:divide-white/80">
              {colFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="border border-white/80 lg:border-0 bg-[#0E0E3B]/30 lg:bg-transparent rounded-2xl lg:rounded-none p-4 lg:p-0 flex-1 flex flex-col items-center justify-center text-center space-y-3.5 px-2 aspect-[4/5] lg:aspect-auto"
                >
                  <div className="flex items-center justify-center h-20 w-20 xl:h-24 xl:w-24">
                    <img src={feat.icon} alt={feat.title} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-sans text-[11px] xl:text-xs font-bold text-slate-100 tracking-wide leading-tight">
                    {feat.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block">{word}{' '}</span>
                    ))}
                  </h4>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Dhamma Art */}
          <div className="space-y-4 lg:space-y-6">
            <h3 className="text-center font-serif text-base sm:text-lg md:text-xl lg:text-2xl font-bold uppercase tracking-[0.16em] text-white pb-2">
              <span className="text-[#C89B3C]">Why</span> Choose Indian Dhamma Art
            </h3>

            {/* Boxed Items: Grid on mobile/tablet, Flex with dividers on desktop */}
            <div className="grid grid-cols-2 lg:flex gap-3 lg:gap-0 lg:border lg:border-white/80 lg:rounded-2xl lg:bg-[#0E0E3B]/30 lg:py-6 lg:px-2 lg:divide-x lg:divide-white/80">
              {artFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className="border border-white/80 lg:border-0 bg-[#0E0E3B]/30 lg:bg-transparent rounded-2xl lg:rounded-none p-4 lg:p-0 flex-1 flex flex-col items-center justify-center text-center space-y-3.5 px-2 aspect-[4/5] lg:aspect-auto"
                >
                  <div className="flex items-center justify-center h-20 w-20 xl:h-24 xl:w-24">
                    <img src={feat.icon} alt={feat.title} className="w-full h-full object-contain" />
                  </div>
                  <h4 className="font-sans text-[11px] xl:text-xs font-bold text-slate-100 tracking-wide leading-tight">
                    {feat.title.split(' ').map((word, wIdx) => (
                      <span key={wIdx} className="block">{word}{' '}</span>
                    ))}
                  </h4>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
