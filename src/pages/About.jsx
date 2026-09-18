import React from 'react';
import SEO from '../components/SEO';
import AboutHero from '../components/AboutHero';
import AboutSection from '../components/About';
import CraftDevotion from '../components/CraftDevotion';
import OurValues from '../components/OurValues';
import CTA from '../components/CTA';
import TeamSection from '../components/TeamSection';

export default function About() {
  return (
    <div className="w-full">
      <SEO 
        title="About Us | Indian Dhamma Art - Master Artisan Sculptures"
        description="Learn about Indian Dhamma Art, our heritage, master artisans, and dedication to crafting high-quality Buddha Statues and custom FRP artwork."
        canonical="/about"
      />
      <AboutHero />
      <AboutSection />
      <OurValues />
      <CraftDevotion />
      
      {/* <TeamSection /> */}
      <CTA />
    </div>
  );
}
