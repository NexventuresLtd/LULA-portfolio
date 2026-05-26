from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.program import Program
from app.models.user import User
from app.schemas.program import ProgramCreate, ProgramUpdate, ProgramResponse
from app.core.security import get_current_active_user

router = APIRouter()


@router.get("/", response_model=List[ProgramResponse])
def get_all_programs(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    return db.query(Program).offset(skip).limit(limit).all()


@router.get("/{program_id}", response_model=ProgramResponse)
def get_program(program_id: int, db: Session = Depends(get_db)):
    program = db.query(Program).filter(Program.id == program_id).first()
    if not program:
        raise HTTPException(status_code=404, detail="Program not found")
    return program


@router.post("/", response_model=ProgramResponse)
def create_program(
    program: ProgramCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_program = Program(**program.dict())
    db.add(db_program)
    db.commit()
    db.refresh(db_program)
    return db_program


@router.put("/{program_id}", response_model=ProgramResponse)
def update_program(
    program_id: int,
    program: ProgramUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_program = db.query(Program).filter(Program.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")

    update_data = program.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(db_program, key, value)

    db.commit()
    db.refresh(db_program)
    return db_program


@router.delete("/{program_id}")
def delete_program(
    program_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    db_program = db.query(Program).filter(Program.id == program_id).first()
    if not db_program:
        raise HTTPException(status_code=404, detail="Program not found")

    db.delete(db_program)
    db.commit()
    return {"message": "Program deleted successfully"}
