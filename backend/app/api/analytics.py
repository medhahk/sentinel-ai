from fastapi import APIRouter
from app.database.collections import MOCK_ASSETS, MOCK_VULNERABILITIES, MOCK_SCANS

router = APIRouter(prefix="/api/analytics", tags=["Analytics Service"])

@router.get("")
def get_analytics_metrics():
    critical = len([v for v in MOCK_VULNERABILITIES if v["severity"] == "Critical"])
    high = len([v for v in MOCK_VULNERABILITIES if v["severity"] == "High"])
    med = len([v for v in MOCK_VULNERABILITIES if v["severity"] == "Medium"])
    low = len([v for v in MOCK_VULNERABILITIES if v["severity"] == "Low"])

    return {
        "severity_distribution": {
            "critical": critical,
            "high": high,
            "medium": med,
            "low": low
        },
        "mttr_days": 4.2,
        "patch_compliance_pct": 92.0,
        "total_assets": len(MOCK_ASSETS),
        "total_scans": len(MOCK_SCANS),
        "total_vulnerabilities": len(MOCK_VULNERABILITIES)
    }
