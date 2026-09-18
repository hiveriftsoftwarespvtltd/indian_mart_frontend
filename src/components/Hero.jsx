import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Palette, Award, Hammer, Truck } from 'lucide-react';
import { api } from '../utils/api';

import slide1 from '../assets/slide1.png';
import slide2 from '../assets/slide2.png';
import slide3 from '../assets/slide3.png';

const mobileFallbacks = [slide1, slide2, slide3];

const renderTwoColorTitle = (rawTitle) => {
  const titleText = rawTitle || 'Handcrafted Buddha Statues & Premium Décor';
  const words = titleText.trim().split(' ');
  if (words.length <= 1) {
    return <span className="text-[#D9AA47]">{titleText}</span>;
  }

  const accentWordCount = words.length >= 4 ? 2 : 1;
  const accentPart = words.slice(0, accentWordCount).join(' ');
  const mainPart = words.slice(accentWordCount).join(' ');

  return (
    <>
      <span className="text-[#D9AA47] drop-shadow-[0_2px_10px_rgba(200,155,60,0.4)] mr-2 sm:mr-3 inline-block">
        {accentPart}
      </span>{' '}
      <span className="text-white inline">
        {mainPart}
      </span>
    </>
  );
};

export default function Hero() {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    api.banners.getActive()
      .then(data => {
        if (data && Array.isArray(data)) {
          const activeBanners = data.filter(b => b.active);
          setBanners(activeBanners);
        }
      })
      .catch(err => console.error("Failed to fetch banners for Hero:", err));
  }, []);

  const nextSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    if (banners.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  // Automatic slide transition every 8 seconds if multiple slides exist
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(nextSlide, 8000);
    return () => clearInterval(interval);
  }, [banners]);

  const currentBanner = banners[currentSlide];

  return (
    <section className="relative min-h-[500px] sm:min-h-[540px] lg:h-[560px] xl:h-[600px] flex items-center text-white overflow-hidden bg-slate-950">
      {/* Background Images with smooth cross-fade transition */}
      <div className="absolute inset-0 z-0">
        {banners.map((banner, index) => {
          const isCurrent = index === currentSlide;
          const desktopBg = banner.image || '';
          const mobileBg = banner.mobileImage || mobileFallbacks[index % mobileFallbacks.length] || desktopBg;

          return (
            <React.Fragment key={banner._id || banner.id || index}>
              {/* Desktop View Background */}
              <div
                style={desktopBg ? { backgroundImage: `url(${desktopBg})` } : {}}
                className={`hidden sm:block absolute inset-0 bg-cover bg-no-repeat bg-center lg:bg-[12%_center] transition-opacity duration-1000 ${
                  isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } ${!desktopBg ? 'hero-bg-responsive' : ''}`}
              />

              {/* Mobile View Background */}
              <div
                style={mobileBg ? { backgroundImage: `url(${mobileBg})` } : {}}
                className={`block sm:hidden absolute inset-0 bg-cover bg-no-repeat bg-center transition-opacity duration-1000 ${
                  isCurrent ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
              />
            </React.Fragment>
          );
        })}

        {/* Fallback if no active banners are available */}
        {banners.length === 0 && (
          <div className="absolute inset-0 bg-cover bg-no-repeat bg-center lg:bg-[12%_center] hero-bg-responsive" />
        )}

        {/* Dual Layer Dark Gradient Overlay for Maximum Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/30 z-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 z-0" />
      </div>

      {/* Decorative Navigation Arrows (Left/Right) */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-white text-white flex justify-center items-center bg-black/30 hover:bg-black/60 backdrop-blur-md transition-all duration-300 z-30 cursor-pointer hidden xl:flex shadow-lg"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-6 h-6 stroke-[1.5]" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full border border-white/20 hover:border-white text-white flex justify-center items-center bg-black/30 hover:bg-black/60 backdrop-blur-md transition-all duration-300 z-30 cursor-pointer hidden xl:flex shadow-lg"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-6 h-6 stroke-[1.5]" />
          </button>
        </>
      )}

      {/* Main Container */}
      <div className="max-w-[1750px] mx-auto w-full px-5 sm:px-12 lg:pl-16 lg:pr-8 xl:pl-20 xl:pr-10 pt-12 pb-14 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

          {/* Left Column: Heading, features, buttons */}
          <div className="lg:col-span-8 xl:col-span-7 space-y-5 text-left">

            {/* Premium Golden Pill Tag */}
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#C89B3C]/20 border border-[#C89B3C]/40 backdrop-blur-md text-[#D9AA47] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest shadow-sm">
               Indian Dhamma Art Collection
              </span>
            </div>

            {/* Title / Typography */}
            <div className="space-y-2.5">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-extrabold leading-tight tracking-wide drop-shadow-[0_4px_12px_rgba(0,0,0,0.85)]">
                {renderTwoColorTitle(currentBanner?.title)}
              </h1>
              <p className="text-slate-200 text-xs sm:text-base font-normal tracking-wide max-w-xl leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Bringing Peace, Positivity & Timeless Beauty to Every Space
              </p>
            </div>

            {/* Sub-Features Card */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl py-3 px-4 bg-black/40 backdrop-blur-md border border-white/15 rounded-xl shadow-inner">

              {/* Feature 1 */}
              <div className="flex flex-row items-center gap-2.5 sm:border-r border-white/15 sm:pr-2">
                <Palette className="w-5 h-5 text-[#D9AA47] stroke-[1.75] shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-100 leading-snug">
                  Custom Designs
                </span>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-row items-center gap-2.5 sm:border-r border-white/15 sm:pr-2">
                <Award className="w-5 h-5 text-[#D9AA47] stroke-[1.75] shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-100 leading-snug">
                  Premium Quality
                </span>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-row items-center gap-2.5 sm:border-r border-white/15 sm:pr-2">
                <Hammer className="w-5 h-5 text-[#D9AA47] stroke-[1.75] shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-100 leading-snug">
                  Skilled Artisans
                </span>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-row items-center gap-2.5">
                <Truck className="w-5 h-5 text-[#D9AA47] stroke-[1.75] shrink-0" />
                <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-slate-100 leading-snug">
                  Pan India Delivery
                </span>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex flex-row flex-wrap items-center gap-3 pt-2">
              <Link
                to={currentBanner?.link || "/collections"}
                className="px-5 sm:px-7 py-3 bg-gradient-to-r from-[#C89B3C] to-[#B8862B] hover:from-[#B8862B] hover:to-[#A67520] text-white font-extrabold uppercase tracking-widest text-[10px] sm:text-xs rounded-xl transition-all duration-300 text-center shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer"
              >
                Explore Collections &rarr;
              </Link>
              <Link
                to="/custom-order"
                className="px-5 sm:px-7 py-3 bg-white/10 hover:bg-white/20 border border-white/30 hover:border-white text-white font-extrabold uppercase tracking-widest text-[10px] sm:text-xs rounded-xl backdrop-blur-md transition-all duration-300 text-center hover:scale-[1.02] cursor-pointer"
              >
                Request Custom Design
              </Link>
            </div>

          </div>

          <div className="hidden lg:block lg:col-span-4 xl:col-span-5" />

        </div>
      </div>
    </section>
  );
}
