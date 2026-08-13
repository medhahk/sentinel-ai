import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { UploadCloud, Folder, HardDrive, Cloud, Server, FileText, CheckCircle2, X, Search } from 'lucide-react';

export const CloudImportModal = ({ isOpen, onClose }) => {
  const { uploadScanFile, addToast } = useApp();
  const [activeSource, setActiveSource] = useState('LOCAL'); // LOCAL | DRIVE | DROPBOX | S3
  const [scannerType, setScannerType] = useState('Nmap XML');
  const [targetHost, setTargetHost] = useState('192.168.1.200');
  const [fileName, setFileName] = useState('');
  const [fileContent, setFileContent] = useState('');
  const [cloudPath, setCloudPath] = useState('My Drive / Security Scans / nmap_perimeter_2026.xml');

  if (!isOpen) return null;

  // Local File Reader Handler
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        setFileContent(event.target.result);
        addToast(`Read file "${file.name}" (${(file.size / 1024).toFixed(1)} KB)`, 'info');
      };
      reader.readAsText(file);
    }
  };

  const handleImport = (e) => {
    e.preventDefault();
    const finalName = fileName || (activeSource === 'DRIVE' ? 'gdrive_nmap_scan.xml' : activeSource === 'DROPBOX' ? 'dropbox_nessus_audit.nessus' : 'cloud_s3_scan.xml');
    uploadScanFile(finalName, scannerType, targetHost, fileContent || `<scan_report scanner="${scannerType}"/>`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-xl glass-panel border border-cyan-500/40 shadow-2xl rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <UploadCloud className="w-5 h-5 text-cyan-400" />
            <div>
              <h3 className="font-bold text-slate-100 text-sm">Import Vulnerability Assessment Scan</h3>
              <p className="text-[11px] text-slate-400">Supported sources: Local File, Google Drive, Dropbox, AWS S3</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-md text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Source Switcher Tabs */}
        <div className="grid grid-cols-4 gap-2 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono text-center">
          <button
            onClick={() => setActiveSource('LOCAL')}
            className={`py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors ${activeSource === 'LOCAL' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Folder className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Local Browse</span>
          </button>
          <button
            onClick={() => setActiveSource('DRIVE')}
            className={`py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors ${activeSource === 'DRIVE' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Cloud className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Google Drive</span>
          </button>
          <button
            onClick={() => setActiveSource('DROPBOX')}
            className={`py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors ${activeSource === 'DROPBOX' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <HardDrive className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Dropbox</span>
          </button>
          <button
            onClick={() => setActiveSource('S3')}
            className={`py-2 rounded-lg flex items-center justify-center space-x-1 transition-colors ${activeSource === 'S3' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-200'}`}
          >
            <Server className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">AWS S3</span>
          </button>
        </div>

        <form onSubmit={handleImport} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">SCANNER ENGINE</label>
              <select
                value={scannerType}
                onChange={e => setScannerType(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-mono"
              >
                <option value="Nmap XML">Nmap XML (.xml)</option>
                <option value="Nessus">Nessus (.nessus)</option>
                <option value="Burp XML">Burp Suite Pro (.xml)</option>
                <option value="Nikto">Nikto Web Scanner (.json / .xml)</option>
                <option value="Nuclei">Nuclei Scanner (.json)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono text-slate-400 mb-1">TARGET HOST / IP</label>
              <input
                type="text"
                value={targetHost}
                onChange={e => setTargetHost(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* TAB 1: LOCAL FILE BROWSE */}
          {activeSource === 'LOCAL' && (
            <div className="space-y-2">
              <label className="block text-xs font-mono text-slate-400">SELECT LOCAL SCAN FILE</label>
              <div className="p-6 rounded-xl bg-slate-950 border-2 border-dashed border-slate-800 hover:border-cyan-500 text-center transition-colors">
                <input
                  type="file"
                  id="local-file-input"
                  accept=".xml,.json,.nessus,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="local-file-input" className="cursor-pointer">
                  <Folder className="w-8 h-8 mx-auto text-cyan-400 mb-2" />
                  <span className="text-xs font-bold text-slate-200 block">Click to Browse Local Files</span>
                  <span className="text-[10px] text-slate-500 font-mono block mt-1">
                    {fileName ? `Selected: ${fileName}` : 'Supports .xml, .json, .nessus files'}
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* TAB 2: GOOGLE DRIVE */}
          {activeSource === 'DRIVE' && (
            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-400">GOOGLE DRIVE FILE PICKER</label>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                  <Cloud className="w-4 h-4 text-cyan-400" />
                  <span className="font-bold">Google Drive / Security Reports Vault</span>
                </div>
                <select
                  value={cloudPath}
                  onChange={e => setCloudPath(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200"
                >
                  <option value="nmap_perimeter_2026.xml">Drive / Scans / nmap_perimeter_2026.xml (Nmap)</option>
                  <option value="nessus_prod_audit.nessus">Drive / Infrastructure / nessus_prod_audit.nessus (Nessus)</option>
                  <option value="nuclei_cve_zero_day.json">Drive / ZeroDay / nuclei_cve_zero_day.json (Nuclei)</option>
                </select>
                <span className="text-[10px] text-emerald-400 font-mono block">Google Drive OAuth Authenticated</span>
              </div>
            </div>
          )}

          {/* TAB 3: DROPBOX */}
          {activeSource === 'DROPBOX' && (
            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-400">DROPBOX CLOUD FILE SELECTOR</label>
              <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                <div className="flex items-center space-x-2 text-xs text-slate-300 font-mono">
                  <HardDrive className="w-4 h-4 text-blue-400" />
                  <span className="font-bold">Dropbox / VAPT Reports Sync</span>
                </div>
                <select
                  value={cloudPath}
                  onChange={e => setCloudPath(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-xs font-mono text-slate-200"
                >
                  <option value="burp_dast_app_scan.xml">Dropbox / BurpSuite / burp_dast_app_scan.xml (Burp XML)</option>
                  <option value="nikto_web_check.json">Dropbox / WebScans / nikto_web_check.json (Nikto)</option>
                </select>
                <span className="text-[10px] text-blue-400 font-mono block">Dropbox Sync Token Active</span>
              </div>
            </div>
          )}

          {/* TAB 4: AWS S3 */}
          {activeSource === 'S3' && (
            <div className="space-y-3">
              <label className="block text-xs font-mono text-slate-400">AWS S3 BUCKET URI / SCAN URL</label>
              <input
                type="text"
                defaultValue="s3://sentinel-scans-bucket-prod/2026/nmap_scan_output.xml"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-cyan-400 font-mono"
              />
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-slate-900 text-xs font-semibold text-slate-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs shadow-lg flex items-center space-x-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Import & Parse Scan Data</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
