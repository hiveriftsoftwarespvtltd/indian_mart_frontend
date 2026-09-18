import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import SEO from '../components/SEO';
import galleryHero from '../assets/gallery.png';
import galleryMobileHero from '../assets/gallerymobile.png';
import GalleryCTA from '../components/GalleryCTA';
import GalleryStatsBar from '../components/GalleryStatsBar';

// Import showcasing assets
import one1 from '../assets/one1.png';
import one2 from '../assets/one2.png';
import one3 from '../assets/one3.png';
import one4 from '../assets/one4.png';
import one5 from '../assets/one5.png';
import one6 from '../assets/one6.png';
import one7 from '../assets/one7.png';
import one8 from '../assets/one8.png';
import one9 from '../assets/one9.png';
import one10 from '../assets/one10.png';
import one11 from '../assets/one11.png';
import one12 from '../assets/one12.png';
import one13 from '../assets/one13.png';
import one14 from '../assets/one14.png';
import one15 from '../assets/one15.png';
import one16 from '../assets/one16.png';
import one17 from '../assets/one17.png';
import one18 from '../assets/one18 (1).png';
import one19 from '../assets/one19.png';
import one20 from '../assets/one20.png';
import one21 from '../assets/one21.png';

const categoriesList = [
  {
    id: 'all',
    name: 'All',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )
  },
  {
    id: 'buddha',
    name: 'Buddha Statues',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21c-3.5 0-6.5-1.5-6.5-4.5s1.5-4 4.5-4.5c.5-.1.5-.5.5-.8V10.7c-.8-.4-1.5-1.3-1.5-2.4 0-1.5 1.3-2.8 3-2.8s3 1.3 3 2.8c0 1.1-.7 2-1.5 2.4v.5c0 .3 0 .7.5.8 3 .5 4.5 1.5 4.5 4.5S15.5 21 12 21z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6.5c0-1.5.8-2 2-2s2 .5 2 2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 16.5h6" />
      </svg>
    )
  },
  {
    id: 'animal',
    name: 'Animal Statues',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14.5c0-.8-.7-1.5-1.5-1.5H16l-3-4V4.5c0-.8-.7-1.5-1.5-1.5S10 3.7 10 4.5v3.6L6.5 10H5c-.8 0-1.5.7-1.5 1.5v5.5c0 .8.7 1.5 1.5 1.5h1v3h2v-3h8v3h2v-3h1c.8 0 1.5-.7 1.5-1.5v-3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 4.5h3" />
      </svg>
    )
  },
  {
    id: 'trees',
    name: 'Artificial Trees',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20v-8m0 0a5 5 0 00-5-5m5 5a5 5 0 015-5m-5 5V3m-4.5 4a3.5 3.5 0 117 0" />
      </svg>
    )
  },
  {
    id: 'god',
    name: 'God Statues',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a4 4 0 00-4 4c0 2 2.5 3 4 5 1.5-2 4-3 4-5a4 4 0 00-4-4zM6 14.5c0-2.5 2.7-3.5 6-3.5s6 1 6 3.5v5H6v-5z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 18h4" />
      </svg>
    )
  },
  {
    id: 'sculpture',
    name: 'Sculpture Art',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 2c1.5 0 2.5 1 2.5 2.5S13 7 12 9s-2.5-3.5-2.5-4.5S10.5 2 12 2zM6 15c0-3 3-5 6-5s6 2 6 5v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4z" />
      </svg>
    )
  },
  {
    id: 'glowing',
    name: 'Glowing Statues',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6a3 3 0 100 6 3 3 0 000-6zM5.5 12h13M12 5.5v13M7.4 7.4l9.2 9.2M16.6 7.4L7.4 16.6" />
      </svg>
    )
  },
  {
    id: 'ashoka',
    name: 'Ashoka Pillar',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 21h8M10 21V5a1 1 0 011-1h2a1 1 0 011 1v16M7 5.5h10M6 8.5h12" />
      </svg>
    )
  },
  {
    id: 'others',
    name: 'Others',
    icon: (isActive) => (
      <svg className={`w-7 h-7 transition-colors duration-250 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-[#cca040]'}`} fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    )
  }
];

export const galleryItems = [
  { id: 1, category: 'Buddha Statues', image: one1 },
  { id: 2, category: 'Artificial Trees', image: one2 },
  { id: 3, category: 'God Statues', image: one3 },
  { id: 4, category: 'Artificial Trees', image: one4 },
  { id: 5, category: 'Buddha Statues', image: one5 },
  { id: 6, category: 'Animal Statues', image: one6 },
  { id: 7, category: 'Buddha Statues', image: one7 },
  { id: 8, category: 'Buddha Statues', image: one8 },
  { id: 9, category: 'Animal Statues', image: one9 },
  { id: 10, category: 'God Statues', image: one10 },
  { id: 11, category: 'Animal Statues', image: one11 },
  { id: 12, category: 'Ashoka Pillar', image: one12 },
  { id: 13, category: 'Artificial Trees', image: one13 },
  { id: 14, category: 'Others', image: one14 },
  { id: 15, category: 'Artificial Trees', image: one15 },
  { id: 16, category: 'Buddha Statues', image: one16 },
  { id: 17, category: 'Animal Statues', image: one17 },
  { id: 18, category: 'Animal Statues', image: one18 },
  { id: 19, category: 'Buddha Statues', image: one19 },
  { id: 20, category: 'Artificial Trees', image: one20 },
  { id: 21, category: 'Animal Statues', image: one21 }
];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');
  const [liveGallery, setLiveGallery] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);

  useEffect(() => {
    api.gallery.getAll()
      .then(data => setLiveGallery(data))
      .catch(err => console.error("Failed to fetch gallery:", err));
  }, []);

  const displayItems = liveGallery.length > 0 ? liveGallery : galleryItems;

  const sortedItems = [...displayItems];
  // Sort only so that newer database entries (with createdAt) bubble up to the top
  sortedItems.sort((a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    return timeB - timeA;
  });

  const filteredItems = sortedItems.filter((item) => {
    return selectedCategory === 'All' || item.category === selectedCategory;
  });

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const showPrev = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const showNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedImageIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredItems.length]);

  return (
    <div className="w-full bg-white min-h-screen">
      <SEO 
        title="Art & Sculpture Gallery | Indian Dhamma Art"
        description="View our high-definition image showcase of handcrafted Buddha Statues, Fiber Sculptures, Artificial Plants & Custom Decor projects."
        canonical="/gallery"
      />
      
      {/* Hero Banner Section */}
      <div className="w-full relative">
        {/* Desktop Banner */}
        <img
          src={galleryHero}
          alt="Art Gallery Banner"
          className="hidden sm:block w-full h-auto"
          loading="eager"
        />
        {/* Mobile Banner */}
        <img
          src={galleryMobileHero}
          alt="Art Gallery Banner Mobile"
          className="block sm:hidden w-full h-auto"
          loading="eager"
        />
      </div>

      {/* Floating Filter Container - Overlapping the Hero Banner */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 -mt-6 sm:-mt-10 md:-mt-14 lg:-mt-16 relative z-20">
        <div className="bg-white border border-slate-100/80 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-lg">
          <div className="flex items-center justify-start lg:justify-between gap-4 sm:gap-6 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {categoriesList.map((cat) => {
              const isActive = selectedCategory === cat.name;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`group flex flex-col items-center justify-center gap-2 px-5 py-3.5 rounded-xl transition-all duration-300 min-w-[110px] shrink-0 ${
                    isActive
                      ? 'bg-[#0E0E3B] text-white shadow-md scale-105'
                      : 'bg-transparent text-slate-500 hover:bg-slate-100/60 hover:text-slate-800'
                  }`}
                >
                  {/* Icon */}
                  <div className="flex items-center justify-center">
                    {cat.icon(isActive)}
                  </div>
                  
                  {/* Name */}
                  <span className="text-[11.5px] font-bold tracking-wide text-center">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid Content Section */}
      <div className="max-w-[1450px] mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-12 space-y-6">
        
        {/* Grid Title & Sort Options */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200/60 pb-4">
          <div>
            <h2 className="font-serif text-lg font-bold text-slate-800 relative inline-block">
              {selectedCategory === 'All' ? 'All Collections' : selectedCategory} ({filteredItems.length})
              <div className="absolute -bottom-4.5 left-0 w-12 h-[2.5px] bg-[#cca040] rounded-full" />
            </h2>
          </div>
          
          <div className="flex items-center gap-4 text-xs font-medium text-slate-500 self-end sm:self-center">
            {/* Sort dropdown mimic */}
            <div className="relative flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 cursor-pointer hover:bg-slate-100 transition-colors">
              <span className="text-slate-700">Sort By: {sortBy}</span>
              <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Layout switch icons mimic */}
            <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5 bg-slate-50">
              <button className="p-1 rounded bg-white text-slate-700 shadow-sm">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </button>
              <button className="p-1 rounded text-slate-400 hover:text-slate-800">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column on Mobile, 4-Column on Desktop Showcase Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {filteredItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => openLightbox(idx)}
                className="group bg-white rounded-2xl border border-slate-100/80 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-300 relative cursor-pointer"
              >
                <div className="relative aspect-square overflow-hidden bg-slate-50">
                  <img
                    src={item.imageUrl || item.image}
                    alt="Art Gallery Item"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-xs flex items-center justify-center text-slate-800 shadow-md transform scale-90 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-5 h-5 text-[#0E0E3B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 space-y-3 bg-white border border-slate-100/80 rounded-2xl shadow-sm">
            <span className="text-3xl">🪷</span>
            <h4 className="text-sm font-bold text-slate-700">No artworks found in this category</h4>
            <p className="text-xs text-slate-400">Please choose a different category or search other collections.</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImageIndex !== null && filteredItems[selectedImageIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 transition-opacity duration-300"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 bg-white/15 hover:bg-white/30 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-all z-50 cursor-pointer shadow-md"
            aria-label="Close Preview"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev Button */}
          {filteredItems.length > 1 && (
            <button
              type="button"
              onClick={showPrev}
              className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/35 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-50 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
              aria-label="Previous Image"
            >
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Next Button */}
          {filteredItems.length > 1 && (
            <button
              type="button"
              onClick={showNext}
              className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 hover:bg-white/35 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all z-50 cursor-pointer shadow-lg hover:scale-110 active:scale-95"
              aria-label="Next Image"
            >
              <svg className="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Image & Caption Container */}
          <div 
            className="max-w-[90vw] max-h-[85vh] flex flex-col items-center justify-center relative select-none z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={filteredItems[selectedImageIndex].imageUrl || filteredItems[selectedImageIndex].image}
              alt={filteredItems[selectedImageIndex].category || 'Enlarged Art Image'}
              className="max-w-full max-h-[78vh] object-contain rounded-2xl shadow-2xl border border-white/10"
            />
            <div className="mt-3.5 text-center space-y-1">
              <p className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                {filteredItems[selectedImageIndex].category || 'Handcrafted Art Showcase'}
              </p>
              <p className="text-slate-400 text-[11px] font-medium">
                {selectedImageIndex + 1} of {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Page Bottom CTA Section */}
      <GalleryCTA />

      {/* Gallery Stats Bar Section */}
      <div className="pb-12 sm:pb-16 px-4 sm:px-6 lg:px-12">
        <GalleryStatsBar />
      </div>
      
    </div>
  );
}
