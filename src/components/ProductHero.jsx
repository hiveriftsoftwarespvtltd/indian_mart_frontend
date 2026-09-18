import React from 'react';
import ourProductHero from '../assets/ourproducthero.png';
import productMobileHero from '../assets/productmobilehero.png';

export default function ProductHero() {
  return (
    <section className="w-full bg-[#FAF9F8]">
      {/* Desktop/Tablet view: Landscape banner */}
      <img
        src={ourProductHero}
        alt="Our Products Banner"
        className="hidden sm:block w-full h-auto"
        loading="eager"
      />

      {/* Mobile view: Portrait banner */}
      <img
        src={productMobileHero}
        alt="Our Products Banner Mobile"
        className="block sm:hidden w-full h-auto"
        loading="eager"
      />
    </section>
  );
}
