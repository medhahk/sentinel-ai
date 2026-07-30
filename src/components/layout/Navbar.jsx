import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldAlert,
  Search,
  UploadCloud,
  Bell,
  User,
  Sparkles,
  Bot,
  Terminal,
  LogOut,
  ChevronDown,
  Lock
} from 'lucide-react';

export const Navbar = () => {
  const {
    currentRoute,
    navigateTo,
    setIsCommandPaletteOpen,
    setIsUploadModalOpen,
    userName,
    userRole,
    vulnerabilities
  } = useApp();

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const criticalCount = vulnerabilities.filter(v => v.severity === 'Critical').length;

  if (currentRoute === 'landing' || currentRoute === 'login' || currentRoute === 'register') {
    return null; // Public pages use custom header or landing header
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

        {/* Live Threat Radar Pulse Badge */}
        <div className="hidden sm:flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-950/40 border border-cyan-800/40 text-xs text-cyan-300 font-mono">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span>RADAR ACTIVE</span>
          <span className="text-slate-500">|</span>
          <span className="text-red-400 font-bold">{criticalCount} Critical Threats</span>
        </div>
      </div>

      {/* Global Search / Command Palette Bar */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
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

      {/* Actions & User Menu */}
      <div className="flex items-center space-x-3">
        {/* AI Assistant Quick Launcher */}
        <button
          onClick={() => navigateTo('ai-assistant')}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-indigo-600/30 to-cyan-600/30 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 text-xs font-medium transition-all shadow-sm focus:outline-none"
        >
          <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="hidden sm:inline">AI Copilot</span>
        </button>

        {/* Upload Scan CTA Button */}
        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs transition-all shadow-lg shadow-cyan-500/25 focus:outline-none"
        >
          <UploadCloud className="w-4 h-4" />
          <span className="hidden sm:inline">Upload Scan</span>
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(prev => !prev)}
            className="p-2 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-slate-300 relative focus:outline-none"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-cyan-400"></span>
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-xl glass-panel p-4 z-50 border border-cyan-900/40 shadow-2xl">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <span className="font-semibold text-xs text-slate-200">Security Notifications</span>
                <span className="text-[10px] font-mono text-cyan-400">3 NEW</span>
              </div>
              <div className="space-y-2.5 mt-3">
                <div className="p-2 rounded-lg bg-slate-900/60 border border-red-900/30 text-xs">
                  <p className="font-semibold text-red-400">Critical Finding Detected</p>
                  <p className="text-slate-400 text-[11px]">SQLi in api.internal-auth.prod (CVE-2024-21887)</p>
                  <span className="text-[9px] font-mono text-slate-500">10 mins ago</span>
                </div>
                <div className="p-2 rounded-lg bg-slate-900/60 border border-cyan-900/30 text-xs">
                  <p className="font-semibold text-cyan-400">Threat Intel Sync Complete</p>
                  <p className="text-slate-400 text-[11px]">EPSS Database updated with 142 new zero-day metrics</p>
                  <span className="text-[9px] font-mono text-slate-500">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setIsUserMenuOpen(prev => !prev)}
            className="flex items-center space-x-2 p-1.5 rounded-lg bg-slate-900/80 border border-slate-800 hover:border-slate-700 text-xs text-slate-200 focus:outline-none"
          >
            <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-[11px]">
              AM
            </div>
            <span className="hidden lg:inline font-medium">{userName}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {isUserMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel p-2 z-50 border border-slate-800 shadow-2xl space-y-1">
              <div className="px-3 py-2 border-b border-slate-800/80 text-xs">
                <p className="font-bold text-slate-200">{userName}</p>
                <p className="text-[10px] text-cyan-400 font-mono">{userRole}</p>
              </div>
              <button
                onClick={() => { setIsUserMenuOpen(false); navigateTo('settings'); }}
                className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 text-left"
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Account Settings</span>
              </button>
              <button
                onClick={() => { setIsUserMenuOpen(false); navigateTo('admin'); }}
                className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-slate-300 hover:bg-slate-800 text-left"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Admin Console</span>
              </button>
              <div className="border-t border-slate-800 my-1"></div>
              <button
                onClick={() => { setIsUserMenuOpen(false); navigateTo('landing'); }}
                className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-lg text-xs text-red-400 hover:bg-red-950/40 text-left"
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
