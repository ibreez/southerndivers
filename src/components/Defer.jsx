import React, { useEffect, useRef, useState } from 'react';

// Shared intersection observer instance to reduce observer overhead
let sharedObserver = null;
const observerCallbacks = new WeakMap();

function getSharedObserver(options) {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const callback = observerCallbacks.get(entry.target);
        if (callback) {
          callback(entry);
        }
      });
    }, options);
  }
  return sharedObserver;
}

/**
 * Defer mounts children only when near the viewport to reduce initial render work.
 * - rootMargin: how far before entering the viewport to mount (e.g., '200px')
 * - once: if true, mount once and keep mounted; if false, unmount when leaving
 * - fallback: what to render before mounting (e.g., null or a lightweight placeholder)
 */
function Defer({ children, rootMargin = '200px', once = true, fallback = null }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (visible && once) return;
    const el = ref.current;
    if (!el) return;

    const observer = getSharedObserver({ root: null, rootMargin, threshold: 0.01 });
    
    const handleIntersection = (entry) => {
      if (entry.isIntersecting) {
        setVisible(true);
        if (once) {
          observer.unobserve(el);
          observerCallbacks.delete(el);
        }
      } else if (!once) {
        setVisible(false);
      }
    };

    observerCallbacks.set(el, handleIntersection);
    observer.observe(el);

    return () => {
      observer.unobserve(el);
      observerCallbacks.delete(el);
    };
  }, [rootMargin, once, visible]);

  return <div ref={ref}>{visible ? children : fallback}</div>;
}

export default Defer;
