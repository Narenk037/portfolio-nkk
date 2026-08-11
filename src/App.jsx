import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Certificates } from './components/Certificates';
import { Interests } from './components/Interests';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { AdminLogin } from './components/AdminLogin';
import { AdminDashboard } from './components/AdminDashboard';
import { ProtectedRoute } from './components/ProtectedRoute';
import { AmbientBackground } from './components/MarketingOrb';
import { subscribePortfolioData, checkIsAuthenticated } from './services/portfolioService';
import { initialData } from './data/initialData';

function PortfolioMain({ data, isAuthenticated }) {
  const profile = data.profile || initialData.profile;
  const stats = data.stats || initialData.stats;
  const education = data.education || initialData.education;
  const skills = data.skills || initialData.skills;
  const experience = data.experience || initialData.experience;
  const projects = data.projects || initialData.projects;
  const certificates = data.certificates || initialData.certificates;
  const interests = data.interests || initialData.interests;

  return (
    <div className="min-h-screen text-slate-900 selection:bg-blue-100 selection:text-blue-700">
      <Navbar isAuthenticated={isAuthenticated} />
      <main>
        <Hero profile={profile} />
        <About profile={profile} education={education} stats={stats} />
        <Skills skills={skills} />
        <Experience experience={experience} />
        <Projects projects={projects} />
        <Certificates certificates={certificates} />
        <Interests interests={interests} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}

export default function App() {
  const [data, setData] = useState(initialData);
  const [isAuthenticated, setIsAuthenticated] = useState(checkIsAuthenticated());

  useEffect(() => {
    const unsub = subscribePortfolioData((updatedData) => {
      setData(updatedData);
    });
    return () => unsub();
  }, []);

  const handleAuthChange = () => {
    setIsAuthenticated(checkIsAuthenticated());
  };

  return (
    <Router>
      <AmbientBackground />
      <Routes>
        {/* Main Public Portfolio */}
        <Route 
          path="/" 
          element={<PortfolioMain data={data} isAuthenticated={isAuthenticated} />} 
        />

        {/* Admin Login Route */}
        <Route 
          path="/login" 
          element={
            <AdminLogin onLoginSuccess={handleAuthChange} />
          } 
        />

        {/* Protected Admin Dashboard Route */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <AdminDashboard onLogout={handleAuthChange} />
            </ProtectedRoute>
          } 
        />

        {/* Catch-all Redirect */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
