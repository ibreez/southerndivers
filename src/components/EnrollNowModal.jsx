import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import EnrollNow from '@/components/EnrollNow';

const EnrollNowModal = ({ course }) => {
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure portal target exists and component is client-side
  useEffect(() => {
    setMounted(true);
    let portalContainer = document.getElementById('enroll-modal-portal');
    if (!portalContainer) {
      portalContainer = document.createElement('div');
      portalContainer.id = 'enroll-modal-portal';
      document.body.appendChild(portalContainer);
    }
  }, []);

  // Prevent scrolling when modal is open
  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [showForm]);

  if (!mounted) return null;

  return (
    <>
      <button
        onClick={() => setShowForm(true)}
        className="group relative inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 rounded-2xl transition-all duration-300 shadow-lg shadow-primary/20 active:scale-95"
      >
        <span>Enroll Now</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </button>

      {createPortal(
        <AnimatePresence>
          {showForm && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowForm(false)}
                className="absolute inset-0 bg-background/80 backdrop-blur-md"
              />

              {/* Modal Container */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              >
                {/* Close Button */}
                <button
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 z-50 p-2 rounded-full bg-card/50 border border-border text-foreground hover:bg-primary hover:text-white transition-all"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="bg-card border border-border rounded-[2.5rem] shadow-2xl overflow-hidden">
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
};

export default EnrollNowModal;