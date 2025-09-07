// Home.js
import React, { useMemo, useState } from 'react';
import Deco1 from '../Assests/deco1.png';
import Deco2 from '../Assests/deco2.png';
import Deco3 from '../Assests/deco3.png';
import Deco4 from '../Assests/deco4.png';
import Deco5 from '../Assests/deco5.png';
import Deco6 from '../Assests/deco6.png';
import Deco7 from '../Assests/deco7.png';
import Deco8 from '../Assests/deco8.jpg';
import Deco9 from '../Assests/deco9.jpg';
import Deco10 from '../Assests/deco10.jpg';
import Deco11 from '../Assests/deco11.jpg';
import Deco12 from '../Assests/deco12.jpg';

import Working1 from '../Assests/working1.jpg';
import Working2 from '../Assests/working2.jpg';
import Working3 from '../Assests/working3.jpg';
import Working4 from '../Assests/working4.jpg';
import Working5 from '../Assests/working5.jpg';
import Working6 from '../Assests/working6.jpg';
import Working7 from '../Assests/working7.jpg';
import Working8 from '../Assests/working8.jpg';
import Working9 from '../Assests/working9.jpg';
import Working10 from '../Assests/working10.jpg';
import Working11 from '../Assests/working11.jpg';
import Working12 from '../Assests/working12.png';

import Management from '../Assests/management.jpg';

import {
  FaWhatsapp,
  FaLightbulb,
  FaCamera,
  FaPaintBrush,
  FaCogs,
  FaBolt,
  FaNetworkWired,
  FaVideo,
  FaRing,
  FaTools,
  FaClipboardList,
} from 'react-icons/fa';

function Home() {
  const items = [
    { title: 'Decoration', image: Deco1 },
    { title: 'Aesthetic', image: Deco2 },
    { title: 'Art', image: Deco3 },
    { title: 'Design', image: Deco4 },
    { title: 'Creativity', image: Deco5 },
    { title: 'Innovation', image: Deco6 },
  ];

  const rawServices = [
    'Interior designs décor',
    'Swahili weddings',
    'Pelican lights hiring',
    'Fairy lights hiring and installation',
    'Birthday parties',
    'Minimalist weddings',
    'Photo shoot setups',
    'Photo shoot packages',
    'Music videos setups',
    'Events planning',
    'Project budgeting',
    'Art and setups design',
    'Art props',
    'Advert setups',
    'Location scouting',
    'Wallpaper mounting',
    'Wallpaper suppliers',
    'Electrical installation plans',
    'Electrical quotation',
    'Electrical installation materials supply',
    'Three phase motors installation and repair',
    'Motor power controls',
    'Single phase motors installation and repair',
    'Electrician tools supply',
    'Electrical wiring installations and repair',
    'Cctv installation',
    'Networking',
    'Creative designs',
  ];

  const iconFor = (label) => {
    const v = label.toLowerCase();
    if (v.includes('wedding')) return <FaRing className="text-pink-600" />;
    if (v.includes('photo') || v.includes('shoot')) return <FaCamera className="text-indigo-600" />;
    if (v.includes('music video')) return <FaVideo className="text-red-600" />;
    if (v.includes('pelican') || v.includes('fairy') || v.includes('light')) return <FaLightbulb className="text-amber-500" />;
    if (v.includes('interior') || v.includes('decor') || v.includes('design')) return <FaPaintBrush className="text-emerald-600" />;
    if (v.includes('advert') || v.includes('props')) return <FaClipboardList className="text-sky-600" />;
    if (v.includes('wallpaper')) return <FaPaintBrush className="text-emerald-600" />;
    if (v.includes('motor') || v.includes('phase') || v.includes('controls')) return <FaCogs className="text-gray-700" />;
    if (v.includes('electrical') || v.includes('wiring') || v.includes('electrician') || v.includes('quotation')) return <FaBolt className="text-yellow-500" />;
    if (v.includes('cctv') || v.includes('network')) return <FaNetworkWired className="text-violet-600" />;
    if (v.includes('planning') || v.includes('budget')) return <FaTools className="text-blue-600" />;
    if (v.includes('birthday') || v.includes('event')) return <FaClipboardList className="text-sky-600" />;
    return <FaPaintBrush className="text-emerald-600" />;
  };

  const [query, setQuery] = useState('');
  const filteredServices = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return rawServices;
    return rawServices.filter((s) => s.toLowerCase().includes(q));
  }, [query, rawServices]);

  return (
    <div className="p-6 md:p-10 min-h-screen">
      {/* Blinking Heading */}
      <h1
        className="text-4xl md:text-5xl font-extrabold text-center mb-8 animate-blink"
        style={{
          animation: 'colorChange 10s ease-in-out infinite',
          color: 'black',
        }}
      >
        Welcome to ELECTROMATRIX ART DECO LTD.
      </h1>

      {/* Company Profile */}
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800 border-b-4 border-blue-400 pb-2">
          Company Profile
        </h2>
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-gray-700">About Us</h3>
        <p className="mb-4 text-gray-600 leading-relaxed text-base md:text-lg">
          ELECTROMATRIX ART DECO LTD. is a gateway to providing effective and dynamic services tailored for the
          entertainment industry, especially the film sector. Our expertise includes production design and art, advert
          setups, wedding and corporate events, wallpaper installation, interior decoration, and electrical services.
        </p>
        <p className="mb-4 text-gray-600 leading-relaxed text-base md:text-lg">
          As a company rooted in art, our services are driven by skill and talent, ensuring creativity and quality in
          everything we do. We continuously adapt to the evolving market to serve our clients better.
        </p>
        <p className="text-gray-600 leading-relaxed text-base md:text-lg">
          Join us to bring your ideas to life with professional and artistic solutions.
        </p>
      </div>

      {/* Management with animated border around it */}
      <div className="max-w-4xl mx-auto mb-12 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center text-gray-800 border-b-4 border-blue-400 pb-2">
          Management
        </h2>
        {/* Surround with animated border - increased border thickness to border-12 */}
        <div className="border-12 rounded-lg p-1 animate-borderColor">
          <div className="overflow-hidden rounded-lg shadow-lg hover:scale-105 transform transition-transform duration-300 border-4 border-transparent">
            {/* animated border with color cycles */}
            <div className="border-4 rounded-lg p-2 bg-white">
              <img
                src={Management}
                alt="Management"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Add some custom CSS for animated border color */}
      <style jsx>{`
        @keyframes borderColorCycle {
          0% { border-color: #3b82f6; }
          25% { border-color: #ef4444; }
          50% { border-color: #10b981; }
          75% { border-color: #8b5cf6; }
          100% { border-color: #3b82f6; }
        }
        .animate-borderColor {
          animation: borderColorCycle 4s linear infinite;
        }
      `}</style>

      {/* Creative Inspirations */}
      <div className="max-w-7xl mx-auto px-4 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center text-gray-800">Our Creative Inspirations</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg overflow-hidden hover:scale-105 transform transition duration-300 ease-in-out"
            >
              <img src={item.image} alt={item.title} className="w-full h-48 md:h-64 object-cover" />
              <div className="p-4 text-center">
                <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-2 transition-transform hover:translate-y-1 duration-200">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ——— NEW SECTION: What’s Unique About Us (Blinking Card) ——— */}
      <section className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-6">What’s Unique About Us</h2>
        </div>
        <div
          className="p-6 md:p-8 bg-blue-50 text-gray-700 border-2 border-blue-300 rounded-xl shadow-md animate-blink"
          style={{
            animation: 'blinkBackground 15s infinite',
          }}
        >
          <p className="mb-4">
            The Company is managed by highly well trained, experienced, dedicated, focused, committed, motivated, dynamic, self‐driven and innovative professional team with an sense of entrepreneurship background and skills with an in‐depth understanding of community surrounding socio-economic prevailing conditions.
          </p>
          <p className="mb-4">
            We provide competent and innovative workforce solutions to clients to meet the challenges of today’s dynamic business and working environment.
          </p>
          <p className="mb-4">
            Our key deliverables are efficient and effective output results measured on competency and teamwork.
          </p>
          <p className="mb-4">
            We have the right mix of resources to help clients maximize the efficiency and productivity of their workforce through our wide range of services.
          </p>
          <p>
            We always maintain excellent rapport with our clients and are flexible to accommodate busy schedules and short-time notices in meeting their varying needs.
          </p>
        </div>
      </section>

      {/* ——— OUR SERVICES SECTION ——— */}
      <section className="max-w-7xl mx-auto bg-white/60 backdrop-blur-sm p-6 md:p-8 rounded-2xl shadow-xl mb-16">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Services Offered</h2>
            <p className="text-gray-600 mt-1">To our esteemed customers</p>
          </div>
          {/* Quick search */}
          <div className="w-full md:w-96">
            <label htmlFor="service-search" className="sr-only">
              Search services
            </label>
            <div className="relative">
              <input
                id="service-search"
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search e.g. 'electrical', 'weddings', 'cctv'…"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-gray-800"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">⌘K</span>
            </div>
          </div>
        </div>
        {/* Service cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredServices.map((label, idx) => (
            <article
              key={`${label}-${idx}`}
              className="group relative overflow-hidden rounded-xl border border-gray-100 bg-white shadow hover:shadow-lg transition-shadow"
            >
              <div className="p-5 flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-gray-50 ring-1 ring-gray-200 group-hover:bg-gray-100 transition-colors">
                  <span className="text-xl">{iconFor(label)}</span>
                </div>
                <h3 className="font-semibold text-gray-800 text-base leading-snug">{label}</h3>
              </div>
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-blue-500 via-emerald-500 to-fuchsia-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </article>
          ))}
        </div>
        {/* No services match */}
        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No services match “{query}”. Try a different keyword.</p>
          </div>
        )}
        {/* Helper chips */}
        <div className="mt-6 flex flex-wrap gap-2">
          {['Weddings', 'Electrical', 'Lighting', 'CCTV', 'Wallpaper', 'Events', 'Design'].map((hint) => (
            <button
              key={hint}
              type="button"
              onClick={() => setQuery(hint.toLowerCase())}
              className="px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm hover:bg-blue-100 transition"
            >
              #{hint}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setQuery('')}
            className="px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm hover:bg-gray-200 transition"
          >
            Clear
          </button>
        </div>
      </section>

      {/* Our Business & Future */}
      <section className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg mb-16">
        <h2
          className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center animate-blink"
          style={{
            animation: 'colorChange 10s ease-in-out infinite',
          }}
        >
          Our Craft is Our Business, Fixing The Future
        </h2>
        {/* Images grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[Working1, Working2, Working3, Working4, Working5, Working6, Working7, Working8, Working9, Working10, Working11, Working12].map((image, index) => (
            <div key={index} className="group relative overflow-hidden rounded-xl shadow-lg hover:scale-105 transition-all duration-300">
              <img src={image} alt={`Working image ${index + 1}`} className="w-full h-48 md:h-64 object-cover" />
            </div>
          ))}
        </div>
      </section>

      {/* Development Keys */}
      <section className="max-w-7xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-lg mb-16">
        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-8 text-center">
          Our Keys for Development
        </h2>
        {/* Keys in cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Example cards */}
          <div className="bg-blue-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Desire for Excellence</h3>
            <p className="text-white">
              We constantly strive for excellence in everything we do, ensuring high-quality work and
              unparalleled service.
            </p>
          </div>
          <div className="bg-blue-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Trust and Confidence Build-Up</h3>
            <p className="text-white">
              Building strong, trusting relationships with clients and partners is at the heart of our
              business.
            </p>
          </div>
          <div className="bg-blue-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Transparency</h3>
            <p className="text-white">
              We maintain transparency in all our dealings, ensuring openness, honesty, and clear communication.
            </p>
          </div>
          <div className="bg-blue-500 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold text-white mb-4">Teamwork</h3>
            <p className="text-white">
              Our team collaborates effectively to achieve shared goals, recognizing the importance of collective effort.
            </p>
          </div>
        </div>
        {/* MOTTO with blinking */}
        <div className="text-center mt-8">
          <h3 className="text-2xl font-semibold text-white mb-4 animate-blink" style={{ animation: 'colorChange 10s ease-in-out infinite' }}>
            MOTTO: A COMPANY IS MEASURED WITH THE COURTESY IT TREATS ITS CLIENTS.
          </h3>
        </div>
      </section>

      {/* WhatsApp fixed button */}
      <a
        href="https://wa.me/254714287705"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-10 right-6 bg-green-500 text-white p-6 rounded-full shadow-xl hover:bg-green-400 transition-all transform hover:scale-110"
        style={{ zIndex: 1000 }}
        aria-label="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="text-4xl" />
      </a>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes colorChange {
          0% { color: #3b82f6; }
          25% { color: #ef4444; }
          50% { color: #10b981; }
          75% { color: #8b5cf6; }
          100% { color: #3b82f6; }
        }
        @keyframes blinkBackground {
          0% { background-color: #3b82f6; }
          50% { background-color: #bfdbfe; }
          100% { background-color: #3b82f6; }
        }
        .animate-blink {
          animation: blinkBackground 15s infinite;
        }
        @keyframes borderColorCycle {
          0% { border-color: #3b82f6; }
          25% { border-color: #ef4444; }
          50% { border-color: #10b981; }
          75% { border-color: #8b5cf6; }
          100% { border-color: #3b82f6; }
        }
        .animate-borderColor {
          animation: borderColorCycle 4s linear infinite;
        }
      `}</style>
    </div>
  );
}

export default Home;