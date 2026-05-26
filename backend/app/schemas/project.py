from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProjectBase(BaseModel):
    title: str
    description: Optional[str] = None
    content: str
    image_url: Optional[str] = None
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: str = "ongoing"
    featured: bool = False


class ProjectCreate(ProjectBase):
    slug: str
    published: bool = False


class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    location: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    status: Optional[str] = None
    featured: Optional[bool] = None
    published: Optional[bool] = None


class ProjectResponse(ProjectBase):
    id: int
    slug: str
    published: bool
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
