import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import gameImg from '../assets/game.jpeg';

export default function About() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  const highlights = [
    {
      title: 'Years of',
      subtitle: 'Experience',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Premium',
      subtitle: 'Materials',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      )
    },
    {
      title: 'Expert',
      subtitle: 'Artisans',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
        </svg>
      )
    },
    {
      title: 'Custom',
      subtitle: 'Solutions',
      icon: (
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
        </svg>
      )
    }
  ];

  return (
    <section className="bg-white py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-12 relative border-b border-slate-100">
      <div className="max-w-[1450px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

          {/* Left Column: Image wrapper */}
          <div className="lg:col-span-5 w-full h-[280px] sm:h-[350px] md:h-[400px] lg:h-[450px] overflow-hidden rounded-2xl shadow-sm border border-slate-100">
            <img
              src={gameImg}
              alt="Artisan sculpting Buddha statue"
              className="w-full h-full object-cover object-center"
            />
          </div>

          {/* Right Column: Content */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-[0.25em] text-[#C89B3C] block mb-2">
                ABOUT INDIAN DHAMMA ART
              </span>

              <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0E0E3B] leading-tight">
                Traditional Indian Craftsmanship<br />
                Meets <span className="text-[#C89B3C]">Modern Design</span>
              </h2>

              <div className="w-full h-[1.5px] bg-[#C89B3C] mt-1.5" />
            </div>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium">
              We are a team of passionate artisans and designers committed to creating exquisite handcrafted statues and décor that inspire peace, beauty and spiritual harmony. Every piece is crafted with devotion, precision and premium quality materials.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-3">
              {highlights.map((hl, index) => (
                <div key={index} className="flex items-center gap-3.5">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] shrink-0">
                    {hl.icon}
                  </div>
                  <div className="text-left font-bold text-xs sm:text-sm text-[#0E0E3B] leading-tight">
                    <span className="block">{hl.title}</span>{' '}
                    <span className="block">{hl.subtitle}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Button */}
            {!isAboutPage && (
              <div className="pt-4">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-[#0E0E3B] hover:bg-[#1a1a4a] text-white text-xs font-bold uppercase tracking-widest rounded-md shadow-md hover:shadow-lg transition-all duration-300"
                >
                  KNOW OUR STORY
                </Link>
              </div>
            )}

          </div>

        </div>
      </div>
    </section>
  );
}
