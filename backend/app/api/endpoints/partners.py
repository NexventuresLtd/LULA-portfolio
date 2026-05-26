from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.partner import Partner
from app.models.user import User
from app.schemas.partner import PartnerCreate, PartnerUpdate, PartnerResponse
from app.core.security import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[PartnerResponse])
def get_all_partners(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    partners = db.query(Partner).offset(skip).limit(limit).all()
    return partners


@router.get("/{partner_id}", response_model=PartnerResponse)
def get_partner(partner_id: int, db: Session = Depends(get_db)):
    partner = db.query(Partner).filter(Partner.id == partner_id).first()
    if not partner:
        raise HTTPException(status_code=404, detail="Partner not found")
    return partner


@router.post("/", response_model=PartnerResponse)
def create_partner(
    partner: PartnerCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_partner = Partner(**partner.dict())
    db.add(db_partner)
    db.commit()
    db.refresh(db_partner)
    return db_partner


@router.put("/{partner_id}", response_model=PartnerResponse)
def update_partner(
    partner_id: int,
    partner: PartnerUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_partner = db.query(Partner).filter(Partner.id == partner_id).first()
    if not db_partner:
        raise HTTPException(status_code=404, detail="Partner not found")

    update_data = partner.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_partner, key, value)

    db.commit()
    db.refresh(db_partner)
    return db_partner


@router.delete("/{partner_id}")
def delete_partner(
    partner_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_partner = db.query(Partner).filter(Partner.id == partner_id).first()
    if not db_partner:
        raise HTTPException(status_code=404, detail="Partner not found")

    db.delete(db_partner)
    db.commit()
    return {"message": "Partner deleted successfully"}
