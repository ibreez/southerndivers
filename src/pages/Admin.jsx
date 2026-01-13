import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Tent, 
  GraduationCap, 
  Image as ImageIcon, 
  Users, 
  Briefcase, 
  MessageSquare, 
  Package,
  LogOut,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const Admin = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdminAuthenticated');
    navigate('/admin/login');
  };

  const menuItems = [
    { title: 'Excursions & Trips', icon: Tent, href: '/admin/excursions', color: 'text-cyan-600', bg: 'bg-cyan-50' },
    { title: 'Diving Courses', icon: GraduationCap, href: '/admin/courses', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Packages & Deals', icon: Package, href: '/admin/packages', color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { title: 'Gallery', icon: ImageIcon, href: '/admin/gallery', color: 'text-teal-600', bg: 'bg-teal-50' },
    { title: 'Team Members', icon: Users, href: '/admin/team', color: 'text-sky-600', bg: 'bg-sky-50' },
    { title: 'Services', icon: Briefcase, href: '/admin/services', color: 'text-blue-600', bg: 'bg-blue-50' },
    { title: 'Testimonials', icon: MessageSquare, href: '/admin/testimonials', color: 'text-cyan-700', bg: 'bg-cyan-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-cyan-100">
      {/* Immersive Background Decor */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-100/50 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] left-[-5%] w-[30%] h-[30%] bg-blue-100/40 blur-[100px] rounded-full" />
      </div>

      {/* Modern High-Clarity Header */}
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-200 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="bg-slate-900 p-2.5 rounded-2xl shadow-lg shadow-slate-200">
            <LayoutDashboard className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-black tracking-[0.15em] uppercase text-slate-900">
              Control <span className="text-cyan-600 italic">Panel</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
              Southern Maldives Divers
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-6">
          <Link 
            to="/" 
            className="hidden md:flex items-center gap-2 text-[10px] font-black text-slate-500 hover:text-cyan-600 transition-all uppercase tracking-widest"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Live Site
          </Link>
          <div className="h-6 w-px bg-slate-200" />
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogout}
            className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-8 py-12 relative z-10">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl font-black tracking-tighter text-slate-900">Dashboard</h2>
            <p className="text-slate-500 mt-1 font-light italic">Managing the deep south from the surface.</p>
          </motion.div>
          
          <div className="hidden lg:flex items-center gap-3 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl shadow-sm">
            <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.1em]">System Status: Optimal</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Link 
                  to={item.href}
                  className="group block bg-white border border-slate-200 p-8 rounded-[2.5rem] transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-100 hover:border-cyan-200 relative overflow-hidden"
                >
                  <div className={`inline-flex p-4 rounded-2xl ${item.bg} ${item.color} mb-6 transition-transform group-hover:scale-110 duration-300`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 tracking-tight group-hover:text-cyan-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                    Update or modify your {item.title.toLowerCase()} content.
                  </p>
                  
                  <div className="mt-8 flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-cyan-600 transition-colors">Manage Module</span>
                    <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-cyan-600 group-hover:text-white transition-all duration-300">
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </main>

      <footer className="container mx-auto px-8 py-12 mt-12 border-t border-slate-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400">
           <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em]">
              <ShieldCheck className="w-3.5 h-3.5 text-cyan-500" />
              Secure Administrative Sector
           </div>
           <p className="text-[10px] font-medium tracking-widest uppercase italic">Southern Maldives Divers &copy; 2026</p>
        </div>
      </footer>
    </div>
  );
};

export default Admin;