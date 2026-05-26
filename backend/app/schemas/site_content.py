from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class SiteContentBase(BaseModel):
    mission: str
    vision: str
    story: str


class SiteContentUpdate(BaseModel):
    mission: Optional[str] = None
    vision: Optional[str] = None
    story: Optional[str] = None


class SiteContentResponse(SiteContentBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
