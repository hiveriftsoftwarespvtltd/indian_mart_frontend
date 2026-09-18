import React, { useState } from 'react';
import Swal from 'sweetalert2';
import buddhaStatuesImg from '../../assets/expertise_buddha_statues.png';
import homeDecorImg from '../../assets/expertise_home_decor.png';
import meditationDecorImg from '../../assets/expertise_meditation_decor.png';
import gardenStatuesImg from '../../assets/expertise_garden_statues.png';
import corporateGiftsImg from '../../assets/expertise_corporate_gifts.png';
import templeSculpturesImg from '../../assets/expertise_temple_sculptures.png';
import wallArtImg from '../../assets/expertise_wall_art.png';
import customizedProductsImg from '../../assets/expertise_customized_products.png';

const defaultImagesMap = {
  'buddha': buddhaStatuesImg,
  'home': homeDecorImg,
  'meditation': meditationDecorImg,
  'garden': gardenStatuesImg,
  'corporate': corporateGiftsImg,
  'temple': templeSculpturesImg,
  'wall': wallArtImg,
  'customized': customizedProductsImg,
  'animal': gardenStatuesImg,
  'tree': gardenStatuesImg
};

const getCategoryThumbnail = (cat) => {
  if (cat && cat.image) return cat.image;
  const nameLower = (cat?.name || '').toLowerCase();
  for (const [key, img] of Object.entries(defaultImagesMap)) {
    if (nameLower.includes(key)) return img;
  }
  return buddhaStatuesImg;
};

export default function CategoryManage({ categories, onAddCategory, onEditCategory, onDeleteCategory, products }) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editCategory, setEditCategory] = useState(null);
  const [catName, setCatName] = useState('');
  const [featured, setFeatured] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [imageFile, setImageFile] = useState(null);

  const openAddForm = () => {
    setCatName('');
    setFeatured(false);
    setImageUrl('');
    setImageFile(null);
    setEditCategory(null);
    setIsFormOpen(true);
  };

  const openEditForm = (cat) => {
    setCatName(cat.name);
    setFeatured(cat.featured || false);
    setImageUrl(cat.image || '');
    setImageFile(null);
    setEditCategory(cat);
    setIsFormOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!catName.trim()) return;

    if (editCategory) {
      onEditCategory({
        ...editCategory,
        name: catName.trim(),
        featured: featured,
        imageUrl: imageUrl,
        imageFile: imageFile
      });
    } else {
      onAddCategory({
        name: catName.trim(),
        featured: featured,
        imageUrl: imageUrl,
        imageFile: imageFile
      });
    }
    setIsFormOpen(false);
  };

  return (
    <div className="space-y-6 text-left text-slate-800">

      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Category Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Configure catalog filters and group product lines.
          </p>
        </div>
        <button
          onClick={openAddForm}
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#cca040] hover:bg-[#bfa054] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          Add Category
        </button>
      </div>

      {/* Add / Edit Form Modal Overlay */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs .">
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
              <h3 className="font-serif text-lg font-bold text-slate-900">
                {editCategory ? `Rename Category: ${editCategory.name}` : 'Create New Product Category'}
              </h3>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">
                Category Details
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-left mt-5">
              {/* Category Name */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Category Title / Display Name
                </label>
                <input
                  type="text"
                  required
                  value={catName}
                  onChange={(e) => setCatName(e.target.value)}
                  placeholder="e.g. Fiber Buddha Statue"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Category Cover Image (File Upload) */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Category Image (File Upload)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files[0])}
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Category Cover Image URL */}
              <div className="space-y-1.5 w-full">
                <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                  Or Image Source URL (External/Fallback)
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://images.unsplash.com/... (used if no file uploaded)"
                  className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors"
                />
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center gap-2 pt-1.5">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  className="w-4 h-4 text-[#cca040] focus:ring-[#cca040] border-slate-300 rounded cursor-pointer"
                />
                <label htmlFor="featured-checkbox" className="text-xs font-bold text-slate-700 cursor-pointer select-none">
                  Show in Featured Collections on Home Page
                </label>
              </div>

        
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
                  {editCategory ? 'Save Changes' : 'Create Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Categories Grid List Card */}
      <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10.5px] font-extrabold uppercase tracking-wider">
                <th className="pb-3.5 pl-2 font-bold w-16">ID</th>
                <th className="pb-3.5 font-bold w-20">Image</th>
                <th className="pb-3.5 font-bold">Category Title</th>
                <th className="pb-3.5 font-bold text-center w-36">Show on Home</th>
                <th className="pb-3.5 font-bold text-center w-40">Assigned Products</th>
                <th className="pb-3.5 font-bold text-center w-28">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat, index) => {
                // Count products inside this category
                const count = products.filter(p => p.category === cat.name).length;
                const catImg = getCategoryThumbnail(cat);
                return (
                  <tr key={cat.id} className="border-b border-slate-50 hover:bg-slate-50/40 text-xs text-slate-600 font-medium">
                    <td className="py-3 pl-2 font-extrabold text-slate-400">#{index + 1}</td>
                    
                    {/* Category Image Thumbnail */}
                    <td className="py-2.5">
                      <div className="w-11 h-11 rounded-xl overflow-hidden bg-slate-100 border border-slate-200/80 shadow-xs shrink-0 flex items-center justify-center">
                        <img
                          src={catImg}
                          alt={cat.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = getCategoryThumbnail(cat);
                          }}
                        />
                      </div>
                    </td>

                    <td className="py-3 text-slate-900 font-bold">{cat.name}</td>

                    {/* Show on Home Status */}
                    <td className="py-4 text-center">
                      {cat.featured ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-150 rounded-full text-[9px] font-extrabold uppercase tracking-wide">
                          ✓ Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 bg-slate-100/70 text-slate-400 rounded-full text-[9px] font-bold">
                          Hidden
                        </span>
                      )}
                    </td>

                    {/* Assigned Products Count */}
                    <td className="py-4 text-center">
                      <span className="inline-block px-2.5 py-1 bg-slate-100/80 text-slate-600 rounded-md font-bold">
                        {count} Items
                      </span>
                    </td>

                    {/* Actions Buttons */}
                    <td className="py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* Edit Button */}
                        <button
                          onClick={() => openEditForm(cat)}
                          className="p-1.5 border border-slate-100 hover:border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-lg transition-colors cursor-pointer"
                          title="Rename Category"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>

                        {/* Delete Button */}
                        <button
                          onClick={() => {
                            Swal.fire({
                              title: 'Delete Category?',
                              text: `Are you sure you want to delete category "${cat.name}"? This won't delete the products, but they will become uncategorized.`,
                              icon: 'warning',
                              showCancelButton: true,
                              confirmButtonColor: '#cca040',
                              cancelButtonColor: '#ef4444',
                              confirmButtonText: 'Yes, delete it!'
                            }).then((result) => {
                              if (result.isConfirmed) {
                                onDeleteCategory(cat.id);
                              }
                            });
                          }}
                          className="p-1.5 border border-red-50/50 hover:border-red-100 bg-red-50/30 hover:bg-red-50/80 text-red-600 rounded-lg transition-colors cursor-pointer"
                          title="Delete Category"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
