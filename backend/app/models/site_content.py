from sqlalchemy import Column, Integer, Text, DateTime
from sqlalchemy.sql import func
from app.db.session import Base


class SiteContent(Base):
    __tablename__ = "site_content"

    id = Column(Integer, primary_key=True, index=True)
    mission = Column(Text, nullable=False)
    vision = Column(Text, nullable=False)
    story = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
