import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Search,
  UploadCloud,
  Bell,
  User,
  Sparkles,
  ChevronDown,
  Key,
  CreditCard,
  LogOut,
  Lock
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentRoute,
    navigateTo,
    setIsCommandPaletteOpen,
    setIsUploadModalOpen,
    setIsJwtModalOpen,
    setIsPaymentModalOpen,
    userName,
    userRole,
    userPlan,
    vulnerabilities
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const criticalCount = vulnerabilities.filter(v => v.severity === 'Critical').length;

  if (currentRoute === 'landing' || currentRoute === 'login' || currentRoute === 'register') {
    return null;
  }

  return (
    <header className="sticky top-0 z-40 glass-header px-4 lg:px-6 py-3 border-b border-cyan-900/30 flex items-center justify-between">
      {/* Brand & Status */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigateTo('dashboard')}
          className="flex items-center space-x-2.5 group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 p-0.5 shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#07090e] rounded-[7px] flex items-center justify-center">
              <ShieldAlert className="w-5 h-5 text-cyan-400" />
            </div>
          </div>
          <div className="text-left">
            <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
              Sentinel<span className="text-cyan-400">AI</span>
            </span>
            <span className="block text-[10px] text-slate-400 font-mono tracking-wider -mt-1">
              VAPT PLATFORM v2.4
            </span>
          </div>
        </button>

        {/* JWT Session Badge */}
        <button
          onClick={() => setIsJwtModalOpen(true)}
          className="hidden sm:flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-[11px] text-cyan-300 font-mono hover:bg-cyan-900/60 transition-colors"
        >
          <Key className="w-3 h-3 text-cyan-400" />
          <span>JWT ACTIVE</span>
        </button>

        {/* Plan Upgrade Badge */}
        <button
          onClick={() => setIsPaymentModalOpen(true)}
          className="hidden lg:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-indigo-900/60 to-purple-900/60 border border-purple-500/40 text-[11px] text-purple-300 font-mono font-bold hover:scale-105 transition-all"
        >
          <CreditCard className="w-3 h-3 text-purple-400" />
          <span>{userPlan} PLAN</span>
        </button>
      </div>

      {/* Global Search Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-4">
        <button
          onClick={() => setIsCommandPaletteOpen(true)}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 text-slate-400 text-xs transition-colors focus:outline-none group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400" />
            <span>Search assets, CVEs, scans...</span>
          </div>
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">
            Ctrl + K
          </kbd>
        </button>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-3">
        <button
          onClick={() => navigateTo('ai-assistant')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 border border-cyan-500/30 text-cyan-300 text-xs font-medium transition-all"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 transition-all"
        >
          <UploadCloud className="w-4 h-4" />
          <span className="hidden sm:inline">Upload Scan</span>
        </button>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(prev => !prev)}
            className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 text-xs text-slate-200 focus:outline-none"
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-[11px]">
              AM
            </div>
            <span className="hidden lg:inline font-medium">{userName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl glass-panel p-2 z-50 border border-slate-800 shadow-2xl space-y-1 text-xs">
              <div className="px-3 py-2 border-b border-slate-800/80">
                <p className="font-bold text-slate-200">{userName}</p>
                <p className="text-[10px] text-cyan-400 font-mono">{userRole} • {userPlan}</p>
              </div>
              <button
                onClick={() => { setIsUserMenuOpen(false); setIsJwtModalOpen(true); }}
                className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800 text-left"
              >
                <Key className="w-3.5 h-3.5 text-cyan-400" />
                <span>JWT Session Claims</span>
              </button>
              <button
                onClick={() => { setIsUserMenuOpen(false); setIsPaymentModalOpen(true); }}
                className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-slate-300 hover:bg-slate-800 text-left"
              >
                <CreditCard className="w-3.5 h-3.5 text-purple-400" />
                <span>Billing & Subscription</span>
              </button>
              <div className="border-t border-slate-800 my-1"></div>
              <button
                onClick={() => { setIsUserMenuOpen(false); navigateTo('landing'); }}
                className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-950/40 text-left"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
