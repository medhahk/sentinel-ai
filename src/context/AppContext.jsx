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
  
  const [userRole, setUserRole] = useState('Security Analyst');
  const [userName, setUserName] = useState('Alex Mercer');
  const [userEmail, setUserEmail] = useState('alex.mercer@sentinel.ai');
  const [themeMode, setThemeMode] = useState('cyber-dark');
  
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [toasts, setToasts] = useState([]);

  // Toast notification trigger
  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  // Keyboard shortcut listener for Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandPaletteOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Action: Navigate to route
  const navigateTo = (route, paramId = null) => {
    if (route === 'asset-details' && paramId) {
      setSelectedAssetId(paramId);
    }
    if (route === 'vulnerability-details' && paramId) {
      setSelectedVulnId(paramId);
    }
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Action: Update vulnerability status
  const updateVulnStatus = (vulnId, newStatus) => {
    setVulnerabilities(prev => prev.map(v => v.id === vulnId ? { ...v, status: newStatus } : v));
    addToast(`Vulnerability ${vulnId} status updated to ${newStatus}`, 'success');
  };

  // Action: Add new scan via parser
  const uploadScanFile = (fileName, scannerType, targetHost, rawContent) => {
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

    // Generate dynamic finding into vulnerabilities
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
      description: `Automated analysis of ${scannerType} scan detected unauthorized remote execution vectors on ${targetHost}.`,
      businessImpact: 'High likelihood of remote system compromise and sensitive metric exposure.',
      technicalImpact: 'Unauthenticated network remote payload execution.',
      owasp: 'A05:2021 - Security Misconfiguration',
      cwe: 'CWE-20: Improper Input Validation',
      mitre: 'T1190: Exploit Public-Facing Application',
      poc: rawContent ? rawContent.slice(0, 250) + '\n...' : 'nmap -sV -p 8080 192.168.1.200',
      evidence: `Parsed ${scannerType} XML result output stream showing open port 8080 Jenkins service.`,
      remediation: 'Restrict access to administrative endpoints and update Jenkins container to latest LTS version.',
      remediationSnippet: `# Firewall rule fix:\nsudo ufw deny 8080/tcp`,
      references: ['https://cve.mitre.org']
    };

    setVulnerabilities(prev => [newVuln, ...prev]);

    // Check if host exists in assets, if not create asset
    const hostExists = assets.some(a => a.ip === '192.168.1.200' || a.hostname === targetHost);
    if (!hostExists) {
      const newAsset = {
        id: `ast-${Date.now().toString().slice(-3)}`,
        hostname: targetHost || 'staging-server.internal.net',
        ip: '192.168.1.200',
        os: 'Linux Ubuntu 22.04',
        openPorts: [80, 443, 22, 8080],
        lastScan: new Date().toISOString().slice(0, 10),
        riskScore: 8.8,
        status: 'Vulnerable',
        services: [
          { port: 8080, name: 'http-proxy', service: 'Jenkins Server 2.319', protocol: 'tcp' },
          { port: 22, name: 'ssh', service: 'OpenSSH 8.2p1', protocol: 'tcp' }
        ],
        vulnCount: { critical: 1, high: 2, medium: 1, low: 1 }
      };
      setAssets(prev => [newAsset, ...prev]);
    }

    addToast(`Successfully parsed ${fileName}! Added new vulnerabilities & assets.`, 'success');
  };

  // Action: Add AI Chat message
  const sendAiMessage = (userText) => {
    const userMsg = { id: Date.now(), sender: 'user', text: userText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setAiChat(prev => [...prev, userMsg]);

    setTimeout(() => {
      let botResponse = '';
      const lower = userText.toLowerCase();

      if (lower.includes('cve-2024-12345') || lower.includes('explain cve')) {
        botResponse = `### Analysis of CVE-2024-12345\n\n**Severity**: Critical (CVSS 9.8)\n**Vulnerability Type**: Remote Code Execution (RCE) via Unauthenticated Deserialization\n\n#### Overview:\nThis CVE allows remote unauthenticated actors to pass serialized Java payloads over HTTP headers, resulting in root level execution on target servers.\n\n#### Remediation Steps:\n1. Update target middleware to version 4.2.1+\n2. Enable WAF rule \`WAF-RCE-9921\`\n3. Restrict incoming traffic on port 8080 to internal bastion IPs.`;
      } else if (lower.includes('sql injection') || lower.includes('sqli')) {
        botResponse = `### SQL Injection (SQLi) Deep Dive\n\n**Why it is dangerous:**\nSQL Injection allows attackers to bypass authentication, extract entire databases (PII, passwords, payment info), and in database engines like MSSQL or PostgreSQL (\`xp_cmdshell\` / \`COPY FROM PROGRAM\`), execute OS commands.\n\n**Recommended Fix:**\nAlways use **Parameterized Queries** or **Prepared Statements**.\n\`\`\`javascript\n// Safe Code Example\nconst user = await db.query('SELECT * FROM users WHERE id = $1', [userId]);\n\`\`\`;`;
      } else if (lower.includes('executive summary') || lower.includes('summary')) {
        botResponse = `### Executive Security Summary (Generated by SentinelAI)\n\nDuring the Q3 VAPT assessment, **${assets.length} Assets** and **${scans.length} Scans** were evaluated.\n\n- **Critical Findings**: ${vulnerabilities.filter(v => v.severity === 'Critical').length}\n- **High Findings**: ${vulnerabilities.filter(v => v.severity === 'High').length}\n- **Overall Security Score**: 76 / 100\n\n**Key Recommendation**: Prioritize immediate patching for SQL Injection (\`api.internal-auth.prod\`) and Log4j2 (\`db-primary.finance.internal\`).`;
      } else {
        botResponse = `### SentinelAI Security Advice\n\nBased on your security query: "*${userText}*"\n\n1. **Risk Context**: Correlated against ${vulnerabilities.length} active vulnerabilities in your inventory.\n2. **Best Practice**: Follow NIST SP 800-53 and OWASP Top 10 guidelines.\n3. **Action Item**: Review target asset configuration and verify patch validation in the Scans tab.`;
      }

      const botMsg = { id: Date.now() + 1, sender: 'assistant', text: botResponse, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
      setAiChat(prev => [...prev, botMsg]);
    }, 1000);
  };

  // Action: Generate new Report
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
    addToast(`Generated report "${newRep.title}" successfully!`, 'success');
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
      auditLogs,
      userRole,
      setUserRole,
      userName,
      userEmail,
      themeMode,
      setThemeMode,
      isCommandPaletteOpen,
      setIsCommandPaletteOpen,
      isUploadModalOpen,
      setIsUploadModalOpen,
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
