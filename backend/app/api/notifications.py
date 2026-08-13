from fastapi import APIRouter

router = APIRouter(prefix="/api/notifications", tags=["Notifications"])

@router.get("")
def get_notifications():
    return [
        {"id": "n-1", "title": "Critical Finding Detected", "message": "SQLi on api.internal-auth.prod", "timestamp": "10 mins ago", "type": "critical"},
        {"id": "n-2", "title": "Threat Intel Sync", "message": "EPSS Database updated with 142 new zero-day metrics", "timestamp": "1 hour ago", "type": "info"}
    ]
