import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import blogImg1 from '../assets/expertise_buddha_statues.png';
import blogImg2 from '../assets/expertise_meditation_decor.png';
import blogImg3 from '../assets/expertise_wall_art.png';
import rightsideImg2 from '../assets/rightsideimg2.png';
import { api } from '../utils/api';

const defaultPosts = [
  {
    date: 'May 10, 2026',
    title: 'How to Choose the Perfect Buddha Statue for Your Space',
    image: blogImg1,
  },
  {
    date: 'May 05, 2026',
    title: 'The Spiritual Significance of Buddha Statues in Home Decor',
    image: blogImg2,
  },
  {
    date: 'Apr 20, 2026',
    title: 'Why Handcrafted Art is Better Than Machine Made Products',
    image: blogImg3,
  }
];

export default function Blog() {
  const scrollRef = useRef(null);
  const [posts, setPosts] = useState(defaultPosts);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await api.blogs.getAll();
        if (data && Array.isArray(data) && data.length > 0) {
          const formatted = data.map(item => ({
            id: item._id || item.id,
            date: item.date || 'Recent',
            title: item.title,
            image: item.image || blogImg1,
            description: item.description,
          }));
          setPosts(formatted);
        }
      } catch (err) {
        console.error('Failed to load blog articles from API:', err);
      }
    };
    fetchBlogs();
  }, []);

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.blog-card');
      const cardWidth = card ? card.clientWidth : 230;
      scrollRef.current.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.blog-card');
      const cardWidth = card ? card.clientWidth : 230;
      scrollRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    }
  };

  return (
    <section id="blogs" className="bg-white py-8 sm:py-12 md:py-14 px-4 sm:px-8 lg:px-12 border-b border-slate-100">
      <div className="max-w-[1750px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-start">

        {/* ===== LEFT: Latest Articles & Carousel ===== */}
        <div className="space-y-4 sm:space-y-5">
          
          {/* Header Row + Navigation Controls */}
          <div className="flex justify-between items-center border-b border-slate-100 pb-2.5">
            <h2 className="font-serif text-sm sm:text-base md:text-lg font-bold uppercase tracking-widest text-[#C89B3C]">
              Latest Articles & Insights
            </h2>

            {/* Carousel Arrow Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleScrollLeft}
                className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#C89B3C] bg-white hover:bg-[#C89B3C] text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                title="Scroll Left"
                aria-label="Previous Article"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                onClick={handleScrollRight}
                className="w-8 h-8 rounded-full border border-slate-200 hover:border-[#C89B3C] bg-white hover:bg-[#C89B3C] text-slate-600 hover:text-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                title="Scroll Right"
                aria-label="Next Article"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Smooth Horizontal Carousel Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-1"
          >
            {posts.map((post, idx) => (
              <article
                key={post.id || idx}
                className="blog-card bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 flex flex-col flex-shrink-0 w-[240px] sm:w-[220px] md:w-[230px] snap-start"
              >
                {/* Image + Date Tag */}
                <div className="relative">
                  <div className="h-[125px] sm:h-[135px] md:h-[140px] w-full overflow-hidden bg-[#FAF9F8] flex items-center justify-center p-1">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="absolute -bottom-3 left-3 bg-white border border-slate-200 rounded-[5px] px-2 py-0.5 text-[8px] sm:text-[9px] font-semibold text-slate-500 shadow z-10 whitespace-nowrap">
                    {post.date}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-5 pb-3.5 px-3.5 flex flex-col gap-2.5 flex-grow">
                  <h4 className="text-[11px] font-bold text-slate-800 leading-snug line-clamp-3">
                    {post.title}
                  </h4>
                  <Link
                    to={post.id ? `/blogs/${post.id}` : '/blogs'}
                    className="text-[#C89B3C] text-[9px] font-bold uppercase tracking-widest hover:text-[#B8862B] transition-colors mt-auto flex items-center gap-1"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* ===== RIGHT: Custom Masterpiece CTA ===== */}
        <div>
          <div className="relative bg-[#0A0F3E] rounded-2xl overflow-hidden min-h-[420px] sm:min-h-0 sm:h-[340px] md:h-[380px] flex items-center">
            
            {/* ---- Text content ---- */}
            <div className="relative z-20 p-6 sm:p-8 md:p-10 flex flex-col gap-4 w-full sm:w-[58%] justify-center">
              <div>
               <h3 className="font-serif text-[24px] sm:text-[28px] md:text-[34px] font-bold text-white leading-tight">
                Looking for a
                </h3>
                <h3 className="font-serif text-[24px] sm:text-[28px] md:text-[34px] font-bold text-white leading-tight">
                  Custom Crafted Masterpiece?
                </h3>
              </div>

              <p className="text-slate-300/90 text-xs sm:text-sm leading-relaxed font-light">
                Our experts are here to help you create something unique and meaningful.
              </p>

              <div className="flex flex-col gap-3 mt-2 w-full sm:w-[85%] md:w-[75%]">
                <Link
                  to="/custom-order"
                  className="bg-[#C89B3C] hover:bg-[#B8862B] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-3 px-5 rounded-md transition-all duration-300 text-center shadow-sm hover:shadow"
                >
                  GET FREE CONSULTATION
                </Link>
                <a
                  href="https://wa.me/918506865563"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-[#1a6e8e] hover:bg-[#135471] text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest py-3 px-5 rounded-md flex items-center justify-center gap-1.5 transition-all duration-300 shadow-sm hover:shadow"
                >
                  <svg className="w-3.5 h-3.5 fill-current shrink-0" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.665.989 3.3 1.478 4.957 1.48 5.393 0 9.778-4.383 9.781-9.774a9.686 9.686 0 0 0-2.848-6.903A9.702 9.702 0 0 0 11.998 1.15c-5.396 0-9.786 4.386-9.79 9.778-.002 1.81.488 3.515 1.42 5.068L2.538 21.2l5.109-1.346-.99-.606zM15.1 12.87c-.23-.115-1.354-.668-1.564-.744-.21-.076-.364-.115-.517.115-.153.23-.594.744-.728.897-.134.153-.268.172-.498.057-.23-.115-.97-.358-1.848-1.141-.683-.61-1.145-1.363-1.279-1.593-.134-.23-.014-.354.101-.469.104-.103.23-.268.344-.402.115-.134.153-.23.23-.383.076-.153.038-.287-.019-.402-.057-.115-.517-1.245-.71-1.703-.186-.447-.375-.387-.517-.394-.13-.006-.28-.008-.43-.008a.823.823 0 0 0-.594.278c-.206.23-.785.766-.785 1.867s.8 2.164.912 2.317c.114.153 1.57 2.398 3.805 3.363.53.23 1.05.378 1.408.491.536.17 1.02.146 1.402.089.426-.064 1.354-.553 1.545-1.088.19-.536.19-.995.134-1.088-.057-.096-.21-.153-.44-.268z" />
                  </svg>
                  WHATSAPP US
                </a>
              </div>
            </div>

            {/* Buddha image */}
            <img
              src={rightsideImg2}
              alt="Golden Buddha Statue"
              className="absolute right-0 bottom-0 h-full w-auto object-contain object-right-bottom pointer-events-none z-10"
            />

          </div>
        </div>

      </div>
    </section>
  );
}
