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

// Prefer a Vite-provided env var (VITE_API_BASE_URL) or fall back to the relative `/api` path
// so the dev server proxy (vite.config) handles requests. Using a relative path avoids
// hard-coding a port and prevents mismatches between environments.
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '/api';

export const useData = (key) => {
  const [data, setData] = useState(() => cache.get(key) ?? []);
  const [loading, setLoading] = useState(() => !cache.has(key));

  const fetchData = async () => {
    try {
      // Dedupe concurrent fetches for same key
      if (inFlight.has(key)) {
        await inFlight.get(key);
        setData(cache.get(key) ?? []);
        setLoading(false);
        return;
      }
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
          setData(processed);
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
