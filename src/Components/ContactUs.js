import React from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

function Contact() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-pink-200">
      {/* Contact card */}
      <div className="w-full max-w-2xl bg-blue-600 text-white rounded-xl shadow-2xl p-6 sm:p-8 space-y-6 mx-auto my-8 transition-transform transform hover:scale-105 hover:shadow-3xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Contact Information</h2>
        {/* Contact Details List */}
        <div className="space-y-8">
          
          {/* Phone Number */}
          <div className="flex items-center space-x-4 p-4 bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300 cursor-pointer">
            <FaPhone className="w-8 h-8" />
            <div>
              <p className="text-lg sm:text-xl font-semibold">Phone:</p>
              <p className="text-sm sm:text-lg ml-1">0714287705</p>
            </div>
          </div>
          
          {/* Email */}
          <div className="flex items-center space-x-4 p-4 bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300 cursor-pointer">
            <FaEnvelope className="w-8 h-8" />
            <div>
              <p className="text-lg sm:text-xl font-semibold">Email:</p>
              <p className="text-sm sm:text-lg ml-1">symomwaniqs@gmail.com</p>
            </div>
          </div>
          
          {/* Location */}
          <div className="flex items-center space-x-4 p-4 bg-blue-500 rounded-lg hover:bg-blue-400 transition duration-300 cursor-pointer">
            <FaMapMarkerAlt className="w-8 h-8" />
            <div>
              <p className="text-lg sm:text-xl font-semibold">Location:</p>
              <p className="text-sm sm:text-lg ml-1">Nairobi</p>
            </div>
          </div>
          
          {/* WhatsApp - clickable */}
          <a
            href="https://wa.me/254714287705"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-4 p-4 bg-green-500 rounded-lg hover:bg-green-400 transition duration-300 cursor-pointer"
          >
            <FaWhatsapp className="w-8 h-8" />
            <div>
              <p className="text-lg sm:text-xl font-semibold">WhatsApp:</p>
              <p className="text-sm sm:text-lg ml-1">0714287705</p>
            </div>
          </a>
        </div>
      </div>

      {/* Footer section */}
      <footer className="bg-blue-600 text-white py-4 text-center">
        <p>&copy; 2025 Your Company Name</p>
      </footer>
    </div>
  );
}

export default Contact;

