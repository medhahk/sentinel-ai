import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Server, ArrowLeft, ShieldAlert, Cpu, Network, Bug, History, ChevronRight } from 'lucide-react';

export const AssetDetailsPage = () => {
  const { selectedAssetId, assets, vulnerabilities, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState('ports');

  const asset = assets.find(a => a.id === selectedAssetId) || assets[0];
  const hostVulns = vulnerabilities.filter(v => v.host === asset.hostname || v.ip === asset.ip);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Back button */}
      <button
        onClick={() => navigateTo('assets')}
        className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-cyan-400 font-mono transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Asset Inventory</span>
      </button>

      {/* Asset Header Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-cyan-500/30 bg-gradient-to-r from-slate-900 via-cyan-950/20 to-slate-900 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-start space-x-4">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shrink-0">
            <Server className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-extrabold text-slate-100">{asset.hostname}</h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-red-950 text-red-400 border border-red-500/40 font-bold">
                {asset.status}
              </span>
            </div>
            <p className="text-xs font-mono text-cyan-400 mt-1">IP Address: {asset.ip}</p>
            <p className="text-xs text-slate-400 mt-0.5">OS Fingerprint: {asset.os}</p>
          </div>
        </div>

        <div className="flex items-center space-x-6 border-t md:border-t-0 md:border-l border-slate-800 pt-4 md:pt-0 md:pl-6">
          <div className="text-center">
            <span className="block text-3xl font-extrabold font-mono text-red-400">{asset.riskScore}</span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">RISK SCORE</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-extrabold font-mono text-cyan-400">{asset.openPorts.length}</span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">OPEN PORTS</span>
          </div>
          <div className="text-center">
            <span className="block text-3xl font-extrabold font-mono text-orange-400">{hostVulns.length}</span>
            <span className="text-[10px] text-slate-400 font-mono uppercase">FINDINGS</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 space-x-6 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('ports')}
          className={`pb-3 transition-colors ${activeTab === 'ports' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Open Ports & Services ({asset.openPorts.length})
        </button>
        <button
          onClick={() => setActiveTab('vulns')}
          className={`pb-3 transition-colors ${activeTab === 'vulns' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Associated Vulnerabilities ({hostVulns.length})
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`pb-3 transition-colors ${activeTab === 'history' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Scan History & Timeline
        </button>
        <button
          onClick={() => setActiveTab('topology')}
          className={`pb-3 transition-colors ${activeTab === 'topology' ? 'text-cyan-400 border-b-2 border-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
        >
          Network Topology Map
        </button>
      </div>

      {/* Tab Contents */}
      {activeTab === 'ports' && (
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm">Detected Services & Banners</h3>
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 font-mono text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Port</th>
                <th className="py-2.5 px-3">Protocol</th>
                <th className="py-2.5 px-3">Service Name</th>
                <th className="py-2.5 px-3">Version Banner</th>
                <th className="py-2.5 px-3">Risk Assessment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {(asset.services || []).map((srv, i) => (
                <tr key={i} className="hover:bg-slate-900/50">
                  <td className="py-3 px-3 text-cyan-400 font-bold">{srv.port}</td>
                  <td className="py-3 px-3 uppercase text-slate-400">{srv.protocol}</td>
                  <td className="py-3 px-3 font-semibold text-slate-200">{srv.name}</td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{srv.service}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] bg-red-950 text-red-400 border border-red-500/30">
                      Exposed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'vulns' && (
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm">Vulnerabilities Detected on Host</h3>
          <div className="space-y-3">
            {hostVulns.map(v => (
              <div key={v.id} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono badge-critical">
                      {v.severity} ({v.cvss})
                    </span>
                    <span className="font-bold text-slate-100 text-xs">{v.title}</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 font-mono">{v.cve} • Port {v.port}</p>
                </div>
                <button
                  onClick={() => navigateTo('vulnerability-details', v.id)}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/30 text-xs font-mono"
                >
                  Inspect
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm">Scan Activity Timeline</h3>
          <div className="space-y-4 border-l-2 border-cyan-500/30 pl-4">
            <div className="relative">
              <span className="w-3 h-3 rounded-full bg-cyan-400 absolute -left-[23px] top-1 border-2 border-[#07090e]"></span>
              <p className="text-xs font-bold text-slate-200">Nmap Full Scan Executed</p>
              <p className="text-[10px] font-mono text-slate-400">{asset.lastScan} 14:22 • Parsed 4 open ports</p>
            </div>
            <div className="relative">
              <span className="w-3 h-3 rounded-full bg-indigo-400 absolute -left-[23px] top-1 border-2 border-[#07090e]"></span>
              <p className="text-xs font-bold text-slate-200">Nessus Vulnerability Sweep</p>
              <p className="text-[10px] font-mono text-slate-400">2026-07-25 09:15 • Identified 2 Critical CVEs</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'topology' && (
        <div className="p-5 rounded-2xl glass-panel text-center">
          <h3 className="font-bold text-slate-200 text-sm mb-4">Network Topology Node Diagram</h3>
          <div className="p-8 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center">
            <div className="flex items-center space-x-6 text-xs font-mono">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
                Gateway Router (192.168.1.1)
              </div>
              <span className="text-cyan-400">⟶</span>
              <div className="p-4 rounded-xl bg-cyan-950 border border-cyan-500/60 text-cyan-300 font-bold shadow-lg shadow-cyan-500/20">
                {asset.hostname} ({asset.ip})
              </div>
              <span className="text-cyan-400">⟶</span>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-700 text-slate-300">
                Internal DB Cluster
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
