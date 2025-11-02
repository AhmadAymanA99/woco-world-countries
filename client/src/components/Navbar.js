import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  Globe, 
  MapPin, 
  User, 
  LogOut, 
  Menu, 
  X,
  Home,
  BarChart3,
  Calendar,
  BookOpen,
  Layers,
  ChevronDown,
  Settings,
  Activity
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isTravelsMenuOpen, setIsTravelsMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const travelsMenuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
      if (travelsMenuRef.current && !travelsMenuRef.current.contains(event.target)) {
        setIsTravelsMenuOpen(false);
      }
    };

    if (isUserMenuOpen || isTravelsMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen, isTravelsMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsTravelsMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;
  const startsWith = (path) => location.pathname.startsWith(path);

  // Main navigation items (public)
  const mainNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/countries', label: 'Countries', icon: Globe },
    { path: '/compare', label: 'Compare', icon: BarChart3 },
    { path: '/stories', label: 'Stories', icon: BookOpen },
    { path: '/collections', label: 'Collections', icon: Layers }
  ];

  // User-specific navigation items
  const userNavItems = user ? [
    { path: '/my-world', label: 'My World', icon: MapPin },
    { path: '/timeline', label: 'Timeline', icon: Calendar },
    { path: '/analytics', label: 'Analytics', icon: Activity },
    { path: '/trips', label: 'Trips', icon: Calendar }
  ] : [];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <img src="/logo512.png" alt="WoCo Logo" className="h-10 w-10" />
            <span className="text-xl font-bold text-gray-900 hidden sm:inline">WoCo</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
            
            {/* User-specific items in a dropdown if logged in */}
            {user && userNavItems.length > 0 && (
              <div className="relative ml-2" ref={travelsMenuRef}>
                <button
                  className={`flex items-center space-x-1.5 px-4 py-2 rounded-lg transition-all duration-200 ${
                    userNavItems.some(item => startsWith(item.path))
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-primary-50'
                  }`}
                  onClick={() => setIsTravelsMenuOpen(!isTravelsMenuOpen)}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium">My Travels</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isTravelsMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isTravelsMenuOpen && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    {userNavItems.map(({ path, label, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setIsTravelsMenuOpen(false)}
                        className={`flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors ${
                          startsWith(path) ? 'text-primary-600 bg-primary-50' : 'text-gray-700'
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span>{label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-3" ref={userMenuRef}>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.firstName} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                  <span className="font-medium text-gray-700 hidden xl:inline">{user.firstName}</span>
                  <ChevronDown className={`h-3 w-3 text-gray-500 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="font-semibold text-gray-900">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center space-x-2 px-4 py-2 hover:bg-gray-50 transition-colors text-gray-700"
                    >
                      <Settings className="h-4 w-4" />
                      <span>Profile Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-4 py-2 hover:bg-red-50 transition-colors text-red-600 text-left"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 hover:text-primary-600 transition-colors font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {/* Main Navigation */}
              <div className="px-2 py-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">Explore</p>
                {mainNavItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(path)
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </div>

              {/* User Navigation */}
              {user && userNavItems.length > 0 && (
                <div className="px-2 py-2 border-t border-gray-200 mt-2">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 mb-2">My Account</p>
                  {userNavItems.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                        startsWith(path)
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{label}</span>
                    </Link>
                  ))}
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive('/profile')
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">Profile Settings</span>
                  </Link>
                </div>
              )}
              
              {/* Auth Buttons */}
              {user ? (
                <div className="px-2 py-2 border-t border-gray-200">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="px-2 py-2 border-t border-gray-200 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors font-medium text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block btn-primary text-center"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
