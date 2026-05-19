import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useTranslation } from 'react-i18next';
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
  Activity,
  Sun,
  Moon
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { t, i18n } = useTranslation();
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
    { path: '/', label: t('nav.home'), icon: Home },
    { path: '/countries', label: t('nav.countries'), icon: Globe },
    { path: '/compare', label: t('nav.compare'), icon: BarChart3 },
    { path: '/stories', label: t('nav.stories'), icon: BookOpen },
    { path: '/collections', label: t('nav.collections'), icon: Layers }
  ];

  // User-specific navigation items
  const userNavItems = user ? [
    { path: '/my-world', label: t('nav.myWorld'), icon: MapPin },
    { path: '/timeline', label: t('nav.timeline'), icon: Calendar },
    { path: '/analytics', label: t('nav.analytics'), icon: Activity },
    { path: '/trips', label: t('nav.trips'), icon: Calendar }
  ] : [];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <img src="/logo512.png" alt={t('nav.logoAlt')} className="h-10 w-10" />
            <span className="text-xl font-bold text-gray-900 dark:text-gray-100 hidden sm:inline">{t('nav.brand')}</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {mainNavItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive(path)
                    ? 'bg-primary-600 text-white shadow-sm'
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{label}</span>
              </Link>
            ))}
            
            {/* User-specific items in a dropdown if logged in */}
            {user && userNavItems.length > 0 && (
              <div className="relative ms-2" ref={travelsMenuRef}>
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all duration-200 ${
                    userNavItems.some(item => startsWith(item.path))
                      ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                  }`}
                  onClick={() => setIsTravelsMenuOpen(!isTravelsMenuOpen)}
                >
                  <MapPin className="h-4 w-4" />
                  <span className="font-medium text-gray-700 dark:text-gray-300">{t('nav.myTravels')}</span>
                  <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isTravelsMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isTravelsMenuOpen && (
                  <div className="absolute top-full start-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    {userNavItems.map(({ path, label, icon: Icon }) => (
                      <Link
                        key={path}
                        to={path}
                        onClick={() => setIsTravelsMenuOpen(false)}
                        className={`flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                          startsWith(path) ? 'text-primary-600 bg-primary-50 dark:bg-primary-900/20' : 'text-gray-700 dark:text-gray-300'
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

          {/* Theme Toggle & Language */}
          <div className="hidden lg:flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label={t('nav.toggleTheme')}
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            <button
              onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-600 transition-colors uppercase tracking-wider"
            >
              {i18n.language === 'ar' ? t('nav.langEn') : t('nav.langAr')}
            </button>
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center gap-3" ref={userMenuRef}>
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.firstName} className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                  <span className="font-medium text-gray-700 dark:text-gray-300 hidden xl:inline">{user.firstName}</span>
                  <ChevronDown className={`h-3 w-3 text-gray-500 dark:text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>
                
                {isUserMenuOpen && (
                  <div className="absolute top-full end-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                      <p className="font-semibold text-gray-900 dark:text-gray-100">{user.firstName} {user.lastName}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                    >
                      <Settings className="h-4 w-4" />
                      <span>{t('nav.profileSettings')}</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2 px-4 py-2 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400 text-start"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>{t('nav.logout')}</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors font-medium"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/register"
                  className="btn-primary"
                >
                  {t('nav.signUp')}
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label={t('nav.toggleMenu')}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 dark:border-gray-700 animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {/* Main Navigation */}
              <div className="px-2 py-2">
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">{t('nav.explore')}</p>
                {mainNavItems.map(({ path, label, icon: Icon }) => (
                  <Link
                    key={path}
                    to={path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive(path)
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{label}</span>
                  </Link>
                ))}
              </div>

              {/* User Navigation */}
              {user && userNavItems.length > 0 && (
                <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700 mt-2">
                  <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider px-3 mb-2">{t('nav.myAccount')}</p>
                  {userNavItems.map(({ path, label, icon: Icon }) => (
                    <Link
                      key={path}
                      to={path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        startsWith(path)
                          ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="font-medium">{label}</span>
                    </Link>
                  ))}
                  <Link
                    to="/profile"
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      isActive('/profile')
                        ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    <span className="font-medium">{t('nav.profileSettings')}</span>
                  </Link>
                </div>
              )}
              
              {/* Auth Buttons */}
              {user ? (
                <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="h-5 w-5" />
                    <span className="font-medium">{t('nav.logout')}</span>
                  </button>
                </div>
              ) : (
                <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="block px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium text-center"
                  >
                    {t('nav.login')}
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="block btn-primary text-center"
                  >
                    {t('nav.signUp')}
                  </Link>
                </div>
              )}
              <div className="px-2 py-2 border-t border-gray-200 dark:border-gray-700 space-y-1">
                <button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium text-center text-sm"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  <span>{theme === 'dark' ? t('nav.lightMode') : t('nav.darkMode')}</span>
                </button>
                <button
                  onClick={() => i18n.changeLanguage(i18n.language === 'ar' ? 'en' : 'ar')}
                  className="w-full px-3 py-2.5 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium text-center text-sm"
                >
                  {i18n.language === 'ar' ? t('nav.langEnglish') : t('nav.langArabic')}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
