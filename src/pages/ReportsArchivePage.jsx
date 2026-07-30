import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Download, Eye, Plus, CheckCircle2 } from 'lucide-react';

export const ReportsArchivePage = () => {
  const { reports, navigateTo, addToast } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <FileText className="w-4 h-4" />
            <span>REPORTS ARCHIVE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Generated Reports Vault</h1>
          <p className="text-xs text-slate-400 mt-1">
            Archive of historical penetration testing reports and compliance assessments.
          </p>
        </div>

        <button
          onClick={() => navigateTo('report-generator')}
          className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-2 transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>New Report</span>
        </button>
      </div>

      <div className="p-5 rounded-2xl glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 font-mono text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Report Name</th>
                <th className="py-3 px-4">Date Generated</th>
                <th className="py-3 px-4">Client / Scope</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Author</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Download</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {reports.map(rep => (
                <tr key={rep.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-bold text-slate-100 flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span>{rep.title}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{rep.date}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">{rep.client}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-300 font-mono text-[10px]">
                      {rep.type}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-slate-400 text-[11px]">{rep.author}</td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{rep.status}</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() => { addToast(`Downloading ${rep.title}.pdf`, 'success'); window.print(); }}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-cyan-400 font-mono text-[11px] flex items-center space-x-1"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>PDF</span>
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
