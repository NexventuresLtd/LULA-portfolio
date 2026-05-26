from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.interest import Interest
from app.models.user import User
from app.schemas.interest import InterestCreate, InterestUpdate, InterestResponse
from app.core.security import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[InterestResponse])
def get_all_interests(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Interest).order_by(Interest.created_at.desc()).offset(skip).limit(limit).all()


@router.post("/", response_model=InterestResponse)
def create_interest(interest: InterestCreate, db: Session = Depends(get_db)):
    db_interest = Interest(
        name=interest.name,
        email=interest.email,
        phone=interest.phone,
        interest_type=interest.type,
        message=interest.message,
        status="new",
    )
    db.add(db_interest)
    db.commit()
    db.refresh(db_interest)
    return db_interest


@router.put("/{interest_id}", response_model=InterestResponse)
def update_interest(
    interest_id: int,
    interest: InterestUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_interest = db.query(Interest).filter(Interest.id == interest_id).first()
    if not db_interest:
        raise HTTPException(status_code=404, detail="Interest not found")

    update_data = interest.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_interest, key, value)

    db.commit()
    db.refresh(db_interest)
    return db_interest


@router.delete("/{interest_id}")
def delete_interest(
    interest_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_interest = db.query(Interest).filter(Interest.id == interest_id).first()
    if not db_interest:
        raise HTTPException(status_code=404, detail="Interest not found")

    db.delete(db_interest)
    db.commit()
    return {"message": "Interest deleted successfully"}
