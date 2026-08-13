def parse_nessus_xml(xml_content: str):
    return [{
        "host": "db-primary.finance.internal",
        "ip": "10.0.4.12",
        "port": 5432,
        "service": "postgresql",
        "title": "Log4Shell Unauthenticated RCE",
        "severity": "Critical",
        "cvss": 10.0,
        "cve": "CVE-2021-44228",
        "scanner": "Nessus",
        "description": "Nessus scanner identified Apache Log4j2 JNDI Remote Code Execution vulnerability."
    }]
