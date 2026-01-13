import { useEffect, useRef, useState } from 'react';

// Simple in-memory cache so multiple hook users share the same request/result during a session
let cachedWeather = null;
let cachedAt = 0;
let pendingPromise = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes

const fetchWeatherOnce = async () => {
  const now = Date.now();
  if (cachedWeather && now - cachedAt < CACHE_TTL_MS) return cachedWeather;
  if (pendingPromise) return pendingPromise;

  pendingPromise = fetch(
    'https://api.open-meteo.com/v1/forecast?latitude=-0.6413&longitude=73.1586&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=auto'
  )
    .then(async (res) => {
      const data = await res.json();
      cachedWeather = data;
      cachedAt = Date.now();
      return cachedWeather;
    })
    .catch((err) => {
      // Do not cache failures permanently
      console.error('Weather fetch failed', err);
      throw err;
    })
    .finally(() => {
      pendingPromise = null;
    });

  return pendingPromise;
};

export const useWeather = () => {
  const [weather, setWeather] = useState(cachedWeather);
  const [loading, setLoading] = useState(!cachedWeather);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;
    if (!cachedWeather || Date.now() - cachedAt >= CACHE_TTL_MS) {
      setLoading(true);
      fetchWeatherOnce()
        .then((data) => {
          if (mounted.current) setWeather(data);
        })
        .catch(() => {
          // keep weather as null
        })
        .finally(() => {
          if (mounted.current) setLoading(false);
        });
    }

    return () => {
      mounted.current = false;
    };
  }, []);

  const getVisibility = () => {
    if (!weather || !weather.current) return '25m+';
    const wind = weather.current.wind_speed_10m;
    if (wind < 10) return '30m+'; // Very calm
    if (wind < 20) return '20m+'; // Moderate
    return '15m+'; // Choppy
  };

  return { weather, loading, visibility: getVisibility() };
};
