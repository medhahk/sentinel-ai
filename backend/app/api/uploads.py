from fastapi import APIRouter, UploadFile, File, Form
from app.services.parser_service import parse_scan_report
from app.database.collections import MOCK_SCANS, MOCK_VULNERABILITIES

router = APIRouter(prefix="/api/upload", tags=["Upload Service"])

@router.post("")
async def upload_scan_file(
    file: UploadFile = File(...),
    scanner: str = Form(...),
    target: str = Form("192.168.1.200")
):
    content = await file.read()
    raw_str = content.decode("utf-8", errors="ignore")
    parsed_findings = parse_scan_report(scanner, raw_str)

    new_scan = {
        "id": f"scn-{len(MOCK_SCANS) + 101}",
        "name": file.filename,
        "scanner": scanner,
        "target": target,
        "date": "2026-07-31 20:10",
        "status": "Completed",
        "findingsCount": len(parsed_findings),
        "criticalCount": len([f for f in parsed_findings if f.get("severity") == "Critical"]),
        "highCount": len([f for f in parsed_findings if f.get("severity") == "High"]),
        "medCount": 1,
        "lowCount": 1
    }
    MOCK_SCANS.insert(0, new_scan)

    for item in parsed_findings:
        new_vuln = {
            "id": f"vuln-{len(MOCK_VULNERABILITIES) + 1}",
            "title": item["title"],
            "cve": item.get("cve", "CVE-2024-99812"),
            "severity": item.get("severity", "Critical"),
            "cvss": item.get("cvss", 9.8),
            "cvssVector": "CVSS:3.1/AV:N/AC:L/PR:N/UI:N/S:C/C:H/I:H/A:H",
            "host": item.get("host", target),
            "ip": item.get("ip", "192.168.1.200"),
            "port": item.get("port", 8080),
            "affectedParameter": "Parsed Parameter Endpoint",
            "scanner": scanner,
            "status": "Open",
            "assignedTo": "Alex Mercer",
            "description": item.get("description", "Parsed from upload"),
            "businessImpact": "Potential remote compromise vector.",
            "technicalImpact": "Unauthenticated service exploitation.",
            "owasp": "A03:2021 - Injection",
            "cwe": "CWE-89: Improper Neutralization",
            "mitre": "T1190: Exploit Public-Facing Application",
            "poc": raw_str[:300] if raw_str else "nmap -sV -p 8080 192.168.1.200",
            "evidence": f"Parsed {scanner} output snippet.",
            "remediation": "Restrict endpoint access and update software to latest version.",
            "remediationSnippet": "# Firewall restriction:\nsudo ufw deny 8080/tcp",
            "references": ["https://nvd.nist.gov/"]
        }
        MOCK_VULNERABILITIES.insert(0, new_vuln)

    return {
        "status": "success",
        "scan_id": new_scan["id"],
        "filename": file.filename,
        "parsed_findings": len(parsed_findings)
    }
