from fastapi import APIRouter
from app.database.collections import MOCK_USERS

router = APIRouter(prefix="/api/admin", tags=["Admin Service"])

@router.get("/users")
def get_admin_users():
    return MOCK_USERS

@router.get("/audit-logs")
def get_audit_logs():
    return [
        {"id": "log-1", "timestamp": "2026-07-31 14:22:10", "user": "alex.mercer@sentinel.ai", "action": "Scan Uploaded", "resource": "Nmap_Sweep_Q3.xml", "ip": "192.168.1.50", "status": "Success"},
        {"id": "log-2", "timestamp": "2026-07-31 13:10:05", "user": "sarah.connor@sentinel.ai", "action": "Vulnerability Status Change", "resource": "CVE-2024-38910 -> Resolved", "ip": "192.168.1.88", "status": "Success"}
    ]

@router.get("/telemetry")
def get_telemetry():
    return {
        "cpu_load_pct": 12.4,
        "memory_mb": 1420,
        "database_status": "Online",
        "parsers_active": "Ready"
    }
