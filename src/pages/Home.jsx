import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
const About = lazy(() => import('@/components/About'));
const Courses = lazy(() => import('@/components/Courses'));
const Excursions = lazy(() => import('@/components/Excursions'));
const MarineLife = lazy(() => import('@/components/MarineLife'));
const Packages = lazy(() => import('@/components/Packages'));
const Gallery = lazy(() => import('@/components/Gallery'));
const Safety = lazy(() => import('@/components/Safety'));
const Reviews = lazy(() => import('@/components/Reviews'));
const WeatherSection = lazy(() => import('@/components/WeatherSection'));
const Booking = lazy(() => import('@/components/Booking'));
const Contact = lazy(() => import('@/components/Contact'));
import Footer from '@/components/Footer';

const Home = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div>
      <Helmet>
        <title>Southern Maldives Divers - Addu City, Maldives | Scuba Diving & Marine Adventures</title>
        <meta name="description" content="Experience world-class scuba diving in Addu City, Maldives..." />
      </Helmet>
      
      <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
        <Header darkMode={darkMode} toggleTheme={toggleTheme} />
        
        <main>
          <Hero />
          <Highlights />

          <Suspense fallback={null}>
            <About showStory={false} />
          </Suspense>

          <Suspense fallback={null}>
            <Courses showViewAllButton={true} />
          </Suspense>

          <Suspense fallback={null}>
            <Excursions showViewAllButton={true} />
          </Suspense>

          <Suspense fallback={null}>
            <MarineLife />
          </Suspense>

          <Suspense fallback={null}>
            <Packages />
          </Suspense>

          <Suspense fallback={null}>
            <Gallery />
          </Suspense>

          <Suspense fallback={null}>
            <Safety />
          </Suspense>

          <Suspense fallback={null}>
            <Reviews />
          </Suspense>

          {/* WEATHER STRATEGY: Placed as a "Final Bridge" before Booking */}
          <Suspense fallback={null}>
            <WeatherSection />
          </Suspense>

          <Suspense fallback={null}>
            <Booking />
          </Suspense>

          <Suspense fallback={null}>
            <Contact />
          </Suspense>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Home;