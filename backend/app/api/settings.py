from fastapi import APIRouter
from app.models.settings import SettingsUpdate

router = APIRouter(prefix="/api/settings", tags=["Settings"])

@router.get("")
def get_settings():
    return {
        "api_key": "sn_live_9981248192a84b1",
        "llm_provider": "OpenAI GPT-4o (RAG Enabled)",
        "llm_key": "sk-proj-••••••••••••••••",
        "slack_webhook": "https://hooks.slack.com/services/T00/B00/XXXX"
    }

@router.put("")
def update_settings(update: SettingsUpdate):
    return {"status": "success", "message": "Settings updated"}
