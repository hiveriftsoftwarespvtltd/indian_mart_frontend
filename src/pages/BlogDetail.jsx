import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../utils/api';
import blogImg1 from '../assets/expertise_buddha_statues.png';

export default function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedBlogs, setRelatedBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true);
        // Try getting single blog or all blogs
        let data = null;
        try {
          data = await api.blogs.getOne(id);
        } catch (e) {
          // Fallback: fetch all and find by ID
          const all = await api.blogs.getAll();
          data = all.find(item => (item._id || item.id) === id);
        }

        if (data) {
          setBlog({
            id: data._id || data.id,
            title: data.title,
            date: data.date || 'Recent',
            image: data.image || blogImg1,
            description: data.description || '',
          });
        }

        // Fetch related blogs for bottom section
        const allBlogs = await api.blogs.getAll();
        if (allBlogs && Array.isArray(allBlogs)) {
          const otherBlogs = allBlogs
            .filter(b => (b._id || b.id) !== id)
            .map(b => ({
              id: b._id || b.id,
              title: b.title,
              date: b.date || 'Recent',
              image: b.image || blogImg1,
            }))
            .slice(0, 3);
          setRelatedBlogs(otherBlogs);
        }
      } catch (err) {
        console.error('Failed to load blog detail:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F8] flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <div className="inline-block animate-spin rounded-full h-10 w-10 border-4 border-[#C89B3C] border-t-transparent"></div>
          <p className="text-slate-600 text-sm font-bold uppercase tracking-wider">Loading Article...</p>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#FAF9F8] py-20 px-4 text-center">
        <div className="max-w-md mx-auto bg-white border border-slate-200 rounded-2xl p-10 space-y-4 shadow-sm">
          <h2 className="font-serif text-2xl font-bold text-slate-900">Article Not Found</h2>
          <p className="text-slate-500 text-xs sm:text-sm">The blog article you are looking for might have been moved or removed.</p>
          <Link
            to="/blogs"
            className="inline-block bg-[#C89B3C] hover:bg-[#B8862B] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-colors"
          >
            ← Back to All Blogs
          </Link>
        </div>
      </div>
    );
  }

  const waMessage = `Hi! I read your article "${blog.title}". I would like to inquire about your handcrafted statues.`;
  const waUrl = `https://wa.me/918506865563?text=${encodeURIComponent(waMessage)}`;

  return (
    <div className="min-h-screen bg-[#FAF9F8] text-[#0E0E3B]">
      {/* ===== Breadcrumbs Header ===== */}
      <div className="bg-white border-b border-slate-200 py-4 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto flex items-center gap-2 text-xs text-slate-500 font-medium">
          <Link to="/" className="hover:text-[#C89B3C] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/blogs" className="hover:text-[#C89B3C] transition-colors">Blogs</Link>
          <span>/</span>
          <span className="text-slate-900 font-bold truncate max-w-[250px] sm:max-w-md">{blog.title}</span>
        </div>
      </div>

      {/* ===== Main Article Article Content ===== */}
      <article className="max-w-4xl mx-auto py-8 sm:py-14 px-4 sm:px-6">
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm p-6 sm:p-10 space-y-8">
          
          {/* Article Header Info */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-3">
              <span className="bg-[#C89B3C]/10 text-[#C89B3C] border border-[#C89B3C]/30 text-[10px] sm:text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                Insights & Decor
              </span>
              <span className="text-slate-400 text-xs font-semibold">
                {blog.date}
              </span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 leading-tight">
              {blog.title}
            </h1>
          </div>

          {/* Featured Image */}
          <div className="relative w-full max-h-[450px] sm:max-h-[520px] rounded-xl overflow-hidden bg-slate-100 shadow-inner">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Description Text */}
          <div className="prose prose-slate max-w-none text-slate-700 text-sm sm:text-base leading-relaxed font-light space-y-4 whitespace-pre-line">
            {blog.description ? blog.description : (
              <p>
                Authentic handcrafted Buddha statues bring profound peace, mindfulness, and spiritual aesthetics into your living space or workplace. At Indian Dhamma Art, our master sculptors dedicate hours of craftsmanship to every single creation, ensuring that every detail reflects ancient artistic traditions.
              </p>
            )}
          </div>

          {/* Call to Action Box inside Article */}
          <div className="bg-[#0E0E3B] text-white rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-serif text-lg sm:text-xl font-bold">Inspired by this Article?</h3>
              <p className="text-slate-300 text-xs sm:text-sm font-light">Get a free consultation for custom statues, home altars, and resort sculptures.</p>
            </div>
            <a
              href={waUrl}
              target="_blank"
              rel="noreferrer"
              className="bg-[#C89B3C] hover:bg-[#B8862B] text-white text-xs font-bold uppercase tracking-widest px-6 py-3 rounded-lg transition-all shadow-sm shrink-0 whitespace-nowrap"
            >
              Enquire On WhatsApp &rarr;
            </a>
          </div>

          {/* Navigation Back */}
          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <Link
              to="/blogs"
              className="text-[#C89B3C] text-xs font-bold uppercase tracking-wider hover:underline"
            >
              ← Back to All Articles
            </Link>
            <Link
              to="/contact"
              className="text-slate-600 hover:text-slate-900 text-xs font-bold uppercase tracking-wider"
            >
              Contact Studio
            </Link>
          </div>
        </div>
      </article>

      {/* ===== Related Articles Section ===== */}
      {relatedBlogs.length > 0 && (
        <section className="py-12 px-4 sm:px-8 border-t border-slate-200 bg-white">
          <div className="max-w-5xl mx-auto space-y-6">
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-slate-900">
              Related Articles & Insights
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  to={`/blogs/${item.id}`}
                  className="group bg-[#FAF9F8] border border-slate-200 rounded-xl overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col"
                >
                  <div className="h-36 w-full overflow-hidden bg-slate-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 space-y-2 flex-grow flex flex-col justify-between">
                    <h4 className="font-serif text-xs sm:text-sm font-bold text-slate-800 group-hover:text-[#C89B3C] transition-colors line-clamp-2">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-semibold text-slate-400">
                      {item.date}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
