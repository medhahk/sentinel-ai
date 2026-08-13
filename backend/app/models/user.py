from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class UserBase(BaseModel):
    name: str
    email: str
    company: Optional[str] = "Acme Security"
    role: Optional[str] = "Security Analyst"
    plan: Optional[str] = "PRO"

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: str
    password: str

class UserResponse(UserBase):
    id: str
    created_at: str
    token: Optional[str] = None
