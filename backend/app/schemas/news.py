from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class NewsBase(BaseModel):
    title: str
    excerpt: Optional[str] = None
    content: str
    image_url: Optional[str] = None
    author: Optional[str] = None


class NewsCreate(NewsBase):
    slug: str
    published: bool = False


class NewsUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    excerpt: Optional[str] = None
    content: Optional[str] = None
    image_url: Optional[str] = None
    author: Optional[str] = None
    published: Optional[bool] = None


class NewsResponse(NewsBase):
    id: int
    slug: str
    published: bool
    published_at: Optional[datetime] = None
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
