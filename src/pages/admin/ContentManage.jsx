import React, { useState, useEffect } from 'react';

export default function ContentManage({ content, onSaveContent }) {
  // Contact details state
  const [address, setAddress] = useState(content?.address || '46/7 Ranhola Vihar, Nangloi, Delhi - 110041');
  const [email, setEmail] = useState(content?.email || 'info@indiandhammaart.com');
  const [phone, setPhone] = useState(content?.phone || '+91 85068 65563, +91 89208 30674');

  // About Us narrative state
  const [storyTitle, setStoryTitle] = useState(content?.storyTitle || 'Where Tradition Inspires Every Creation');
  const [storyText1, setStoryText1] = useState(content?.storyText1 || 'Indian Dhamma Art was born from a deep passion for Indian art, culture and spirituality. What started as a small studio has grown into a trusted name in custom handcrafted Buddha statues and premium decor for homes, businesses, temples, hotels and spiritual spaces.');
  const [storyText2, setStoryText2] = useState(content?.storyText2 || 'Every piece we create is the result of devotion, patience and perfection. Our skilled artisans combine age-old techniques with modern design, ensuring every sculpture we deliver is a masterpiece.');

  useEffect(() => {
    if (content) {
      if (content.address) setAddress(content.address);
      if (content.email) setEmail(content.email);
      if (content.phone) setPhone(content.phone);
      if (content.storyTitle) setStoryTitle(content.storyTitle);
      if (content.storyText1) setStoryText1(content.storyText1);
      if (content.storyText2) setStoryText2(content.storyText2);
    }
  }, [content]);

  const [isSaved, setIsSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveContent({
      address,
      email,
      phone,
      storyTitle,
      storyText1,
      storyText2
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 text-left text-slate-800">

      {/* Top Banner Row */}
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-black text-slate-900">Page Content Management</h1>
          <p className="text-xs sm:text-sm text-slate-500 font-medium mt-1">
            Update contact information, narrative text block parameters, and brand profile copy.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {isSaved && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs px-4 py-3 rounded-xl flex items-center gap-2">
            <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-bold uppercase tracking-wider">Changes Saved Successfully! Dynamic content updated.</span>
          </div>
        )}

        {/* Section 1: Contact Details */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
            Company Contact details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* Phone */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Primary Phone / Contact No
              </label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors font-semibold"
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Contact Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors font-semibold"
              />
            </div>

            {/* Address */}
            <div className="space-y-1.5 md:col-span-2">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Office / Studio Location Address
              </label>
              <textarea
                rows="2"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors leading-relaxed font-semibold"
              />
            </div>

          </div>
        </div>

        {/* Section 2: About Page / Narrative Section */}
        <div className="bg-white border border-slate-100 rounded-2xl p-5 sm:p-6 shadow-xs space-y-4">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-2">
            About us Story text blocks
          </h3>

          <div className="space-y-4">

            {/* Story Title */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Story Title / Headline
              </label>
              <input
                type="text"
                required
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors font-semibold"
              />
            </div>

            {/* Narrative paragraph 1 */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Narrative Paragraph 1 (Origin/Founding)
              </label>
              <textarea
                rows="4"
                required
                value={storyText1}
                onChange={(e) => setStoryText1(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors leading-relaxed font-medium"
              />
            </div>

            {/* Narrative paragraph 2 */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">
                Narrative Paragraph 2 (Artisans/Philosophy)
              </label>
              <textarea
                rows="4"
                required
                value={storyText2}
                onChange={(e) => setStoryText2(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs text-slate-800 focus:outline-none focus:border-[#cca040] transition-colors leading-relaxed font-medium"
              />
            </div>

          </div>
        </div>

        {/* Submit row */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="submit"
            className="px-8 py-3.5 bg-[#cca040] hover:bg-[#bfa054] text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            Save All Content Changes
          </button>
        </div>

      </form>

    </div>
  );
}
