import { useState } from 'react';
import { HomeIcon, MenuIcon, XIcon, ClipboardListIcon, PhoneIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import Logo from '../Assests/logo.png'; // Ensure the path is correct

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-blue-600 p-6 flex items-center justify-between relative z-50">
      {/* Logo on the far left, responsive to small screens */}
      <div className="flex-shrink-0">
        <img
          src={Logo}
          alt="Logo"
          className="w-72 h-28 sm:w-64 sm:h-20 md:w-72 md:h-28 object-cover cursor-pointer transition-transform hover:scale-105 rounded-full"
        />
      </div>

      {/* Hamburger icon for small screens */}
      <div className="md:hidden z-50">
        <button
          onClick={toggleMenu}
          className="text-white focus:outline-none p-2"
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMenuOpen ? (
            <XIcon className="w-8 h-8 text-white" /> // Close icon
          ) : (
            <MenuIcon className="w-8 h-8 text-white" /> // Hamburger icon
          )}
        </button>
      </div>

      {/* Menu for large screens: always visible */}
      <div className="hidden md:flex md:items-center md:space-x-8">
        {/* Home */}
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 cursor-pointer hover:underline hover:text-yellow-300 transition duration-200"
        >
          <HomeIcon className="w-8 h-8 text-white" />
          <span className="text-white text-xl font-semibold">Home</span>
        </Link>
        {/* Book Us */}
        <Link
          to="/book-us"
          className="flex items-center space-x-3 p-3 cursor-pointer hover:underline hover:text-yellow-300 transition duration-200"
        >
          <ClipboardListIcon className="w-8 h-8 text-white" />
          <span className="text-white text-xl font-semibold">Book Us</span>
        </Link>
        {/* Contact */}
        <Link
          to="/contact"
          className="flex items-center space-x-3 p-3 cursor-pointer hover:underline hover:text-yellow-300 transition duration-200"
        >
          <PhoneIcon className="w-8 h-8 text-white" />
          <span className="text-white text-xl font-semibold">Contact Us</span>
        </Link>
      </div>

      {/* Small screen menu: overlay styled card */}
      {isMenuOpen && (
        <div className="absolute top-0 right-0 left-0 mt-6 bg-gray-400 rounded-lg shadow-2xl p-6 z-40 flex flex-col space-y-4 transition-transform duration-300 ease-in-out origin-top md:hidden">
          {/* Home */}
          <Link
            to="/"
            className="flex items-center space-x-4 p-4 w-full text-gray-800 hover:bg-blue-100 rounded transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            <HomeIcon className="w-8 h-8" />
            <span className="text-xl font-semibold">Home</span>
          </Link>
          {/* Book Us */}
          <Link
            to="/book-us"
            className="flex items-center space-x-4 p-4 w-full text-gray-800 hover:bg-blue-100 rounded transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            <ClipboardListIcon className="w-8 h-8" />
            <span className="text-xl font-semibold">Book Us</span>
          </Link>
          {/* Contact */}
          <Link
            to="/contact"
            className="flex items-center space-x-4 p-4 w-full text-gray-800 hover:bg-blue-100 rounded transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            <PhoneIcon className="w-8 h-8" />
            <span className="text-xl font-semibold">Contact</span>
          </Link>
        </div>
      )}
    </nav>
  );
}

export default Navbar;





