import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { FileSpreadsheet, Download, Printer, Shield, CheckCircle2, FileText, Sparkles } from 'lucide-react';

export const ReportGeneratorPage = () => {
  const { assets, vulnerabilities, scans, generateReport, addToast } = useApp();
  
  const [reportType, setReportType] = useState('Executive Summary');
  const [clientName, setClientName] = useState('Acme Financial Corp');
  const [reportTitle, setReportTitle] = useState('Q3 Enterprise PenTest & Vulnerability Assessment Report');
  const [includeAiSummary, setIncludeAiSummary] = useState(true);
  const [includePoc, setIncludePoc] = useState(true);

  const handleGenerate = (format) => {
    generateReport({
      title: reportTitle,
      type: reportType,
      client: clientName,
      scanSource: 'Consolidated Scans'
    });
    if (format === 'PDF') {
      window.print();
    } else {
      addToast(`Downloaded ${reportType} as ${format} report!`, 'success');
    }
  };

  const criticalCount = vulnerabilities.filter(v => v.severity === 'Critical').length;
  const highCount = vulnerabilities.filter(v => v.severity === 'High').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl glass-panel">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 font-mono text-xs font-semibold mb-1">
            <FileSpreadsheet className="w-4 h-4" />
            <span>REPORT GENERATION ENGINE</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">Professional PenTest Report Generator</h1>
          <p className="text-xs text-slate-400 mt-1">
            Build executive summaries, technical audit reports, and compliance documentation.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleGenerate('HTML')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs font-mono text-slate-200 transition-all flex items-center space-x-1.5"
          >
            <Download className="w-3.5 h-3.5 text-cyan-400" />
            <span>Export HTML</span>
          </button>
          <button
            onClick={() => handleGenerate('PDF')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-1.5 transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Print / Save PDF</span>
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left Column: Form Configuration */}
        <div className="p-5 rounded-2xl glass-panel space-y-4">
          <h3 className="font-bold text-slate-200 text-sm border-b border-slate-800 pb-2">Report Configuration</h3>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">REPORT TYPE</label>
            <select
              value={reportType}
              onChange={e => setReportType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
            >
              <option value="Executive Summary">Executive Summary</option>
              <option value="Technical PenTest Report">Technical PenTest Report</option>
              <option value="Management Overview">Management Overview</option>
              <option value="Compliance Report (PCI-DSS)">Compliance Report (PCI-DSS / ISO 27001)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">REPORT TITLE</label>
            <input
              type="text"
              value={reportTitle}
              onChange={e => setReportTitle(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">CLIENT / TARGET ORGANIZATION</label>
            <input
              type="text"
              value={clientName}
              onChange={e => setClientName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includeAiSummary}
                onChange={e => setIncludeAiSummary(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-cyan-500"
              />
              <span>Include AI Executive Synthesis</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={includePoc}
                onChange={e => setIncludePoc(e.target.checked)}
                className="rounded border-slate-800 bg-slate-900 text-cyan-500"
              />
              <span>Include Technical PoC Payloads</span>
            </label>
          </div>
        </div>

        {/* Right 2 Columns: Live Document Preview */}
        <div className="lg:col-span-2 p-8 rounded-2xl bg-white text-slate-900 shadow-2xl font-sans text-xs space-y-6 printable-area">
          {/* Document Header */}
          <div className="flex items-center justify-between border-b-2 border-slate-900 pb-4">
            <div>
              <div className="flex items-center space-x-2 text-cyan-700 font-extrabold text-lg">
                <Shield className="w-6 h-6" />
                <span>SENTINEL AI PLATFORM</span>
              </div>
              <p className="text-[10px] text-slate-500 font-mono tracking-wider">CONFIDENTIAL PENETRATION TESTING REPORT</p>
            </div>
            <div className="text-right font-mono text-[10px] text-slate-600">
              <p className="font-bold">{new Date().toISOString().slice(0, 10)}</p>
              <p>Prepared for: {clientName}</p>
            </div>
          </div>

          {/* Title */}
          <div className="text-center py-4 bg-slate-50 rounded-xl border border-slate-200">
            <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">{reportTitle}</h2>
            <p className="text-xs text-slate-600 font-mono mt-1">Scope: {assets.length} Target Assets | {scans.length} Scans</p>
          </div>

          {/* Executive Summary */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300 pb-1">1. Executive Summary</h3>
            <p className="text-slate-700 leading-relaxed text-xs">
              SentinelAI performed an automated vulnerability assessment and penetration test engagement for <strong>{clientName}</strong>.
              A total of <strong>{vulnerabilities.length} vulnerabilities</strong> were identified across {assets.length} host environments.
              Immediate remediation focus is required for {criticalCount} Critical vulnerabilities.
            </p>
          </div>

          {/* Risk Metrics Table */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300 pb-1">2. Risk Severity Summary</h3>
            <div className="grid grid-cols-4 gap-3 text-center font-mono">
              <div className="p-3 rounded bg-red-100 text-red-800 border border-red-300">
                <span className="block text-xl font-bold">{criticalCount}</span>
                <span className="text-[10px]">CRITICAL</span>
              </div>
              <div className="p-3 rounded bg-orange-100 text-orange-800 border border-orange-300">
                <span className="block text-xl font-bold">{highCount}</span>
                <span className="text-[10px]">HIGH</span>
              </div>
              <div className="p-3 rounded bg-yellow-100 text-yellow-800 border border-yellow-300">
                <span className="block text-xl font-bold">{vulnerabilities.filter(v=>v.severity==='Medium').length}</span>
                <span className="text-[10px]">MEDIUM</span>
              </div>
              <div className="p-3 rounded bg-blue-100 text-blue-800 border border-blue-300">
                <span className="block text-xl font-bold">{vulnerabilities.filter(v=>v.severity==='Low').length}</span>
                <span className="text-[10px]">LOW</span>
              </div>
            </div>
          </div>

          {/* Key Findings List */}
          <div className="space-y-2">
            <h3 className="font-bold text-slate-900 text-sm border-b border-slate-300 pb-1">3. Detailed Critical Findings</h3>
            <div className="space-y-3">
              {vulnerabilities.map((v, i) => (
                <div key={v.id} className="p-3 rounded border border-slate-300 bg-slate-50 space-y-1 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span>3.{i+1} {v.title}</span>
                    <span className="font-mono text-red-700">{v.severity} (CVSS {v.cvss})</span>
                  </div>
                  <p className="text-[11px] text-slate-600 font-mono">Host: {v.host} | CVE: {v.cve}</p>
                  <p className="text-[11px] text-slate-800 mt-1">{v.description}</p>
                  {includePoc && v.poc && (
                    <pre className="p-2 rounded bg-slate-900 text-cyan-300 font-mono text-[10px] overflow-x-auto mt-2">
                      {v.poc}
                    </pre>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Signoff */}
          <div className="pt-6 border-t border-slate-300 flex items-center justify-between text-[11px] text-slate-500 font-mono">
            <span>Prepared by: Alex Mercer (Lead PenTester)</span>
            <span>SentinelAI Automated Report Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
