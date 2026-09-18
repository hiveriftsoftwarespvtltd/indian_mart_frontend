import React from 'react';
import SEO from '../components/SEO';
import ContactComponent from '../components/Contact';
import ContactFeatures from '../components/ContactFeatures';
import contacthero from '../assets/contacthero.png';
import contactmobile from '../assets/contactmobile.png';

export default function Contact() {
  return (
    <div className="w-full bg-white">
      <SEO
        title="Contact Us | Indian Dhamma Art - Nangloi, New Delhi Studio"
        description="Contact Indian Dhamma Art studio at 46/7 Ranhola Vihar, Nangloi, Delhi - 110041. Call +91 85068 65563 or email info@indiandhammaart.com for custom statue quotes."
        canonical="/contact"
      />
      {/* Hero Banner Section */}
      <div className="w-full relative">
        {/* Desktop Banner */}
        <img
          src={contacthero}
          alt="Contact Us Banner"
          className="hidden sm:block w-full h-auto"
          loading="eager"
        />
        {/* Mobile Banner */}
        <img
          src={contactmobile}
          alt="Contact Us Banner Mobile"
          className="block sm:hidden w-full h-auto"
          loading="eager"
        />
      </div>

      {/* Main Contact Studio and Enquiry Form Section */}
      <div className="py-10">
        <ContactComponent />
      </div>

      {/* Bottom Features/Benefits Bar */}
      <ContactFeatures />
    </div>
  );
}
