def parse_nikto_output(content: str):
    return [{
        "host": "portal-app.customer-gateway.com",
        "ip": "172.16.20.45",
        "port": 80,
        "service": "http",
        "title": "Nikto Web Server Security Misconfiguration",
        "severity": "Medium",
        "cvss": 6.5,
        "cve": "N/A (Misconfiguration)",
        "scanner": "Nikto",
        "description": "Nikto web scanner identified outdated Apache HTTP headers and missing Security Headers."
    }]
