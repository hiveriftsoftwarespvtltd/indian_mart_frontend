import React from 'react';
import SEO from '../components/SEO';
import ProductHero from '../components/ProductHero';
import ProductCatalog from '../components/ProductCatalog';
import FeaturesBar from '../components/FeaturesBar';
import CustomDesignBanner from '../components/CustomDesignBanner';

export default function Collections() {
  return (
    <div className="w-full">
      <SEO 
        title="Product Collections | Handcrafted Buddha Statues & FRP Sculptures"
        description="Browse our complete catalog of FRP Buddha Statues, Animal Sculptures, Artificial Trees, Glowing Statues, and Ashoka Pillars."
        canonical="/collections"
      />
      <ProductHero />
      <ProductCatalog />
      <FeaturesBar />
      <CustomDesignBanner />
    </div>
  );
}



