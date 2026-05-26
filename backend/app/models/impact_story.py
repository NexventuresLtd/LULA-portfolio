from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean
from sqlalchemy.sql import func
from app.db.session import Base


class ImpactStory(Base):
    __tablename__ = "impact_stories"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    quote = Column(Text, nullable=True)
    story = Column(Text, nullable=False)
    person_name = Column(String, nullable=True)
    person_role = Column(String, nullable=True)
    image_url = Column(String, nullable=True)
    featured = Column(Boolean, default=False, nullable=False)
    published = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())
