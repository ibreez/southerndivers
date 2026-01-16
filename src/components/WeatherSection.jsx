import React, { useState, useEffect, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wind, X, Calendar, Thermometer, Compass, Droplets, Waves, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '@/hooks/useWeather';

const WeatherSection = memo(() => {
  const { weather, loading, visibility } = useWeather();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && weather) {
      const now = new Date();
      setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }
  }, [loading, weather]);

  const getDirection = (angle) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(angle / 45) % 8];
  };

  return (
    <>
      <section id="weather" className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group relative"
          >
            {/* Cyber-Ocean Aura */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-cyan-500/10 to-blue-500/20 rounded-[4rem] blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000" />
            
            <div className="relative rounded-[3.5rem] bg-card/50 backdrop-blur-2xl border border-primary/10 p-8 md:p-16 overflow-hidden shadow-2xl">
              
              {/* Radar Grid Animation */}
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <motion.div 
                  animate={{ y: [-1000, 1000] }}
                  transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                  className="w-full h-[300px] bg-gradient-to-b from-transparent via-primary to-transparent"
                />
                <div className="absolute inset-0" style={{ backgroundImage: `radial-gradient(hsl(var(--primary)) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
              </div>

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-16">
                
                {/* Left: Sensor Readouts */}
                <div className="flex flex-col md:flex-row items-center gap-10 text-center md:text-left">
                  <div className="relative">
                    <div className="w-32 h-32 rounded-[2.5rem] bg-background border border-primary/20 flex flex-col items-center justify-center shadow-2xl relative overflow-hidden group-hover:border-primary/50 transition-colors">
                      <Activity className="absolute top-2 right-2 w-3 h-3 text-primary animate-pulse" />
                      {loading ? (
                        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <span className="text-4xl font-black text-foreground tracking-tighter">
                            {Math.round(weather?.current?.temperature_2m)}°
                          </span>
                          <span className="text-[10px] font-black uppercase text-primary tracking-widest">Celsius</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <div className="max-w-xl">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-6">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                      </span>
                      Satellite Telemetry: Addu City
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tighter">
                      Current <span className="text-primary italic font-serif">Status</span>
                    </h2>
                    
                    <div className="flex flex-wrap justify-center md:justify-start gap-8">
                      <div className="flex items-center gap-3 group/item">
                         <div className="p-2 rounded-xl bg-primary/5 border border-primary/10 group-hover/item:bg-primary/20 transition-colors">
                           <Wind className="w-5 h-5 text-primary" />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Wind Speed</span>
                           <span className="text-lg font-black text-foreground">{(weather?.current?.wind_speed_10m * 0.539957).toFixed(1)} kts</span>
                         </div>
                      </div>
                      <div className="flex items-center gap-3 group/item">
                         <div className="p-2 rounded-xl bg-primary/5 border border-primary/10 group-hover/item:bg-primary/20 transition-colors">
                           <Compass className="w-5 h-5 text-primary" />
                         </div>
                         <div className="flex flex-col">
                           <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Direction</span>
                           <span className="text-lg font-black text-foreground">{getDirection(weather?.current?.wind_direction_10m)} Flow</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex flex-col items-center lg:items-end gap-6">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="relative group/btn overflow-hidden px-12 py-6 bg-primary text-primary-foreground rounded-[2rem] font-black tracking-widest text-xs transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary/30"
                  >
                    <span className="relative z-10 flex items-center gap-3">
                      GENERATE DIVE FORECAST <Calendar className="w-4 h-4" />
                    </span>
                    <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500" />
                  </button>
                  <div className="flex flex-col items-center lg:items-end opacity-50">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Telemetry Sync</span>
                    <span className="text-[10px] font-bold">{lastUpdated || "Initializing..."}</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Forecast Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
               initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-background/80 backdrop-blur-xl"
            />
            <motion.div
               initial={{ opacity: 0, scale: 0.9, y: 20 }}
               animate={{ opacity: 1, scale: 1, y: 0 }}
               exit={{ opacity: 0, scale: 0.9, y: 20 }}
               className="relative w-full max-w-xl bg-card border border-primary/20 rounded-[3.5rem] p-10 md:p-14 shadow-2xl"
            >
               <div className="flex justify-between items-center mb-10">
                  <div>
                    <h3 className="text-3xl font-black text-foreground tracking-tighter">Ocean Intelligence</h3>
                    <p className="text-xs font-bold text-primary uppercase tracking-[0.2em] mt-1">Daily Dive Metrics</p>
                  </div>
                  <button onClick={() => setIsModalOpen(false)} className="p-4 bg-primary/10 text-primary rounded-full hover:bg-primary hover:text-white transition-all">
                      <X className="w-5 h-5" />
                  </button>
               </div>
               
               <div className="grid gap-4">
                  {[
                    { icon: Waves, label: "Water Temp", value: "28°C - 30°C", color: "text-cyan-500" },
                    { icon: Droplets, label: "Visibility", value: visibility || "25m - 30m", color: "text-blue-500" },
                    { icon: Activity, label: "Current Strength", value: "Moderate / Inbound", color: "text-emerald-500" }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-primary/5 border border-primary/10 flex items-center justify-between group hover:bg-primary/10 transition-colors">
                       <div className="flex items-center gap-4">
                          <div className={`p-3 rounded-2xl bg-background border border-primary/5 ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                          </div>
                          <span className="font-bold text-muted-foreground uppercase tracking-widest text-[10px]">{stat.label}</span>
                       </div>
                       <span className="text-xl font-black text-foreground tracking-tight">{stat.value}</span>
                    </div>
                  ))}

                  <div className="mt-8 pt-8 border-t border-primary/10 text-center">
                     <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-6 leading-loose">
                       Safety Notice: Conditions are subject to tidal variations. <br/>Final go/no-go is determined at the site.
                     </p>
                     <button
                        onClick={() => { setIsModalOpen(false); navigate('/contact'); }}
                        className="w-full py-6 bg-foreground text-background rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-primary hover:text-white transition-all"
                     >
                        Confirm Booking With Instructor
                     </button>
                  </div>
               </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
});

WeatherSection.displayName = 'WeatherSection';
export default WeatherSection;