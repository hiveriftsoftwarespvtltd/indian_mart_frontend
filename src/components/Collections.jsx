import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../utils/api';
import luxuryBuddhaImg from '../assets/collection_luxury_buddha.png';
import gardenImg from '../assets/collection_garden.png';
import brassImg from '../assets/collection_brass.png';
import woodenImg from '../assets/collection_wooden.png';
import modernDecorImg from '../assets/collection_modern_decor.png';
import corporateGiftImg from '../assets/collection_corporate_gift.png';

const getCategoryImage = (name) => {
  const lowercase = name.toLowerCase();
  if (lowercase.includes('buddha')) return luxuryBuddhaImg;
  if (lowercase.includes('animal') || lowercase.includes('lion')) return gardenImg;
  if (lowercase.includes('brass')) return brassImg;
  if (lowercase.includes('wooden') || lowercase.includes('tree')) return woodenImg;
  if (lowercase.includes('decor')) return modernDecorImg;
  return corporateGiftImg;
};

export default function Collections() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.categories.getAll()
      .then(data => {
        const featuredList = data.filter(cat => cat.featured);
        featuredList.sort((a, b) => new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0));
        setCategories(featuredList.slice(0, 6));
      })
      .catch(err => console.error("Failed to load featured categories:", err));
  }, []);

  const displayCategories = categories.length > 0 ? categories : [
    { name: 'Fiber Buddha Statue' },
    { name: 'Fiber Animal Statue' },
    { name: 'Artificial Tree' },
    { name: 'Wooden Art' },
    { name: 'Modern Decor' },
    { name: 'Corporate Gift' }
  ];

  return (
    <section id="collections" className="bg-white py-8 sm:py-12 md:py-14 px-4 sm:px-8 lg:px-12 border-b border-slate-100">
      <div className="max-w-[1750px] mx-auto">

        {/* Section Title */}
        <h2 className="text-center font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold uppercase tracking-[0.18em] text-[#0E0E3B] mb-10">
          Featured <span className="text-[#C89B3C]">Collections</span>
        </h2>

        {/* 6-Column Responsive Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 justify-center">
          {displayCategories.map((col, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-2xl overflow-hidden shadow-sm group border border-slate-100/80 transition-all duration-300 hover:scale-[1.03] hover:shadow-md cursor-pointer"
            >
              {/* Background Image */}
              <img
                src={col.image || getCategoryImage(col.name)}
                alt={`${col.name} Collection`}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />

              {/* Content Overlay */}
              <div className="absolute inset-0 flex flex-col justify-end items-center text-center p-4 pb-6 z-20 space-y-3">

                {/* Title & Subtitle */}
                <div className="text-white">
                  <h4 className="font-serif text-sm sm:text-base md:text-lg font-bold leading-tight tracking-wide">
                    {col.name}
                  </h4>
                  <span className="font-serif text-[11px] sm:text-xs text-slate-200 tracking-wider">
                    Collection
                  </span>
                </div>

                {/* Explore Button */}
                <Link
                  to="/collections"
                  className="bg-white hover:bg-slate-100 text-slate-900 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest px-4 py-1.5 rounded shadow-sm transition-colors"
                >
                  Explore
                </Link>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
