import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Wind, Eye, Droplets } from 'lucide-react';
import { useWeather } from '@/hooks/useWeather';
import { useWeatherModal } from '@/context/WeatherModalContext';

const WeatherPill = memo(() => {
  const { weather, loading, visibility } = useWeather();
  const { setIsModalOpen } = useWeatherModal();

  if (loading || !weather) return null;

  const temperature = Math.round(weather.current?.temperature_2m);
  const windSpeed = (weather.current?.wind_speed_10m * 0.539957).toFixed(1);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, x: -10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      whileHover={{ y: -2 }}
      onClick={() => setIsModalOpen(true)}
      className="fixed bottom-6 left-6 z-[100] cursor-pointer"
    >
      <div className="relative group flex items-center">
        {/* Shadow for depth */}
        <div className="absolute -inset-1 bg-primary/20 dark:bg-primary/10 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="
          relative flex items-center 
          bg-white/90 border-slate-200 shadow-lg 
          dark:bg-black/60 dark:backdrop-blur-xl dark:border-white/10 dark:shadow-2xl
          border rounded-full p-1 pr-5 gap-3 transition-colors duration-500
        ">
          
          {/* Status Dot */}
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 border border-primary/20">
            <div className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary"></span>
            </div>
          </div>

          {/* Visibility Segment (The New Icon) */}
          <div className="flex items-center gap-1.5">
            <Eye className="w-3.5 h-3.5 text-primary/80" />
            <div className="flex items-baseline">
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-white tracking-tighter">
                {visibility || '30'}
              </span>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 ml-0.5 uppercase">m</span>
            </div>
          </div>

          {/* Micro-Divider */}
          <div className="w-px h-4 bg-slate-200 dark:bg-white/10" />

          {/* Temperature Segment */}
          <div className="flex items-center gap-1.5">
            <Thermometer className="w-3.5 h-3.5 text-primary/80" />
            <div className="flex items-baseline">
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-white tracking-tighter">
                {temperature}
              </span>
              <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 ml-0.5">°</span>
            </div>
          </div>

          {/* Micro-Divider */}
          <div className="w-px h-4 bg-slate-200 dark:bg-white/10" />

          {/* Wind Segment */}
          <div className="flex items-center gap-1.5">
            <Wind className="w-3.5 h-3.5 text-primary/80" />
            <div className="flex items-baseline">
              <span className="text-sm font-mono font-bold text-slate-900 dark:text-white tracking-tighter">
                {windSpeed}
              </span>
              <span className="text-[9px] font-black text-slate-500 dark:text-slate-400 ml-1 uppercase tracking-tighter">
                kts
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

WeatherPill.displayName = 'WeatherPill';
export default WeatherPill;