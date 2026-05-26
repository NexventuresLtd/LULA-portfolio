from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class ProgramBase(BaseModel):
    title: str
    description: str
    icon: Optional[str] = None
    image_url: Optional[str] = None
    is_active: bool = True


class ProgramCreate(ProgramBase):
    pass


class ProgramUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    icon: Optional[str] = None
    image_url: Optional[str] = None
    is_active: Optional[bool] = None


class ProgramResponse(ProgramBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
