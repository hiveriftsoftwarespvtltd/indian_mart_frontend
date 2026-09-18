import React from 'react';
import aboutusdesktop from '../assets/aboutusshero.png';
import aboutusmobile from '../assets/aboutusmobile.png';

export default function AboutHero() {
  return (
    <section className="w-full relative .">
      {/* Desktop Banner */}
      <img
        src={aboutusdesktop}
        alt="About Us Banner"
        className="hidden sm:block w-full h-auto"
        loading="eager"
      />
      {/* Mobile Banner */}
      <img
        src={aboutusmobile}
        alt="About Us Banner Mobile"
        className="block sm:hidden w-full h-auto"
        loading="eager"
      />
    </section>
  );
}
