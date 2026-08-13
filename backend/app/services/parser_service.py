from app.parsers.nmap_parser import parse_nmap_xml
from app.parsers.nessus_parser import parse_nessus_xml
from app.parsers.burp_parser import parse_burp_xml
from app.parsers.nuclei_parser import parse_nuclei_json
from app.parsers.nikto_parser import parse_nikto_output

def parse_scan_report(scanner_type: str, raw_content: str):
    scanner = scanner_type.upper()
    if "NMAP" in scanner:
        return parse_nmap_xml(raw_content)
    elif "NESSUS" in scanner:
        return parse_nessus_xml(raw_content)
    elif "BURP" in scanner:
        return parse_burp_xml(raw_content)
    elif "NUCLEI" in scanner:
        return parse_nuclei_json(raw_content)
    elif "NIKTO" in scanner:
        return parse_nikto_output(raw_content)
    else:
        return parse_nmap_xml(raw_content)
