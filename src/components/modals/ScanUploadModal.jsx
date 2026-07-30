import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_NMAP_XML } from '../../data/mockData';
import { UploadCloud, X, FileCode, CheckCircle2, ShieldAlert } from 'lucide-react';

export const ScanUploadModal = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, uploadScanFile } = useApp();
  const [scannerType, setScannerType] = useState('Nmap XML');
  const [targetHost, setTargetHost] = useState('192.168.1.200');
  const [fileName, setFileName] = useState('nmap_perimeter_scan.xml');
  const [rawText, setRawText] = useState(SAMPLE_NMAP_XML);
  const [isDragging, setIsDragging] = useState(false);

  if (!isUploadModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    uploadScanFile(fileName, scannerType, targetHost, rawText);
    setIsUploadModalOpen(false);
  };

  const loadSample = (type) => {
    if (type === 'Nmap') {
      setScannerType('Nmap XML');
      setFileName('nmap_live_sample.xml');
      setTargetHost('192.168.1.200');
      setRawText(SAMPLE_NMAP_XML);
    } else if (type === 'Nessus') {
      setScannerType('Nessus');
      setFileName('nessus_prod_audit.nessus');
      setTargetHost('10.0.4.12');
      setRawText(`<nessusClientData_v2><Report name="Production Infra Scan"><ReportHost name="10.0.4.12"><ReportItem port="5432" pluginName="Log4Shell RCE CVE-2021-44228" severity="4"/></ReportHost></Report></nessusClientData_v2>`);
    } else if (type === 'Nuclei') {
      setScannerType('Nuclei');
      setFileName('nuclei_cve_results.json');
      setTargetHost('api.internal-auth.prod');
      setRawText(`{"template-id":"CVE-2024-21887","info":{"name":"SQL Injection Authentication Bypass","severity":"critical"},"matched-at":"http://api.internal-auth.prod:8080/api/v1/auth/login"}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div
        className="w-full max-w-xl glass-panel border border-cyan-500/40 shadow-2xl overflow-hidden rounded-2xl p-6"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Upload Vulnerability Assessment Scan</h3>
              <p className="text-[11px] text-slate-400">Supported: Nmap XML, Nessus, Burp XML, Nikto, Nuclei</p>
            </div>
          </div>
          <button
            onClick={() => setIsUploadModalOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-slate-200 hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Preset Sample Quick Buttons */}
        <div className="my-4 p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/40">
          <p className="text-[11px] font-mono text-cyan-400 font-semibold mb-2">QUICK TEST: LOAD SAMPLE SCAN DATA</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadSample('Nmap')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-300 transition-colors"
            >
              Load Sample Nmap XML
            </button>
            <button
              type="button"
              onClick={() => loadSample('Nessus')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-300 transition-colors"
            >
              Load Sample Nessus
            </button>
            <button
              type="button"
              onClick={() => loadSample('Nuclei')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-300 transition-colors"
            >
              Load Sample Nuclei JSON
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">SCANNER ENGINE</label>
              <select
                value={scannerType}
                onChange={e => setScannerType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="Nmap XML">Nmap XML (.xml)</option>
                <option value="Nessus">Nessus (.nessus)</option>
                <option value="Burp XML">Burp Suite Pro (.xml)</option>
                <option value="Nikto">Nikto Web Scanner (.json / .xml)</option>
                <option value="Nuclei">Nuclei Vulnerability Scanner (.json)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">TARGET HOST / SUBNET</label>
              <input
                type="text"
                value={targetHost}
                onChange={e => setTargetHost(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
                placeholder="192.168.1.1 or domain.com"
              />
            </div>
          </div>

          {/* Drag & Drop Area */}
          <div
            onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={e => {
              e.preventDefault();
              setIsDragging(false);
              if (e.dataTransfer.files.length > 0) {
                setFileName(e.dataTransfer.files[0].name);
              }
            }}
            className={`border-2 border-dashed rounded-xl p-6 text-center transition-colors ${
              isDragging ? 'border-cyan-400 bg-cyan-950/40' : 'border-slate-800 bg-slate-900/40 hover:border-slate-700'
            }`}
          >
            <UploadCloud className="w-8 h-8 mx-auto text-cyan-400 mb-2 animate-bounce" />
            <p className="text-xs font-semibold text-slate-200">Drag & drop scan file here or click to browse</p>
            <p className="text-[10px] text-slate-500 mt-1 font-mono">{fileName}</p>
          </div>

          {/* Raw Content Preview */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">RAW REPORT XML/JSON CONTENT</label>
            <textarea
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-[11px] font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>

          {/* Submit */}
          <div className="flex justify-end space-x-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs text-slate-400 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Parse & Add Scan Data</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
