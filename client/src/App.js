import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Toaster } from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { NetworkStatusProvider } from './contexts/NetworkStatusContext';
import Navbar from './components/Navbar';
import NetworkBanner from './components/NetworkBanner';
import Home from './pages/Home';
import Countries from './pages/Countries';
import CountryDetail from './pages/CountryDetail';
import MyWorld from './pages/MyWorld';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import CompareCountries from './pages/CompareCountries';
import TravelTimeline from './pages/TravelTimeline';
import Analytics from './pages/Analytics';
import Stories from './pages/Stories';
import CreateStory from './pages/CreateStory';
import StoryDetail from './pages/StoryDetail';
import MyTrips from './pages/MyTrips';
import Collections from './pages/Collections';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { i18n } = useTranslation();
  const location = useLocation();

  return (
    <ThemeProvider>
      <NetworkStatusProvider>
      <AuthProvider>
        <div dir={i18n.dir()} className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-gray-100">
          <NetworkBanner />
          <Toaster
            position={i18n.dir() === 'rtl' ? 'top-left' : 'top-right'}
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 5000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <Routes location={location}>
                  <Route path="/" element={<Home />} />
                  <Route path="/countries" element={<Countries />} />
                  <Route path="/countries/:id" element={<CountryDetail />} />
                  <Route path="/compare" element={<CompareCountries />} />
                  <Route path="/stories" element={<Stories />} />
                  <Route 
                    path="/stories/create" 
                    element={
                      <ProtectedRoute>
                        <CreateStory />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/stories/:id" element={<StoryDetail />} />
                  <Route path="/collections" element={<Collections />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/my-world" 
                    element={
                      <ProtectedRoute>
                        <MyWorld />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/timeline" 
                    element={
                      <ProtectedRoute>
                        <TravelTimeline />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/analytics" 
                    element={
                      <ProtectedRoute>
                        <Analytics />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/trips" 
                    element={
                      <ProtectedRoute>
                        <MyTrips />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </main>
        </div>
      </AuthProvider>
      </NetworkStatusProvider>
    </ThemeProvider>
  );
}

export default App;
