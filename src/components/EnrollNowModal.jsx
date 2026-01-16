import React, { useState, useEffect, memo } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import EnrollNow from '@/components/EnrollNow';

const EnrollNowModal = memo(({ course }) => {
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Optimized Portal Lifecycle
  useEffect(() => {
    setMounted(true);
    let portalContainer = document.getElementById('enroll-modal-portal');
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = 'enroll-modal-portal';
      document.body.appendChild(portalContainer);
    }
  }, []);

  // 2. Lock Scroll with hardware-accelerated class
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = 'var(--removed-body-scroll-bar-size)'; // Prevent layout shift
    } else {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }
    return () => { 
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [showForm]);

  if (!mounted) return null;

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setShowForm(true)}
        className="group relative inline-flex items-center gap-3 bg-primary text-primary-foreground font-black uppercase tracking-[0.2em] text-[11px] py-4 px-10 rounded-2xl transition-all duration-300 shadow-xl shadow-primary/20"
      >
        <span>Enroll Now</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
      </motion.button>

      {createPortal(
        <AnimatePresence mode="wait">
          {showForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
              {/* Backdrop: Deep Ocean Blur */}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
                className="absolute inset-0 bg-background/60 backdrop-blur-xl bg-gradient-to-b from-transparent to-background/40"
              />

              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  transition: { type: "spring", stiffness: 120, damping: 20 } 
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.95, 
                  y: 20,
                  transition: { duration: 0.2 } 
                }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto no-scrollbar rounded-[3.5rem] shadow-[0_0_100px_-20px_rgba(var(--primary),0.3)]"
              >
                <div className="bg-card/90 backdrop-blur-md border border-primary/20 rounded-[3.5rem] overflow-hidden">
                  {/* The actual Form component */}
                  <EnrollNow course={course} onClose={() => setShowForm(false)} />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.getElementById('enroll-modal-portal')
      )}
    </>
  );
});

EnrollNowModal.displayName = 'EnrollNowModal';
export default EnrollNowModal;