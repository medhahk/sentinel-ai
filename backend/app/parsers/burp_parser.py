def parse_burp_xml(xml_content: str):
    return [{
        "host": "api.internal-auth.prod",
        "ip": "192.168.1.105",
        "port": 8080,
        "service": "http",
        "title": "SQL Injection in Authentication API",
        "severity": "Critical",
        "cvss": 9.8,
        "cve": "CVE-2024-21887",
        "scanner": "Burp XML",
        "description": "Burp Suite Pro DAST scanner identified SQL Injection parameter vulnerability."
    }]
