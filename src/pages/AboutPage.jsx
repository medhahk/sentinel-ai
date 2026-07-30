import React from 'react';
import { useApp } from '../context/AppContext';
import { Info, ShieldAlert, Cpu, Layers, Code2, ExternalLink } from 'lucide-react';

export const AboutPage = () => {
  return (
    <div className="space-y-6 animate-fadeIn max-w-4xl mx-auto">
      {/* Banner */}
      <div className="p-8 rounded-2xl glass-panel border border-cyan-500/40 bg-gradient-to-r from-cyan-950/30 via-slate-900 to-indigo-950/30">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold text-slate-100">SentinelAI Platform</h1>
            <p className="text-xs text-cyan-400 font-mono">AI-Powered VAPT Management Architecture v2.4</p>
          </div>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed mt-4">
          SentinelAI is designed to automate the ingestion of raw scanner files (Nmap, Nessus, Burp, Nikto, Nuclei),
          correlate findings against global threat intelligence feeds, and empower security analysts with an autonomous RAG AI assistant.
        </p>
      </div>

      {/* Tech Stack Grid */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Cpu className="w-4 h-4 text-cyan-400" />
          <span>Technology Stack</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="block text-cyan-400 font-bold">React 18</span>
            <span className="text-[10px] text-slate-500">Frontend SPA</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="block text-blue-400 font-bold">Vite</span>
            <span className="text-[10px] text-slate-500">Build Tooling</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="block text-purple-400 font-bold">Tailwind CSS</span>
            <span className="text-[10px] text-slate-500">Glassmorphism UI</span>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
            <span className="block text-emerald-400 font-bold">FastAPI / Python</span>
            <span className="text-[10px] text-slate-500">Backend RAG Engine</span>
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="p-6 rounded-2xl glass-panel space-y-4">
        <h3 className="font-bold text-slate-200 text-sm flex items-center space-x-2 border-b border-slate-800 pb-3">
          <Layers className="w-4 h-4 text-indigo-400" />
          <span>System Flow Architecture</span>
        </h3>
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800 text-center font-mono text-xs text-slate-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 w-full sm:w-auto">
              Scan Reports (XML/JSON)
            </div>
            <span className="text-cyan-400">⟶</span>
            <div className="p-3 rounded-xl bg-cyan-950 border border-cyan-500/50 text-cyan-300 font-bold w-full sm:w-auto">
              Sentinel Parser & RAG Core
            </div>
            <span className="text-cyan-400">⟶</span>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 w-full sm:w-auto">
              Executive PDF Reports
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
