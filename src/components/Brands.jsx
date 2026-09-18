import React from 'react';

export default function Brands() {
  const brands = [
    {
      name: 'Taj Hotels',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Taj_Hotels_logo.svg/3840px-Taj_Hotels_logo.svg.png',
      height: 'h-8 sm:h-11 lg:h-14'
    },
    {
      name: 'ITC Hotels',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/ITC_Hotels_logo.svg/1280px-ITC_Hotels_logo.svg.png',
      height: 'h-8 sm:h-11 lg:h-14'
    },
    {
      name: 'Radisson',
      logo: 'https://images.seeklogo.com/logo-png/24/1/radisson-blu-logo-png_seeklogo-247458.png',
      height: 'h-7 sm:h-10 lg:h-13'
    },
    {
      name: 'DLF Hospitality',
      logo: 'https://media.dlfhospitality.com/pages/web_v2/1749723128995_DLF_Hospitality_Logo_Primary_Black.png',
      height: 'h-8 sm:h-11 lg:h-14'
    },
    {
      name: 'Godrej',
      logo: 'https://images.seeklogo.com/logo-png/6/1/godrej-logo-png_seeklogo-61760.png',
      height: 'h-7 sm:h-10 lg:h-13'
    },
    {
      name: 'Prestige Group',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/22/Prestige_Group.png/250px-Prestige_Group.png',
      height: 'h-8 sm:h-11 lg:h-14'
    },
    {
      name: 'Apollo Hospitals',
      logo: 'https://upload.wikimedia.org/wikipedia/en/c/c5/Apollo_Hospitals_Logo.svg',
      height: 'h-8 sm:h-11 lg:h-14'
    }
  ];

  // Duplicate the list of brands to make a seamless infinite loop on wide screens
  const duplicatedBrands = [...brands, ...brands, ...brands, ...brands];

  return (
    <section className="bg-[#f5f2eb] py-8 sm:py-10 border-y border-slate-200/60 overflow-hidden relative">
      <div className="max-w-[1750px] mx-auto">
        
        {/* Section Title */}
        <h2 className="text-center font-serif text-[11px] sm:text-xs md:text-sm lg:text-2xl font-bold uppercase tracking-[0.25em] text-[#0E0E3B] mb-8 px-6">
          Trusted by <span className="text-[#C89B3C]">Businesses</span> Across India
        </h2>

        {/* Infinite Loop Marquee Container */}
        <div className="w-full overflow-hidden flex relative">
          
          {/* Shadow Gradients for smooth fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#f5f2eb] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#f5f2eb] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Track */}
          <div className="animate-marquee items-center">
            {duplicatedBrands.map((brand, index) => (
              <div 
                key={index}
                className="flex justify-center items-center shrink-0 w-auto h-18 sm:h-24 lg:h-28 mx-2 sm:mx-6 lg:mx-8 hover:scale-[1.05] transition-transform duration-300"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name} 
                  className="h-12 sm:h-16 lg:h-20 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

        </div>

        {/* Decorative Indicator Dots */}
        <div className="flex justify-center items-center gap-3.5 mt-8">
          <span className="brand-dot-1 w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform" />
          <span className="brand-dot-2 w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform" />
          <span className="brand-dot-3 w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform" />
          <span className="brand-dot-4 w-3 h-3 rounded-full cursor-pointer hover:scale-110 transition-transform" />
        </div>

      </div>
    </section>
  );
}
