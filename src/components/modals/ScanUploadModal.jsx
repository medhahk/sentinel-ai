import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { SAMPLE_NMAP_XML } from '../../data/mockData';
import { UploadCloud, X, Folder, Cloud, HardDrive, Server, CheckCircle2, FileText } from 'lucide-react';

export const ScanUploadModal = () => {
  const { isUploadModalOpen, setIsUploadModalOpen, uploadScanFile, addToast } = useApp();
  const [activeTab, setActiveTab] = useState('LOCAL'); // LOCAL | DRIVE | DROPBOX | S3
  const [scannerType, setScannerType] = useState('Nmap XML');
  const [targetHost, setTargetHost] = useState('192.168.1.200');
  const [fileName, setFileName] = useState('nmap_perimeter_scan.xml');
  const [rawText, setRawText] = useState(SAMPLE_NMAP_XML);
  const [drivePath, setDrivePath] = useState('Drive / Scans / nmap_perimeter_scan.xml');

  if (!isUploadModalOpen) return null;

  // Local File Reader
  const handleLocalFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setRawText(event.target.result);
        addToast(`Loaded local file "${file.name}"`, 'success');
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameToUse = fileName || (activeTab === 'DRIVE' ? 'gdrive_scan.xml' : activeTab === 'DROPBOX' ? 'dropbox_scan.nessus' : 's3_bucket_scan.xml');
    uploadScanFile(nameToUse, scannerType, targetHost, rawText);
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
      <div className="w-full max-w-xl glass-panel border border-cyan-500/40 shadow-2xl overflow-hidden rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
              <UploadCloud className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Upload Vulnerability Assessment Scan</h3>
              <p className="text-[11px] text-slate-400">Browse Local Files, Google Drive, Dropbox, or AWS S3</p>
            </div>
          </div>
          <button onClick={() => setIsUploadModalOpen(false)} className="p-1 rounded-md text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Source Tabs */}
        <div className="grid grid-cols-4 gap-1 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-center">
          <button
            onClick={() => setActiveTab('LOCAL')}
            className={`py-1.5 rounded-lg flex items-center justify-center space-x-1 ${activeTab === 'LOCAL' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span>Local Browse</span>
          </button>
          <button
            onClick={() => setActiveTab('DRIVE')}
            className={`py-1.5 rounded-lg flex items-center justify-center space-x-1 ${activeTab === 'DRIVE' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span>Google Drive</span>
          </button>
          <button
            onClick={() => setActiveTab('DROPBOX')}
            className={`py-1.5 rounded-lg flex items-center justify-center space-x-1 ${activeTab === 'DROPBOX' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span>Dropbox</span>
          </button>
          <button
            onClick={() => setActiveTab('S3')}
            className={`py-1.5 rounded-lg flex items-center justify-center space-x-1 ${activeTab === 'S3' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>AWS S3</span>
          </button>
        </div>

        {/* Preset Sample Quick Buttons */}
        <div className="p-3 rounded-xl bg-cyan-950/30 border border-cyan-900/40">
          <p className="text-[10px] font-mono text-cyan-400 font-semibold mb-2">QUICK TEST: LOAD SAMPLE SCAN DATA</p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => loadSample('Nmap')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-300"
            >
              Sample Nmap XML
            </button>
            <button
              type="button"
              onClick={() => loadSample('Nessus')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-300"
            >
              Sample Nessus
            </button>
            <button
              type="button"
              onClick={() => loadSample('Nuclei')}
              className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 hover:border-cyan-400 text-xs text-slate-300"
            >
              Sample Nuclei JSON
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
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              >
                <option value="Nmap XML">Nmap XML (.xml)</option>
                <option value="Nessus">Nessus (.nessus)</option>
                <option value="Burp XML">Burp Suite Pro (.xml)</option>
                <option value="Nikto">Nikto Web Scanner (.json / .xml)</option>
                <option value="Nuclei">Nuclei Scanner (.json)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">TARGET HOST / SUBNET</label>
              <input
                type="text"
                value={targetHost}
                onChange={e => setTargetHost(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* TAB CONTENT: LOCAL BROWSE */}
          {activeTab === 'LOCAL' && (
            <div className="p-5 rounded-xl bg-slate-950 border-2 border-dashed border-slate-800 hover:border-cyan-500 text-center transition-colors">
              <input
                type="file"
                id="modal-file-browse"
                accept=".xml,.json,.nessus,.txt"
                onChange={handleLocalFileChange}
                className="hidden"
              />
              <label htmlFor="modal-file-browse" className="cursor-pointer">
                <Folder className="w-7 h-7 mx-auto text-cyan-400 mb-1" />
                <span className="text-xs font-bold text-slate-200 block">Click to Browse & Select File</span>
                <span className="text-[10px] text-slate-500 font-mono block mt-1">
                  {fileName ? `File Selected: ${fileName}` : 'Supports .xml, .json, .nessus file formats'}
                </span>
              </label>
            </div>
          )}

          {/* TAB CONTENT: GOOGLE DRIVE */}
          {activeTab === 'DRIVE' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-cyan-400">
                <Cloud className="w-4 h-4" />
                <span className="font-bold">Google Drive Storage Picker</span>
              </div>
              <select
                value={drivePath}
                onChange={e => setDrivePath(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200"
              >
                <option value="Drive / Scans / nmap_perimeter_scan.xml">Drive / Scans / nmap_perimeter_scan.xml</option>
                <option value="Drive / Audit / nessus_prod_audit.nessus">Drive / Audit / nessus_prod_audit.nessus</option>
                <option value="Drive / DAST / burp_suite_app_scan.xml">Drive / DAST / burp_suite_app_scan.xml</option>
              </select>
            </div>
          )}

          {/* TAB CONTENT: DROPBOX */}
          {activeTab === 'DROPBOX' && (
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-xs font-mono text-blue-400">
                <HardDrive className="w-4 h-4" />
                <span className="font-bold">Dropbox File Sync</span>
              </div>
              <select className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200">
                <option>Dropbox / Pentests / nuclei_cve_results.json</option>
                <option>Dropbox / Pentests / nikto_report.json</option>
              </select>
            </div>
          )}

          {/* TAB CONTENT: AWS S3 */}
          {activeTab === 'S3' && (
            <div className="space-y-1">
              <label className="block text-[10px] font-mono text-slate-400">AWS S3 BUCKET OBJECT URL</label>
              <input
                type="text"
                defaultValue="s3://vapt-reports-bucket/2026/nmap_scan_full.xml"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-cyan-400 font-mono"
              />
            </div>
          )}

          {/* Raw Text View */}
          <div>
            <label className="block text-xs font-mono text-slate-400 mb-1">RAW SCAN DATA PREVIEW</label>
            <textarea
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              rows={3}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-[10px] font-mono text-slate-300 focus:outline-none focus:border-cyan-500"
            ></textarea>
          </div>

          <div className="flex justify-end space-x-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={() => setIsUploadModalOpen(false)}
              className="px-4 py-2 rounded-lg bg-slate-900 text-xs font-semibold text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Parse & Ingest Scan Data</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
