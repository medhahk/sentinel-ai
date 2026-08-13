import jwt
import datetime
from passlib.context import CryptContext

SECRET_KEY = "sentinel_ai_super_secret_jwt_key_2026"
ALGORITHM = "HS256"

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return pwd_context.verify(plain_password, hashed_password)

def create_jwt_token(email: str, role: str = "Security Analyst", plan: str = "PRO") -> str:
    payload = {
        "sub": email,
        "email": email,
        "role": role,
        "plan": plan,
        "iat": datetime.datetime.utcnow(),
        "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
    }
    return jwt.encode(payload, SECRET_KEY, algorithm=ALGORITHM)

def decode_jwt_token(token: str):
    try:
        return jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except Exception:
        return None
