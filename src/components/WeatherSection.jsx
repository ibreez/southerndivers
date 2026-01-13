import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, X, Calendar, Thermometer, Compass, Droplets } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '@/hooks/useWeather';

const WeatherSection = () => {
  const { weather, loading, visibility } = useWeather();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const navigate = useNavigate();

  // Update last updated time when shared weather becomes available
  useEffect(() => {
    if (!loading && weather) {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [loading, weather]);

  // Helper to convert Wind Direction degrees to Compass Direction
  const getDirection = (angle) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(angle / 45) % 8];
  };

  const WeatherPill = ({ weather, loading, onClick }) => (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-6 z-40 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center gap-3 px-4 py-2 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-800 rounded-full shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-tighter text-slate-500">Live Addu</span>
        </div>
        <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
        <div className="flex items-center gap-1.5">
          <Thermometer className="w-3 h-3 text-cyan-600" />
          <span className="text-sm font-bold text-slate-900 dark:text-white">
            {loading ? "..." : `${Math.round(weather?.current?.temperature_2m)}°C`}
          </span>
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      <section className="py-24 container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          {/* Outer Glow */}
          <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 dark:opacity-40 transition duration-1000" />
          
          <div className="relative rounded-[3rem] bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 p-8 md:p-14 overflow-hidden shadow-xl dark:shadow-2xl transition-colors duration-500">
            
            {/* Background Tech Elements */}
            <div className="absolute inset-0 opacity-5 dark:opacity-10 pointer-events-none">
              <motion.div 
                animate={{ y: [0, 400, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
              />
              <div 
                className="absolute inset-0" 
                style={{
                  backgroundImage: `radial-gradient(var(--grid-color, #cbd5e1) 1px, transparent 1px)`,
                  backgroundSize: '30px 30px' 
                }} 
              />
              <style dangerouslySetInnerHTML={{ __html: `.dark { --grid-color: #1e293b; }`}} />
            </div>

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
              
              {/* Left Side: Live Data Display */}
              <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="relative">
                  <div className="absolute inset-0 bg-cyan-500/20 dark:bg-cyan-500/30 blur-xl rounded-full animate-pulse" />
                  <div className="relative w-24 h-24 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-3xl flex items-center justify-center shadow-inner">
                    {loading ? (
                      <div className="w-8 h-8 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <div className="text-center">
                        <span className="block text-2xl font-bold text-slate-900 dark:text-white">
                          {Math.round(weather?.current?.temperature_2m)}°
                        </span>
                        <span className="text-[10px] uppercase text-cyan-600 dark:text-cyan-400 font-bold">
                          Air Temp
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-200 dark:border-cyan-500/20 text-cyan-700 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-4">
                    <span className={`w-2 h-2 bg-cyan-500 rounded-full ${!loading && "animate-ping"}`} />
                    {loading ? "Connecting..." : "Live Monitoring: Addu Atoll"}
                  </div>
                  
                  <h2 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
                    Current <span className="text-cyan-600 dark:text-cyan-500">Conditions</span>
                  </h2>
                  
                  {loading ? (
                    <div className="h-6 w-64 bg-slate-200 dark:bg-slate-800 rounded animate-pulse" />
                  ) : (
                    <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-2">
                         <Wind className="w-5 h-5 text-cyan-500" />
                         <span>{(weather?.current?.wind_speed_10m * 0.539957).toFixed(1)} kts</span>
                      </div>
                      <div className="flex items-center gap-2">
                         <Compass className="w-5 h-5 text-cyan-500" />
                         <span>{getDirection(weather?.current?.wind_direction_10m)} Wind</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side: CTA Button */}
              <div className="w-full lg:w-auto flex flex-col items-center gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full lg:w-auto px-10 py-5 bg-primary hover:bg-primary-dark hover:text-white text-white dark:text-slate-900 rounded-2xl font-bold overflow-hidden transition-all hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.5)] duration-300 shadow-xl flex items-center justify-center gap-3 group/btn"
                >
                  VIEW DIVE FORECAST
                  <Calendar className="w-5 h-5 group-hover/btn:scale-110 transition-transform" />
                </button>
                <span className="text-slate-400 dark:text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                  Last Updated: {lastUpdated || "--:--"}
                </span>
              </div>

            </div>

            {/* Decorative Overlay */}
            <div className="absolute -bottom-12 -right-12 opacity-[0.03] dark:opacity-5 rotate-12 group-hover:rotate-0 transition-transform duration-1000">
              <Wind className="w-64 h-64 text-slate-900 dark:text-white" />
            </div>
          </div>
        </motion.div>
      </section>

      <WeatherPill weather={weather} loading={loading} onClick={() => setIsModalOpen(true)} />

      {/* 3. The Modal Component */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            {/* Backdrop */}
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm"
            />
             
            {/* Modal Content */}
            <motion.div
               initial={{ opacity: 0, scale: 0.95, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.95, y: 20 }}
               className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800"
            >
               <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Daily Forecast</h3>
                  <button onClick={() => setIsModalOpen(false)} className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors">
                     <X className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </button>
               </div>
                
               <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-cyan-50 dark:bg-cyan-900/10 border border-cyan-100 dark:border-cyan-500/20 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Thermometer className="w-5 h-5 text-cyan-600" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Water Temp</span>
                     </div>
                     <span className="font-bold text-slate-900 dark:text-white">28°C - 29°C</span>
                  </div>
                   
                  <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-500/20 flex items-center justify-between">
                     <div className="flex items-center gap-3">
                        <Droplets className="w-5 h-5 text-blue-600" />
                        <span className="text-slate-700 dark:text-slate-300 font-medium">Visibility</span>
                     </div>
                     <span className="font-bold text-slate-900 dark:text-white">{visibility}</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 dark:border-slate-800">
                     <p className="text-sm text-slate-500 dark:text-slate-400 text-center">
                        *Diving schedules are confirmed continuously based on these conditions.
                     </p>
                     <button
                        onClick={() => {
                          setIsModalOpen(false);
                          navigate('/contact');
                        }}
                        className="w-full mt-4 py-3 bg-cyan-600 text-white rounded-xl font-bold hover:bg-cyan-700 transition-colors"
                     >
                        Contact Dive Center
                     </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default WeatherSection;