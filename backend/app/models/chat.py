from pydantic import BaseModel
from typing import Optional

class ChatRequest(BaseModel):
    message: str
    context: Optional[str] = "ALL_SCANS"

class ChatResponse(BaseModel):
    id: str
    sender: str
    text: str
    timestamp: str
