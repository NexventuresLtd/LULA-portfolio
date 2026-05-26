from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.enquiry import Enquiry
from app.models.user import User
from app.schemas.enquiry import EnquiryCreate, EnquiryUpdate, EnquiryResponse
from app.core.security import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[EnquiryResponse])
def get_all_enquiries(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    enquiries = db.query(Enquiry).offset(skip).limit(limit).all()
    return enquiries


@router.get("/{enquiry_id}", response_model=EnquiryResponse)
def get_enquiry(
    enquiry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")
    return enquiry


@router.post("/", response_model=EnquiryResponse)
def create_enquiry(enquiry: EnquiryCreate, db: Session = Depends(get_db)):
    db_enquiry = Enquiry(**enquiry.dict())
    db.add(db_enquiry)
    db.commit()
    db.refresh(db_enquiry)
    return db_enquiry


@router.put("/{enquiry_id}", response_model=EnquiryResponse)
def update_enquiry(
    enquiry_id: int,
    enquiry: EnquiryUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not db_enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")

    update_data = enquiry.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_enquiry, key, value)

    db.commit()
    db.refresh(db_enquiry)
    return db_enquiry


@router.delete("/{enquiry_id}")
def delete_enquiry(
    enquiry_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_enquiry = db.query(Enquiry).filter(Enquiry.id == enquiry_id).first()
    if not db_enquiry:
        raise HTTPException(status_code=404, detail="Enquiry not found")

    db.delete(db_enquiry)
    db.commit()
    return {"message": "Enquiry deleted successfully"}
