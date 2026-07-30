import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bug, Search, Filter, ShieldAlert, ChevronRight, Eye } from 'lucide-react';

export const VulnerabilitiesPage = () => {
  const { vulnerabilities, updateVulnStatus, navigateTo } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [scannerFilter, setScannerFilter] = useState('ALL');

  const filteredVulns = vulnerabilities.filter(v => {
    const matchesSearch = v.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.cve.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          v.host.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSev = severityFilter === 'ALL' || v.severity.toUpperCase() === severityFilter.toUpperCase();
    const matchesStatus = statusFilter === 'ALL' || v.status.toUpperCase() === statusFilter.toUpperCase();
    const matchesScanner = scannerFilter === 'ALL' || v.scanner.toUpperCase().includes(scannerFilter.toUpperCase());

    return matchesSearch && matchesSev && matchesStatus && matchesScanner;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-red-400 font-mono text-xs font-semibold mb-1">
            <Bug className="w-4 h-4" />
            <span>MASTER VULNERABILITY DATABASE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Discovered Vulnerability Matrix</h1>
          <p className="text-xs text-slate-400 mt-1">
            Unified vulnerability findings across all targets, CVE feeds, and scanner engines.
          </p>
        </div>

        <div className="flex items-center space-x-2 font-mono text-xs">
          <span className="px-2.5 py-1 rounded bg-red-950/80 border border-red-500/40 text-red-400 font-bold">
            {vulnerabilities.filter(v => v.severity === 'Critical').length} CRITICAL
          </span>
          <span className="px-2.5 py-1 rounded bg-orange-950/80 border border-orange-500/40 text-orange-400 font-bold">
            {vulnerabilities.filter(v => v.severity === 'High').length} HIGH
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-xl glass-panel grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search CVE, Title, or Host..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
          />
        </div>

        {/* Severity */}
        <div>
          <select
            value={severityFilter}
            onChange={e => setSeverityFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Severities</option>
            <option value="CRITICAL">Critical Only</option>
            <option value="HIGH">High Only</option>
            <option value="MEDIUM">Medium Only</option>
            <option value="LOW">Low Only</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Statuses</option>
            <option value="OPEN">Open</option>
            <option value="IN PROGRESS">In Progress</option>
            <option value="RESOLVED">Resolved</option>
            <option value="FALSE POSITIVE">False Positive</option>
          </select>
        </div>

        {/* Scanner */}
        <div>
          <select
            value={scannerFilter}
            onChange={e => setScannerFilter(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
          >
            <option value="ALL">All Scanner Sources</option>
            <option value="BURP">Burp Suite</option>
            <option value="NESSUS">Nessus</option>
            <option value="NMAP">Nmap XML</option>
            <option value="NUCLEI">Nuclei</option>
            <option value="NIKTO">Nikto</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="p-5 rounded-2xl glass-panel">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 font-mono text-slate-400 text-[10px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Severity / CVSS</th>
                <th className="py-3 px-4">Vulnerability Title</th>
                <th className="py-3 px-4">CVE Identifier</th>
                <th className="py-3 px-4">Affected Host</th>
                <th className="py-3 px-4">Scanner Source</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {filteredVulns.map(v => (
                <tr key={v.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4 font-mono">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        v.severity === 'Critical'
                          ? 'badge-critical'
                          : v.severity === 'High'
                          ? 'badge-high'
                          : v.severity === 'Medium'
                          ? 'badge-medium'
                          : 'badge-low'
                      }`}
                    >
                      {v.severity} ({v.cvss})
                    </span>
                  </td>
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => navigateTo('vulnerability-details', v.id)}
                      className="font-bold text-slate-100 hover:text-cyan-400 text-left block truncate max-w-sm"
                    >
                      {v.title}
                    </button>
                    <span className="text-[10px] text-slate-400 font-mono truncate block">{v.affectedParameter}</span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-cyan-400">{v.cve}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-300 text-[11px]">{v.host}</td>
                  <td className="py-3.5 px-4 font-mono text-slate-400 text-[11px]">{v.scanner}</td>
                  <td className="py-3.5 px-4">
                    <select
                      value={v.status}
                      onChange={e => updateVulnStatus(v.id, e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="False Positive">False Positive</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => navigateTo('vulnerability-details', v.id)}
                      className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
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
