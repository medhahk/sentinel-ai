from fastapi import APIRouter, HTTPException
from app.database.collections import MOCK_ASSETS
from app.models.asset import AssetResponse

router = APIRouter(prefix="/api/assets", tags=["Assets"])

@router.get("", response_model=list[AssetResponse])
def get_assets():
    return MOCK_ASSETS

@router.get("/{asset_id}", response_model=AssetResponse)
def get_asset_by_id(asset_id: str):
    asset = next((a for a in MOCK_ASSETS if a["id"] == asset_id), None)
    if not asset:
        raise HTTPException(status_code=404, detail="Asset not found")
    return asset
