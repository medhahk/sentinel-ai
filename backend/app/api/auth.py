from fastapi import APIRouter, HTTPException
from app.models.user import UserCreate, UserLogin, UserResponse
from app.services.authentication import create_jwt_token, hash_password
from app.database.collections import MOCK_USERS

router = APIRouter(prefix="/api/auth", tags=["Auth"])

@router.post("/register", response_model=UserResponse)
def register_user(user: UserCreate):
    new_user = {
        "id": f"usr-{len(MOCK_USERS) + 1}",
        "name": user.name,
        "email": user.email,
        "role": user.role or "Security Analyst",
        "company": user.company or "Acme Security",
        "plan": user.plan or "PRO",
        "created_at": "2026-07-31"
    }
    MOCK_USERS.append(new_user)
    token = create_jwt_token(user.email, new_user["role"], new_user["plan"])
    new_user["token"] = token
    return new_user

@router.post("/login", response_model=UserResponse)
def login_user(creds: UserLogin):
    user = next((u for u in MOCK_USERS if u["email"] == creds.email), None)
    if not user:
        user = {
            "id": "usr-99",
            "name": creds.email.split("@")[0].replace(".", " ").title(),
            "email": creds.email,
            "role": "Security Analyst",
            "company": "Acme Corp",
            "plan": "PRO",
            "created_at": "2026-07-31"
        }
        MOCK_USERS.append(user)
    
    token = create_jwt_token(user["email"], user["role"], user.get("plan", "PRO"))
    res = dict(user)
    res["token"] = token
    return res

@router.get("/profile")
def get_profile():
    return MOCK_USERS[0]
