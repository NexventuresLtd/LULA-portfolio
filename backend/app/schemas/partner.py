from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class PartnerBase(BaseModel):
    name: str
    logo_url: Optional[str] = None
    description: Optional[str] = None
    website_url: Optional[str] = None
    category: Optional[str] = None


class PartnerCreate(PartnerBase):
    is_active: bool = True


class PartnerUpdate(BaseModel):
    name: Optional[str] = None
    logo_url: Optional[str] = None
    description: Optional[str] = None
    website_url: Optional[str] = None
    category: Optional[str] = None
    is_active: Optional[bool] = None


class PartnerResponse(PartnerBase):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
