import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import clinthero from '../assets/clinthero.png';
import clintmobilehero from '../assets/clintmobilehero.png';

// Import client logos
import bsf from '../assets/bsf.png';
import indianarmy from '../assets/indianarmy.jpg';
import airforce from '../assets/Indian_Air_Force-Logo.wine.svg';
import railways from '../assets/indian-railways-logo-png_seeklogo-310214.png';
import delhimcd from '../assets/delhimcd.jpg';
import culture from '../assets/Ministry_of_Culture_India.svg';
import lalitkala from '../assets/Lalit_Kala_Akademi.jpg';
import russiaambassy from '../assets/russiaambassy.jpg';
import ambiencemall from '../assets/ambiencemalldelhi.jpg';
import vegasmall from '../assets/vegasmall.jpg';
import wallstreetmall from '../assets/wallthestreetmall.png';
import nescafe from '../assets/nescafe.jpg';
import zococafe from '../assets/zococafe.png';
import bydyellowdoor from '../assets/bydyellowdoor.jpg';
import dddelhi from '../assets/dddelhi.png';
import upgovt from '../assets/Uttarpradeshgovt.webp';
import degardena from '../assets/degardena-gardena.png';
import gmsevent from '../assets/gmseventplaner.jpg';
import raindrop from '../assets/raindrop.jpg';
import flipkart from '../assets/flipcart.png';
import IBC from '../assets/bhdhhistconfdration.jpg';
import apollo from '../assets/apollo-hospitals-logo.png';
import fortune from '../assets/fortune.jpg';
import aerocity from '../assets/aerocity.png';
import malangiaart from '../assets/malangiaart.png';

export const initialClients = [
  { id: '1', name: 'Border Security Force (BSF)', logo: bsf },
  { id: '2', name: 'Indian Army', logo: indianarmy },
  { id: '3', name: 'Indian Air Force', logo: airforce },
  { id: '4', name: 'Indian Railways', logo: railways },
  { id: '5', name: 'Municipal Corporation of Delhi', logo: delhimcd },
  { id: '6', name: 'Ministry of Culture, India', logo: culture },
  { id: '7', name: 'Lalit Kala Akademi', logo: lalitkala },
  { id: '8', name: 'Russian Embassy', logo: russiaambassy },
  { id: '9', name: 'Ambience Mall, Delhi', logo: ambiencemall },
  { id: '10', name: 'Vegas Mall, Delhi', logo: vegasmall },
  { id: '11', name: 'Wall Street Mall', logo: wallstreetmall },
  { id: '12', name: 'Nescafe', logo: nescafe },
  { id: '13', name: 'Zoco Cafe', logo: zococafe },
  { id: '14', name: 'BYD Yellow Door', logo: bydyellowdoor },
  { id: '15', name: 'DDA Delhi', logo: dddelhi },
  { id: '16', name: 'Uttar Pradesh Government', logo: upgovt },
  { id: '17', name: 'De Gardena', logo: degardena },
  { id: '18', name: 'GMS Event Planner', logo: gmsevent },
  { id: '19', name: 'Raindrop', logo: raindrop },
  { id: '20', name: 'Flipkart', logo: flipkart },
  { id: '21', name: 'Buddhist Confederation', logo: IBC },
  { id: '22', name: 'Apollo Hospitals', logo: apollo },
  { id: '23', name: 'Fortune Hotels', logo: fortune },
  { id: '24', name: 'Aerocity Delhi', logo: aerocity },
  { id: '25', name: 'Malangia Art', logo: malangiaart }
];

export default function Projects() {
  const [liveClients, setLiveClients] = useState([]);

  useEffect(() => {
    api.clients.getAll()
      .then(data => setLiveClients(data))
      .catch(err => console.error("Failed to load clients list:", err));
  }, []);

  const displayClients = [
    ...liveClients,
    ...initialClients.filter(init => !liveClients.some(c => c.name?.toLowerCase() === init.name?.toLowerCase()))
  ];

  return (
    <div className="w-full bg-white min-h-screen">
      {/* Hero Banner Section */}
      <div className="w-full relative">
        {/* Desktop Banner */}
        <img
          src={clinthero}
          alt="Our Clients Banner"
          className="hidden sm:block w-full h-auto"
          loading="eager"
        />
        {/* Mobile Banner */}
        <img
          src={clintmobilehero}
          alt="Our Clients Banner Mobile"
          className="block sm:hidden w-full h-auto"
          loading="eager"
        />
      </div>

      {/* Main Clients Grid Section */}
      <div className="max-w-[1450px] mx-auto py-12 sm:py-20 px-4 sm:px-6 lg:px-12 space-y-12">
        {/* Section Header */}
        <div className="text-center space-y-3.5 max-w-[700px] mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 relative inline-block">
            Our Prestigious Clients
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-20 h-[3px] bg-[#C89B3C] rounded-full" />
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium pt-3">
            We are honored to have crafted custom designs, sculptures, and spiritual art installations for government institutions, embassies, corporate giants, and retail destinations.
          </p>
        </div>

        {/* 5-Column Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 sm:gap-8 pt-4">
          {displayClients.map((client, index) => (
            <div
              key={index}
              className="group bg-white border border-slate-100/90 rounded-2xl p-5 shadow-sm hover:shadow-md hover:border-[#C89B3C]/30 transition-all duration-300 flex flex-col items-center justify-between min-h-[170px]"
            >
              {/* Logo Image wrapper */}
              <div className="w-full flex-grow flex items-center justify-center p-2.5">
                <img
                  src={client.logo}
                  alt={`${client.name} Logo`}
                  className="max-h-16 sm:max-h-20 max-w-full object-contain filter   group-hover:scale-105 transition-all duration-300"
                  loading="lazy"
                />
              </div>

              {/* Client Name text */}
              <h4 className="text-slate-700 text-center text-[10.5px] sm:text-xs font-bold leading-tight tracking-wide mt-4 w-full group-hover:text-slate-900 transition-colors border-t border-slate-50 pt-3">
                {client.name}
              </h4>
            </div>
          ))}
        </div>
      </div>

      {/* Become Our Next Client Banner */}
      <div className="max-w-[1450px] mx-auto pb-16 px-4 sm:px-6 lg:px-12">
        <div className="bg-[#0E0E3B] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-md border border-[#C89B3C]/10">
          
          {/* Left Side: Handshake Icon & Content */}
          <div className="flex flex-col sm:flex-row items-center text-center sm:text-left gap-5">
            {/* Gold Handshake outline badge */}
            <div className="w-16 h-16 rounded-full border-2 border-[#C89B3C] flex items-center justify-center shrink-0">
              <svg className="w-8 h-8 text-[#C89B3C]" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-8.25-.44l-.3-.3a1.5 1.5 0 010-2.12l1.63-1.63a3 3 0 014.24 0l1.63 1.63a1.5 1.5 0 010 2.12l-.3.3z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9V6M8.22 10.78L6 8.56M15.78 10.78l2.22-2.22" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 14v4a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4" />
              </svg>
            </div>
            
            {/* Text details */}
            <div className="space-y-1">
              <h3 className="font-serif text-lg sm:text-xl font-bold text-white">
                Become Our Next Client
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-medium max-w-[620px]">
                Join 1000+ satisfied clients who trust Indian Dhamma Art for quality, creativity and reliability.
              </p>
            </div>
          </div>
          
          {/* Right Side: Get in Touch Button */}
          <div className="shrink-0 w-full md:w-auto text-center">
            <a
              href="/contact"
              className="inline-block w-full md:w-auto px-7 py-3 bg-[#C89B3C] hover:bg-[#B8862B] text-white text-xs sm:text-xs font-bold uppercase tracking-wider rounded-lg shadow transition-colors"
            >
              Get In Touch
            </a>
          </div>

        </div>
      </div>

    </div>
  );
}
