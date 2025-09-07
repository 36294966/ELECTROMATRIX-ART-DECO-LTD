// Full code with responsiveness adjustments

import React from 'react';
import { FaPhone, FaMapMarkerAlt, FaWhatsapp, FaGoogle } from 'react-icons/fa';
import Logo from '../Assests/logo.png';

function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white flex flex-col justify-between min-h-[200px]">
      
      {/* Upper section with contact info */}
      <div className="flex-1 max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row md:justify-between md:items-start space-y-8 md:space-y-0">
        {/* Logo moved far to the right almost to the end */}
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-20 w-full md:w-auto">
          <img
            src={Logo}
            alt="Logo"
            className="w-42 h-24 object-cover cursor-pointer transition-transform hover:scale-105 hover:opacity-75 rounded-full mx-auto md:mx-0"
          />
        </div>
        {/* Contact Info - stack on small screens, grid on md+ */}
        <div className="w-full md:w-auto grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full mx-auto md:mx-0">
          {/* Phone */}
          <div className="flex items-center space-x-4">
            <FaPhone className="w-6 h-6 text-blue-400" />
            <div className="flex flex-col text-left">
              <span className="font-semibold">Phone:</span>
              <span>0714287705</span>
            </div>
          </div>
          
          {/* Gmail with icon in blue */}
          <div className="flex items-center space-x-4">
            <FaGoogle className="w-6 h-6 text-blue-400" />
            <div className="flex flex-col text-left">
              <span className="font-semibold">Gmail:</span>
              <span>symomwaniqs@gmail.com</span>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center space-x-4">
            <FaMapMarkerAlt className="w-6 h-6 text-blue-400" />
            <div className="flex flex-col text-left">
              <span className="font-semibold">Location:</span>
              <span>Nairobi</span>
            </div>
          </div>
          
          {/* WhatsApp */}
          <a
            href="https://wa.me/254714287705"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 hover:text-green-400 transition"
          >
            <FaWhatsapp className="w-6 h-6 text-green-500" />
            <div className="flex flex-col text-left">
              <span className="font-semibold">WhatsApp:</span>
              <span>0714287705</span>
            </div>
          </a>
        </div>
      </div>
      
      {/* Bottom line with blinking, multi-colored text */}
      <div className="w-full bg-gray-900 text-center py-4 flex flex-col md:flex-row md:justify-center md:space-x-4 text-sm md:text-base">
        <div className="blinking-line">
          &copy;2025<br />
          SIR ELECTROMATRIX<br />
          Powered by Dr Erastus Coding Co-operation
        </div>
      </div>

      {/* Custom styles for blinking in different colors */}
      <style jsx>{`
        @keyframes colorCycle {
          0% { color: red; }
          20% { color: orange; }
          40% { color: yellow; }
          60% { color: green; }
          80% { color: blue; }
          100% { color: purple; }
        }

        .blinking-line {
          font-weight: bold;
          animation: colorCycle 5s infinite;
        }
      `}</style>
    </footer>
  );
}

export default Footer;