import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import SEO from '../components/SEO';

// Import assets to map to products
import luxuryBuddha from '../assets/collection_luxury_buddha.png';
import gardenBuddha from '../assets/collection_garden.png';
import brassBuddha from '../assets/collection_brass.png';
import woodenBuddha from '../assets/collection_wooden.png';
import modernDecor from '../assets/collection_modern_decor.png';
import corporateGift from '../assets/collection_corporate_gift.png';
import artisanCraft from '../assets/artisan_craft.png';
import img1 from '../assets/img1.png';

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '', file: null });
  const [enquirySubmitted, setEnquirySubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState('specs');

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        const data = await api.products.getOne(id);
        setProduct({ ...data, id: data._id });
      } catch (err) {
        console.error("Failed to load product detail:", err);
      } finally {
        setIsLoading(false);
      }
    };
    loadProduct();
  }, [id]);

  const nextImage = () => {
    if (!product) return;
    setActiveIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    if (!product) return;
    setActiveIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, file: e.target.files[0] });
  };

  const handleEnquirySubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      formData.append('phone', form.phone);
      formData.append('email', form.email || '');
      formData.append('subject', `Product Lead: ${product?.title}`);
      formData.append('message', form.message || '');
      if (form.file) {
        formData.append('image', form.file);
      }

      await api.enquiries.create(formData);

      // Construct and open WhatsApp url
      const waMessage = `Hi! I am interested in getting a quote for the "${product?.title}" statue.\n\n*Name:* ${form.name}\n*Phone:* ${form.phone}\n*Email:* ${form.email || 'N/A'}\n*Requirement:* ${form.message}`;
      const waUrl = `https://wa.me/918506865563?text=${encodeURIComponent(waMessage)}`;

      setEnquirySubmitted(true);

      // Redirect in new tab
      window.open(waUrl, '_blank');

      setTimeout(() => {
        setEnquirySubmitted(false);
        setForm({ name: '', phone: '', email: '', message: '', file: null });
      }, 4000);
    } catch (err) {
      alert("Failed to submit enquiry: " + err.message);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#FAF9F8] text-[#0E0E3B]">
        <div className="text-center space-y-4">
          <div className="animate-spin h-10 w-10 border-4 border-[#C89B3C] border-t-transparent rounded-full mx-auto"></div>
          <p className="text-sm font-semi. tracking-wider uppercase text-slate-400">Loading Product Details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center bg-[#fcfbfa] text-slate-800">
        <div className="text-center space-y-4">
          <p className="text-lg font-.">Product not found.</p>
          <Link to="/collections" className="text-blue-600 font-semi. hover:underline">Back to Collections</Link>
        </div>
      </div>
    );
  }

  // Gallery Images: Active Product Image + uploaded gallery images (with simulated fallbacks if empty)
  const galleryImages = [
    product.image,
    ...(product.images && product.images.length > 0 ? product.images : [img1, brassBuddha, luxuryBuddha])
  ].filter(Boolean);

  return (
    <div className="w-full bg-[#FAF9F8] min-h-screen text-[#0E0E3B] pb-16">
      {product && (
        <SEO 
          title={`${product.title} | Indian Dhamma Art`}
          description={product.description || `Buy handcrafted ${product.title}. Premium ${product.material || 'FRP'} sculpture for home, garden and temple spaces.`}
          canonical={`/product/${product.id}`}
          ogImage={product.image}
          ogType="product"
        />
      )}

      {/* Top Header / Breadcrumb Section (Hidden on mobile) */}
      <div className="hidden md:block max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 pt-6 pb-4 text-left">
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#C89B3C] transition-colors">Home</Link>
          <span>&rsaquo;</span>
          <Link to="/collections" className="hover:text-[#C89B3C] transition-colors">Our Products</Link>
          <span>&rsaquo;</span>
          <span className="hover:text-[#C89B3C] cursor-pointer">{product.category}</span>
          <span>&rsaquo;</span>
          <span className="text-[#C89B3C] font-.">{product.title}</span>
        </nav>
      </div>

      {/* Main 12-Column Grid Layout */}
      <div className="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-12 pt-4 md:pt-0">
        <div className="grid grid-cols-1 md:grid-cols-12 lg:grid-cols-12 gap-8 items-start">

          {/* ================= COLUMN 1: Image Gallery (col-span-5) ================= */}
          <div className="md:col-span-6 lg:col-span-5 space-y-4">
            {/* Active Display Image */}
            <div className="relative aspect-square w-full bg-white rounded-2xl overflow-hidden border border-slate-100/80 shadow-sm flex items-center justify-center group p-4">
              <img
                src={galleryImages[activeIndex]}
                alt={`${product.title} Main view`}
                className="w-full h-full object-contain"
              />

              {/* Left Slider Arrow */}
              <button
                onClick={prevImage}
                className="absolute top-1/2 left-3 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 shadow flex items-center justify-center text-slate-650 hover:text-[#C89B3C] transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>

              {/* Right Slider Arrow */}
              <button
                onClick={nextImage}
                className="absolute top-1/2 right-3 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 border border-slate-200/80 shadow flex items-center justify-center text-slate-650 hover:text-[#C89B3C] transition-colors focus:outline-none"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </div>

            {/* Thumbnails list row */}
            <div className="flex gap-3 overflow-x-auto pb-1">
              {galleryImages.map((img, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border shrink-0 bg-slate-50 transition-all p-1 flex items-center justify-center ${isActive
                      ? 'border-2 border-[#C89B3C] shadow-sm'
                      : 'border-slate-100 hover:border-slate-300'
                      }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} Thumbnail ${idx + 1}`}
                      className="w-full h-full object-contain"
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= COLUMN 2: Details & Specs (col-span-4) ================= */}
          <div className="md:col-span-6 lg:col-span-4 text-left space-y-5">
            <div className="space-y-2">
              <h1 className="font-serif text-2xl sm:text-3xl font-extra. text-[#0E0E3B] leading-tight">
                {product.title}
              </h1>

              {/* Decorative Gold line with start (flower) and mid (diamond) icons */}
              <div className="flex items-center gap-2 pt-1 pb-1">
                {/* Start Icon (Flower) */}
                <svg className="w-5.5 h-5.5 text-[#C89B3C] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2-3 5-3 5 0s-3 3-5 0zm0 0c-2-3-5-3-5 0s3 3 5 0zm0 0c3-2 3-5 0-5s-3 3 0 5zm0 0c3 2 3 5 0 5s-3-3 0-5z" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>

                {/* Line 1 */}
                <div className="h-[1px] w-14 bg-[#C89B3C]/60" />

                {/* Mid Icon (Diamond) */}
                <svg className="w-4.5 h-4.5 text-[#C89B3C] shrink-0" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3l9 9-9 9-9-9 9-9z" />
                  <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                </svg>

                {/* Line 2 */}
                <div className="h-[1px] w-14 bg-[#C89B3C]/60" />
              </div>

              {/* Dynamic Pricing Showcase Box */}
              {(product.offerPrice || product.price) ? (
                <div className="bg-gradient-to-r from-amber-50/70 via-orange-50/30 to-white border border-[#C89B3C]/25 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2 mt-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <span className="text-[10.5px] font-extrabold uppercase tracking-wider text-slate-500">
                      Pricing & Special Offer
                    </span>
                    {product.offerPrice && product.price && Number(product.price) > Number(product.offerPrice) && (
                      <span className="inline-flex items-center gap-1 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                        {Math.round(((Number(product.price) - Number(product.offerPrice)) / Number(product.price)) * 100)}% OFF
                      </span>
                    )}
                  </div>

                  <div className="flex items-baseline flex-wrap gap-3">
                    {product.offerPrice ? (
                      <>
                        <span className="font-serif text-3xl sm:text-4xl font-black text-[#C89B3C] tracking-tight">
                          ₹{Number(product.offerPrice).toLocaleString('en-IN')}
                        </span>
                        {product.price && Number(product.price) > Number(product.offerPrice) && (
                          <div className="flex items-baseline gap-2">
                            <span className="text-base sm:text-lg text-slate-400 line-through font-semibold">
                              MRP ₹{Number(product.price).toLocaleString('en-IN')}
                            </span>
                            <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded">
                              Save ₹{(Number(product.price) - Number(product.offerPrice)).toLocaleString('en-IN')}
                            </span>
                          </div>
                        )}
                      </>
                    ) : (
                      <span className="font-serif text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        ₹{Number(product.price).toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 font-medium">
                    Direct Artisan Price • Inclusive of standard finishing • Custom dimensions available
                  </p>
                </div>
              ) : (
                <div className="bg-slate-50/80 border border-slate-200/70 rounded-xl px-4 py-3 flex items-center justify-between mt-3">
                  <div>
                    <span className="text-xs font-bold text-slate-700">Custom Architectural Pricing</span>
                    <p className="text-[11px] text-slate-400">Priced dynamically based on required dimensions & finish</p>
                  </div>
                  <span className="text-xs font-extrabold text-[#C89B3C] uppercase tracking-wider">
                    Price On Request
                  </span>
                </div>
              )}
            </div>

            <p className="text-sm sm:text-[13px] text-slate-500 leading-relaxed font-medium">
              {product.description || `Bring peace, positivity and timeless beauty to your space with this exquisitely handcrafted ${product.title}. Designed with precision by our skilled artisans using premium grade ${product.material || 'FRP'}, this piece is perfect for homes, gardens, hotels, offices, and commercial spaces.`}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F2F8] text-[10.5px] font-extra. text-[#1A1A4A]">
                <svg className="w-3.5 h-3.5 text-[#1A1A4A]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
                Indoor / Outdoor
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F2F8] text-[10.5px] font-extra. text-[#1A1A4A]">
                <svg className="w-3.5 h-3.5 text-[#1A1A4A]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                Weather Resistant
              </span>

              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F0F2F8] text-[10.5px] font-extra. text-[#1A1A4A]">
                <svg className="w-3.5 h-3.5 text-[#1A1A4A]" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
                Customizable
              </span>
            </div>

            {/* Dynamic Product Details Quick Overview */}
            <div className="border-t border-b border-slate-200/80 py-4 grid grid-cols-2 gap-4 text-xs sm:text-sm">
              {/* Material */}
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Material:</span>
                <p className="text-slate-800 font-bold leading-tight">
                  {product.material || 'Fiberglass (FRP)'}
                </p>
              </div>

              {/* Color */}
              <div className="space-y-1 pl-4 border-l border-slate-150">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Color / Appearance:</span>
                <p className="text-slate-800 font-bold leading-tight">
                  {product.color || 'White / Multicolor'}
                </p>
              </div>

              {/* Sizes */}
              <div className="space-y-1 pt-2 border-t border-slate-100">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Available Sizes:</span>
                <p className="text-slate-800 font-bold leading-tight">
                  {product.sizes || '2 ft to 12 ft'}
                </p>
                <span className="text-[10px] text-slate-400 font-medium block mt-0.5">( Custom heights available )</span>
              </div>

              {/* Delivery Time & MOQ */}
              <div className="space-y-1 pl-4 pt-2 border-t border-slate-100 border-l border-slate-150">
                <span className="text-[10px] text-slate-500 font-extrabold uppercase tracking-wider block">Dispatch / Delivery:</span>
                <p className="text-slate-800 font-bold leading-tight">
                  {product.deliveryTime || '7 to 15 Days'}
                </p>
                <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">MOQ: {product.moq || '1 Piece'}</span>
              </div>
            </div>

            {/* Customize / Special Design Box */}
            <div className="bg-[#FCF5EA] border border-[#C89B3C]/30 rounded-xl p-4 flex gap-3.5 items-center">
              <div className="shrink-0 w-9 h-9 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C]">
                {/* Gold flower lotus */}
                <svg className="w-5 h-5 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.003 9.003 0 018.716 6.747M12 3a9.003 9.003 0 00-8.716 6.747M3 12h18" />
                </svg>
              </div>
              <div className="space-y-0.5">
                <h4 className="text-[#5A3E1B] text-sm sm:text-[12.5px] font-extra.">Looking for a Custom Design?</h4>
                <p className="text-[10px] sm:text-[11px] text-[#7D5A30] font-medium leading-relaxed">
                  We can create this product in your preferred size, color and finish.
                </p>
              </div>
            </div>

            {/* Action Buttons Stack */}
            <div className="space-y-3 pt-1">
              {/* WhatsApp Us */}
              <a
                href={`https://wa.me/918506865563?text=Hi! I am interested in getting a quote for the "${product.title}" statue${product.offerPrice ? ` (Special Offer Price: ₹${Number(product.offerPrice).toLocaleString('en-IN')})` : product.price ? ` (Price: ₹${Number(product.price).toLocaleString('en-IN')})` : ''}.`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2.5 px-4 py-3.5 bg-white hover:bg-emerald-50/10 text-emerald-600 border border-emerald-500 text-xs font-bold uppercase tracking-wider rounded-lg shadow-sm transition-all duration-300 text-center"
              >
                <svg className="w-4 h-4 fill-current text-emerald-600" viewBox="0 0 24 24">
                  <path d="M12.004 0C5.378 0 0 5.373 0 12.001c.002 2.115.552 4.178 1.6 6.002L.057 24l6.155-1.616c1.782.972 3.791 1.488 5.82 1.49h.005c6.627 0 12.003-5.373 12.003-12.001C24.04 5.373 18.631 0 12.004 0zm0 22.02c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.98 9.98 0 0 1-1.52-5.33c.003-5.52 4.5-10.01 10.02-10.01 2.67 0 5.19 1.04 7.08 2.93a9.91 9.91 0 0 1 2.93 7.09c-.003 5.53-4.5 10.02-10.02 10.02z" />
                </svg>
                WhatsApp Us
              </a>

              {/* Download Catalogue (Full Width) */}
              {/* <a
                href="/catalog.pdf"
                download
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-white hover:bg-slate-50 text-slate-800 border border-slate-700 text-[11px] font-extra. uppercase tracking-wider rounded-lg shadow-sm transition-colors text-center"
              >
                <svg className="w-3.5 h-3.5 text-slate-800" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
                Download Catalogue
              </a> */}
            </div>

          </div>

          {/* ================= COLUMN 3: Enquiry Form (col-span-3) ================= */}
          <div id="enquiry-form" className="md:col-span-12 lg:col-span-3 space-y-5">

            {/* Enquiry Card Form */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 space-y-4 text-left shadow-sm">
              <div className="space-y-1 border-b border-slate-100 pb-2.5">
                <h2 className="font-serif text-sm font-black uppercase tracking-wider text-slate-800">
                  SEND US AN ENQUIRY
                </h2>
                <p className="text-[12px] text-slate-500 font-medium">
                  Our team will get back to you within few hours
                </p>
              </div>

              <form onSubmit={handleEnquirySubmit} className="space-y-3.5">
                {enquirySubmitted && (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-sm font-semi. px-3 py-2 rounded-xl transition-all">
                    ✓ Enquiry submitted! We will contact you soon.
                  </div>
                )}

                {/* Name */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </span>
                  <input
                    type="text"
                    name="name"
                    required
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name *"
                    className="w-full bg-white border border-slate-300 focus:border-[#C89B3C] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-850 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                  </span>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Your Phone Number *"
                    className="w-full bg-white border border-slate-300 focus:border-[#C89B3C] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-850 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className="w-full bg-white border border-slate-300 focus:border-[#C89B3C] rounded-xl pl-9 pr-4 py-2.5 text-sm text-slate-850 focus:outline-none transition-colors shadow-sm"
                  />
                </div>

                {/* Dropdown Product Selector */}
                <div>
                  <select
                    disabled
                    value={product.title}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-3 text-sm text-slate-500 focus:outline-none transition-colors shadow-sm cursor-not-allowed"
                  >
                    <option>{product.title}</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <textarea
                    name="message"
                    rows="3"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Your Message / Requirements"
                    className="w-full bg-white border border-slate-200 focus:border-[#C89B3C] rounded-xl px-3 py-2 text-sm text-slate-850 focus:outline-none transition-colors shadow-sm resize-none"
                  />
                </div>


                {/* Submit button */}
                <div className="pt-1.5">
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#0E0E3B] hover:bg-[#1a1a4a] text-white text-[10.5px] font-. uppercase tracking-widest rounded-xl transition-colors shadow-md"
                  >
                    <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                    </svg>
                    Submit Enquiry
                  </button>
                </div>
              </form>
            </div>

            {/* Quick Whatsapp Help Box */}
            {/* <div className="border border-emerald-100/80 rounded-2xl bg-white p-5 space-y-4 text-center shadow-sm">
              <div className="flex items-center gap-3 text-left">
            
                <div className="w-10 h-10 bg-[#25d366] rounded-full flex justify-center items-center text-white shrink-0">
                  <svg className="w-5.5 h-5.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.004 0C5.378 0 0 5.373 0 12.001c.002 2.115.552 4.178 1.6 6.002L.057 24l6.155-1.616c1.782.972 3.791 1.488 5.82 1.49h.005c6.627 0 12.003-5.373 12.003-12.001C24.04 5.373 18.631 0 12.004 0zm0 22.02c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.98 9.98 0 0 1-1.52-5.33c.003-5.52 4.5-10.01 10.02-10.01 2.67 0 5.19 1.04 7.08 2.93a9.91 9.91 0 0 1 2.93 7.09c-.003 5.53-4.5 10.02-10.02 10.02z" />
                  </svg>
                </div>
                <div className="space-y-0.5">
                  <h4 className="text-slate-800 text-[12.5px] font-black">
                    Need Quick Help?
                  </h4>
                  <p className="text-[10px] text-slate-600 font-. leading-normal">
                    Chat with us on WhatsApp for faster response
                  </p>
                </div>
              </div>
              
              <a
                href="https://wa.me/918506865563"
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center px-4 py-2.5 border border-emerald-500 hover:bg-emerald-50/20 text-emerald-600 text-[11px] font-extra. uppercase tracking-wide rounded-lg transition-colors text-center"
              >
                Open WhatsApp
              </a>
            </div> */}

          </div>

        </div>

        {/* Horizontal Features Row */}
        <div className="border-t border-b border-slate-200/60 bg-[#faf8f5]/40 py-8 px-4 sm:px-6 lg:px-8 mt-12 mb-10 rounded-2xl">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-0 items-center justify-center lg:divide-x lg:divide-slate-200/80">

            {/* Badge 1: Thumbs Up */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] shrink-0">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.5m-9 0a2.25 2.25 0 00-2.25-2.25H3a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25h.75A2.25 2.25 0 006 18.75V15" />
                </svg>
              </div>
              <span className="text-[11px] font-extra. text-slate-700 leading-tight">
                Premium <br />Quality Material
              </span>
            </div>

            {/* Badge 2: Expert Artisans */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] shrink-0">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                </svg>
              </div>
              <span className="text-[11px] font-extra. text-slate-700 leading-tight">
                Expert <br />Artisans
              </span>
            </div>

            {/* Badge 3: Fully Customizable */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] shrink-0">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                </svg>
              </div>
              <span className="text-[11px] font-extra. text-slate-700 leading-tight">
                Fully <br />Customizable
              </span>
            </div>

            {/* Badge 4: Pan India Delivery */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] shrink-0">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177V3.917c0-.621-.504-1.125-1.125-1.125H1.875C1.254 2.792.75 3.296.75 3.917V14.25M14.25 7.5v11.25" />
                </svg>
              </div>
              <span className="text-[11px] font-extra. text-slate-700 leading-tight">
                Pan India <br />Delivery
              </span>
            </div>

            {/* Badge 5: Safe & Secure Packaging */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] shrink-0">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
              <span className="text-[11px] font-extra. text-slate-700 leading-tight">
                Safe & Secure <br />Packaging
              </span>
            </div>

            {/* Badge 6: Dedicated Customer Support */}
            <div className="flex flex-col items-center text-center px-4 space-y-2">
              <div className="w-10 h-10 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] shrink-0">
                <svg className="w-5.5 h-5.5" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C6.48 2 2 6.48 2 12v6c0 1.1.9 2 2 2h2v-8H4v-2c0-4.41 3.59-8 8-8s8 4.41 8 8v2h-2v8h2c1.1 0 2-.9 2-2v-6c0-5.52-4.48-10-10-10z" />
                </svg>
              </div>
              <span className="text-[11px] font-extra. text-slate-700 leading-tight">
                Dedicated <br />Customer Support
              </span>
            </div>

          </div>
        </div>

        {/* Description Tabs and Why Choose Us Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-6">

          {/* LEFT COLUMN: Tabbed Panel (col-span-8) */}
          <div className="lg:col-span-8 space-y-6 text-left">
            {/* Tabs row headers */}
            <div className="flex border-b border-slate-200 gap-6 overflow-x-auto scrollbar-none pb-1">
              {[
                { id: 'specs', label: 'Specifications' },
                { id: 'apps', label: 'Applications' },
                { id: 'care', label: 'Care Instructions' },
                { id: 'faq', label: 'FAQ' }
              ].map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 text-[13px] sm:text-sm  tracking-wide transition-all border-b-2 focus:outline-none shrink-0 ${isActive
                      ? 'border-[#C89B3C] text-[#0E0E3B]'
                      : 'border-transparent text-slate-500 hover:text-slate-800'
                      }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Active tab content view */}
            <div className="min-h-[220px] transition-all duration-300">
              {activeTab === 'specs' && (
                <div className="border border-slate-200/90 rounded-2xl overflow-hidden bg-white shadow-xs text-sm">
                  {/* Table Header Banner */}
                  <div className="bg-slate-50/90 px-5 py-3.5 border-b border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
                    <h3 className="font-serif text-sm font-black uppercase tracking-wider text-slate-900 flex items-center gap-2">
                      <span>📋</span> Product Details & Specifications
                    </h3>
                    <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60 flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                      Manufacturer Verified
                    </span>
                  </div>

                  {/* Specifications Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <tbody>
                        {[
                          { label: 'Product Name', value: product.title },
                          { label: 'Approximate MRP', value: product.price ? `₹${Number(product.price).toLocaleString('en-IN')}` : 'Price on Request' },
                          { label: 'Special Offer Price', value: product.offerPrice ? `₹${Number(product.offerPrice).toLocaleString('en-IN')}` : null },
                          { label: 'Base Material', value: product.material || 'Fiber Reinforced Plastic (FRP)' },
                          { label: 'Color / Appearance', value: product.color || 'White / Gold Leaf / Multicolor' },
                          { label: 'Available Sizes / Height', value: product.sizes || '2 ft to 12 ft (Custom sizes on request)' },
                          { label: 'Placement / Usage', value: product.type || 'Indoor & Outdoor Decor / Temples / Gardens' },
                          { label: 'Surface Finish', value: product.finish || 'Polished / Glossy / Marble Dust Finish' },
                          { label: 'Weatherproof Rating', value: product.weatherproof || 'Yes (100% Rain & UV Resistant)' },
                          { label: 'Minimum Order Quantity (MOQ)', value: product.moq || '1 Piece' },
                          { label: 'Packaging Type', value: product.packagingType || 'Wooden Crate / Corrugated Box' },
                          { label: 'Dispatch / Delivery Time', value: product.deliveryTime || '7 to 15 Business Days' },
                          { label: 'Country of Origin', value: product.countryOfOrigin || 'Made in India' },
                          { label: 'Brand', value: product.brand || 'Indian Dhamma Art' }
                        ].filter(item => item.value).map((row, idx) => (
                          <tr
                            key={idx}
                            className={`border-b border-slate-100/90 hover:bg-amber-50/20 transition-colors ${idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}
                          >
                            <td className="py-3 px-5 text-slate-500 font-bold text-xs uppercase tracking-wider w-2/5 sm:w-1/3">
                              {row.label}
                            </td>
                            <td className="py-3 px-5 text-slate-900 font-semibold text-xs sm:text-[13px]">
                              {row.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'apps' && (
                <div className="space-y-6">
                  <div className="space-y-3 text-sm sm:text-[13px] text-slate-500 font-medium leading-relaxed">
                    <p className="font-semibold text-slate-800 text-sm">Best Placements & Environments:</p>
                    <ul className="list-disc pl-5 space-y-1.5">
                      <li><strong>Spiritual Zones</strong>: Temples, Prayer altars, Yoga centers, and Meditation spaces.</li>
                      <li><strong>Lobbies & Hospitality</strong>: Hotel entryways, corporate reception desks, and spa rooms.</li>
                      <li><strong>Outdoor Landscaping</strong>: Main entrance gardens, balconies, swimming pool decks, and villa lawns.</li>
                    </ul>
                  </div>

                  {/* Perfect For Banner Callout card */}
                  <div className="bg-[#FCF5EA] border border-[#C89B3C]/30 rounded-2xl p-5 flex flex-col sm:flex-row gap-5 sm:items-center">
                    {/* Lotus outline */}
                    <div className="shrink-0 w-11 h-11 rounded-full bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C]">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9s2.015-9 4.5-9m0 0a9.003 9.003 0 018.716 6.747M12 3a9.003 9.003 0 00-8.716 6.747M3 12h18" />
                      </svg>
                    </div>
                    {/* Flat Grid of Destinations */}
                    <div className="flex-grow space-y-2">
                      <span className="text-[11.5px] font-black text-[#0E0E3B] uppercase tracking-wider block">Perfect For:</span>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-2.5 text-[11px] sm:text-[11.5px] font-medium text-[#0E0E3B]">
                        {[
                          'Homes & Villas',
                          'Bungs & Gardens',
                          'Hotels & Resorts',
                          'Corporate Offices',
                          'Temples',
                          'Meditation Centers'
                        ].map((destination, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full border border-[#C89B3C] bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] text-[10px] shrink-0 font-extrabold">
                              &#x2713;
                            </span>
                            <span>{destination}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'care' && (
                <div className="space-y-3 text-sm sm:text-[13px] text-slate-500 font-medium leading-relaxed">
                  <p className="font-. text-slate-800 text-sm">Maintenance & Cleaning Instructions:</p>
                  <ul className="list-decimal pl-5 space-y-1.5">
                    <li>Simply wipe down with a soft, clean dry cotton cloth to clear surface dust.</li>
                    <li>For outdoor setups, wash with a light water spray occasionally.</li>
                    <li>Do not rub with steel wool, wire brushes, or use chemical bleach solutions.</li>
                  </ul>
                </div>
              )}

              {activeTab === 'faq' && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <h4 className="font-. text-slate-855 text-sm">Q: Is Fiber Reinforced Plastic (FRP) durable?</h4>
                    <p className="text-sm sm:text-[13px] text-slate-500 font-medium">A: Yes! FRP offers high impact tolerance, making the statue extremely durable, drop-resistant, and lighter compared to heavy stone or metal casting.</p>
                  </div>
                  <div className="space-y-1 border-t border-slate-100 pt-3">
                    <h4 className="font-. text-slate-855 text-sm">Q: Do you custom-make custom sizes?</h4>
                    <p className="text-sm sm:text-[13px] text-slate-500 font-medium">A: Yes, as a bespoke manufacturer, we can craft this statue in custom heights ranging from 2 ft up to 15 ft.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Why Choose Us Card with Made In India Badge (col-span-4) */}
          <div className="lg:col-span-4 bg-[#FCF5EA] border border-[#C89B3C]/30 rounded-2xl p-6 text-left shadow-sm">
            <h3 className="font-serif text-sm sm:text-base font-black text-[#0E0E3B] border-b border-[#C89B3C]/20 pb-3 mb-4">
              Why Choose Indian Dhamma Art?
            </h3>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center gap-5 justify-between">
              {/* List */}
              <div className="space-y-3.5 text-sm sm:text-[13px]  text-[#0E0E3B] flex-grow">
                {[
                  '500+ Unique Designs',
                  '10+ Years of Experience',
                  '150+ Happy Corporate Clients',
                  'Custom Manufacturing Specialist',
                  'Timely Delivery Across India'
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    {/* Gold checkmark */}
                    <span className="w-5 h-5 rounded-full border border-[#C89B3C] bg-[#C89B3C]/10 flex items-center justify-center text-[#C89B3C] text-[10px] shrink-0 font-extra.">
                      &#x2713;
                    </span>
                    <span className="leading-tight">{item}</span>
                  </div>
                ))}
              </div>

              {/* Hexagon Made In India Badge */}
              <div className="relative w-28 h-28 flex flex-col items-center justify-center shrink-0">
                <div className="absolute inset-0 bg-white border border-slate-200/80 shadow-sm" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }} />

                <div className="relative z-10 flex flex-col items-center text-center space-y-1">
                  {/* Indian Flag Bands */}
                  <div className="flex flex-col gap-0.5 items-center">
                    <div className="w-12 h-1.5 bg-[#FF9933] rounded-sm" />
                    <div className="w-12 h-1.5 bg-white border border-slate-100 flex items-center justify-center relative">
                      <div className="w-2.5 h-2.5 rounded-full border border-blue-900 flex items-center justify-center">
                        <div className="w-0.5 h-0.5 rounded-full bg-blue-900" />
                      </div>
                    </div>
                    <div className="w-12 h-1.5 bg-[#128807] rounded-sm" />
                  </div>

                  {/* Text details */}
                  <div className="space-y-0.5 pt-1.5">
                    <span className="text-[9px] font-. text-slate-500 uppercase tracking-wider block leading-none">MADE IN</span>
                    <span className="text-[11px] font-black text-emerald-600 uppercase tracking-widest block leading-none">INDIA</span>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Products Section */}
        <div className="mt-16 border-t border-slate-200/60  text-left">
          {/* Header Row */}
          <div className="flex flex-col sm:grid sm:grid-cols-3 items-center gap-3 sm:gap-0 mb-8">
            <div className="hidden sm:block" /> {/* Left spacer */}

            {/* Center Heading */}
            <div className="flex items-center gap-2.5 justify-center">
              <div className="h-[1.5px] w-6 sm:w-12 bg-[#C89B3C] rounded-full" />
              <span className="text-[#C89B3C] text-[11px] sm:text-sm">&#x2740;</span>
              <h2 className="font-serif text-lg sm:text-xl font-black text-[#0E0E3B] whitespace-nowrap">
                Related Products
              </h2>
              <span className="text-[#C89B3C] text-[11px] sm:text-sm">&#x2740;</span>
              <div className="h-[1.5px] w-6 sm:w-12 bg-[#C89B3C] rounded-full" />
            </div>

            {/* Right Link */}
            <div className="flex justify-center sm:justify-end w-full">
              <Link
                to="/collections"
                className="text-sm sm:text-sm font-. text-slate-700 hover:text-[#C89B3C] flex items-center gap-1 transition-colors whitespace-nowrap"
              >
                View All Products &rarr;
              </Link>
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
            {[
              { id: 2, title: 'White Lord Buddha Statue', category: 'Fiber Buddha Statue', image: img1 },
              { id: 3, title: 'Fiber Deer Statue', category: 'Fiber Animal Statue', image: gardenBuddha },
              { id: 4, title: 'Artificial Cherry Blossom Tree', category: 'Artificial Trees', image: corporateGift },
              { id: 7, title: 'Fiber Lion Sculpture', category: 'FRP Sculpture Art', image: artisanCraft },
              { id: 1, title: 'Glowing Deer Family', category: 'Fiber Glowing Statue', image: luxuryBuddha }
            ].map((prod) => (
              <div
                key={prod.id}
                className="group bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow duration-300"
              >
                {/* Image Block */}
                <Link to={`/product/${prod.id}`} className="relative aspect-[4/3] bg-slate-50 overflow-hidden flex items-center justify-center p-2 block cursor-pointer">
                  {prod.offerPrice && prod.price && Number(prod.price) > Number(prod.offerPrice) && (
                    <div className="absolute top-2 left-2 z-10 bg-emerald-600 text-white text-[9px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-full shadow-xs">
                      {Math.round(((Number(prod.price) - Number(prod.offerPrice)) / Number(prod.price)) * 100)}% OFF
                    </div>
                  )}
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-103"
                  />
                </Link>

                {/* Content Block */}
                <div className="p-3.5 space-y-2.5 text-center flex flex-col justify-between flex-grow">
                  <div>
                    <Link to={`/product/${prod.id}`}>
                      <h4 className="font-bold text-slate-800 text-[12.5px] line-clamp-1 group-hover:text-[#C89B3C] transition-colors hover:underline">
                        {prod.title}
                      </h4>
                    </Link>
                    <span className="text-[10px] text-slate-500 font-medium block mt-0.5">
                      {prod.category}
                    </span>
                  </div>

                  {/* Pricing in Related Products */}
                  <div className="flex items-center justify-center gap-2">
                    {prod.offerPrice ? (
                      <>
                        <span className="text-xs font-extrabold text-[#C89B3C]">
                          ₹{Number(prod.offerPrice).toLocaleString('en-IN')}
                        </span>
                        {prod.price && Number(prod.price) > Number(prod.offerPrice) && (
                          <span className="text-[10px] text-slate-400 line-through">
                            ₹{Number(prod.price).toLocaleString('en-IN')}
                          </span>
                        )}
                      </>
                    ) : prod.price ? (
                      <span className="text-xs font-extrabold text-slate-800">
                        ₹{Number(prod.price).toLocaleString('en-IN')}
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400 italic">Price on Request</span>
                    )}
                  </div>

                  {/* GET QUOTE Button */}
                  <Link
                    to={`/product/${prod.id}`}
                    className="w-full border border-[#C89B3C] hover:bg-[#C89B3C]/5 text-[#C89B3C] text-xs font-extrabold uppercase py-2 px-1 sm:px-3 rounded-lg flex items-center justify-center gap-1 sm:gap-1.5 transition-colors whitespace-nowrap"
                  >
                    <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current text-[#C89B3C] shrink-0" viewBox="0 0 24 24">
                      <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 9h12v2H6V9zm8 5H6v-2h8v2zm4-6H6V6h12v2z" />
                    </svg>
                    GET QUOTE
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Design Banner CTA */}
        <div className="mt-16 bg-[#0E0E3B] rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden shadow-md">
          {/* Decorative Mandala Overlay on the left side */}
          <div className="absolute left-0 top-0 bottom-0 w-48 opacity-10 pointer-events-none mix-blend-screen overflow-hidden flex items-center justify-start">
            <svg className="w-64 h-64 text-[#C89B3C] -translate-x-12 shrink-0" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" />
              <circle cx="50" cy="50" r="30" />
              <circle cx="50" cy="50" r="20" />
              <circle cx="50" cy="50" r="10" />
              {[0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].map(deg => (
                <line key={deg} x1="10" y1="50" x2="90" y2="50" transform={`rotate(${deg} 50 50)`} />
              ))}
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(30 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(60 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(90 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(120 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(150 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(180 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(210 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(240 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(270 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(300 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(330 50 50)" />
              <path d="M50 10 C 40 30, 60 30, 50 10" transform="rotate(360 50 50)" />
            </svg>
          </div>

          {/* Text Section */}
          <div className="text-left space-y-1.5 z-10">
            <h3 className="font-serif text-lg sm:text-xl font-. text-[#C89B3C]">
              Have a Custom Design in Mind?
            </h3>
            <p className="text-sm sm:text-sm text-slate-300 font-medium">
              Our experts are here to turn your ideas into a beautiful masterpiece.
            </p>
          </div>

          {/* Buttons Section */}
          <div className="flex flex-wrap sm:flex-nowrap gap-3.5 z-10 shrink-0">
            {/* Get Free Consultation */}
            <Link
              to="/custom-order"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#C89B3C] hover:bg-[#B8862B] text-white text-sm font-extra. uppercase tracking-wider rounded-lg shadow-sm transition-all text-center"
            >
              Get Free Consultation
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Chat on WhatsApp */}
            <a
              href="https://wa.me/918506865563?text=Hi! I want to discuss a custom design project with your experts."
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#20bb5a] hover:bg-[#25d366] text-white text-sm font-extra. uppercase tracking-wider rounded-lg shadow-sm transition-all text-center"
            >
              <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                <path d="M12.004 0C5.378 0 0 5.373 0 12.001c.002 2.115.552 4.178 1.6 6.002L.057 24l6.155-1.616c1.782.972 3.791 1.488 5.82 1.49h.005c6.627 0 12.003-5.373 12.003-12.001C24.04 5.373 18.631 0 12.004 0zm0 22.02c-1.8 0-3.56-.48-5.11-1.39l-.37-.22-3.79.99 1.01-3.69-.24-.38a9.98 9.98 0 0 1-1.52-5.33c.003-5.52 4.5-10.01 10.02-10.01 2.67 0 5.19 1.04 7.08 2.93a9.91 9.91 0 0 1 2.93 7.09c-.003 5.53-4.5 10.02-10.02 10.02z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
