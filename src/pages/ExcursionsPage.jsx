import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Ship, Map, Camera } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Excursions from '@/components/Excursions';
import WeatherSection from '@/components/WeatherSection';

const ExcursionsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Adventure Highlights
  const features = [
    { icon: Ship, label: "Daily Departures", detail: "Custom Dive Boats" },
    { icon: Map, label: "Exclusive Sites", detail: "Beyond the Map" },
    { icon: Camera, label: "HD Memories", detail: "Pro Photo Services" },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500 overflow-hidden">
      <Helmet>
        <title>Excursions & Expeditions | Southern Maldives Divers</title>
        <meta name="description" content="Explore Addu Atoll's hidden gems. From the British Loyalty wreck to Manta Point, join our daily dive expeditions." />
      </Helmet>
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="relative">
        {/* Cinematic Hero - Exploration Theme */}
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
          {/* Layered Water Effect */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-100/50 via-transparent to-transparent dark:from-cyan-900/20" />
            {/* Moving "Current" background element */}
            <motion.div 
              animate={{ x: [-100, 100], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/4 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                BEYOND THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500 italic">HORIZON</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Journey to the most remote corners of Addu Atoll. Discover hidden wrecks, vibrant coral gardens, and the legendary Manta cleaning stations.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Expedition Quick-Nav/Features */}
        <section className="relative z-10 -mt-10 mb-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {features.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  viewport={{ once: true }}
                  className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 rounded-[2rem] hover:border-cyan-500/50 transition-all duration-500 shadow-sm"
                >
                  <div className="w-14 h-14 rounded-2xl bg-cyan-50 dark:bg-slate-800 flex items-center justify-center text-cyan-600 dark:text-cyan-400 mb-6 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">{item.label}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1">{item.detail}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Excursions List Component */}
        <section className="pb-24">
          <Excursions />
        </section>
        
        {/* Weather Section with Live Data */}
        <WeatherSection />
      </main>

      <Footer />
    </div>
  );
};

export default ExcursionsPage;