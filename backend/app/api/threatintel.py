from fastapi import APIRouter
from app.database.collections import MOCK_THREAT_INTEL

router = APIRouter(prefix="/api/threat-intel", tags=["Threat Intelligence"])

@router.get("")
def get_threat_intel():
    return MOCK_THREAT_INTEL
