import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({
  title = 'Indian Dhamma Art | Handcrafted Buddha Statues & Premium FRP Decor',
  description = 'Indian Dhamma Art is a premier manufacturer & studio of handcrafted Fiber Buddha Statues, FRP Sculptures, Artificial Trees, Ashoka Pillars & Custom Temple Decor in Delhi, India.',
  keywords = 'Buddha Statues, FRP Sculptures, Fiber Buddha, Artificial Trees, Ashoka Pillar, Temple Statues, Garden Decor, Indian Dhamma Art, Custom Statues Delhi',
  canonical,
  ogImage = 'https://dhammaart.com/uploads/logo.png',
  ogType = 'website',
  schemaData = null
}) {
  const siteUrl = 'https://dhammaart.com';
  const fullCanonical = canonical ? `${siteUrl}${canonical}` : siteUrl;

  const defaultSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    'name': 'Indian Dhamma Art',
    'image': ogImage,
    'url': siteUrl,
    'telephone': '+91 85068 65563',
    'email': 'info@indiandhammaart.com',
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': '46/7 Ranhola Vihar, Nangloi',
      'addressLocality': 'New Delhi',
      'postalCode': '110041',
      'addressCountry': 'IN'
    },
    'description': description,
    'priceRange': '₹₹'
  };

  return (
    <Helmet>
      {/* Basic HTML Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph Meta Tags (Facebook / WhatsApp / LinkedIn) */}
      <meta property="og:site_name" content="Indian Dhamma Art" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Structured Data (JSON-LD) for Google Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify(schemaData || defaultSchema)}
      </script>
    </Helmet>
  );
}
