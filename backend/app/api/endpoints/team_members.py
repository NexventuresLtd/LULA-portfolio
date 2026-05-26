from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.team_member import TeamMember
from app.models.user import User
from app.schemas.team_member import TeamMemberCreate, TeamMemberUpdate, TeamMemberResponse
from app.core.security import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[TeamMemberResponse])
def get_all_team_members(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(TeamMember).offset(skip).limit(limit).all()


@router.get("/{team_member_id}", response_model=TeamMemberResponse)
def get_team_member(team_member_id: int, db: Session = Depends(get_db)):
    team_member = db.query(TeamMember).filter(TeamMember.id == team_member_id).first()
    if not team_member:
        raise HTTPException(status_code=404, detail="Team member not found")
    return team_member


@router.post("/", response_model=TeamMemberResponse)
def create_team_member(
    team_member: TeamMemberCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_team_member = TeamMember(**team_member.dict())
    db.add(db_team_member)
    db.commit()
    db.refresh(db_team_member)
    return db_team_member


@router.put("/{team_member_id}", response_model=TeamMemberResponse)
def update_team_member(
    team_member_id: int,
    team_member: TeamMemberUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_team_member = db.query(TeamMember).filter(TeamMember.id == team_member_id).first()
    if not db_team_member:
        raise HTTPException(status_code=404, detail="Team member not found")

    update_data = team_member.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_team_member, key, value)

    db.commit()
    db.refresh(db_team_member)
    return db_team_member


@router.delete("/{team_member_id}")
def delete_team_member(
    team_member_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_team_member = db.query(TeamMember).filter(TeamMember.id == team_member_id).first()
    if not db_team_member:
        raise HTTPException(status_code=404, detail="Team member not found")

    db.delete(db_team_member)
    db.commit()
    return {"message": "Team member deleted successfully"}
