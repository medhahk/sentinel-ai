import React from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, Heart, Cpu, Lock } from 'lucide-react';

export const Footer = () => {
  const { currentRoute, navigateTo } = useApp();

  if (currentRoute === 'landing' || currentRoute === 'login' || currentRoute === 'register') {
    return null;
  }

  return (
    <footer className="glass-header border-t border-slate-800/80 px-6 py-4 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-cyan-400 font-mono font-semibold">
            <Shield className="w-4 h-4" />
            <span>SentinelAI Platform v2.4</span>
          </div>
          <span>•</span>
          <span className="text-slate-400">Automated VAPT Assessment & RAG Security Intelligence</span>
        </div>

        <div className="flex items-center space-x-6">
          <button onClick={() => navigateTo('docs')} className="hover:text-cyan-400 transition-colors">
            Documentation
          </button>
          <button onClick={() => navigateTo('about')} className="hover:text-cyan-400 transition-colors">
            Architecture
          </button>
          <button onClick={() => navigateTo('admin')} className="hover:text-cyan-400 transition-colors">
            Audit Logs
          </button>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 hover:text-cyan-400 transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </footer>
  );
};
