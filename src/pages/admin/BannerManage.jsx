import React, { useState } from 'react';
import Swal from 'sweetalert2';

export default function BannerManage({ banners, onAddBanner, onEditBanner, onDeleteBanner, onToggleBannerStatus }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editBanner, setEditBanner] = useState(null);
  const [title, setTitle] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [mobileImageUrl, setMobileImageUrl] = useState('');
  const [mobileImageFile, setMobileImageFile] = useState(null);
  const [linkUrl, setLinkUrl] = useState('');

  const resetForm = () => {
    setTitle('');
    setImageUrl('');
    setImageFile(null);
    setMobileImageUrl('');
    setMobileImageFile(null);
    setLinkUrl('');
    setEditBanner(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formData = new FormData();
    formData.append('title', title.trim());
    formData.append('link', linkUrl.trim() || '#');
    if (editBanner) {
      formData.append('active', editBanner.active ? 'true' : 'false');
    } else {
      formData.append('active', 'true');
    }

    if (imageFile) {
      formData.append('image', imageFile);
    } else if (imageUrl.trim()) {
      formData.append('image', imageUrl.trim());
    } else if (!editBanner) {
      Swal.fire({ title: 'Desktop Image Required', text: 'Please upload a desktop banner image file or enter an image URL.', icon: 'info', confirmButtonColor: '#cca040' });
      return;
    }

    if (mobileImageFile) {
      formData.append('mobileImage', mobileImageFile);
    } else if (mobileImageUrl.trim()) {
      formData.append('mobileImage', mobileImageUrl.trim());
    }

    if (editBanner) {
      onEditBanner(editBanner.id, formData);
    } else {
      onAddBanner(formData);
    }

    resetForm();
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 text-left text-slate-800">

      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Banner Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Configure homepage hero slider banners for Desktop and Mobile views.
          </p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setIsFormOpen(true);
          }}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#cca040] hover:bg-[#bfa054] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Banner
        </button>
      </div>

      {/* Add / Edit Banner Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="absolute inset-0" onClick={() => setIsFormOpen(false)} />

          <div className="bg-[#faf8f5] border border-[#cca040]/15 rounded-2xl p-6 sm:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative z-10 text-left">
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
                {editBanner ? 'Edit Slider Banner' : 'Upload New Slider Banner'}
              </h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Configure both Desktop & Mobile Images
              </p>
            </div>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5 text-left mt-5">
              {/* Title */}
              <div className="space-y-1.5 md:col-span-2">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Banner Title / Heading
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Handcrafted Buddha Statues & Premium Décor"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Desktop Image Upload */}
              <div className="space-y-1.5 md:col-span-2 border-t border-slate-200/60 pt-3">
                <label className="text-[11px] font-extrabold text-[#C89B3C] uppercase tracking-wider block">
                  1. Desktop Banner Image (File or URL)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files[0])}
                      className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">Upload File</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://... URL"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">Or enter image URL</span>
                  </div>
                </div>
              </div>

              {/* Mobile Image Upload */}
              <div className="space-y-1.5 md:col-span-2 border-t border-slate-200/60 pt-3">
                <label className="text-[11px] font-extrabold text-[#C89B3C] uppercase tracking-wider block">
                  2. Mobile View Image (File or URL) - Optional
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => setMobileImageFile(e.target.files[0])}
                      className="w-full bg-white border border-slate-250 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">Upload Mobile File</span>
                  </div>
                  <div>
                    <input
                      type="text"
                      value={mobileImageUrl}
                      onChange={(e) => setMobileImageUrl(e.target.value)}
                      placeholder="https://... Mobile URL"
                      className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                    />
                    <span className="text-[10px] text-slate-400 font-medium mt-1 block">Or enter Mobile URL</span>
                  </div>
                </div>
              </div>

              {/* Target Link */}
              <div className="space-y-1.5 md:col-span-2 border-t border-slate-200/60 pt-3">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Redirect Action URL (Optional)
                </label>
                <input
                  type="text"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="e.g. /collections or /custom-order"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Form actions */}
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
                  className="px-6 py-2.5 bg-[#cca040] hover:bg-[#bfa054] text-white text-xs font-extrabold uppercase tracking-wider rounded-lg shadow-sm transition-colors cursor-pointer"
                >
                  {editBanner ? 'Save Changes' : 'Publish Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Banner Grid List Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {banners.map((banner) => (
            <div key={banner.id} className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-shadow bg-white flex flex-col justify-between">

              {/* Image Previews (Desktop + Mobile) */}
              <div className="grid grid-cols-2 bg-slate-50 relative overflow-hidden border-b border-slate-100">
                <div className="aspect-[16/9] relative border-r border-slate-200/60 overflow-hidden">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute bottom-1 left-1 bg-black/60 text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded">
                    Desktop
                  </span>
                </div>
                <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 flex items-center justify-center">
                  {banner.mobileImage ? (
                    <img
                      src={banner.mobileImage}
                      alt={`${banner.title} Mobile`}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-[10px] text-slate-400 font-semibold italic">No Mobile Image Set</span>
                  )}
                  <span className="absolute bottom-1 left-1 bg-[#C89B3C]/80 text-white text-[8px] font-bold uppercase px-1.5 py-0.5 rounded">
                    Mobile
                  </span>
                </div>

                {/* Active Indicator tag */}
                <span className={`absolute top-2 right-2 px-2.5 py-0.5 text-[9px] font-black uppercase tracking-wider rounded-full shadow-md ${banner.active ? 'bg-emerald-500 text-white' : 'bg-slate-500 text-white'
                  }`}>
                  {banner.active ? 'Active' : 'Inactive'}
                </span>
              </div>

              {/* Banner Details Block */}
              <div className="p-4 space-y-4 text-left">
                <div>
                  <h4 className="font-bold text-slate-900 text-sm line-clamp-1">{banner.title}</h4>
                  <p className="text-[10px] text-slate-400 font-semibold truncate mt-0.5">Redirect: {banner.link}</p>
                </div>

                {/* Actions Row */}
                <div className="flex justify-between items-center gap-3 pt-2 border-t border-slate-50">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditBanner(banner);
                        setTitle(banner.title);
                        setImageUrl(banner.image);
                        setImageFile(null);
                        setMobileImageUrl(banner.mobileImage || '');
                        setMobileImageFile(null);
                        setLinkUrl(banner.link);
                        setIsFormOpen(true);
                      }}
                      className="px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 transition-colors cursor-pointer"
                    >
                      Edit
                    </button>

                    {/* Status Toggle Switch */}
                    <button
                      onClick={() => onToggleBannerStatus(banner.id)}
                      className={`px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wider rounded-lg transition-colors cursor-pointer border ${banner.active
                          ? 'border-amber-200 bg-amber-50 hover:bg-amber-100 text-amber-700'
                          : 'border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
                        }`}
                    >
                      {banner.active ? 'Deactivate' : 'Activate'}
                    </button>
                  </div>

                  {/* Delete Button */}
                  <button
                    onClick={() => {
                      Swal.fire({
                        title: 'Delete Slide?',
                        text: 'Are you sure you want to delete this banner slide permanently?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#cca040',
                        cancelButtonColor: '#ef4444',
                        confirmButtonText: 'Yes, delete it!'
                      }).then((result) => {
                        if (result.isConfirmed) {
                          onDeleteBanner(banner.id);
                        }
                      });
                    }}
                    className="p-1.5 border border-red-50 hover:border-red-100 bg-red-50/40 hover:bg-red-50 text-red-600 rounded-lg transition-colors cursor-pointer"
                    title="Delete Slide"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
