import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';

export default function ProductManage({ products, categories = [], onAddProduct, onEditProduct, onDeleteProduct }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const mainFileInputRef = useRef(null);

  // Category Filter & Search State (persisted in localStorage)
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(() => {
    return localStorage.getItem('admin_product_category_filter') || 'All';
  });
  const [searchQuery, setSearchQuery] = useState(() => {
    return localStorage.getItem('admin_product_search_query') || '';
  });

  // Pagination State (persisted in localStorage)
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('admin_product_current_page');
    return saved ? parseInt(saved, 10) : 1;
  });

  useEffect(() => {
    localStorage.setItem('admin_product_category_filter', selectedCategoryFilter);
  }, [selectedCategoryFilter]);

  useEffect(() => {
    localStorage.setItem('admin_product_search_query', searchQuery);
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem('admin_product_current_page', currentPage.toString());
  }, [currentPage]);

  // Extract unique category options
  const categoryOptions = ['All', ...Array.from(new Set([
    ...categories.map(c => c.name),
    ...products.map(p => p.category).filter(Boolean)
  ]))];

  // Filtered Products Calculation
  const filteredProducts = products.filter((prod) => {
    const matchesCategory = selectedCategoryFilter === 'All' || (prod.category && prod.category.toLowerCase() === selectedCategoryFilter.toLowerCase());
    const matchesSearch = !searchQuery.trim() || 
      prod.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.material?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (prod.tags && prod.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const activePage = Math.min(currentPage, Math.max(totalPages, 1));
  const displayedProducts = filteredProducts.slice((activePage - 1) * itemsPerPage, activePage * itemsPerPage);

  const handleCategoryChange = (catName) => {
    setSelectedCategoryFilter(catName);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  // Form fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [material, setMaterial] = useState('FRP');
  const [type, setType] = useState('Indoor/Outdoor');
  const [finish, setFinish] = useState('');
  const [sizes, setSizes] = useState('');
  const [brand, setBrand] = useState('');
  const [weatherproof, setWeatherproof] = useState('');
  const [color, setColor] = useState('');
  const [moq, setMoq] = useState('1 Piece');
  const [packagingType, setPackagingType] = useState('Wooden Crate / Corrugated Box');
  const [deliveryTime, setDeliveryTime] = useState('7 to 15 Days');
  const [countryOfOrigin, setCountryOfOrigin] = useState('Made in India');
  const [price, setPrice] = useState('');
  const [offerPrice, setOfferPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  
  // Gallery Images States
  const [galleryFiles, setGalleryFiles] = useState([null]);
  const [galleryUrls, setGalleryUrls] = useState('');

  const openAddForm = () => {
    setTitle('');
    setDescription('');
    setMaterial('FRP');
    setType('Indoor/Outdoor');
    setFinish('');
    setSizes('');
    setBrand('');
    setWeatherproof('');
    setColor('');
    setMoq('1 Piece');
    setPackagingType('Wooden Crate / Corrugated Box');
    setDeliveryTime('7 to 15 Days');
    setCountryOfOrigin('Made in India');
    setPrice('');
    setOfferPrice('');
    setImageUrl('');
    setImageFile(null);
    setCategory(categories[0]?.name || '');
    setTags('');
    setGalleryFiles([null]);
    setGalleryUrls('');
    setEditProduct(null);
    setIsFormOpen(true);
  };

  const openEditForm = (prod) => {
    setTitle(prod.title || '');
    setDescription(prod.description || '');
    setMaterial(prod.material || 'FRP');
    setType(prod.type || 'Indoor/Outdoor');
    setFinish(prod.finish || '');
    setSizes(prod.sizes || '');
    setBrand(prod.brand || '');
    setWeatherproof(prod.weatherproof || '');
    setColor(prod.color || '');
    setMoq(prod.moq || '1 Piece');
    setPackagingType(prod.packagingType || 'Wooden Crate / Corrugated Box');
    setDeliveryTime(prod.deliveryTime || '7 to 15 Days');
    setCountryOfOrigin(prod.countryOfOrigin || 'Made in India');
    setPrice(prod.price !== undefined && prod.price !== null ? prod.price : '');
    setOfferPrice(prod.offerPrice !== undefined && prod.offerPrice !== null ? prod.offerPrice : '');
    setImageUrl(prod.image || '');
    setImageFile(null);
    setCategory(prod.category || categories[0]?.name || '');
    setTags(prod.tags ? prod.tags.join(', ') : '');
    setGalleryFiles([null]);
    setGalleryUrls(prod.images ? prod.images.join(', ') : '');
    setEditProduct(prod);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Parse tags from comma separated string
    const tagsArray = tags.split(',').map(t => t.trim().toLowerCase()).filter(t => t !== '');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('material', material);
    formData.append('type', type);
    formData.append('finish', finish);
    formData.append('sizes', sizes);
    formData.append('brand', brand);
    formData.append('weatherproof', weatherproof);
    formData.append('color', color);
    formData.append('moq', moq);
    formData.append('packagingType', packagingType);
    formData.append('deliveryTime', deliveryTime);
    formData.append('countryOfOrigin', countryOfOrigin);
    formData.append('price', price !== '' ? price : '');
    formData.append('offerPrice', offerPrice !== '' ? offerPrice : '');
    formData.append('category', category);
    formData.append('tags', JSON.stringify(tagsArray));

    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      formData.append('image', imageUrl);
    }

    // Append multiple gallery images
    const activeFiles = galleryFiles.filter(Boolean);
    if (activeFiles.length > 0) {
      activeFiles.forEach(file => {
        formData.append('images', file);
      });
    } else if (galleryUrls.trim()) {
      const urlsArray = galleryUrls.split(',').map(u => u.trim()).filter(Boolean);
      formData.append('images', JSON.stringify(urlsArray));
    } else {
      formData.append('images', JSON.stringify([]));
    }

    if (editProduct) {
      // Edit mode
      onEditProduct(editProduct.id, formData);
    } else {
      // Add mode
      onAddProduct(formData);
    }

    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 text-left text-slate-800">

      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Product Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Add new sculpture listings or edit specifications.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#cca040] hover:bg-[#bfa054] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Product
        </button>
      </div>

      {/* Add / Edit Form Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs .">
          {/* Modal Backdrop click trigger */}
          <div className="absolute inset-0" onClick={() => setIsFormOpen(false)} />

          <div className="bg-[#faf8f5] border border-[#cca040]/15 rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 text-left">
            {/* Close Cross icon */}
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div>
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {editProduct ? `Edit Specifications: ${editProduct.title}` : 'Add New Sculpture Listing'}
              </h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Specifications Form
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mt-5">

              {/* Title */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Product Title / Name
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Meditating Fiber Buddha Statue"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Description */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Product Description
                </label>
                <textarea
                  rows="3"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed product description..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors resize-none"
                />
              </div>

              {/* Material */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Material / Composition
                </label>
                <select
                  value={material}
                  onChange={(e) => setMaterial(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                >
                  <option value="FRP">Fiberglass (FRP)</option>
                  <option value="Brass">Brass / Bronze</option>
                  <option value="Wooden">Natural Wood</option>
                  <option value="Marble">Polished Marble</option>
                  <option value="Stone">Stone Sculpture</option>
                </select>
              </div>

              {/* Type */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Placement Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                >
                  <option value="Indoor/Outdoor">Indoor / Outdoor</option>
                  <option value="Indoor Only">Indoor Only</option>
                  <option value="Outdoor/Garden">Outdoor / Garden</option>
                </select>
              </div>

              {/* Brand */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Brand Name
                </label>
                <input
                  type="text"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  placeholder="e.g. Indian Dhamma Art"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Finish Options */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Finish Options
                </label>
                <input
                  type="text"
                  value={finish}
                  onChange={(e) => setFinish(e.target.value)}
                  placeholder="e.g. Marble Dust White, Gold Leaf, Antique Bronze"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Available Sizes */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Available Sizes
                </label>
                <input
                  type="text"
                  value={sizes}
                  onChange={(e) => setSizes(e.target.value)}
                  placeholder="e.g. 2 ft to 12 ft"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Weatherproof Rating */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Weatherproof / Outdoor Rating
                </label>
                <input
                  type="text"
                  value={weatherproof}
                  onChange={(e) => setWeatherproof(e.target.value)}
                  placeholder="e.g. Yes (Rain & UV Resistant)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Product Specifications / IndiaMART Details */}
              <div className="md:col-span-2 bg-slate-50/90 border border-slate-200/90 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm">📋</span>
                  <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                    Product Specifications (IndiaMART Standard Details)
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Color */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Color / Appearance
                    </label>
                    <input
                      type="text"
                      value={color}
                      onChange={(e) => setColor(e.target.value)}
                      placeholder="e.g. Pure White, Gold Leaf, Antique Bronze"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                  </div>

                  {/* MOQ */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Minimum Order Quantity (MOQ)
                    </label>
                    <input
                      type="text"
                      value={moq}
                      onChange={(e) => setMoq(e.target.value)}
                      placeholder="e.g. 1 Piece, 1 Set"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                  </div>

                  {/* Packaging Type */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Packaging Type
                    </label>
                    <input
                      type="text"
                      value={packagingType}
                      onChange={(e) => setPackagingType(e.target.value)}
                      placeholder="e.g. Wooden Crate / Corrugated Box"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                  </div>

                  {/* Delivery Time */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Dispatch / Delivery Time
                    </label>
                    <input
                      type="text"
                      value={deliveryTime}
                      onChange={(e) => setDeliveryTime(e.target.value)}
                      placeholder="e.g. 7 to 15 Days"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                  </div>

                  {/* Country of Origin */}
                  <div className="space-y-1 sm:col-span-2">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Country of Origin
                    </label>
                    <input
                      type="text"
                      value={countryOfOrigin}
                      onChange={(e) => setCountryOfOrigin(e.target.value)}
                      placeholder="e.g. Made in India"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* Pricing (MRP & Offer Price) */}
              <div className="md:col-span-2 bg-amber-50/40 border border-amber-200/60 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">🏷️</span>
                    <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                      Product Pricing (INR ₹)
                    </span>
                  </div>
                  {price && offerPrice && Number(price) > Number(offerPrice) && (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      {Math.round(((Number(price) - Number(offerPrice)) / Number(price)) * 100)}% OFF (Save ₹{(Number(price) - Number(offerPrice)).toLocaleString('en-IN')})
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Regular Price / MRP (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 25000"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                    <span className="text-[10px] text-slate-400 block">Original list price (shown struck through if offer price set)</span>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[10px] font-extrabold text-slate-500 uppercase tracking-wider block">
                      Special Offer Price (₹)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="any"
                      value={offerPrice}
                      onChange={(e) => setOfferPrice(e.target.value)}
                      placeholder="e.g. 19999"
                      className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2.5 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                    <span className="text-[10px] text-slate-400 block">Actual selling / discounted price shown to customers</span>
                  </div>
                </div>
              </div>

              {/* Category */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Category Grouping
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                >
                  <option value="" disabled>Select a Category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Product Main Image (Live Preview & Modern Upload) */}
              <div className="space-y-2.5 md:col-span-2 border-t border-slate-200/70 pt-5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                    <span>🖼️ Main Product Image</span>
                    <span className="text-red-500 font-bold">*</span>
                  </label>
                  {(imageFile || imageUrl) && (
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      Image Selected
                    </span>
                  )}
                </div>

                {/* Main Image Preview & Controls */}
                {(imageFile || imageUrl) ? (
                  <div className="flex flex-col sm:flex-row items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs">
                    {/* Live Preview Box */}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-xl bg-slate-50 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center p-1.5 relative group">
                      <img
                        src={imageFile ? URL.createObjectURL(imageFile) : imageUrl}
                        alt="Main Product Preview"
                        className="w-full h-full object-contain"
                      />
                    </div>

                    {/* Image Details & Action Buttons */}
                    <div className="flex-1 text-center sm:text-left space-y-2.5 w-full">
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-[#cca040] block">
                          {imageFile ? 'New File Selected' : 'Active Image Preview'}
                        </span>
                        <p className="text-xs font-bold text-slate-800 break-all line-clamp-1">
                          {imageFile ? imageFile.name : (imageUrl.split('/').pop() || 'Product Image')}
                        </p>
                        {imageFile && (
                          <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">
                            Size: {(imageFile.size / (1024 * 1024)).toFixed(2)} MB
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-center sm:justify-start gap-2 pt-0.5">
                        {/* Change Image Button */}
                        <button
                          type="button"
                          onClick={() => mainFileInputRef.current?.click()}
                          className="px-3 py-1.5 bg-[#cca040] hover:bg-[#b88c2b] text-white text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Change File
                        </button>

                        {/* Remove Image Button */}
                        <button
                          type="button"
                          onClick={() => {
                            setImageFile(null);
                            setImageUrl('');
                            if (mainFileInputRef.current) mainFileInputRef.current.value = '';
                          }}
                          className="px-3 py-1.5 border border-slate-200 hover:bg-red-50 hover:border-red-200 text-slate-600 hover:text-red-600 text-[11px] font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Modern Upload Dropzone Area */
                  <div
                    onClick={() => mainFileInputRef.current?.click()}
                    className="border-2 border-dashed border-slate-300 hover:border-[#cca040] bg-slate-50 hover:bg-amber-50/20 rounded-2xl p-6 sm:p-7 text-center transition-all cursor-pointer group space-y-2.5"
                  >
                    <div className="w-12 h-12 rounded-full bg-[#cca040]/10 group-hover:bg-[#cca040]/20 text-[#cca040] flex items-center justify-center mx-auto transition-colors">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#cca040] transition-colors">
                        Click here to upload product image
                      </p>
                      <p className="text-[11px] text-slate-400 font-medium mt-0.5">
                        High resolution JPG, PNG, WEBP supported (Max 10MB)
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 group-hover:border-[#cca040] text-[10.5px] font-extrabold uppercase tracking-wider text-slate-700 rounded-lg shadow-xs transition-colors">
                      <svg className="w-3.5 h-3.5 text-[#cca040]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Select File From Device
                    </span>
                  </div>
                )}

                {/* Hidden Real File Input */}
                <input
                  ref={mainFileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImageFile(e.target.files[0]);
                    }
                  }}
                  className="hidden"
                />

                {/* External Image URL Input */}
                <div className="pt-1">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Or Direct Image Link / External URL
                  </label>
                  <input
                    type="text"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="https://images.unsplash.com/... (used if no local file selected)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                  />
                </div>
              </div>

              {/* Additional Gallery Images (With Slot Previews & Styled Upload) */}
              <div className="space-y-3 md:col-span-2 border-t border-slate-200/70 pt-5">
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <div>
                    <label className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider block">
                      Additional Gallery Images (Up to 5 Photos)
                    </label>
                    <span className="text-[10.5px] text-slate-400 font-medium">
                      Showcase multiple angles and close-up craftsmanship
                    </span>
                  </div>
                  {galleryFiles.length < 5 && (
                    <button
                      type="button"
                      onClick={() => setGalleryFiles(prev => [...prev, null])}
                      className="px-3 py-1.5 bg-amber-50 hover:bg-amber-100 border border-[#cca040]/40 text-[#cca040] text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer flex items-center gap-1"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                      </svg>
                      Add Photo Slot
                    </button>
                  )}
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {galleryFiles.map((file, index) => {
                    const previewUrl = file ? URL.createObjectURL(file) : null;
                    return (
                      <div key={index} className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 shadow-xs">
                        {/* Slot Thumbnail Preview */}
                        <div className="w-16 h-16 rounded-lg bg-slate-50 border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center p-1">
                          {previewUrl ? (
                            <img
                              src={previewUrl}
                              alt={`Gallery ${index + 1}`}
                              className="w-full h-full object-contain"
                            />
                          ) : (
                            <span className="text-[10px] text-slate-300 font-bold text-center leading-tight">
                              Photo {index + 1}
                            </span>
                          )}
                        </div>

                        {/* File Selector */}
                        <div className="flex-1 space-y-1.5">
                          <span className="text-[9.5px] font-black text-slate-500 uppercase tracking-wider block">
                            {file ? file.name : `Slot ${index + 1}: Select Photo`}
                          </span>
                          
                          <label className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10.5px] font-bold rounded-md cursor-pointer transition-colors">
                            <svg className="w-3 h-3 text-[#cca040]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                            </svg>
                            {file ? 'Replace File' : 'Browse Photo'}
                            <input
                              type="file"
                              accept="image/*"
                              onChange={(e) => {
                                const selectedFile = e.target.files[0] || null;
                                setGalleryFiles(prev => {
                                  const next = [...prev];
                                  next[index] = selectedFile;
                                  return next;
                                });
                              }}
                              className="hidden"
                            />
                          </label>
                        </div>
                        
                        {/* Remove Slot */}
                        {galleryFiles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => {
                              setGalleryFiles(prev => prev.filter((_, idx) => idx !== index));
                            }}
                            className="p-1.5 border border-red-100 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition-colors cursor-pointer"
                            title="Remove Slot"
                          >
                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Additional Gallery URLs Input */}
                <div className="pt-2">
                  <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Or Gallery URLs (comma separated direct links)
                  </label>
                  <textarea
                    value={galleryUrls}
                    onChange={(e) => setGalleryUrls(e.target.value)}
                    rows="2"
                    placeholder="https://image1.jpg, https://image2.jpg... (used if no files selected)"
                    className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Tags (comma separated) */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Search Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="e.g. standing, lord, golden, luxury"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Buttons stack */}
              <div className="md:col-span-2 flex justify-end gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#186a8f] hover:bg-[#135471] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {editProduct ? 'Save Changes' : 'Publish Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* Category Filter Dropdown & Search Control Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        
        {/* Left: Category Dropdown Filter */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto">
          <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[#cca040]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Category Filter:
          </label>
          <div className="relative w-full sm:w-64">
            <select
              value={selectedCategoryFilter}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-4 py-2 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#cca040] transition-colors cursor-pointer appearance-none pr-8"
            >
              {categoryOptions.map((cat) => {
                const count = cat === 'All' ? products.length : products.filter(p => p.category?.toLowerCase() === cat.toLowerCase()).length;
                return (
                  <option key={cat} value={cat}>
                    {cat} ({count})
                  </option>
                );
              })}
            </select>
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: Search Input */}
        <div className="relative w-full sm:w-64 shrink-0">
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search products..."
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-8 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#cca040] transition-colors font-semibold"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs font-bold cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

      </div>

      {/* Products Grid Table Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs">
        {displayedProducts.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <span className="text-2xl">🔍</span>
            <p className="text-xs text-slate-500 font-bold">No products found matching your filter criteria.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategoryFilter('All'); setSearchQuery(''); setCurrentPage(1); }}
              className="text-[11px] font-extrabold text-[#cca040] underline hover:text-[#bfa054] cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-[10.5px] font-extrabold uppercase tracking-wider">
                  <th className="pb-3.5 pl-2 font-bold w-12 hidden sm:table-cell">ID</th>
                  <th className="pb-3.5 font-bold w-16">Preview</th>
                  <th className="pb-3.5 font-bold">Product Title</th>
                  <th className="pb-3.5 font-bold hidden sm:table-cell">Category</th>
                  <th className="pb-3.5 font-bold hidden md:table-cell">Material</th>
                  <th className="pb-3.5 font-bold hidden md:table-cell">Placement</th>
                  <th className="pb-3.5 font-bold hidden md:table-cell">Pricing</th>
                  <th className="pb-3.5 font-bold hidden lg:table-cell">Tags</th>
                  <th className="pb-3.5 font-bold text-center w-24">Actions</th>
                </tr>
              </thead>
              <tbody>
                {displayedProducts.map((prod) => (
                  <tr key={prod.id} className="border-b border-slate-50 hover:bg-slate-50/40 text-xs text-slate-600 font-medium">
                    <td className="py-4 pl-2 font-extrabold text-slate-400 hidden sm:table-cell">#{prod.id}</td>

                    {/* Preview Thumbnail */}
                    <td className="py-4">
                      <div className="w-12 h-12 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0">
                        <img
                          src={prod.image}
                          alt={prod.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>

                    <td className="py-4 text-slate-900 font-bold">{prod.title}</td>
                    
                    {/* Category */}
                    <td className="py-4 font-semibold hidden sm:table-cell">
                      <span className="bg-amber-500/10 text-amber-700 px-2 py-0.5 rounded text-[10px] font-extrabold uppercase">
                        {prod.category || 'Uncategorized'}
                      </span>
                    </td>

                    <td className="py-4 font-semibold text-slate-700 hidden md:table-cell">{prod.material}</td>
                    <td className="py-4 text-slate-500 hidden md:table-cell">{prod.type}</td>

                    {/* Pricing */}
                    <td className="py-4 font-semibold hidden md:table-cell">
                      {prod.offerPrice ? (
                        <div>
                          <span className="text-emerald-700 font-extrabold text-xs">
                            ₹{Number(prod.offerPrice).toLocaleString('en-IN')}
                          </span>
                          {prod.price && Number(prod.price) > Number(prod.offerPrice) && (
                            <div className="flex items-center gap-1.5 mt-0.5">
                              <span className="line-through text-slate-400 text-[10px]">
                                ₹{Number(prod.price).toLocaleString('en-IN')}
                              </span>
                              <span className="text-[9px] font-extrabold text-emerald-600 bg-emerald-50 px-1 rounded">
                                -{Math.round(((Number(prod.price) - Number(prod.offerPrice)) / Number(prod.price)) * 100)}%
                              </span>
                            </div>
                          )}
                        </div>
                      ) : prod.price ? (
                        <span className="text-slate-800 font-extrabold text-xs">
                          ₹{Number(prod.price).toLocaleString('en-IN')}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[10.5px] italic">On Request</span>
                      )}
                    </td>

                    {/* Tags */}
                    <td className="py-4 hidden lg:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {prod.tags && prod.tags.map((tag, idx) => (
                          <span key={idx} className="bg-slate-100/70 text-slate-500 text-[9px] font-bold px-1.5 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>

                    {/* Actions Buttons */}
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {/* Edit Button */}
                        <button
                          onClick={() => openEditForm(prod)}
                          className="p-1.5 border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer"
                          title="Edit Spec"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 01-2 2v11a2 2 0 012 2h11a2 2 0 012-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: 'Delete Product?',
                              text: `Are you sure you want to delete "${prod.title}"?`,
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#cca040',
                              cancelButtonColor: '#ef4444',
                              confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                onDeleteProduct(prod._id || prod.id);
                              }
                            });
                          }}
                          className="p-1.5 border border-red-50/50 hover:border-red-100 bg-red-50/30 hover:bg-red-50/80 text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 pt-4 mt-4 gap-3">
            <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
              Showing Page {activePage} of {totalPages} ({filteredProducts.length} Products)
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setCurrentPage(activePage - 1)}
                disabled={activePage === 1}
                className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:hover:bg-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pNum = idx + 1;
                return (
                  <button
                    key={pNum}
                    type="button"
                    onClick={() => setCurrentPage(pNum)}
                    className={`px-3 py-1.5 border text-xs font-bold rounded-lg transition-all cursor-pointer ${activePage === pNum
                        ? 'border-[#cca040] bg-[#cca040] text-white shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-600'
                      }`}
                  >
                    {pNum}
                  </button>
                );
              })}

              <button
                type="button"
                onClick={() => setCurrentPage(activePage + 1)}
                disabled={activePage === totalPages}
                className="px-3 py-1.5 border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-40 disabled:hover:bg-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
