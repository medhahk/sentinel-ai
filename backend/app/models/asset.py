from pydantic import BaseModel
from typing import List, Optional, Dict

class ServiceItem(BaseModel):
    port: int
    name: str
    service: str
    protocol: str

class AssetResponse(BaseModel):
    id: str
    hostname: str
    ip: str
    os: str
    openPorts: List[int]
    lastScan: str
    riskScore: float
    status: str
    services: List[ServiceItem]
    vulnCount: Dict[str, int]
