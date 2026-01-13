import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Anchor } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = ({ darkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Courses', href: '/courses' },
    { label: 'Excursions', href: '/excursions' },
    { label: 'Gallery', href: '/gallery' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-6 py-4 ${
        isScrolled
          ? 'mt-4 mx-auto max-w-7xl'
          : 'mt-0 mx-0 max-w-full'
      }`}
    >
      <nav 
        className={`relative transition-all duration-500 px-6 py-3 rounded-[2rem] border ${
          isScrolled 
            ? 'bg-background/70 backdrop-blur-2xl border-border shadow-2xl shadow-primary/10' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Brand Logo Area */}
          <Link to="/">
            <motion.div
              className="flex items-center gap-3 cursor-pointer group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center p-2 border border-primary/20 transition-all group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.3)]">
                <img src="/logo1.png" className="w-full h-full object-contain" alt="SMD Logo" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-[0.2em] uppercase leading-none text-foreground">
                  Southern Maldives
                </span>
                <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-primary italic">
                  Divers
                </span>
              </div>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-300 relative group ${
                  location.pathname === item.href
                    ? 'text-primary'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {item.label}
                <span className={`absolute -bottom-1.5 left-0 h-0.5 bg-primary transition-all duration-500 ${
                  location.pathname === item.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
              </Link>
            ))}
            
            <div className="h-6 w-px bg-border mx-2" />

            {/* Utility Icons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-10 h-10 rounded-xl hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </Button>
              <Button 
                className="bg-primary hover:bg-primary-dark text-white rounded-xl px-6 py-2 h-10 font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 group"
                onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Book Now
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-card/50 border border-border"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-10 h-10 rounded-xl bg-primary text-white shadow-lg shadow-primary/20"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute top-20 left-0 right-0 lg:hidden bg-card/95 backdrop-blur-2xl border border-border mt-2 p-6 rounded-[2rem] shadow-2xl z-[101]"
            >
              <div className="flex flex-col gap-4">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block py-4 px-6 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] transition-all ${
                      location.pathname === item.href
                        ? 'bg-primary/10 text-primary border border-primary/20'
                        : 'text-muted-foreground hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button 
                  className="w-full py-7 rounded-2xl bg-primary text-white font-bold uppercase tracking-widest mt-4"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Reserve Your Dive
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;