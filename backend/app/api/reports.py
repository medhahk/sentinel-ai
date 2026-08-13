from fastapi import APIRouter
from app.database.collections import MOCK_REPORTS
from app.models.report import ReportCreate, ReportResponse

router = APIRouter(prefix="/api/report", tags=["Report Generator"])

@router.get("", response_model=list[ReportResponse])
def get_reports():
    return MOCK_REPORTS

@router.post("/generate", response_model=ReportResponse)
def generate_report(req: ReportCreate):
    new_rep = {
        "id": f"rep-0{len(MOCK_REPORTS) + 1}",
        "title": req.title,
        "date": "2026-07-31",
        "client": req.client,
        "scanSource": req.scanSource or "Selected Scans",
        "type": req.type,
        "status": "Finalized",
        "author": "Alex Mercer"
    }
    MOCK_REPORTS.insert(0, new_rep)
    return new_rep
