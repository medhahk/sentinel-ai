import React from 'react';
import { useApp } from '../context/AppContext';
import { SeverityDonut } from '../components/charts/SeverityDonut';
import { VulnerabilityTrendLine } from '../components/charts/VulnerabilityTrendLine';
import { MttrGauge } from '../components/charts/MttrGauge';
import { OsDistributionPie } from '../components/charts/OsDistributionPie';
import { BarChart3, Activity, PieChart, ShieldCheck } from 'lucide-react';

export const SecurityAnalyticsPage = () => {
  const { vulnerabilities, assets, scans } = useApp();

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>SECURITY METRICS & ANALYTICS</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">VAPT Analytics & Telemetry</h1>
          <p className="text-xs text-slate-400 mt-1">
            In-depth historical reporting on MTTR, asset OS distribution, scan frequencies, and risk trends.
          </p>
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl glass-panel text-center">
          <span className="block text-3xl font-extrabold font-mono text-cyan-400">4.2 Days</span>
          <span className="text-xs text-slate-400">Mean Time To Remediate (MTTR)</span>
        </div>
        <div className="p-4 rounded-xl glass-panel text-center">
          <span className="block text-3xl font-extrabold font-mono text-emerald-400">92%</span>
          <span className="text-xs text-slate-400">Patch Compliance Rate</span>
        </div>
        <div className="p-4 rounded-xl glass-panel text-center">
          <span className="block text-3xl font-extrabold font-mono text-purple-400">{scans.length * 4}</span>
          <span className="text-xs text-slate-400">Monthly Port Scans</span>
        </div>
        <div className="p-4 rounded-xl glass-panel text-center">
          <span className="block text-3xl font-extrabold font-mono text-orange-400">0.02%</span>
          <span className="text-xs text-slate-400">False Positive Rate</span>
        </div>
      </div>

      {/* Grid of Visual Analytics */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* MTTR Gauge */}
        <div className="p-5 rounded-2xl glass-panel">
          <h3 className="font-bold text-slate-200 text-sm mb-4 border-b border-slate-800 pb-2">Remediation Velocity (MTTR)</h3>
          <MttrGauge days={4.2} />
        </div>

        {/* OS Distribution */}
        <div className="p-5 rounded-2xl glass-panel">
          <h3 className="font-bold text-slate-200 text-sm mb-4 border-b border-slate-800 pb-2">Assets by Operating System</h3>
          <OsDistributionPie />
        </div>

        {/* Scanner Engine Usage */}
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-2">Scanner Usage Breakdown</h3>
          <div className="space-y-3 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Nmap Network Scanner</span>
                <span className="text-cyan-400">40%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-cyan-400 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Nessus Professional</span>
                <span className="text-blue-400">30%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-blue-400 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Burp Suite DAST</span>
                <span className="text-purple-400">20%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-purple-400 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Nuclei & Nikto</span>
                <span className="text-emerald-400">10%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '10%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Vulnerability Discovery Trend */}
      <div className="p-5 rounded-2xl glass-panel">
        <h3 className="font-bold text-slate-200 text-sm mb-4 border-b border-slate-800 pb-2">Overall Vulnerability Lifecycle Trend</h3>
        <VulnerabilityTrendLine />
      </div>
    </div>
  );
};
