import React, { useState } from 'react';
import Swal from 'sweetalert2';

const galleryCategories = [
  'Buddha Statues',
  'Animal Statues',
  'Artificial Trees',
  'God Statues',
  'Sculpture Art',
  'Glowing Statues',
  'Ashoka Pillar',
  'Others'
];

export default function GalleryManage({ gallery, onAddGalleryItem, onDeleteGalleryItem }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(galleryCategories[0]);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [filterTab, setFilterTab] = useState('All');

  const openAddForm = () => {
    setSelectedCategory(galleryCategories[0]);
    setImageUrl('');
    setImageFile(null);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imageFile && !imageUrl.trim()) {
      Swal.fire({ title: 'Upload Photo', text: 'Please upload a file or specify an image URL', icon: 'info', confirmButtonColor: '#cca040' });
      return;
    }

    const formData = new FormData();
    formData.append('category', selectedCategory);
    if (imageFile) {
      formData.append('image', imageFile);
    } else {
      formData.append('image', imageUrl.trim());
    }

    onAddGalleryItem(formData);
    setIsFormOpen(false);
  };

  const filteredGallery = gallery.filter(item => {
    return filterTab === 'All' || item.category === filterTab;
  });

  return (
    <div className="space-y-6 text-left text-slate-800">
      
      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Gallery Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Upload and organize showcase photos across catalog collections.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#cca040] hover:bg-[#bfa054] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Upload Photo
        </button>
      </div>

      {/* Categories Filter Bar */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-xs flex items-center justify-between gap-4 overflow-x-auto">
        <div className="flex flex-wrap gap-1.5 scrollbar-none">
          {['All', ...galleryCategories].map((cat) => {
            const count = cat === 'All' ? gallery.length : gallery.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setFilterTab(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  filterTab === cat
                    ? 'bg-[#0a0e26] text-white shadow-sm'
                    : 'bg-slate-100 hover:bg-slate-200/80 text-slate-600'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Upload Form Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          {/* Backdrop click trigger */}
          <div className="absolute inset-0" onClick={() => setIsFormOpen(false)} />

          <div className="bg-[#faf8f5] border border-[#cca040]/15 rounded-2xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative z-10 text-left">
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
              <h3 className="font-serif text-lg font-bold text-slate-900">Upload Gallery Image</h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Add photo to showcasing section
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left mt-5">
              {/* Category Dropdown */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Select Showcase Category
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 font-semibold focus:outline-none focus:border-[#cca040] transition-colors cursor-pointer"
                >
                  {galleryCategories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              {/* Photo upload */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Upload Image File
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* URL input */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Or Paste Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Buttons stack */}
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-600 text-xs font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#cca040] hover:bg-[#bfa054] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  Publish Photo
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Gallery Cards Grid */}
      {filteredGallery.length === 0 ? (
        <div className="bg-white border border-slate-100 rounded-2xl p-12 text-center text-slate-400 font-semibold text-xs shadow-xs">
          No photos found under this category. Click 'Upload Photo' to add some!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {filteredGallery.map((item) => (
            <div
              key={item.id}
              className="group relative bg-white border border-slate-100 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="aspect-square w-full bg-slate-50 relative overflow-hidden">
                <img
                  src={item.image}
                  alt="Gallery showcase Item"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                
                 {/* Delete Button overlay */}
                <button
                  onClick={() => {
                    Swal.fire({
                      title: 'Delete Photo?',
                      text: 'Are you sure you want to delete this gallery photo?',
                      icon: 'warning',
                      showCancelButton: true,
                      confirmButtonColor: '#cca040',
                      cancelButtonColor: '#ef4444',
                      confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                      if (result.isConfirmed) {
                        onDeleteGalleryItem(item.id);
                      }
                    });
                  }}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-xs border border-red-50 hover:bg-red-50 text-red-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-sm cursor-pointer"
                  title="Delete Photo"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>

              {/* Tag / Category details */}
              <div className="p-3 text-left">
                <span className="inline-block px-2.5 py-1 bg-slate-100 text-slate-600 rounded-md text-[10px] font-black uppercase tracking-wider">
                  {item.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
