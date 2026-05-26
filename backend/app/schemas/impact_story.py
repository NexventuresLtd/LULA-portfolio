from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ImpactStoryBase(BaseModel):
    title: str
    quote: Optional[str] = None
    story: str
    person_name: Optional[str] = None
    person_role: Optional[str] = None
    image_url: Optional[str] = None
    featured: bool = False
    published: bool = False


class ImpactStoryCreate(ImpactStoryBase):
    pass


class ImpactStoryUpdate(BaseModel):
    title: Optional[str] = None
    quote: Optional[str] = None
    story: Optional[str] = None
    person_name: Optional[str] = None
    person_role: Optional[str] = None
    image_url: Optional[str] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None


class ImpactStoryResponse(ImpactStoryBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
