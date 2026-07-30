import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Server, Search, Filter, ShieldAlert, ChevronRight, Activity } from 'lucide-react';

export const AssetsPage = () => {
  const { assets, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [osFilter, setOsFilter] = useState('ALL');

  const filteredAssets = assets.filter(asset => {
    const matchesSearch = asset.hostname.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.ip.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesOs = osFilter === 'ALL' || asset.os.toLowerCase().includes(osFilter.toLowerCase());
    return matchesSearch && matchesOs;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <Server className="w-4 h-4" />
            <span>ASSET INVENTORY & DISCOVERY</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Scanned System Inventory</h1>
          <p className="text-xs text-slate-400 mt-1">
            Active inventory of target servers, endpoints, routers, and container nodes.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400">
            {assets.length} ACTIVE HOSTS
          </span>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-xl glass-panel flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search hostname or IP address..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={osFilter}
            onChange={e => setOsFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Operating Systems</option>
            <option value="Linux">Linux</option>
            <option value="Windows">Windows</option>
            <option value="Cisco">Cisco IOS</option>
          </select>
        </div>
      </div>

      {/* Assets Table */}
      <div className="p-5 rounded-2xl glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 font-mono text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Hostname</th>
                <th className="py-3 px-4">IP Address</th>
                <th className="py-3 px-4">Operating System</th>
                <th className="py-3 px-4">Open Ports</th>
                <th className="py-3 px-4">Last Scanned</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {filteredAssets.map(asset => (
                <tr
                  key={asset.id}
                  onClick={() => navigateTo('asset-details', asset.id)}
                  className="hover:bg-cyan-950/30 cursor-pointer transition-colors"
                >
                  <td className="py-3.5 px-4 font-bold text-slate-100 flex items-center space-x-2">
                    <Server className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{asset.hostname}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">{asset.ip}</td>
                  <td className="py-3.5 px-4 text-slate-400 font-mono text-[11px]">{asset.os}</td>
                  <td className="py-3.5 px-4">
                    <div className="flex flex-wrap gap-1">
                      {asset.openPorts.map(p => (
                        <span key={p} className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px]">
                          {p}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{asset.lastScan}</td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      asset.riskScore > 8 ? 'bg-red-950 text-red-400 border border-red-500/40' :
                      asset.riskScore > 5 ? 'bg-orange-950 text-orange-400 border border-orange-500/40' :
                      'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                    }`}>
                      {asset.riskScore} / 10
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <ChevronRight className="w-4 h-4 text-slate-500 ml-auto" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
