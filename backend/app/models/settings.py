from pydantic import BaseModel
from typing import Optional

class SettingsUpdate(BaseModel):
    api_key: Optional[str] = None
    llm_provider: Optional[str] = None
    llm_key: Optional[str] = None
    slack_webhook: Optional[str] = None
