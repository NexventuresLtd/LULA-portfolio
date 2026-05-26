from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime
from app.models.enquiry import EnquiryStatus


class EnquiryBase(BaseModel):
    name: str
    email: EmailStr
    phone: Optional[str] = None
    subject: str
    message: str


class EnquiryCreate(EnquiryBase):
    pass


class EnquiryUpdate(BaseModel):
    status: Optional[EnquiryStatus] = None


class EnquiryResponse(EnquiryBase):
    id: int
    status: EnquiryStatus
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
