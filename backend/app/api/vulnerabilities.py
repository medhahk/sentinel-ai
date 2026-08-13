from fastapi import APIRouter, HTTPException
from app.database.collections import MOCK_VULNERABILITIES
from app.models.vulnerability import VulnerabilityResponse, VulnerabilityStatusUpdate

router = APIRouter(prefix="/api/vulnerabilities", tags=["Vulnerabilities"])

@router.get("", response_model=list[VulnerabilityResponse])
def get_vulnerabilities():
    return MOCK_VULNERABILITIES

@router.get("/{vuln_id}", response_model=VulnerabilityResponse)
def get_vulnerability_by_id(vuln_id: str):
    vuln = next((v for v in MOCK_VULNERABILITIES if v["id"] == vuln_id), None)
    if not vuln:
        raise HTTPException(status_code=404, detail="Vulnerability not found")
    return vuln

@router.patch("/{vuln_id}/status")
def update_status(vuln_id: str, status_update: VulnerabilityStatusUpdate):
    vuln = next((v for v in MOCK_VULNERABILITIES if v["id"] == vuln_id), None)
    if not vuln:
        raise HTTPException(status_code=404, detail="Vulnerability not found")
    vuln["status"] = status_update.status
    return {"status": "success", "updated_status": status_update.status}
