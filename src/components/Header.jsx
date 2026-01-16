import React, { useState, useEffect, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Moon, Sun, Anchor, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = memo(({ darkMode, toggleTheme }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Scroll handler with performance optimization
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on navigation
  useEffect(() => setIsMenuOpen(false), [location]);

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
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 pointer-events-none ${
        isScrolled ? 'pt-4 px-6' : 'pt-0 px-0'
      }`}
    >
      <nav 
        className={`mx-auto transition-all duration-700 pointer-events-auto flex items-center justify-between px-6 py-3 rounded-[2.5rem] border ${
          isScrolled 
            ? 'max-w-7xl bg-background/60 backdrop-blur-2xl border-primary/10 shadow-[0_20px_50px_rgba(0,0,0,0.1)]' 
            : 'max-w-full bg-transparent border-transparent'
        }`}
      >
        {/* Branding */}
        <Link to="/" className="group flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center p-2.5 border border-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_25px_rgba(var(--primary),0.4)] transition-all duration-500">
              <img src="/logo1.png" className="w-full h-full object-contain" alt="Logo" />
            </div>
            {/* Scanned Light Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity" />
          </div>
          
          <div className="flex flex-col">
            <span className="text-xs font-black tracking-[0.3em] uppercase leading-none text-foreground">
              Southern Maldives
            </span>
            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-primary italic mt-1.5 opacity-80">
              Divers
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center bg-primary/5 px-8 py-2 rounded-full border border-primary/5 gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-[10px] font-black uppercase tracking-[0.25em] transition-all duration-500 relative group py-2 ${
                location.pathname === item.href ? 'text-primary' : 'text-muted-foreground/70 hover:text-foreground'
              }`}
            >
              {item.label}
              <motion.span 
                layoutId="navUnderline"
                className={`absolute -bottom-1 left-0 h-[2px] bg-primary rounded-full ${location.pathname === item.href ? 'w-full' : 'w-0'}`} 
              />
            </Link>
          ))}
        </div>

        {/* Action Tray */}
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="w-11 h-11 rounded-2xl hover:bg-primary/10 text-muted-foreground transition-all active:scale-90"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>

          <Button 
            className="hidden sm:flex bg-primary hover:bg-primary-dark text-white rounded-[1.25rem] px-8 h-11 font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-primary/20 group active:scale-95 transition-transform"
            onClick={() => document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Book Now
            <ChevronRight className="ml-2 w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </Button>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              className="absolute top-[calc(100%+12px)] left-0 right-0 lg:hidden bg-card/95 backdrop-blur-3xl border border-primary/10 p-8 rounded-[3rem] shadow-2xl z-[101]"
            >
              <div className="grid gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    to={item.href}
                    className={`block py-5 px-8 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all ${
                      location.pathname === item.href ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'hover:bg-primary/5 text-muted-foreground'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                <Button className="w-full h-16 rounded-2xl bg-foreground text-background font-black uppercase tracking-widest mt-4">
                  Reserve Your Dive
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
});

Header.displayName = 'Header';
export default Header;