import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_ASSETS,
  INITIAL_SCANS,
  INITIAL_VULNERABILITIES,
  INITIAL_THREAT_INTEL,
  INITIAL_REPORTS,
  INITIAL_AI_CHAT,
  INITIAL_AUDIT_LOGS
} from '../data/mockData';
import { generateSignedJwt } from '../services/jwtAuthService';
import { apiClient } from '../services/apiClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState('landing');
  const [selectedAssetId, setSelectedAssetId] = useState('ast-001');
  const [selectedVulnId, setSelectedVulnId] = useState('vuln-001');
  
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [scans, setScans] = useState(INITIAL_SCANS);
  const [vulnerabilities, setVulnerabilities] = useState(INITIAL_VULNERABILITIES);
  const [threatIntel, setThreatIntel] = useState(INITIAL_THREAT_INTEL);
  const [reports, setReports] = useState(INITIAL_REPORTS);
  const [aiChat, setAiChat] = useState(INITIAL_AI_CHAT);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);
  
  // User & JWT State
  const [userRole, setUserRole] = useState('Security Analyst');
  const [userName, setUserName] = useState('Alex Mercer');
  const [userEmail, setUserEmail] = useState('alex.mercer@sentinel.ai');
  const [userPlan, setUserPlan] = useState('PRO');
  const [jwtToken, setJwtToken] = useState(() => generateSignedJwt({ email: 'alex.mercer@sentinel.ai', role: 'Security Analyst', plan: 'PRO' }));

  // Billing & Invoices
  const [invoices, setInvoices] = useState([
    { id: 'INV-2026-001', date: '2026-07-01', amount: '$49.00', plan: 'Pro PenTester', status: 'Paid' }
  ]);

  // Modals
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isJwtModalOpen, setIsJwtModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Fetch initial data from FastAPI backend when app loads
  useEffect(() => {
    const loadBackendData = async () => {
      try {
        const backendScans = await apiClient.getScans();
        if (backendScans && backendScans.length > 0) setScans(backendScans);

        const backendAssets = await apiClient.getAssets();
        if (backendAssets && backendAssets.length > 0) setAssets(backendAssets);

        const backendVulns = await apiClient.getVulnerabilities();
        if (backendVulns && backendVulns.length > 0) setVulnerabilities(backendVulns);

        const backendThreats = await apiClient.getThreatIntel();
        if (backendThreats && backendThreats.length > 0) setThreatIntel(backendThreats);
        
        console.log("Full Stack connection established, data loaded from FastAPI.");
      } catch (e) {
        console.warn("Could not fetch from FastAPI, using fallback mock data.", e);
      }
    };
    loadBackendData();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 'u') {
        e.preventDefault();
        setIsUploadModalOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navigateTo = (route, paramId = null) => {
    if (route === 'asset-details' && paramId) setSelectedAssetId(paramId);
    if (route === 'vulnerability-details' && paramId) setSelectedVulnId(paramId);
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const updateVulnStatus = async (vulnId, newStatus) => {
    // Optimistic UI Update
    setVulnerabilities(prev => prev.map(v => v.id === vulnId ? { ...v, status: newStatus } : v));
    
    // API Call
    const res = await apiClient.updateVulnStatus(vulnId, newStatus);
    if (res) {
      addToast(`Vulnerability ${vulnId} status updated to ${newStatus}`, 'success');
    } else {
      addToast(`Fallback UI mode: Vulnerability ${vulnId} updated locally.`, 'success');
    }
  };

  const upgradeUserPlan = (newPlan, amount) => {
    setUserPlan(newPlan);
    const newToken = generateSignedJwt({ email: userEmail, role: userRole, plan: newPlan });
    setJwtToken(newToken);
    setInvoices(prev => [
      {
        id: `INV-2026-00${prev.length + 1}`,
        date: new Date().toISOString().slice(0, 10),
        amount: `$${amount}.00`,
        plan: `${newPlan} Subscription`,
        status: 'Paid'
      },
      ...prev
    ]);
  };

  const uploadScanFile = async (fileName, scannerType, targetHost, rawContent) => {
    addToast(`Uploading ${scannerType} scan to backend engine...`, 'info');
    
    // Create File object for API
    const blob = new Blob([rawContent], { type: 'text/plain' });
    const file = new File([blob], fileName || 'scan.xml', { type: 'text/plain' });
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('scanner', scannerType);
    
    // API Call
    const res = await apiClient.uploadScan(formData);
    
    if (res && res.scan_id) {
      addToast(`Successfully parsed via FastAPI! ${res.findings} new findings.`, 'success');
      // Refresh scans & vulnerabilities from backend
      const updatedScans = await apiClient.getScans();
      if (updatedScans) setScans(updatedScans);
      
      const updatedVulns = await apiClient.getVulnerabilities();
      if (updatedVulns) setVulnerabilities(updatedVulns);
    } else {
      // Fallback local addition if backend offline
      const scanId = `scn-${Date.now().toString().slice(-4)}`;
      const newScan = {
        id: scanId,
        name: fileName || `Uploaded ${scannerType} Scan`,
        scanner: scannerType,
        target: targetHost || '192.168.1.200',
        date: new Date().toISOString().replace('T', ' ').slice(0, 16),
        status: 'Completed',
        findingsCount: 5,
        criticalCount: 1,
        highCount: 2,
        medCount: 1,
        lowCount: 1
      };
      setScans(prev => [newScan, ...prev]);

      const newVuln = {
        id: `vuln-${Date.now().toString().slice(-3)}`,
        title: `Parsed Finding from ${scannerType} (${fileName || 'Scan'})`,
        cve: 'CVE-2024-99812',
        severity: 'Critical',
        cvss: 9.6,
        cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
        host: targetHost || 'staging-server.internal.net',
        ip: '192.168.1.200',
        port: 8080,
        affectedParameter: 'Unauthenticated API endpoint',
        scanner: scannerType,
        status: 'Open',
        assignedTo: userName,
        description: `Automated analysis of ${scannerType} scan detected unauthorized execution vectors on ${targetHost}.`,
        businessImpact: 'High likelihood of remote system compromise and sensitive metric exposure.',
        technicalImpact: 'Unauthenticated network remote payload execution.',
        owasp: 'A05:2021 - Security Misconfiguration',
        cwe: 'CWE-20: Improper Input Validation',
        mitre: 'T1190: Exploit Public-Facing Application',
        poc: rawContent ? rawContent.slice(0, 250) + '\n...' : 'nmap -sV -p 8080 192.168.1.200',
        evidence: `Parsed ${scannerType} XML output stream showing open port 8080 Jenkins service.`,
        remediation: 'Restrict access to administrative endpoints and update Jenkins container to latest LTS version.',
        remediationSnippet: `# Firewall rule fix:\nsudo ufw deny 8080/tcp`,
        references: ['https://cve.mitre.org']
      };
      setVulnerabilities(prev => [newVuln, ...prev]);
      addToast(`Fallback local parse applied for ${fileName}.`, 'success');
    }
  };

  const sendAiMessage = async (userText) => {
    const userMsg = { id: Date.now(), sender: 'user', text: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAiChat(prev => [...prev, userMsg]);

    // Fast API RAG Call
    const res = await apiClient.sendChatMessage(userText, 'ALL_SCANS');
    
    if (res && res.response) {
       const botMsg = { id: Date.now() + 1, sender: 'assistant', text: res.response, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
       setAiChat(prev => [...prev, botMsg]);
    } else {
      // Fallback mock responses
      setTimeout(() => {
        let botResponse = '';
        const lower = userText.toLowerCase();

        if (lower.includes('cve-2024-21887') || lower.includes('explain cve')) {
          botResponse = `### Analysis of CVE-2024-21887\n\n**Severity**: Critical (CVSS 9.8)\n**Vulnerability Type**: SQL Injection via Unsanitized Parameters\n\n#### Overview:\nThis CVE allows remote unauthenticated actors to execute arbitrary database queries against \`api.internal-auth.prod\`.\n\n#### Python PoC Exploit Script:\n\`\`\`python\nimport requests\nurl = "http://192.168.1.105:8080/api/v1/auth/login"\npayload = {"username": "admin' OR 1=1;--", "password": "x"}\nres = requests.post(url, json=payload)\nprint("[+] Auth Bypass Result:", res.json())\n\`\`\`\n\n#### Secure Developer Fix:\n\`\`\`javascript\n// Use Parameterized Queries\nconst query = 'SELECT * FROM users WHERE username = $1 AND password = $2';\nawait db.query(query, [req.body.username, req.body.password]);\n\`\`\``;
        } else if (lower.includes('executive summary') || lower.includes('summary')) {
          botResponse = `### Executive Security Summary (SentinelAI RAG)\n\nDuring the latest security evaluation across **${assets.length} Target Assets**:\n- **Critical Findings**: ${vulnerabilities.filter(v => v.severity === 'Critical').length}\n- **High Findings**: ${vulnerabilities.filter(v => v.severity === 'High').length}\n- **Mean Time To Fix (MTTR)**: 4.2 Days\n\n**Immediate Action**: Patch SQL Injection on \`api.internal-auth.prod\` and Log4j2 on \`db-primary.finance.internal\`.`;
        } else {
          botResponse = `### SentinelAI Security Analysis\n\nBased on your security prompt: "*${userText}*"\n\n- **Context**: Correlated against ${vulnerabilities.length} active vulnerabilities in vector database.\n- **OWASP Alignment**: A03:2021-Injection | CWE-89\n- **Hardening Step**: Restrict incoming traffic on port 8080 and enforce TLS 1.3 encryption.`;
        }

        const botMsg = { id: Date.now() + 1, sender: 'assistant', text: botResponse, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
        setAiChat(prev => [...prev, botMsg]);
      }, 1000);
    }
  };

  const generateReport = (reportConfig) => {
    const newRep = {
      id: `rep-${Date.now().toString().slice(-4)}`,
      title: reportConfig.title || `${reportConfig.type} Report`,
      date: new Date().toISOString().slice(0, 10),
      client: reportConfig.client || 'Internal Security Audit',
      scanSource: reportConfig.scanSource || 'Selected Scans',
      type: reportConfig.type,
      status: 'Finalized',
      author: userName
    };
    setReports(prev => [newRep, ...prev]);
    addToast(`Generated report "${newRep.title}"!`, 'success');
  };

  return (
    <AppContext.Provider value={{
      currentRoute,
      navigateTo,
      selectedAssetId,
      setSelectedAssetId,
      selectedVulnId,
      setSelectedVulnId,
      assets,
      scans,
      vulnerabilities,
      threatIntel,
      reports,
      aiChat,
      setAiChat,
      auditLogs,
      userRole,
      setUserRole,
      userName,
      userEmail,
      userPlan,
      jwtToken,
      invoices,
      upgradeUserPlan,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      isUploadModalOpen,
      setIsUploadModalOpen,
      isJwtModalOpen,
      setIsJwtModalOpen,
      isPaymentModalOpen,
      setIsPaymentModalOpen,
      toasts,
      addToast,
      updateVulnStatus,
      uploadScanFile,
      sendAiMessage,
      generateReport
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
