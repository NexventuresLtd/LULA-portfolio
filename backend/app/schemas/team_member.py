from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TeamMemberBase(BaseModel):
    name: str
    role: str
    bio: str
    image: str
    email: str
    location: Optional[str] = None
    linkedin: Optional[str] = None
    type: str = "staff"


class TeamMemberCreate(TeamMemberBase):
    pass


class TeamMemberUpdate(BaseModel):
    name: Optional[str] = None
    role: Optional[str] = None
    bio: Optional[str] = None
    image: Optional[str] = None
    email: Optional[str] = None
    location: Optional[str] = None
    linkedin: Optional[str] = None
    type: Optional[str] = None


class TeamMemberResponse(TeamMemberBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True
