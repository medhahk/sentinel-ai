from pydantic import BaseModel
from typing import Optional, List

class ScanCreate(BaseModel):
    name: str
    scanner: str
    target: str
    raw_content: Optional[str] = None

class ScanResponse(BaseModel):
    id: str
    name: str
    scanner: str
    target: str
    date: str
    status: str
    findingsCount: int
    criticalCount: int
    highCount: int
    medCount: int
    lowCount: int
