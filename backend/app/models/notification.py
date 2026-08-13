from pydantic import BaseModel

class NotificationResponse(BaseModel):
    id: str
    title: str
    message: str
    timestamp: str
    type: str
