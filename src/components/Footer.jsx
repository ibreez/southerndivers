import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, Mail, Lock, ArrowUpRight, Anchor } from 'lucide-react';
import { useData } from '@/hooks/useData';

const Footer = () => {
  const { data: services = [] } = useData('services');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-background text-foreground pt-24 pb-12 border-t border-border relative overflow-hidden">
      {/* Deep Sea Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Brand Identity - spans 4 columns */}
          <div className="lg:col-span-4 space-y-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center p-2 border border-primary/20">
                  <img src="/logo.png" className="w-full h-full object-contain" alt="Logo" />
                </div>
                <span className="text-xl font-black tracking-tighter uppercase leading-tight">
                  Southern Maldives<br /><span className="text-primary italic">Divers</span>
                </span>
              </div>
              <p className="text-muted-foreground leading-relaxed text-sm max-w-sm">
                Leading the way in Addu Atoll’s underwater exploration since 2009. We combine luxury hospitality with professional diving expertise.
              </p>
            </div>

            <div className="flex gap-3">
              {[
                { Icon: Instagram, href: "#" },
                { Icon: Facebook, href: "#" },
                { Icon: Youtube, href: "#" },
                { Icon: Mail, href: "mailto:info@southernmaldives.mv" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-all duration-300 group"
                >
                  <social.Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation - spans 2 columns */}
          <div className="lg:col-span-2">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8">Navigation</h4>
            <ul className="space-y-4">
              {['About', 'Courses', 'Excursions', 'Gallery', 'Safety'].map((item) => (
                <li key={item}>
                  <Link 
                    to={`/${item.toLowerCase()}`} 
                    className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors group"
                  >
                    {item}
                    <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Top Services - spans 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8">Experiences</h4>
            <ul className="grid grid-cols-1 gap-4">
              {services.slice(0, 5).map((service, index) => (
                <li key={index} className="text-sm text-muted-foreground cursor-default flex items-center gap-2">
                  <div className="w-1 h-1 rounded-full bg-primary/40" />
                  {service.name}
                </li>
              ))}
            </ul>
          </div>

          {/* Logistics - spans 3 columns */}
          <div className="lg:col-span-3">
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-8">Base of Operations</h4>
            <div className="space-y-6">
              <div className="p-4 rounded-2xl bg-card/50 border border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">Location</p>
                <p className="text-sm text-foreground">South Palm Resort, Addu City</p>
              </div>
              <div className="p-4 rounded-2xl bg-card/50 border border-border">
                <p className="text-xs text-muted-foreground font-medium mb-1">Availability</p>
                <p className="text-sm text-foreground">Open Daily: 08:00 - 18:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
              © 2026 Southern Maldives Divers
            </p>
            <div className="h-4 w-px bg-border hidden md:block" />
            <div className="flex gap-4">
              <Link to="/privacy" className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Privacy</Link>
              <Link to="/terms" className="text-[10px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest">Terms</Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <Link to="/admin/login" className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-muted-foreground hover:text-primary transition-all bg-card border border-border px-4 py-2 rounded-xl">
              <Lock className="w-3 h-3" />
              Admin
            </Link>
            <button 
              onClick={scrollToTop}
              className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-primary-foreground hover:shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              <Anchor className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;