# Initial Mock / Mongo Unified Store

MOCK_USERS = [
    {"id": "usr-1", "name": "Alex Mercer", "email": "alex.mercer@sentinel.ai", "role": "Security Lead", "plan": "PRO", "company": "Acme Security", "created_at": "2026-07-01"}
]

MOCK_SCANS = [
    {
        "id": "scn-101",
        "name": "Nmap Full Port Perimeter Sweep",
        "scanner": "Nmap XML",
        "target": "192.168.1.0/24",
        "date": "2026-07-30 14:22",
        "status": "Completed",
        "findingsCount": 14,
        "criticalCount": 2,
        "highCount": 4,
        "medCount": 5,
        "lowCount": 3
    }
]

MOCK_ASSETS = [
    {
        "id": "ast-001",
        "hostname": "api.internal-auth.prod",
        "ip": "192.168.1.105",
        "os": "Ubuntu Linux 22.04 LTS",
        "openPorts": [80, 443, 22, 8080],
        "lastScan": "2026-07-28",
        "riskScore": 9.2,
        "status": "Vulnerable",
        "services": [
            {"port": 80, "name": "http", "service": "nginx/1.18.0", "protocol": "tcp"},
            {"port": 8080, "name": "http-proxy", "service": "Node.js Express App", "protocol": "tcp"}
        ],
        "vulnCount": {"critical": 2, "high": 3, "medium": 1, "low": 4}
    }
]

MOCK_VULNERABILITIES = [
    {
        "id": "vuln-001",
        "title": "SQL Injection in Authentication API Endpoint",
        "cve": "CVE-2024-21887",
        "severity": "Critical",
        "cvss": 9.8,
        "cvssVector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:U/C:H/I:H/A:H",
        "host": "api.internal-auth.prod",
        "ip": "192.168.1.105",
        "port": 8080,
        "affectedParameter": "username (POST /api/v1/auth/login)",
        "scanner": "Burp XML",
        "status": "Open",
        "assignedTo": "Alex Mercer",
        "description": "Unsanitized username parameter allows remote unauthenticated database query execution.",
        "businessImpact": "Complete compromise of customer authentication data.",
        "technicalImpact": "Remote arbitrary SQL query execution.",
        "owasp": "A03:2021 - Injection",
        "cwe": "CWE-89: Improper Neutralization of Special Elements",
        "mitre": "T1190: Exploit Public-Facing Application",
        "poc": "POST /api/v1/auth/login {\"username\": \"admin' OR 1=1;--\"}",
        "evidence": "Server returned administrative JWT token upon SQL injection payload.",
        "remediation": "Use parameterized SQL queries.",
        "remediationSnippet": "const query = 'SELECT * FROM users WHERE username = $1';",
        "references": ["https://nvd.nist.gov/vuln/detail/CVE-2024-21887"]
    }
]

MOCK_THREAT_INTEL = [
    {
        "cve": "CVE-2024-6387",
        "title": "regreSSHion: Remote Code Execution in OpenSSH Server",
        "epss": 0.942,
        "epssPercentile": "98th percentile",
        "cvss": 8.1,
        "severity": "High",
        "vendor": "OpenSSH Project",
        "patchStatus": "Patch Available (v9.8p1)",
        "cisaKev": True,
        "publishedDate": "2024-07-01",
        "summary": "Signal handler race condition in sshd allows root RCE on glibc Linux."
    }
]

MOCK_REPORTS = [
    {
        "id": "rep-01",
        "title": "Q3 Enterprise Perimeter VAPT Assessment",
        "date": "2026-07-28",
        "client": "Acme Financial Corp",
        "scanSource": "Nmap & Nessus Consolidated",
        "type": "Executive & Technical",
        "status": "Finalized",
        "author": "Alex Mercer"
    }
]
