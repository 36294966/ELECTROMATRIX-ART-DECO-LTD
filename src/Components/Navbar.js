import { useState } from 'react';
import { 
  HomeIcon, 
  MenuIcon, 
  XIcon, 
  ClipboardListIcon, 
  PhoneIcon, 
  UserIcon, 
  LogoutIcon,
  EyeIcon,
  EyeOffIcon 
} from '@heroicons/react/solid';
import { Link } from 'react-router-dom';
import Logo from '../Assests/logo.png';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin', 'signup', 'forgot'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthModal = (mode = 'signin') => {
    setAuthMode(mode);
    setShowAuthModal(true);
    setIsMenuOpen(false);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: ''
    });
    setShowPassword(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    
    if (authMode === 'signin') {
      // Simulate sign in
      console.log('Signing in:', { email: formData.email, password: formData.password });
      setIsLoggedIn(true);
      closeAuthModal();
    } else if (authMode === 'signup') {
      // Simulate sign up
      console.log('Signing up:', formData);
      setIsLoggedIn(true);
      closeAuthModal();
    } else if (authMode === 'forgot') {
      // Simulate password reset
      console.log('Password reset for:', formData.email);
      alert('Password reset instructions sent to your email!');
      setAuthMode('signin');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsMenuOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 flex items-center justify-between relative z-50 shadow-lg">
        {/* Logo */}
        <div className="flex-shrink-0">
          <img
            src={Logo}
            alt="ELECTROMATRIX ART DECO LTD."
            className="w-40 h-12 sm:w-36 sm:h-12 md:w-48 md:h-16 object-contain cursor-pointer transition-transform hover:scale-105 rounded-full border-2 border-white shadow-md"
          />
        </div>

        {/* Hamburger icon for small screens */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none p-2 hover:bg-blue-500 rounded-lg transition-colors"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <XIcon className="w-5 h-5 text-white" />
            ) : (
              <MenuIcon className="w-5 h-5 text-white" />
            )}
          </button>
        </div>

        {/* Menu for large screens */}
        <div className="hidden md:flex md:items-center md:space-x-3">
          <Link
            to="/"
            className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-blue-500 rounded-lg transition-all duration-200 group"
          >
            <HomeIcon className="w-4 h-4 text-white group-hover:text-yellow-300" />
            <span className="text-white text-sm font-medium group-hover:text-yellow-300">Home</span>
          </Link>
          
          <Link
            to="/book-us"
            className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-blue-500 rounded-lg transition-all duration-200 group"
          >
            <ClipboardListIcon className="w-4 h-4 text-white group-hover:text-yellow-300" />
            <span className="text-white text-sm font-medium group-hover:text-yellow-300">Book Us</span>
          </Link>
          
          <Link
            to="/contact"
            className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-blue-500 rounded-lg transition-all duration-200 group"
          >
            <PhoneIcon className="w-4 h-4 text-white group-hover:text-yellow-300" />
            <span className="text-white text-sm font-medium group-hover:text-yellow-300">Contact</span>
          </Link>

          {/* Authentication Section - Large Screen */}
          <div className="flex items-center space-x-2 ml-2 pl-2 border-l border-blue-400">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-red-500 rounded-lg transition-all duration-200 group"
              >
                <LogoutIcon className="w-4 h-4 text-white group-hover:text-yellow-300" />
                <span className="text-white text-sm font-medium group-hover:text-yellow-300">Logout</span>
              </button>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAuthModal('signin')}
                  className="flex items-center space-x-2 px-3 py-2 cursor-pointer hover:bg-green-500 rounded-lg transition-all duration-200 group"
                >
                  <UserIcon className="w-4 h-4 text-white group-hover:text-yellow-300" />
                  <span className="text-white text-sm font-medium group-hover:text-yellow-300">Sign In</span>
                </button>
                <button
                  onClick={() => handleAuthModal('signup')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-2 rounded-lg transition-all duration-200 font-medium text-sm"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Small screen menu - Positioned close to navbar */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 left-0 bg-white rounded-b-lg shadow-2xl z-40 flex flex-col border-t border-blue-200">
            <Link
              to="/"
              className="flex items-center space-x-3 p-3 w-full text-gray-800 hover:bg-blue-50 transition-all duration-200 group border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <HomeIcon className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
              <span className="text-sm font-medium group-hover:text-blue-700">Home</span>
            </Link>
            
            <Link
              to="/book-us"
              className="flex items-center space-x-3 p-3 w-full text-gray-800 hover:bg-blue-50 transition-all duration-200 group border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <ClipboardListIcon className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
              <span className="text-sm font-medium group-hover:text-blue-700">Book Us</span>
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center space-x-3 p-3 w-full text-gray-800 hover:bg-blue-50 transition-all duration-200 group border-b border-gray-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <PhoneIcon className="w-4 h-4 text-blue-600 group-hover:text-blue-700" />
              <span className="text-sm font-medium group-hover:text-blue-700">Contact</span>
            </Link>

            {/* Authentication Section - Small Screen */}
            <div className="p-2 bg-gray-50">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 p-3 w-full text-gray-800 hover:bg-red-50 rounded-lg transition-all duration-200 group"
                >
                  <LogoutIcon className="w-4 h-4 text-red-600 group-hover:text-red-700" />
                  <span className="text-sm font-medium group-hover:text-red-700">Logout</span>
                </button>
              ) : (
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => handleAuthModal('signin')}
                    className="flex items-center space-x-3 p-3 w-full text-gray-800 hover:bg-green-50 rounded-lg transition-all duration-200 group"
                  >
                    <UserIcon className="w-4 h-4 text-green-600 group-hover:text-green-700" />
                    <span className="text-sm font-medium group-hover:text-green-700">Sign In</span>
                  </button>
                  <button
                    onClick={() => handleAuthModal('signup')}
                    className="flex items-center justify-center space-x-2 p-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all duration-200 font-medium text-sm"
                  >
                    <span>Sign Up</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Authentication for small screens - Always visible when menu is closed */}
        {!isMenuOpen && (
          <div className="md:hidden flex items-center space-x-1">
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 p-1 cursor-pointer hover:bg-red-500 rounded-lg transition-all duration-200"
                aria-label="Logout"
              >
                <LogoutIcon className="w-4 h-4 text-white" />
              </button>
            ) : (
              <>
                <button
                  onClick={() => handleAuthModal('signin')}
                  className="flex items-center space-x-1 p-1 cursor-pointer hover:bg-green-500 rounded-lg transition-all duration-200"
                  aria-label="Sign In"
                >
                  <UserIcon className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleAuthModal('signup')}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded-lg transition-all duration-200 font-medium text-xs"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto transform transition-all">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-t-2xl">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {authMode === 'signin' && 'Welcome Back'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Reset Password'}
                </h2>
                <button
                  onClick={closeAuthModal}
                  className="text-white hover:text-yellow-300 transition-colors"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-blue-100 mt-2">
                {authMode === 'signin' && 'Sign in to your account'}
                {authMode === 'signup' && 'Join us today'}
                {authMode === 'forgot' && 'Enter your email to reset password'}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                {(authMode === 'signin' || authMode === 'signup') && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all pr-10"
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-5 h-5" />
                        ) : (
                          <EyeIcon className="w-5 h-5" />
                        )}
                      </button>
                    </div>
                  </div>
                )}

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                {authMode === 'signin' && (
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-sm text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg"
                >
                  {authMode === 'signin' && 'Sign In'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Reset Password'}
                </button>
              </form>

              {/* Auth Mode Toggle */}
              <div className="mt-6 text-center">
                {authMode === 'signin' && (
                  <p className="text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      Sign Up
                    </button>
                  </p>
                )}
                {authMode === 'signup' && (
                  <p className="text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      Sign In
                    </button>
                  </p>
                )}
                {authMode === 'forgot' && (
                  <p className="text-gray-600">
                    Remember your password?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      Back to Sign In
                    </button>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;





