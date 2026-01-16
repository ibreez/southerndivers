import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Youtube, Mail, Lock, ArrowUpRight, Anchor, MapPin, Clock } from 'lucide-react';
import { useData } from '@/hooks/useData';

const Footer = memo(() => {
  const { data: services = [] } = useData('services');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background text-foreground pt-32 pb-12 border-t border-primary/10 relative overflow-hidden">
      {/* Cinematic Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="absolute -bottom-48 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 mb-24">
          
          {/* Brand Identity */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex flex-col gap-6">
              <Link to="/" className="flex items-center gap-4 group">
                <div className="w-14 h-14 bg-primary/10 rounded-[1.25rem] flex items-center justify-center p-3 border border-primary/20 group-hover:border-primary transition-colors">
                  <img src="/logo1.png" className="w-full h-full object-contain" alt="SMD Logo" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase leading-[0.9]">
                  Southern Maldives<br />
                  <span className="text-primary italic font-serif text-lg tracking-normal">Divers</span>
                </span>
              </Link>
              <p className="text-muted-foreground/80 leading-relaxed text-sm max-w-xs font-medium">
                Pioneering underwater exploration in Addu Atoll. We bridge the gap between luxury hospitality and technical diving precision since 2009.
              </p>
            </div>

            <div className="flex gap-4">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: Mail, href: "mailto:info@southernmaldives.mv" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-11 h-11 rounded-2xl bg-card border border-primary/10 flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all duration-500 group"
                >
                  <social.Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Directory</h4>
            <ul className="space-y-5">
              {['About', 'Courses', 'Excursions', 'Gallery', 'Safety'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="text-[11px] font-bold text-muted-foreground hover:text-foreground flex items-center justify-between group transition-colors uppercase tracking-widest"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 text-primary opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Expeditions */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Expeditions</h4>
            <ul className="space-y-5">
              {(services.length > 0 ? services.slice(0, 5) : ['Shark Adventure', 'Manta Point', 'Wreck Diving', 'Deep Wall']).map((service, index) => (
                <li key={index} className="text-[11px] font-bold text-muted-foreground/60 flex items-center gap-3 uppercase tracking-widest group cursor-default">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors" />
                  {typeof service === 'string' ? service : service.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Headquarters */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-10">Headquarters</h4>
            <div className="space-y-4">
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/5 group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Base Location</span>
                </div>
                <p className="text-sm font-bold text-foreground">South Palm Resort<br/>Addu City, Maldives</p>
              </div>
              
              <div className="p-6 rounded-3xl bg-primary/5 border border-primary/5 group hover:border-primary/20 transition-all">
                <div className="flex items-center gap-3 mb-2 text-primary">
                  <Clock className="w-4 h-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Operation Hours</span>
                </div>
                <p className="text-sm font-bold text-foreground">Daily: 08:00 — 18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Legal & Meta */}
        <div className="pt-10 border-t border-primary/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[9px] font-black text-muted-foreground/50 uppercase tracking-[0.3em]">
              © 2026 Southern Maldives Divers. All Rights Reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/privacy" className="text-[9px] font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.3em]">Privacy</Link>
              <Link to="/terms" className="text-[9px] font-black text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.3em]">Terms</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/admin/login" className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-all bg-card border border-primary/10 px-6 py-3 rounded-2xl group">
              <Lock className="w-3 h-3 group-hover:animate-pulse" />
              Terminal Access
            </Link>
            <button 
              onClick={scrollToTop}
              className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground hover:shadow-[0_0_30px_rgba(var(--primary),0.4)] transition-all active:scale-90"
              aria-label="Back to surface"
            >
              <Anchor className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = 'Footer';
export default Footer;