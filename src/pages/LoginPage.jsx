import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, Mail, Lock, LogIn, ArrowRight, UserCheck } from 'lucide-react';

export const LoginPage = () => {
  const { navigateTo, setUserRole } = useApp();
  const [email, setEmail] = useState('alex.mercer@sentinel.ai');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    navigateTo('dashboard');
  };

  const handleDemoLogin = (role) => {
    setUserRole(role);
    navigateTo('dashboard');
  };

  return (
    <div className="min-h-screen bg-[#07090e] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Glow Orbs */}
      <div className="absolute top-1/4 left-1/3 w-[500px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-md glass-panel p-8 border border-cyan-500/30 shadow-2xl relative z-10 rounded-2xl">
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 p-0.5 shadow-lg shadow-cyan-500/20 mx-auto mb-3">
            <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-cyan-400" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-100">Sign in to SentinelAI</h2>
          <p className="text-xs text-slate-400 mt-1">Access your VAPT security dashboard & AI copilot</p>
        </div>

        {/* Demo Quick Logins */}
        <div className="mb-6 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
          <p className="text-[10px] font-mono text-cyan-400 font-bold mb-2">QUICK DEMO PRESET LOGIN</p>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => handleDemoLogin('Security Analyst')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400 text-xs text-slate-300 transition-colors flex items-center justify-center space-x-1"
            >
              <UserCheck className="w-3 h-3 text-cyan-400" />
              <span>Analyst Mode</span>
            </button>
            <button
              onClick={() => handleDemoLogin('Admin')}
              className="px-2.5 py-1.5 rounded-lg bg-slate-950 border border-slate-800 hover:border-cyan-400 text-xs text-slate-300 transition-colors flex items-center justify-center space-x-1"
            >
              <UserCheck className="w-3 h-3 text-purple-400" />
              <span>Admin Mode</span>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">WORK EMAIL</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                placeholder="analyst@company.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">PASSWORD</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center space-x-2 text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={e => setRememberMe(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-cyan-500 focus:ring-0"
              />
              <span>Remember Me</span>
            </label>
            <button type="button" className="text-cyan-400 hover:underline">Forgot Password?</button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center space-x-2 transition-all mt-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In to Dashboard</span>
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          <span>Don't have an account? </span>
          <button onClick={() => navigateTo('register')} className="text-cyan-400 font-semibold hover:underline">
            Register here
          </button>
        </div>
      </div>
    </div>
  );
};
