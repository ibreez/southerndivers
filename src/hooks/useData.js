import { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

// Event bus for cross-component updates
const listeners = {};
const emitChange = (key) => {
  if (listeners[key]) {
    listeners[key].forEach(cb => cb());
  }
};

// Simple in-memory cache and in-flight tracker to dedupe fetches in dev
const cache = new Map(); // key -> data
const inFlight = new Map(); // key -> Promise

// localStorage cache for data persistence across refreshes
const DATA_CACHE_KEY_PREFIX = 'data_cache_';
const DATA_CACHE_TTL_MS = 10 * 60 * 1000; // 10 minutes

const getCachedData = (key) => {
  try {
    const cached = localStorage.getItem(`${DATA_CACHE_KEY_PREFIX}${key}`);
    if (!cached) return null;
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp > DATA_CACHE_TTL_MS) {
      localStorage.removeItem(`${DATA_CACHE_KEY_PREFIX}${key}`);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Error reading data cache:', error);
    return null;
  }
};

const setCachedData = (key, data) => {
  try {
    const cacheData = {
      data,
      timestamp: Date.now()
    };
    localStorage.setItem(`${DATA_CACHE_KEY_PREFIX}${key}`, JSON.stringify(cacheData));
  } catch (error) {
    console.error('Error writing data cache:', error);
  }
};

// Prefer a Vite-provided env var (VITE_API_BASE_URL) or fall back to the relative `/api` path
// so the dev server proxy (vite.config) handles requests. Using a relative path avoids
// hard-coding a port and prevents mismatches between environments.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const useData = (key) => {
  const [data, setData] = useState(() => {
    const cached = getCachedData(key);
    if (cached) {
      cache.set(key, cached);
      return cached;
    }
    return cache.get(key) ?? [];
  });
  const [loading, setLoading] = useState(() => {
    const cached = getCachedData(key);
    return !cached && !cache.has(key);
  });

  const fetchData = async () => {
    try {
      // Check localStorage cache first
      let cachedData = getCachedData(key);
      if (cachedData) {
        console.log(`Data ${key}: Using localStorage cache`);
        cache.set(key, cachedData);
        setData(cachedData);
        setLoading(false);
        return;
      }

      // Dedupe concurrent fetches for same key
      if (inFlight.has(key)) {
        console.log(`Data ${key}: Using in-flight request`);
        await inFlight.get(key);
        setData(cache.get(key) ?? []);
        setLoading(false);
        return;
      }
      console.time(`Data fetch ${key}`);
      const p = (async () => {
        const response = await fetch(`${API_BASE_URL}/${key}`);
        if (response.ok) {
          const result = await response.json();
          // Handle includes/features/categories arrays that come as JSON strings from database
          const processed = Array.isArray(result) ? result.map(item => ({
            ...item,
            includes: item.includes ? (typeof item.includes === 'string' ? JSON.parse(item.includes) : item.includes) : item.includes,
            features: item.features ? (typeof item.features === 'string' ? JSON.parse(item.features) : item.features) : item.features,
            categories: item.categories ? (typeof item.categories === 'string' ? JSON.parse(item.categories) : item.categories) : item.categories,
          })) : result;
          cache.set(key, processed);
          setCachedData(key, processed);
          setData(processed);
          console.timeEnd(`Data fetch ${key}`);
        } else {
          console.error('Failed to fetch data:', response.statusText);
          cache.set(key, []);
          setData([]);
        }
      })();
      inFlight.set(key, p);
      await p;
    } catch (error) {
      console.error('Error fetching data:', error);
      cache.set(key, []);
      setData([]);
    } finally {
      inFlight.delete(key);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    if (!listeners[key]) listeners[key] = [];
    listeners[key].push(fetchData);

    return () => {
      listeners[key] = listeners[key].filter(cb => cb !== fetchData);
    };
  }, [key]);

  const addItem = async (item) => {
    try {
      const processedItem = {
        id: uuidv4(),
        ...item,
        includes: item.includes ? JSON.stringify(item.includes) : item.includes,
        features: item.features ? JSON.stringify(item.features) : item.features,
      };
      const response = await fetch(`${API_BASE_URL}/${key}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(processedItem),
      });

      if (response.ok) {
        const result = await response.json();
        // Invalidate cache
        localStorage.removeItem(`${DATA_CACHE_KEY_PREFIX}${key}`);
        await fetchData(); // Refresh data from API and cache
        emitChange(key);
      } else {
        throw new Error(`Failed to add item: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      throw error;
    }
  };

  const updateItem = async (id, updates) => {
    try {
      if (!id) {
        throw new Error('Missing id for update');
      }
      const processedUpdates = {
        ...updates,
        includes: updates?.includes ? JSON.stringify(updates.includes) : updates?.includes,
        features: updates?.features ? JSON.stringify(updates.features) : updates?.features,
        categories: updates?.categories ? JSON.stringify(updates.categories) : updates?.categories,
      };
      // Never allow updating the primary key
      const { id: _omit, ...cleanUpdates } = processedUpdates;
      const response = await fetch(`${API_BASE_URL}/${key}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cleanUpdates),
      });

      if (response.ok) {
        const result = await response.json();
        // Invalidate cache
        localStorage.removeItem(`${DATA_CACHE_KEY_PREFIX}${key}`);
        await fetchData(); // Refresh data from API and cache
        emitChange(key);
      } else {
        throw new Error(`Failed to update item: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error updating item:', error);
      throw error;
    }
  };

  const deleteItem = async (id) => {
    try {
      if (!id) {
        throw new Error('Missing id for delete');
      }
      const response = await fetch(`${API_BASE_URL}/${key}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Invalidate cache
        localStorage.removeItem(`${DATA_CACHE_KEY_PREFIX}${key}`);
        await fetchData(); // Refresh data from API and cache
        emitChange(key);
      } else {
        throw new Error(`Failed to delete item: ${response.statusText}`);
      }
    } catch (error) {
      console.error('Error deleting item:', error);
      throw error;
    }
  };

  return { data, loading, addItem, updateItem, deleteItem };
};
