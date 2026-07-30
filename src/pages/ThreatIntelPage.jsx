import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GlobeLock, Search, ShieldAlert, ExternalLink, Zap, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const ThreatIntelPage = () => {
  const { threatIntel } = useApp();
  const [query, setQuery] = useState('');
  const [selectedCve, setSelectedCve] = useState(null);

  const filtered = threatIntel.filter(t =>
    t.cve.toLowerCase().includes(query.toLowerCase()) ||
    t.title.toLowerCase().includes(query.toLowerCase()) ||
    t.vendor.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <GlobeLock className="w-4 h-4" />
            <span>GLOBAL THREAT INTELLIGENCE FEED</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Live Zero-Day & EPSS Threat Stream</h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time NVD advisory sync, Exploit Prediction Scoring System (EPSS), and CISA Known Exploited Vulnerabilities.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-lg bg-red-950/80 border border-red-500/40 text-red-400 font-bold flex items-center space-x-1">
            <Zap className="w-3.5 h-3.5" />
            <span>CISA KEV ACTIVE</span>
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-xl glass-panel">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search zero-day CVE, vendor name, or exploit keyword (e.g. OpenSSH, Confluence, PHP)..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Threat Cards Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {filtered.map(intel => (
          <div
            key={intel.cve}
            onClick={() => setSelectedCve(intel)}
            className="p-5 rounded-2xl glass-panel glass-panel-interactive cursor-pointer border border-slate-800 space-y-3 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-base font-extrabold font-mono text-cyan-400">{intel.cve}</span>
                <div className="flex items-center space-x-2 font-mono text-[10px]">
                  <span className="px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-500/40 font-bold">
                    EPSS {(intel.epss * 100).toFixed(1)}%
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-700">
                    CVSS {intel.cvss}
                  </span>
                </div>
              </div>

              <h3 className="font-bold text-slate-100 text-sm">{intel.title}</h3>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed line-clamp-2">{intel.summary}</p>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
              <span>Vendor: <span className="text-slate-200">{intel.vendor}</span></span>
              <span className="text-emerald-400">{intel.patchStatus}</span>
            </div>
          </div>
        ))}
      </div>

      {/* CVE Detail Modal */}
      {selectedCve && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl glass-panel p-6 border border-cyan-500/40 shadow-2xl rounded-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-lg font-extrabold font-mono text-cyan-400">{selectedCve.cve}</span>
              <button onClick={() => setSelectedCve(null)} className="text-slate-400 hover:text-slate-100 text-sm">✕</button>
            </div>
            <h2 className="text-base font-bold text-slate-100">{selectedCve.title}</h2>
            <p className="text-xs text-slate-300 leading-relaxed">{selectedCve.summary}</p>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs font-mono">
              <p>EPSS Percentile: <span className="text-red-400 font-bold">{selectedCve.epssPercentile}</span></p>
              <p>Patch Guidance: <span className="text-emerald-400 font-bold">{selectedCve.patchStatus}</span></p>
              <p>Published Date: {selectedCve.publishedDate}</p>
            </div>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedCve(null)}
                className="px-4 py-2 rounded-lg bg-cyan-500 text-slate-950 font-bold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
