from fastapi import APIRouter
from app.database.collections import MOCK_SCANS
from app.models.scan import ScanCreate, ScanResponse
from app.services.parser_service import parse_scan_report

router = APIRouter(prefix="/api/scans", tags=["Scans"])

@router.get("", response_model=list[ScanResponse])
def get_all_scans():
    return MOCK_SCANS

@router.post("", response_model=ScanResponse)
def create_scan(scan: ScanCreate):
    new_scan = {
        "id": f"scn-{len(MOCK_SCANS) + 101}",
        "name": scan.name,
        "scanner": scan.scanner,
        "target": scan.target,
        "date": "2026-07-31 20:00",
        "status": "Completed",
        "findingsCount": 5,
        "criticalCount": 1,
        "highCount": 2,
        "medCount": 1,
        "lowCount": 1
    }
    MOCK_SCANS.insert(0, new_scan)
    return new_scan
