import React from 'react';
import SEO from '../components/SEO';
import Hero from '../components/Hero';
import Brands from '../components/Brands';
import About from '../components/About';
import Expertise from '../components/Expertise';
import Collections from '../components/Collections';
import CustomOrder from '../components/CustomOrder';
import WhyChooseUs from '../components/WhyChooseUs';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Contact from '../components/Contact';
import StudioEnquiry from '../components/StudioEnquiry';

export default function Home() {
  return (
    <div className="w-full">
      <SEO 
        title="Indian Dhamma Art | Handcrafted Buddha Statues & FRP Sculptures"
        description="Explore premium handcrafted Fiber Buddha Statues, FRP Sculptures, Artificial Trees & Custom Temple Decor by Indian Dhamma Art in Delhi, India."
        canonical="/"
      />
      <Hero />
      <Brands />
      <Expertise />
      <About />
      {/* <Collections /> */}
      <CustomOrder />
      <WhyChooseUs />
      <Projects />
      <Blog />
      <StudioEnquiry />
    </div>
  );
}
