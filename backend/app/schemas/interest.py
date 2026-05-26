from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class InterestBase(BaseModel):
    name: str
    email: str
    phone: Optional[str] = None
    type: str
    message: str


class InterestCreate(InterestBase):
    pass


class InterestUpdate(BaseModel):
    status: Optional[str] = None
    type: Optional[str] = None
    message: Optional[str] = None
    phone: Optional[str] = None


class InterestResponse(InterestBase):
    id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
