import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
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
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
            <Routes>
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
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
