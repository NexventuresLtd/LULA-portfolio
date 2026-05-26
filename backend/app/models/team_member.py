from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class TeamMember(Base):
    __tablename__ = "team_members"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    role = Column(String, nullable=False)
    bio = Column(Text, nullable=False)
    image = Column(String, nullable=False)
    email = Column(String, nullable=False)
    location = Column(String, nullable=True)
    linkedin = Column(String, nullable=True)
    type = Column(String, nullable=False, default="staff")
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
