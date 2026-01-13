import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Compass, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import About from '@/components/About';

const AboutPage = () => {
  // Set default to false for Light Mode
  const [darkMode, setDarkMode] = useState(false); 
  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    // Sync the HTML class with the state
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const coreValues = [
    { icon: ShieldCheck, title: "Safety First", desc: "Rigorous PADI standards and high-end equipment maintenance." },
    { icon: Leaf, title: "Eco-Conscious", desc: "Active reef protection and zero-plastic dive operations." },
    { icon: Compass, title: "Local Expertise", desc: "Native guides with decades of knowledge in Addu's unique currents." }
  ];

  return (
    // changed bg-background to a specific light-mode sky tint
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 transition-colors duration-500">
      <Helmet>
        <title>Our Story | Southern Maldives Divers</title>
      </Helmet>
      
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="relative overflow-hidden">
        {/* Cinematic Page Header - Light Version */}
        <section className="relative pt-40 pb-20 lg:pt-52 lg:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            {/* Softer, sunnier gradient for light mode */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-100/50 via-transparent to-transparent dark:from-primary/10" />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-5xl md:text-8xl font-black text-slate-900 dark:text-white tracking-tighter mb-6">
                OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 italic">LEGACY</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-light leading-relaxed">
                Pioneering underwater exploration in the deep south of the Maldives since 2009.
              </p>
            </motion.div>
          </div>
        </section>

        <About />

        {/* Core Values Section - Light Mode Contrast */}
        <section className="py-24 bg-white dark:bg-slate-900/50 backdrop-blur-sm border-y border-slate-200 dark:border-slate-800">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-12">
              {coreValues.map((value, i) => (
                <div key={i} className="flex flex-col items-center text-center space-y-4">
                  <div className="w-16 h-16 bg-cyan-50 dark:bg-primary/10 rounded-2xl flex items-center justify-center text-cyan-600 dark:text-primary border border-cyan-100 dark:border-primary/20">
                    <value.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{value.title}</h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Conservation Block - Light Mode */}
        <section className="py-24 container mx-auto px-6">
          <div className="rounded-[3rem] bg-white dark:bg-slate-900 border border-slate-200 dark:border-primary/20 p-8 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-sm">
            <div className="max-w-xl text-left">
              <div className="flex items-center gap-2 text-cyan-600 dark:text-primary font-bold tracking-widest text-[10px] uppercase mb-4">
                <Globe className="w-4 h-4" />
                Preserving the Blue
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
                Our Commitment to <span className="italic text-cyan-600">Addu Atoll</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                As the only UNESCO Biosphere Reserve in the Maldives...
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;