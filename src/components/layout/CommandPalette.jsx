import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Search, X, Server, Bug, Radar, FileText, Bot, CornerDownLeft } from 'lucide-react';

export const CommandPalette = () => {
  const {
    isCommandPaletteOpen,
    setIsCommandPaletteOpen,
    navigateTo,
    assets,
    vulnerabilities,
    scans
  } = useApp();

  const [query, setQuery] = useState('');

  if (!isCommandPaletteOpen) return null;

  const filteredAssets = assets.filter(a =>
    a.hostname.toLowerCase().includes(query.toLowerCase()) ||
    a.ip.toLowerCase().includes(query.toLowerCase())
  );

  const filteredVulns = vulnerabilities.filter(v =>
    v.title.toLowerCase().includes(query.toLowerCase()) ||
    v.cve.toLowerCase().includes(query.toLowerCase())
  );

  const filteredScans = scans.filter(s =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.scanner.toLowerCase().includes(query.toLowerCase())
  );

  const pages = [
    { name: 'Dashboard Overview', route: 'dashboard' },
    { name: 'Scan Management', route: 'scans' },
    { name: 'Asset Inventory', route: 'assets' },
    { name: 'Vulnerability Database', route: 'vulnerabilities' },
    { name: 'AI Security Assistant', route: 'ai-assistant' },
    { name: 'Report Generator', route: 'report-generator' },
    { name: 'Threat Intelligence', route: 'threat-intel' },
    { name: 'Security Analytics', route: 'analytics' },
    { name: 'Settings & API Keys', route: 'settings' },
    { name: 'Admin Console', route: 'admin' }
  ].filter(p => p.name.toLowerCase().includes(query.toLowerCase()));

  const handleSelect = (route, paramId) => {
    setIsCommandPaletteOpen(false);
    setQuery('');
    navigateTo(route, paramId);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-2xl glass-panel border border-cyan-500/40 shadow-2xl overflow-hidden rounded-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Search Header */}
        <div className="flex items-center px-4 py-3 border-b border-slate-800">
          <Search className="w-5 h-5 text-cyan-400 mr-3" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Type a command, search asset IP, CVE, or scan..."
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-sm font-medium"
            autoFocus
          />
          <button
            onClick={() => setIsCommandPaletteOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-3 space-y-4">
          {/* Pages */}
          {pages.length > 0 && (
            <div>
              <p className="px-2 mb-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase">Pages & Modules</p>
              <div className="space-y-1">
                {pages.map(p => (
                  <button
                    key={p.route}
                    onClick={() => handleSelect(p.route)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-cyan-950/50 hover:text-cyan-300 transition-colors text-left group"
                  >
                    <span>{p.name}</span>
                    <CornerDownLeft className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Assets */}
          {filteredAssets.length > 0 && (
            <div>
              <p className="px-2 mb-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase">Assets ({filteredAssets.length})</p>
              <div className="space-y-1">
                {filteredAssets.map(a => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect('asset-details', a.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-cyan-950/50 hover:text-cyan-300 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <Server className="w-3.5 h-3.5 text-cyan-400" />
                      <span className="font-semibold text-slate-200">{a.hostname}</span>
                      <span className="font-mono text-slate-400">({a.ip})</span>
                    </div>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-red-950/60 text-red-300 font-mono">
                      Risk {a.riskScore}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Vulnerabilities */}
          {filteredVulns.length > 0 && (
            <div>
              <p className="px-2 mb-1.5 text-[10px] font-mono font-bold text-slate-500 uppercase">Vulnerabilities ({filteredVulns.length})</p>
              <div className="space-y-1">
                {filteredVulns.map(v => (
                  <button
                    key={v.id}
                    onClick={() => handleSelect('vulnerability-details', v.id)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs text-slate-300 hover:bg-cyan-950/50 hover:text-cyan-300 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-2">
                      <Bug className="w-3.5 h-3.5 text-red-400" />
                      <span className="font-semibold text-slate-200">{v.cve}</span>
                      <span className="truncate max-w-xs">{v.title}</span>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-red-400">CVSS {v.cvss}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>Navigate with arrows or mouse</span>
          <span>ESC to exit</span>
        </div>
      </div>
    </div>
  );
};
