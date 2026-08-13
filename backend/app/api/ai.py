from fastapi import APIRouter
from app.models.chat import ChatRequest, ChatResponse
from app.ai.llm import query_sentinel_llm
import datetime

router = APIRouter(prefix="/api/chat", tags=["AI Copilot"])

@router.post("", response_model=ChatResponse)
def ask_ai(req: ChatRequest):
    ans = query_sentinel_llm(req.message, req.context or "ALL_SCANS")
    return {
        "id": f"msg-{datetime.datetime.now().timestamp()}",
        "sender": "assistant",
        "text": ans,
        "timestamp": datetime.datetime.now().strftime("%H:%M")
    }
