from pydantic import BaseModel
from typing import Optional

class ReportCreate(BaseModel):
    title: str
    type: str
    client: str
    scanSource: Optional[str] = "Consolidated Scans"

class ReportResponse(BaseModel):
    id: str
    title: str
    date: str
    client: str
    scanSource: str
    type: str
    status: str
    author: str
