from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.impact_story import ImpactStory
from app.models.user import User
from app.schemas.impact_story import ImpactStoryCreate, ImpactStoryUpdate, ImpactStoryResponse
from app.core.security import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[ImpactStoryResponse])
def get_all_impact_stories(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(ImpactStory).order_by(ImpactStory.created_at.desc()).offset(skip).limit(limit).all()


@router.get("/{impact_story_id}", response_model=ImpactStoryResponse)
def get_impact_story(impact_story_id: int, db: Session = Depends(get_db)):
    story = db.query(ImpactStory).filter(ImpactStory.id == impact_story_id).first()
    if not story:
        raise HTTPException(status_code=404, detail="Impact story not found")
    return story


@router.post("/", response_model=ImpactStoryResponse)
def create_impact_story(
    impact_story: ImpactStoryCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_story = ImpactStory(**impact_story.dict())
    db.add(db_story)
    db.commit()
    db.refresh(db_story)
    return db_story


@router.put("/{impact_story_id}", response_model=ImpactStoryResponse)
def update_impact_story(
    impact_story_id: int,
    impact_story: ImpactStoryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_story = db.query(ImpactStory).filter(ImpactStory.id == impact_story_id).first()
    if not db_story:
        raise HTTPException(status_code=404, detail="Impact story not found")

    update_data = impact_story.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_story, key, value)

    db.commit()
    db.refresh(db_story)
    return db_story


@router.delete("/{impact_story_id}")
def delete_impact_story(
    impact_story_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_story = db.query(ImpactStory).filter(ImpactStory.id == impact_story_id).first()
    if not db_story:
        raise HTTPException(status_code=404, detail="Impact story not found")

    db.delete(db_story)
    db.commit()
    return {"message": "Impact story deleted successfully"}
