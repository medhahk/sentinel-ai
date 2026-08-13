from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import API Routers
from app.api.auth import router as auth_router
from app.api.scans import router as scans_router
from app.api.assets import router as assets_router
from app.api.vulnerabilities import router as vulns_router
from app.api.ai import router as ai_router
from app.api.uploads import router as uploads_router
from app.api.reports import router as reports_router
from app.api.analytics import router as analytics_router
from app.api.threatintel import router as threatintel_router
from app.api.notifications import router as notifications_router
from app.api.settings import router as settings_router
from app.api.admin import router as admin_router

app = FastAPI(
    title="SentinelAI VAPT Backend API",
    description="Automated Vulnerability Assessment & RAG Security Intelligence API Engine",
    version="2.4.0"
)

# CORS Configuration for React Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include Routers
app.include_router(auth_router)
app.include_router(scans_router)
app.include_router(assets_router)
app.include_router(vulns_router)
app.include_router(ai_router)
app.include_router(uploads_router)
app.include_router(reports_router)
app.include_router(analytics_router)
app.include_router(threatintel_router)
app.include_router(notifications_router)
app.include_router(settings_router)
app.include_router(admin_router)

@app.get("/")
def root():
    return {
        "platform": "SentinelAI VAPT Management Engine",
        "status": "Online",
        "version": "2.4.0",
        "docs_url": "/docs"
    }

@app.get("/api/dashboard")
def get_dashboard_summary():
    return {
        "security_score": 76,
        "total_assets": 5,
        "total_scans": 5,
        "critical_vulnerabilities": 2,
        "high_vulnerabilities": 3,
        "avg_cvss": 8.3
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
