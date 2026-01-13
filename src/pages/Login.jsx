import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Label } from '@/components/ui/label';
import { Lock, Waves, ArrowRight, ShieldCheck } from 'lucide-react';
import { API_BASE_URL } from '@/hooks/useData';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        localStorage.setItem('isAdminAuthenticated', 'true');
        toast({
          title: 'Authentication Successful',
          description: 'Decrypting admin dashboard...',
        });
        navigate('/admin');
      } else {
        toast({
          variant: 'destructive',
          title: 'Access Denied',
          description: 'Invalid credentials for this sector.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'System Error',
        description: 'Connection to the deep-sea server failed.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      {/* Background Depth Layers */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-black" />
        
        {/* Animated Ambient Light */}
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1] 
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-1/2 -left-1/4 w-full h-full bg-cyan-500/10 blur-[120px] rounded-full"
        />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md p-1 relative z-10"
      >
        {/* Glassmorphism Card */}
        <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 p-8 rounded-[2.5rem] shadow-2xl overflow-hidden relative">
          
          {/* Subtle Scanline Effect */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />

          <div className="flex flex-col items-center mb-10 relative z-10">
            <motion.div 
              whileHover={{ rotate: 180 }}
              className="p-4 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl mb-4"
            >
              <Waves className="w-10 h-10 text-cyan-400" />
            </motion.div>
            <h1 className="text-3xl font-black text-white tracking-tighter uppercase">
              Admin <span className="text-cyan-500 italic">Sector</span>
            </h1>
            <p className="text-slate-500 text-sm mt-2 flex items-center gap-2">
              <ShieldCheck className="w-3 h-3" /> Secure Encrypted Connection
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5 relative z-10">
            <div className="space-y-2">
              <Label className="text-slate-400 ml-1 text-xs uppercase tracking-widest font-bold">Identity</Label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all text-white placeholder:text-slate-700"
                placeholder="Username"
              />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-400 ml-1 text-xs uppercase tracking-widest font-bold">Access Key</Label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-black/40 border border-white/5 rounded-2xl focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 outline-none transition-all text-white placeholder:text-slate-700"
                placeholder="••••••••"
              />
            </div>

            <Button 
              disabled={isLoading}
              type="submit" 
              className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-7 rounded-2xl text-lg font-bold shadow-lg shadow-cyan-900/20 transition-all group"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Authenticating...
                </div>
              ) : (
                <>
                  Enter Dashboard
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          {/* Bottom Footer Decor */}
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-[10px] text-slate-600 uppercase tracking-[0.2em]">
              Southern Maldives Divers &copy; 2026
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;