import React from 'react';
import { useApp } from '../context/AppContext';
import { Radar, UploadCloud, Trash2, FileSpreadsheet, Eye, CheckCircle2 } from 'lucide-react';

export const ScansPage = () => {
  const { scans, setIsUploadModalOpen, navigateTo, addToast } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <Radar className="w-4 h-4" />
            <span>SCAN MANAGEMENT & PARSER</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Scan Assessment Vault</h1>
          <p className="text-xs text-slate-400 mt-1">
            Import Nmap, Nessus, Burp, Nikto, and Nuclei XML/JSON vulnerability scans.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all self-start sm:self-auto"
        >
          <UploadCloud className="w-4 h-4" />
          <span>Upload Scan File</span>
        </button>
      </div>

      {/* Scans Table */}
      <div className="p-5 rounded-2xl glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 font-mono text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Scan Name</th>
                <th className="py-3 px-4">Scanner Engine</th>
                <th className="py-3 px-4">Target IP / Domain</th>
                <th className="py-3 px-4">Date & Time</th>
                <th className="py-3 px-4">Findings Breakdown</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {scans.map(scan => (
                <tr key={scan.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-100">{scan.name}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-cyan-300 font-mono text-[11px]">
                      {scan.scanner}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{scan.target}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{scan.date}</td>
                  <td className="py-3.5 px-4 font-mono text-[11px]">
                    <div className="flex items-center space-x-1.5">
                      <span className="px-1.5 py-0.5 rounded bg-red-950/80 text-red-400 font-bold">
                        {scan.criticalCount || 1} C
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-orange-950/80 text-orange-400 font-bold">
                        {scan.highCount || 2} H
                      </span>
                      <span className="px-1.5 py-0.5 rounded bg-yellow-950/80 text-yellow-400 font-bold">
                        {scan.medCount || 2} M
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{scan.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => navigateTo('vulnerabilities')}
                        title="View Findings"
                        className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-cyan-500 text-cyan-400"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => navigateTo('report-generator')}
                        title="Generate Report"
                        className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-emerald-500 text-emerald-400"
                      >
                        <FileSpreadsheet className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => addToast(`Scan ${scan.id} removed`, 'info')}
                        title="Delete Scan"
                        className="p-1.5 rounded bg-slate-900 border border-slate-800 hover:border-red-500 text-red-400"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
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
