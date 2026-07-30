import React from 'react';
import { useApp } from '../context/AppContext';
import { SeverityDonut } from '../components/charts/SeverityDonut';
import { VulnerabilityTrendLine } from '../components/charts/VulnerabilityTrendLine';
import { HostVulnerabilityBar } from '../components/charts/HostVulnerabilityBar';
import {
  Server,
  Radar,
  Bug,
  ShieldCheck,
  TrendingUp,
  Activity,
  ArrowUpRight,
  ExternalLink,
  ChevronRight,
  Sparkles
} from 'lucide-react';

export const DashboardPage = () => {
  const { assets, scans, vulnerabilities, navigateTo, updateVulnStatus } = useApp();

  const criticalCount = vulnerabilities.filter(v => v.severity === 'Critical').length;
  const highCount = vulnerabilities.filter(v => v.severity === 'High').length;
  const medCount = vulnerabilities.filter(v => v.severity === 'Medium').length;
  const lowCount = vulnerabilities.filter(v => v.severity === 'Low').length;

  const totalCvss = vulnerabilities.reduce((acc, v) => acc + (v.cvss || 0), 0);
  const avgCvss = (totalCvss / (vulnerabilities.length || 1)).toFixed(1);
  const healthScore = Math.max(10, Math.round(100 - (criticalCount * 12 + highCount * 5 + medCount * 2)));

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl glass-panel bg-gradient-to-r from-cyan-950/40 via-slate-900 to-blue-950/40 border border-cyan-500/30">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>EXECUTIVE VAPT OVERVIEW</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100 tracking-tight">
            Security Posture & Findings Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time vulnerability metrics, scanner telemetry, and AI prioritized risk scores.
          </p>
        </div>

        <div className="flex items-center space-x-4">
          <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-center">
            <span className="block text-2xl font-extrabold font-mono text-cyan-400">{healthScore}/100</span>
            <span className="text-[10px] text-slate-400 font-mono">SECURITY SCORE</span>
          </div>
          <button
            onClick={() => navigateTo('ai-assistant')}
            className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5 transition-all"
          >
            <span>Ask AI Copilot</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Assets */}
        <div
          onClick={() => navigateTo('assets')}
          className="p-4 rounded-xl glass-panel glass-panel-interactive cursor-pointer border border-slate-800"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono">TOTAL ASSETS</span>
            <Server className="w-4 h-4 text-cyan-400" />
          </div>
          <span className="text-2xl font-extrabold font-mono text-slate-100">{assets.length}</span>
          <span className="block text-[10px] text-emerald-400 font-mono mt-1">100% Scanned & Monitored</span>
        </div>

        {/* Total Scans */}
        <div
          onClick={() => navigateTo('scans')}
          className="p-4 rounded-xl glass-panel glass-panel-interactive cursor-pointer border border-slate-800"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono">TOTAL SCANS</span>
            <Radar className="w-4 h-4 text-blue-400" />
          </div>
          <span className="text-2xl font-extrabold font-mono text-slate-100">{scans.length}</span>
          <span className="block text-[10px] text-cyan-400 font-mono mt-1">+3 scans parsed today</span>
        </div>

        {/* Critical & High */}
        <div
          onClick={() => navigateTo('vulnerabilities')}
          className="p-4 rounded-xl glass-panel glass-panel-interactive cursor-pointer border border-red-900/40 bg-red-950/10"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono text-red-400">CRITICAL / HIGH</span>
            <Bug className="w-4 h-4 text-red-400" />
          </div>
          <div className="flex items-baseline space-x-2 font-mono">
            <span className="text-2xl font-extrabold text-red-400">{criticalCount}</span>
            <span className="text-slate-400 text-xs">Crit</span>
            <span className="text-xl font-bold text-orange-400">{highCount}</span>
            <span className="text-slate-400 text-xs">High</span>
          </div>
          <span className="block text-[10px] text-red-300/80 font-mono mt-1">Immediate action needed</span>
        </div>

        {/* Average CVSS */}
        <div
          onClick={() => navigateTo('vulnerabilities')}
          className="p-4 rounded-xl glass-panel glass-panel-interactive cursor-pointer border border-slate-800"
        >
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-xs font-mono">AVERAGE CVSS</span>
            <Activity className="w-4 h-4 text-purple-400" />
          </div>
          <span className="text-2xl font-extrabold font-mono text-slate-100">{avgCvss}</span>
          <span className="block text-[10px] text-slate-400 font-mono mt-1">CVSS 3.1 Severity Vector</span>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Severity Donut */}
        <div className="p-5 rounded-2xl glass-panel">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <h3 className="font-bold text-slate-200 text-sm">Severity Distribution</h3>
            <span className="text-[10px] font-mono text-cyan-400">CVSS SCALE</span>
          </div>
          <SeverityDonut critical={criticalCount} high={highCount} medium={medCount} low={lowCount} />
        </div>

        {/* Vulnerabilities Over Time */}
        <div className="p-5 rounded-2xl glass-panel">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <h3 className="font-bold text-slate-200 text-sm">Vulnerability Discovery Trend</h3>
            <span className="text-[10px] font-mono text-slate-400">30-DAY</span>
          </div>
          <VulnerabilityTrendLine />
        </div>

        {/* Top Vulnerable Hosts */}
        <div className="p-5 rounded-2xl glass-panel">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
            <h3 className="font-bold text-slate-200 text-sm">Top Vulnerable Hosts</h3>
            <button onClick={() => navigateTo('assets')} className="text-[10px] font-mono text-cyan-400 hover:underline">
              VIEW ALL
            </button>
          </div>
          <HostVulnerabilityBar assets={assets} />
        </div>
      </div>

      {/* Recent Findings Table */}
      <div className="p-5 rounded-2xl glass-panel space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <h3 className="font-bold text-slate-100 text-sm">Recent Discovered Findings</h3>
            <p className="text-[11px] text-slate-400">Master vulnerability findings across all targets</p>
          </div>
          <button
            onClick={() => navigateTo('vulnerabilities')}
            className="text-xs font-mono text-cyan-400 hover:underline flex items-center space-x-1"
          >
            <span>Master Vuln DB ({vulnerabilities.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 font-mono text-slate-400 text-[10px] uppercase tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Title & CVE</th>
                <th className="py-2.5 px-3">Host / Port</th>
                <th className="py-2.5 px-3">Scanner</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Assigned Analyst</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium text-slate-300">
              {vulnerabilities.slice(0, 5).map(vuln => (
                <tr key={vuln.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        vuln.severity === 'Critical'
                          ? 'badge-critical'
                          : vuln.severity === 'High'
                          ? 'badge-high'
                          : vuln.severity === 'Medium'
                          ? 'badge-medium'
                          : 'badge-low'
                      }`}
                    >
                      {vuln.severity} ({vuln.cvss})
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <button
                      onClick={() => navigateTo('vulnerability-details', vuln.id)}
                      className="font-bold text-slate-100 hover:text-cyan-400 text-left block truncate max-w-xs"
                    >
                      {vuln.title}
                    </button>
                    <span className="font-mono text-[10px] text-cyan-400">{vuln.cve}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-[11px]">
                    <div>{vuln.host}</div>
                    <div className="text-slate-500">Port {vuln.port}</div>
                  </td>
                  <td className="py-3 px-3 text-slate-400 font-mono text-[11px]">{vuln.scanner}</td>
                  <td className="py-3 px-3">
                    <select
                      value={vuln.status}
                      onChange={e => updateVulnStatus(vuln.id, e.target.value)}
                      className="bg-slate-900 border border-slate-800 rounded px-2 py-1 text-[11px] font-mono text-slate-200 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                      <option value="False Positive">False Positive</option>
                    </select>
                  </td>
                  <td className="py-3 px-3 text-slate-400 text-[11px]">{vuln.assignedTo}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => navigateTo('vulnerability-details', vuln.id)}
                      className="px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-700 text-cyan-400 text-[11px] font-mono"
                    >
                      Inspect
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
