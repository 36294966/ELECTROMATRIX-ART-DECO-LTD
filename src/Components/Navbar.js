import { useState, useEffect } from 'react';
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
  const [authMode, setAuthMode] = useState('signup'); // Default to signup
  const [showPassword, setShowPassword] = useState(false);
  const [userData, setUserData] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: ''
  });
  const [users, setUsers] = useState([]); // Store registered users

  // Check if user is logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    const savedUsers = localStorage.getItem('registeredUsers');
    
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUserData(user);
      setIsLoggedIn(true);
    }
    
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthModal = (mode = 'signup') => {
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

  // Check if user exists in registered users
  const checkUserExists = (email) => {
    return users.some(user => user.email === email);
  };

  // Validate password match for signup
  const validatePassword = () => {
    if (authMode === 'signup' && formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return false;
    }
    
    if (authMode === 'signup' && formData.password.length < 6) {
      alert('Password must be at least 6 characters long!');
      return false;
    }
    
    return true;
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    
    if (authMode === 'signin') {
      // Check if user exists
      const userExists = checkUserExists(formData.email);
      if (!userExists) {
        alert('No account found with this email. Please sign up first.');
        setAuthMode('signup');
        return;
      }

      // Find user and verify password
      const user = users.find(u => u.email === formData.email);
      if (user && user.password === formData.password) {
        setUserData(user);
        setIsLoggedIn(true);
        localStorage.setItem('userData', JSON.stringify(user));
        closeAuthModal();
        alert(`Welcome back, ${user.firstName}!`);
      } else {
        alert('Invalid email or password. Please try again.');
      }
      
    } else if (authMode === 'signup') {
      // Validate password match
      if (!validatePassword()) {
        return;
      }

      // Check if user already exists
      if (checkUserExists(formData.email)) {
        alert('An account with this email already exists. Please sign in.');
        setAuthMode('signin');
        return;
      }

      // Create new user
      const newUser = {
        id: Date.now(),
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        fullName: `${formData.firstName} ${formData.lastName}`,
        createdAt: new Date().toISOString()
      };

      // Update users list
      const updatedUsers = [...users, newUser];
      setUsers(updatedUsers);
      localStorage.setItem('registeredUsers', JSON.stringify(updatedUsers));

      // Log the user in
      setUserData(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('userData', JSON.stringify(newUser));
      closeAuthModal();
      alert(`Welcome, ${newUser.firstName}! Your account has been created successfully.`);
      
    } else if (authMode === 'forgot') {
      // Check if user exists before allowing password reset
      const userExists = checkUserExists(formData.email);
      if (!userExists) {
        alert('No account found with this email. Please sign up first.');
        setAuthMode('signup');
        return;
      }
      alert('Password reset instructions have been sent to your email!');
      setAuthMode('signin');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData(null);
    localStorage.removeItem('userData');
    setIsMenuOpen(false);
    alert('You have been logged out successfully.');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Function to get user greeting - FIXED to show "Hi, Name"
  const getUserGreeting = () => {
    if (!userData) return 'Hi!';
    
    if (userData.firstName) {
      return `Hi, ${userData.firstName}`;
    } else if (userData.fullName) {
      return `Hi, ${userData.fullName.split(' ')[0]}`;
    } else {
      return 'Hi!';
    }
  };

  // Function to get short name for mobile
  const getShortName = () => {
    if (!userData) return 'Hi!';
    
    if (userData.firstName) {
      // Show first 2 letters of first name
      return userData.firstName.length > 6 
        ? `${userData.firstName.substring(0, 6)}..` 
        : userData.firstName;
    }
    return 'Hi!';
  };

  return (
    <>
      <nav className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-3 flex items-center justify-between relative z-50 shadow-2xl border-b-2 border-blue-300">
        {/* Logo - Rectangular with Rounded Edges */}
        <div className="flex-shrink-0">
          <div className="flex items-center space-x-3">
            {/* Rectangular Container with Rounded Edges */}
            <div className="
              relative 
              bg-gradient-to-br from-white via-blue-50 to-purple-50
              shadow-2xl 
              border-4 border-white
              overflow-hidden
              flex
              items-center
              justify-center
              transition-all 
              duration-500
              hover:scale-105 
              hover:shadow-4xl
              hover:rotate-1
              cursor-pointer
              w-48 h-16
              sm:w-56 sm:h-18
              md:w-64 md:h-20
              lg:w-72 lg:h-22
              xl:w-80 xl:h-24
              rounded-2xl
            ">
              {/* Main Logo Container */}
              <div className="
                absolute 
                inset-2 
                bg-gradient-to-br from-blue-100 via-white to-purple-100 
                rounded-xl
                shadow-inner
                flex
                items-center
                justify-center
                overflow-hidden
                w-[calc(100%-16px)]
                h-[calc(100%-16px)]
              ">
                {/* Logo Image - Perfectly Scaled */}
                <img
                  src={Logo}
                  alt="ELECTROMATRIX ART DECO LTD."
                  className="
                    w-[95%]
                    h-[95%]
                    object-contain 
                    transform
                    transition-transform
                    duration-500
                    group-hover:scale-110
                  "
                  style={{
                    filter: 'brightness(1.08) contrast(1.15)',
                    transformOrigin: 'center'
                  }}
                />
              </div>
              
              {/* Animated Shine Effect */}
              <div className="
                absolute 
                inset-0 
                bg-gradient-to-r 
                from-transparent 
                via-white/40 
                to-transparent 
                opacity-0 
                group-hover:opacity-100 
                transition-opacity 
                duration-700
                rounded-2xl
                transform 
                -skew-x-12
              "></div>
              
              {/* Outer Glow Effect */}
              <div className="
                absolute 
                inset-0 
                border-2 
                border-gradient-to-r from-blue-300/60 via-purple-300/60 to-blue-300/60
                rounded-2xl
                pointer-events-none
                shadow-lg
              "></div>
              
              {/* Corner Accents */}
              <div className="
                absolute 
                top-2 
                left-3 
                w-1.5 
                h-1.5 
                bg-blue-400 
                rounded-full 
                opacity-70
                shadow-sm
              "></div>
              <div className="
                absolute 
                top-2 
                right-3 
                w-1.5 
                h-1.5 
                bg-purple-400 
                rounded-full 
                opacity-70
                shadow-sm
              "></div>
              <div className="
                absolute 
                bottom-2 
                left-3 
                w-1.5 
                h-1.5 
                bg-blue-400 
                rounded-full 
                opacity-70
                shadow-sm
              "></div>
              <div className="
                absolute 
                bottom-2 
                right-3 
                w-1.5 
                h-1.5 
                bg-purple-400 
                rounded-full 
                opacity-70
                shadow-sm
              "></div>
            </div>
          </div>
        </div>

        {/* Hamburger icon for small screens - Single Cross/Hamburger */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none p-3 hover:bg-blue-500 rounded-xl transition-all duration-300 shadow-2xl hover:shadow-3xl border-2 border-blue-300"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? (
              <XIcon className="w-6 h-6 text-white" />
            ) : (
              <MenuIcon className="w-6 h-6 text-white" />
            )}
          </button>
        </div>

        {/* Menu for large screens */}
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-3 px-5 py-3 cursor-pointer hover:bg-blue-500 rounded-2xl transition-all duration-300 group border-2 border-transparent hover:border-blue-300 shadow-xl hover:shadow-2xl bg-blue-500/20"
          >
            <HomeIcon className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
            <span className="text-white text-base font-bold group-hover:text-yellow-300 transition-colors">Home</span>
          </Link>
          
          <Link
            to="/book-us"
            className="flex items-center space-x-3 px-5 py-3 cursor-pointer hover:bg-blue-500 rounded-2xl transition-all duration-300 group border-2 border-transparent hover:border-blue-300 shadow-xl hover:shadow-2xl bg-blue-500/20"
          >
            <ClipboardListIcon className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
            <span className="text-white text-base font-bold group-hover:text-yellow-300 transition-colors">Book Us</span>
          </Link>
          
          <Link
            to="/contact"
            className="flex items-center space-x-3 px-5 py-3 cursor-pointer hover:bg-blue-500 rounded-2xl transition-all duration-300 group border-2 border-transparent hover:border-blue-300 shadow-xl hover:shadow-2xl bg-blue-500/20"
          >
            <PhoneIcon className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
            <span className="text-white text-base font-bold group-hover:text-yellow-300 transition-colors">Contact</span>
          </Link>

          {/* Authentication Section - Large Screen */}
          <div className="flex items-center space-x-3 ml-4 pl-4 border-l-2 border-blue-300">
            {isLoggedIn ? (
              <div className="flex items-center space-x-4">
                {/* User Greeting - Desktop - FIXED to show "Hi, Name" */}
                <div className="flex items-center space-x-3 px-5 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl border-2 border-blue-300 shadow-2xl">
                  <UserIcon className="w-5 h-5 text-yellow-300" />
                  <span className="text-yellow-300 text-base font-bold">
                    {getUserGreeting()}
                  </span>
                </div>
                
                {/* Logout Button */}
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-3 px-5 py-3 cursor-pointer hover:bg-red-500 rounded-2xl transition-all duration-300 group border-2 border-red-400 shadow-xl hover:shadow-2xl bg-red-500/20"
                >
                  <LogoutIcon className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
                  <span className="text-white text-base font-bold group-hover:text-yellow-300 transition-colors">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                {/* Sign In Button */}
                <button
                  onClick={() => handleAuthModal('signin')}
                  className="flex items-center space-x-3 px-5 py-3 cursor-pointer hover:bg-green-600 rounded-2xl transition-all duration-300 group border-2 border-green-400 shadow-xl hover:shadow-2xl bg-green-500/20"
                  title="Sign in to your account"
                >
                  <UserIcon className="w-5 h-5 text-white group-hover:text-yellow-300 transition-colors" />
                  <span className="text-white text-base font-bold group-hover:text-yellow-300 transition-colors">Sign In</span>
                </button>
                
                {/* Primary Sign Up Button */}
                <button
                  onClick={() => handleAuthModal('signup')}
                  className="bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 hover:from-yellow-600 hover:via-orange-500 hover:to-yellow-600 text-white px-7 py-3 rounded-2xl transition-all duration-300 font-bold text-base shadow-3xl hover:shadow-4xl border-2 border-yellow-400 transform hover:scale-105 hover:rotate-1"
                >
                  Sign Up Free
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Small screen menu - Improved spacing and layout */}
        {isMenuOpen && (
          <div className="fixed top-0 left-0 right-0 h-3/4 bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 z-40 flex flex-col rounded-b-3xl shadow-4xl border-b-2 border-purple-400 border-l-2 border-r-2 border-purple-300 overflow-hidden">
            {/* Welcome Header */}
            <div className="px-6 py-5 text-center border-b-2 border-purple-400/30 bg-gradient-to-r from-purple-800 to-indigo-800">
              <h2 className="text-xl font-bold text-yellow-300 mb-1">
                Welcome to Electromatrix
              </h2>
              <p className="text-purple-200 text-xs">
                Your trusted technology partner
              </p>
            </div>

            {/* Navigation Links - Improved spacing */}
            <div className="flex-1 flex flex-col p-5 space-y-4 overflow-y-auto">
              {/* Main Navigation */}
              <Link
                to="/"
                className="flex items-center space-x-4 p-4 w-full text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all duration-300 group border-2 border-purple-500 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-3 bg-yellow-400 rounded-lg group-hover:bg-yellow-300 transition-colors flex-shrink-0">
                  <HomeIcon className="w-5 h-5 text-purple-800" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="text-base font-bold group-hover:text-yellow-300 transition-colors block">Home</span>
                  <p className="text-purple-200 text-xs mt-1 truncate">Start your journey with us</p>
                </div>
              </Link>
              
              <Link
                to="/book-us"
                className="flex items-center space-x-4 p-4 w-full text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all duration-300 group border-2 border-purple-500 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-3 bg-yellow-400 rounded-lg group-hover:bg-yellow-300 transition-colors flex-shrink-0">
                  <ClipboardListIcon className="w-5 h-5 text-purple-800" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="text-base font-bold group-hover:text-yellow-300 transition-colors block">Book Us</span>
                  <p className="text-purple-200 text-xs mt-1 truncate">Schedule our services</p>
                </div>
              </Link>
              
              <Link
                to="/contact"
                className="flex items-center space-x-4 p-4 w-full text-white hover:bg-gradient-to-r hover:from-purple-600 hover:to-purple-700 rounded-xl transition-all duration-300 group border-2 border-purple-500 shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={() => setIsMenuOpen(false)}
              >
                <div className="p-3 bg-yellow-400 rounded-lg group-hover:bg-yellow-300 transition-colors flex-shrink-0">
                  <PhoneIcon className="w-5 h-5 text-purple-800" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <span className="text-base font-bold group-hover:text-yellow-300 transition-colors block">Contact</span>
                  <p className="text-purple-200 text-xs mt-1 truncate">Get in touch with us</p>
                </div>
              </Link>

              {/* Authentication Section - Improved spacing */}
              <div className="mt-4 space-y-4 pt-4 border-t-2 border-purple-400/30">
                {isLoggedIn ? (
                  <div className="space-y-4">
                    {/* User Greeting - Mobile - FIXED to show "Hi, Name" */}
                    <div className="flex items-center space-x-4 p-4 w-full bg-gradient-to-r from-purple-600 to-indigo-700 rounded-xl border-2 border-purple-400 shadow-lg">
                      <div className="p-3 bg-yellow-400 rounded-lg flex-shrink-0">
                        <UserIcon className="w-5 h-5 text-purple-800" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-sm font-bold text-yellow-300 block truncate">
                          {getUserGreeting()}
                        </span>
                        <span className="text-xs text-purple-200 block truncate mt-1">
                          {userData.email}
                        </span>
                      </div>
                    </div>
                    
                    {/* Logout Button - Mobile */}
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-4 p-4 w-full text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-red-700 rounded-xl transition-all duration-300 group border-2 border-red-400 bg-gradient-to-r from-red-600 to-red-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <div className="p-3 bg-white rounded-lg group-hover:bg-red-100 transition-colors flex-shrink-0">
                        <LogoutIcon className="w-5 h-5 text-red-600" />
                      </div>
                      <span className="text-sm font-bold group-hover:text-yellow-300 transition-colors">Logout</span>
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col space-y-4">
                    <button
                      onClick={() => handleAuthModal('signin')}
                      className="flex items-center space-x-4 p-4 w-full text-white hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 rounded-xl transition-all duration-300 group border-2 border-green-400 bg-gradient-to-r from-green-600 to-green-700 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                      <div className="p-3 bg-white rounded-lg group-hover:bg-green-100 transition-colors flex-shrink-0">
                        <UserIcon className="w-5 h-5 text-green-600" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <span className="text-sm font-bold group-hover:text-yellow-300 transition-colors block">Sign In</span>
                        <p className="text-green-200 text-xs mt-1">Access your account</p>
                      </div>
                    </button>
                    <button
                      onClick={() => handleAuthModal('signup')}
                      className="flex items-center space-x-4 p-4 w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 hover:from-yellow-600 hover:via-orange-500 hover:to-yellow-600 text-white rounded-xl transition-all duration-300 font-bold border-2 border-yellow-400 shadow-lg hover:shadow-xl transform hover:scale-105 group"
                    >
                      <div className="p-3 bg-white rounded-lg group-hover:bg-orange-100 transition-colors flex-shrink-0">
                        <UserIcon className="w-5 h-5 text-orange-600" />
                      </div>
                      <div className="flex-1 text-left min-w-0">
                        <span className="text-sm font-bold block">Create Account</span>
                        <p className="text-yellow-200 text-xs mt-1">Join us today</p>
                      </div>
                    </button>
                  </div>
                )}
              </div>

              {/* Additional Info Section */}
              <div className="mt-4 p-4 bg-gradient-to-r from-purple-700/50 to-indigo-700/50 rounded-xl border-2 border-purple-400/30">
                <p className="text-yellow-300 text-xs font-bold text-center">
                  Premium Technology Solutions
                </p>
                <p className="text-purple-200 text-xs text-center mt-1">
                  Innovation & Excellence
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 text-center bg-gradient-to-r from-purple-800 to-indigo-800 border-t-2 border-purple-400/30">
              <p className="text-yellow-300 text-sm font-bold mb-1">
                ELECTROMATRIX
              </p>
              <p className="text-purple-200 text-xs">
                Art Deco Ltd. © 2024
              </p>
            </div>
          </div>
        )}

        {/* Authentication for small screens - Improved spacing */}
        {!isMenuOpen && (
          <div className="md:hidden flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {/* User Greeting - Small Mobile - FIXED to show "Hi, Name" */}
                <div className="flex items-center space-x-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl border-2 border-blue-300 shadow-lg">
                  <UserIcon className="w-4 h-4 text-yellow-300" />
                  <span className="text-yellow-300 text-sm font-bold">
                    {getShortName()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 p-2.5 cursor-pointer hover:bg-red-500 rounded-xl transition-all duration-300 border-2 border-red-400 shadow-lg"
                  aria-label="Logout"
                >
                  <LogoutIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleAuthModal('signin')}
                  className="flex items-center space-x-1 p-2.5 cursor-pointer hover:bg-green-500 rounded-xl transition-all duration-300 border-2 border-green-400 shadow-lg"
                  aria-label="Sign In"
                  title="Sign In"
                >
                  <UserIcon className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => handleAuthModal('signup')}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-4 py-2.5 rounded-xl transition-all duration-300 font-bold text-sm border-2 border-yellow-400 shadow-lg transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Authentication Modal - Compact and Attractive */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-4xl w-full max-w-sm mx-auto transform transition-all duration-300 scale-95 hover:scale-100 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-6 rounded-t-3xl sticky top-0">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold text-white">
                  {authMode === 'signin' && 'Welcome Back'}
                  {authMode === 'signup' && 'Join Us Today'}
                  {authMode === 'forgot' && 'Reset Password'}
                </h2>
                <button
                  onClick={closeAuthModal}
                  className="text-white hover:text-yellow-300 transition-colors transform hover:scale-110"
                >
                  <XIcon className="w-6 h-6" />
                </button>
              </div>
              <p className="text-blue-100 mt-2 text-sm">
                {authMode === 'signin' && 'Sign in to access your account'}
                {authMode === 'signup' && 'Create your account to get started'}
                {authMode === 'forgot' && 'Enter your email to reset password'}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authMode === 'signup' && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                    placeholder="your@email.com"
                  />
                </div>

                {(authMode === 'signin' || authMode === 'signup') && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 pr-10"
                        placeholder="••••••••"
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-4 h-4" />
                        ) : (
                          <EyeIcon className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                    {authMode === 'signup' && (
                      <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                    )}
                  </div>
                )}

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2 text-sm border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                      placeholder="••••••••"
                      minLength={6}
                    />
                  </div>
                )}

                {authMode === 'signin' && (
                  <div className="flex justify-between items-center">
                    <button
                      type="button"
                      onClick={() => setAuthMode('forgot')}
                      className="text-xs text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-800 transition-all duration-300 font-bold text-base shadow-xl hover:shadow-2xl transform hover:scale-105 border-2 border-blue-500"
                >
                  {authMode === 'signin' && 'Sign In'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Reset Password'}
                </button>
              </form>

              {/* Auth Mode Toggle */}
              <div className="mt-6 text-center">
                {authMode === 'signin' && (
                  <p className="text-gray-600 text-sm">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signup')}
                      className="text-blue-600 hover:text-blue-800 font-bold transition-colors underline"
                    >
                      Sign Up Now
                    </button>
                  </p>
                )}
                {authMode === 'signup' && (
                  <p className="text-gray-600 text-sm">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="text-blue-600 hover:text-blue-800 font-bold transition-colors underline"
                    >
                      Sign In
                    </button>
                  </p>
                )}
                {authMode === 'forgot' && (
                  <p className="text-gray-600 text-sm">
                    Remember your password?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthMode('signin')}
                      className="text-blue-600 hover:text-blue-800 font-bold transition-colors underline"
                    >
                      Back to Sign In
                    </button>
                  </p>
                )}
              </div>

              {/* Quick Features */}
              <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-100">
                <h3 className="text-sm font-bold text-gray-800 mb-2 text-center">
                  Why Join Electromatrix?
                </h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Premium Services</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>24/7 Support</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Expert Team</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
