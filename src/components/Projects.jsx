import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import projectHotel from '../assets/project_hotel.png';
import projectTemple from '../assets/project_temple.png';
import projectCorporate from '../assets/project_corporate.png';
import projectResidential from '../assets/project_residential.png';
import projectMeditation from '../assets/project_meditation.png';
import projectGarden from '../assets/project_garden.png';
import projectResort from '../assets/project_resort.png';
import projectShrine from '../assets/project_shrine.png';
import rightsideImg from '../assets/rightsideimg.png';

export default function Projects() {
  const scrollRef = useRef(null);

  const projects = [
    { title: 'Luxury Hotel', subtitle: 'Installation', image: projectHotel },
    { title: 'Temple', subtitle: 'Project', image: projectTemple },
    { title: 'Corporate Office', subtitle: 'Decoration', image: projectCorporate },
    { title: 'Residential', subtitle: 'Villa', image: projectResidential },
    { title: 'Meditation Center', subtitle: 'Setup', image: projectMeditation },
    { title: 'Garden Sculpture', subtitle: 'Art', image: projectGarden },
    { title: 'Resort', subtitle: 'Landscaping', image: projectResort },
    { title: 'Main Shrine', subtitle: 'Altar', image: projectShrine }
  ];

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.project-card');
      const cardWidth = card ? card.clientWidth : 240;
      scrollRef.current.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.project-card');
      const cardWidth = card ? card.clientWidth : 240;
      scrollRef.current.scrollBy({ left: cardWidth + 16, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="bg-white py-8 sm:py-12 md:py-14 px-4 sm:px-8 lg:px-12 border-b border-slate-100">
      <div className="max-w-[1750px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14">

        {/* Left Column: Our Projects Carousel */}
        <div className="lg:col-span-7 space-y-6 relative group">

          {/* Header row */}
          <div className="flex justify-between items-center sm:items-baseline flex-wrap gap-x-4 gap-y-1.5 border-b border-slate-100 pb-3">
            <h2 className="font-serif text-base sm:text-lg md:text-xl font-bold uppercase tracking-wider text-[#C89B3C]">
              Our Projects
            </h2>
            {/* <Link
              to="/our-clients"
              className="text-[#186a8f] hover:text-[#135471] text-[10px] sm:text-xs font-bold uppercase tracking-wider transition-colors"
            >
              View All Projects
            </Link> */}
          </div>

          {/* Carousel Track wrapper */}
          <div className="relative">

            {/* Scroll Buttons */}
            <button
              onClick={handleScrollLeft}
              className="absolute -left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-200 z-10 focus:outline-none"
              aria-label="Scroll left"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={handleScrollRight}
              className="absolute -right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-all duration-200 z-10 focus:outline-none"
              aria-label="Scroll right"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Horizontal scroll track */}
            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth snap-x snap-mandatory py-2"
            >
              {projects.map((proj, idx) => (
                <div
                  key={idx}
                  className="project-card w-[180px] sm:w-[220px] lg:w-[calc((100%-48px)/4)] shrink-0 aspect-[4/3.5] relative rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] snap-start border border-slate-100"
                >
                  {/* Background Image */}
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent z-10" />

                  {/* Bottom Text */}
                  <div className="absolute inset-0 flex flex-col justify-end p-4 pb-6 z-20 text-center text-white">
                    <h4 className="font-sans text-xs sm:text-[13px] font-bold uppercase tracking-wide leading-tight">
                      <span className="block">{proj.title}</span>{' '}
                      <span className="block font-medium text-slate-200 mt-0.5">{proj.subtitle}</span>
                    </h4>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* Right Column: Testimonial with Gold Buddha */}
        <div className="lg:col-span-5 flex flex-col justify-center">

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3 md:gap-4 w-full">

            {/* Left Sub-column: Quote & Details */}
            <div className="flex-1 flex flex-col justify-between space-y-3 border-l-2 border-slate-200/80 pl-6 py-1">

              {/* Quote Mark */}
              <span className="text-4xl text-[#C89B3C] font-serif leading-none block">
                &ldquo;
              </span>

              {/* Body Paragraph */}
              <p className="text-slate-650 text-xs sm:text-[13px] leading-relaxed font-sans pb-3 border-b border-slate-200/60">
                The craftsmanship and detailing of the Buddha statue exceeded our expectations. Truly a team of dedicated and skilled artists.
              </p>

              {/* Author */}
              <div>
                <h4 className="text-[#C89B3C] text-xs sm:text-[13px] font-extrabold uppercase tracking-wider leading-tight">
                  Indian Dhamma Art
                </h4>
              </div>

            </div>

            {/* Right Sub-column: Golden Buddha Image */}
            <div className="w-[190px] sm:w-[250px] lg:w-[290px] h-[200px] sm:h-[240px] lg:h-[260px] shrink-0 overflow-hidden relative">
              <img
                src={rightsideImg}
                alt="Golden seated Buddha Statue"
                className="w-full h-full object-contain object-right"
              />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
