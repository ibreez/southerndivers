import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Thermometer, Droplets, Waves, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWeather } from '@/hooks/useWeather';
import { useWeatherModal } from '@/context/WeatherModalContext';

const WeatherModal = memo(() => {
  const { weather, loading, visibility } = useWeather();
  const { isModalOpen, setIsModalOpen } = useWeatherModal();
  const navigate = useNavigate();

  return (
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
  );
});

WeatherModal.displayName = 'WeatherModal';
export default WeatherModal;