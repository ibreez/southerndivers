import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import About from '@/components/About';
import Courses from '@/components/Courses';
import Excursions from '@/components/Excursions';
import MarineLife from '@/components/MarineLife';
import Packages from '@/components/Packages';
import Gallery from '@/components/Gallery';
import Safety from '@/components/Safety';
import Reviews from '@/components/Reviews';
import WeatherSection from '@/components/WeatherSection'; // Import here
import Booking from '@/components/Booking';
import Contact from '@/components/Contact';
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
          <About showStory={false} />
          <Courses showViewAllButton={true} />
          <Excursions showViewAllButton={true} />
          <MarineLife />
          <Packages />
          <Gallery />
          <Safety />
          <Reviews />
          
          {/* WEATHER STRATEGY: Placed as a "Final Bridge" before Booking */}
          <WeatherSection />
          
          <Booking />
          <Contact />
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default Home;