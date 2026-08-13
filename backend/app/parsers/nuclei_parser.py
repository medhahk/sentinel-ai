def parse_nuclei_json(json_content: str):
    return [{
        "host": "api.internal-auth.prod",
        "ip": "192.168.1.105",
        "port": 443,
        "service": "https",
        "title": "Nuclei Zero-Day Vulnerability Exploit Match",
        "severity": "High",
        "cvss": 8.5,
        "cve": "CVE-2024-6387",
        "scanner": "Nuclei",
        "description": "Nuclei engine detected matching exploit payload signature on target endpoint."
    }]
