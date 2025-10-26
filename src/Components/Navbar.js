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

  // Function to get user greeting
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
              group
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

        {/* Hamburger icon for small screens */}
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
                {/* User Greeting - Desktop */}
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

        {/* Small screen menu - Enhanced Design */}
        {isMenuOpen && (
          <div className="absolute top-full right-0 left-0 bg-gradient-to-b from-white via-blue-50 to-purple-50 rounded-b-3xl shadow-3xl z-40 flex flex-col border-t-4 border-blue-400 backdrop-blur-lg">
            {/* Mobile Logo in Menu */}
            <div className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 border-b-2 border-blue-300">
              <div className="
                relative 
                bg-gradient-to-br from-white via-blue-50 to-purple-50
                shadow-2xl 
                border-4 border-white
                overflow-hidden
                flex
                items-center
                justify-center
                w-64 h-20
                rounded-2xl
                group
              ">
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
                  <img
                    src={Logo}
                    alt="ELECTROMATRIX ART DECO LTD."
                    className="
                      w-[95%]
                      h-[95%]
                      object-contain
                      group-hover:scale-105
                      transition-transform
                      duration-300
                    "
                    style={{
                      filter: 'brightness(1.08) contrast(1.15)',
                      transformOrigin: 'center'
                    }}
                  />
                </div>
                <div className="
                  absolute 
                  inset-0 
                  border-2 
                  border-gradient-to-r from-blue-300/60 via-purple-300/60 to-blue-300/60
                  rounded-2xl
                  pointer-events-none
                  shadow-lg
                "></div>
              </div>
            </div>

            <Link
              to="/"
              className="flex items-center space-x-4 p-5 w-full text-gray-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group border-b border-blue-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <HomeIcon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <span className="text-lg font-bold group-hover:text-blue-700 transition-colors">Home</span>
            </Link>
            
            <Link
              to="/book-us"
              className="flex items-center space-x-4 p-5 w-full text-gray-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group border-b border-blue-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <ClipboardListIcon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <span className="text-lg font-bold group-hover:text-blue-700 transition-colors">Book Us</span>
            </Link>
            
            <Link
              to="/contact"
              className="flex items-center space-x-4 p-5 w-full text-gray-800 hover:bg-gradient-to-r hover:from-blue-100 hover:to-purple-100 transition-all duration-300 group border-b border-blue-100"
              onClick={() => setIsMenuOpen(false)}
            >
              <PhoneIcon className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" />
              <span className="text-lg font-bold group-hover:text-blue-700 transition-colors">Contact</span>
            </Link>

            {/* Authentication Section - Small Screen */}
            <div className="p-4 bg-gradient-to-b from-blue-50 to-white rounded-b-3xl">
              {isLoggedIn ? (
                <div className="space-y-3">
                  {/* User Greeting - Mobile */}
                  <div className="flex items-center space-x-4 p-4 w-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl border-2 border-blue-300 shadow-2xl">
                    <UserIcon className="w-6 h-6 text-yellow-300" />
                    <div>
                      <span className="text-lg font-bold text-yellow-300 block">
                        {getUserGreeting()}
                      </span>
                      <span className="text-sm text-blue-200 block">
                        {userData.email}
                      </span>
                    </div>
                  </div>
                  
                  {/* Logout Button - Mobile */}
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-4 p-4 w-full text-white hover:bg-red-600 rounded-2xl transition-all duration-300 group border-2 border-red-400 bg-gradient-to-r from-red-500 to-red-600 shadow-2xl"
                  >
                    <LogoutIcon className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors" />
                    <span className="text-lg font-bold group-hover:text-yellow-300 transition-colors">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3">
                  <button
                    onClick={() => handleAuthModal('signin')}
                    className="flex items-center space-x-4 p-4 w-full text-white hover:bg-green-600 rounded-2xl transition-all duration-300 group border-2 border-green-400 bg-gradient-to-r from-green-500 to-green-600 shadow-2xl"
                  >
                    <UserIcon className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors" />
                    <span className="text-lg font-bold group-hover:text-yellow-300 transition-colors">Sign In</span>
                  </button>
                  <button
                    onClick={() => handleAuthModal('signup')}
                    className="flex items-center justify-center space-x-3 p-4 w-full bg-gradient-to-r from-yellow-500 via-yellow-600 to-orange-500 hover:from-yellow-600 hover:via-orange-500 hover:to-yellow-600 text-white rounded-2xl transition-all duration-300 font-bold text-lg border-2 border-yellow-400 shadow-3xl transform hover:scale-105"
                  >
                    <span>Create Account</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Authentication for small screens - Always visible when menu is closed */}
        {!isMenuOpen && (
          <div className="md:hidden flex items-center space-x-3">
            {isLoggedIn ? (
              <div className="flex items-center space-x-3">
                {/* User Greeting - Small Mobile */}
                <div className="flex items-center space-x-2 px-3 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl border-2 border-blue-300 shadow-lg">
                  <UserIcon className="w-4 h-4 text-yellow-300" />
                  <span className="text-yellow-300 text-sm font-bold">
                    {getShortName()}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-red-500 rounded-xl transition-all duration-300 border-2 border-red-400 shadow-lg"
                  aria-label="Logout"
                >
                  <LogoutIcon className="w-5 h-5 text-white" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleAuthModal('signin')}
                  className="flex items-center space-x-1 p-2 cursor-pointer hover:bg-green-500 rounded-xl transition-all duration-300 border-2 border-green-400 shadow-lg"
                  aria-label="Sign In"
                  title="Sign In"
                >
                  <UserIcon className="w-5 h-5 text-white" />
                </button>
                <button
                  onClick={() => handleAuthModal('signup')}
                  className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white px-3 py-2 rounded-xl transition-all duration-300 font-bold text-sm border-2 border-yellow-400 shadow-lg transform hover:scale-105"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        )}
      </nav>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 backdrop-blur-md">
          <div className="bg-white rounded-3xl shadow-4xl w-full max-w-md mx-auto transform transition-all duration-300 scale-95 hover:scale-100">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-purple-700 p-8 rounded-t-3xl">
              <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold text-white">
                  {authMode === 'signin' && 'Welcome Back'}
                  {authMode === 'signup' && 'Join Us Today'}
                  {authMode === 'forgot' && 'Reset Password'}
                </h2>
                <button
                  onClick={closeAuthModal}
                  className="text-white hover:text-yellow-300 transition-colors transform hover:scale-110"
                >
                  <XIcon className="w-7 h-7" />
                </button>
              </div>
              <p className="text-blue-100 mt-3 text-lg">
                {authMode === 'signin' && 'Sign in to access your account'}
                {authMode === 'signup' && 'Create your account to get started'}
                {authMode === 'forgot' && 'Enter your email to reset password'}
              </p>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              <form onSubmit={handleAuthSubmit} className="space-y-6">
                {authMode === 'signup' && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        First Name *
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
                    placeholder="your@email.com"
                  />
                </div>

                {(authMode === 'signin' || authMode === 'signup') && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300 pr-12"
                        placeholder="••••••••"
                        minLength={6}
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        {showPassword ? (
                          <EyeOffIcon className="w-6 h-6" />
                        ) : (
                          <EyeIcon className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                    {authMode === 'signup' && (
                      <p className="text-xs text-gray-500 mt-2">Password must be at least 6 characters long</p>
                    )}
                  </div>
                )}

                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all hover:border-blue-300"
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
                      className="text-sm text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                    >
                      Forgot Password?
                    </button>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-700 text-white py-4 px-6 rounded-xl hover:from-blue-700 hover:to-purple-800 transition-all duration-300 font-bold text-lg shadow-2xl hover:shadow-3xl transform hover:scale-105 border-2 border-blue-500"
                >
                  {authMode === 'signin' && 'Sign In'}
                  {authMode === 'signup' && 'Create Account'}
                  {authMode === 'forgot' && 'Reset Password'}
                </button>
              </form>

              {/* Auth Mode Toggle */}
              <div className="mt-8 text-center">
                {authMode === 'signin' && (
                  <p className="text-gray-600 text-lg">
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
                  <p className="text-gray-600 text-lg">
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
                  <p className="text-gray-600 text-lg">
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;





