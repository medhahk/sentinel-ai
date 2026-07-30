import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Radar,
  Server,
  Bug,
  Bot,
  FileSpreadsheet,
  FileText,
  GlobeLock,
  BarChart3,
  Settings,
  HelpCircle,
  Info,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Home,
  LogIn,
  UserPlus
} from 'lucide-react';

export const Sidebar = () => {
  const { currentRoute, navigateTo } = useApp();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (currentRoute === 'landing' || currentRoute === 'login' || currentRoute === 'register') {
    return null; // Public routes use clean layout without app sidebar
  }

  const navGroups = [
    {
      title: 'OVERVIEW',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard }
      ]
    },
    {
      title: 'VAPT OPERATIONS',
      items: [
        { id: 'scans', label: 'Scan Management', icon: Radar },
        { id: 'assets', label: 'Asset Inventory', icon: Server },
        { id: 'vulnerabilities', label: 'Vulnerabilities', icon: Bug }
      ]
    },
    {
      title: 'INTELLIGENCE & AI',
      items: [
        { id: 'ai-assistant', label: 'AI Copilot (RAG)', icon: Bot, badge: 'AI' },
        { id: 'threat-intel', label: 'Threat Intelligence', icon: GlobeLock }
      ]
    },
    {
      title: 'REPORTS & ANALYTICS',
      items: [
        { id: 'report-generator', label: 'Report Generator', icon: FileSpreadsheet },
        { id: 'reports', label: 'Reports Archive', icon: FileText },
        { id: 'analytics', label: 'Security Analytics', icon: BarChart3 }
      ]
    },
    {
      title: 'SYSTEM & DOCS',
      items: [
        { id: 'settings', label: 'Settings', icon: Settings },
        { id: 'docs', label: 'Help & Docs', icon: HelpCircle },
        { id: 'about', label: 'About Platform', icon: Info },
        { id: 'admin', label: 'Admin Console', icon: ShieldCheck }
      ]
    },
    {
      title: 'QUICK LINKS',
      items: [
        { id: 'landing', label: 'Landing Page', icon: Home },
        { id: 'login', label: 'Login Screen', icon: LogIn },
        { id: 'register', label: 'Register Screen', icon: UserPlus }
      ]
    }
  ];

  return (
    <aside
      className={`relative z-30 flex flex-col glass-header border-r border-cyan-900/30 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(prev => !prev)}
        className="absolute -right-3 top-6 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 hover:border-cyan-400 text-slate-300 flex items-center justify-center text-xs shadow-md focus:outline-none z-40"
      >
        {isCollapsed ? <ChevronRight className="w-3.5 h-3.5" /> : <ChevronLeft className="w-3.5 h-3.5" />}
      </button>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-4 px-2 space-y-6">
        {navGroups.map((group, idx) => (
          <div key={idx}>
            {!isCollapsed && (
              <p className="px-3 mb-2 text-[10px] font-mono font-semibold tracking-wider text-slate-500 uppercase">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map(item => {
                const Icon = item.icon;
                const isActive = currentRoute === item.id || (item.id === 'assets' && currentRoute === 'asset-details') || (item.id === 'vulnerabilities' && currentRoute === 'vulnerability-details');

                return (
                  <button
                    key={item.id}
                    onClick={() => navigateTo(item.id)}
                    title={isCollapsed ? item.label : undefined}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all focus:outline-none ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-950/80 to-blue-950/60 text-cyan-300 border border-cyan-500/40 shadow-sm shadow-cyan-500/10'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center space-x-2.5 min-w-0">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                    {!isCollapsed && item.badge && (
                      <span className="px-1.5 py-0.5 text-[9px] font-bold font-mono rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* System Status Footer */}
      {!isCollapsed && (
        <div className="p-3 m-2 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-slate-400">ENGINE STATUS</span>
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          </div>
          <p className="text-[11px] font-semibold text-slate-200 mt-1">RAG Neural Core Active</p>
          <p className="text-[9px] text-slate-400">Latency: 24ms | ChromaDB: Online</p>
        </div>
      )}
    </aside>
  );
};
