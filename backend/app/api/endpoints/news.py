from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.session import get_db
from app.models.news import News
from app.models.user import User
from app.schemas.news import NewsCreate, NewsUpdate, NewsResponse
from app.core.security import get_current_active_user
from datetime import datetime

router = APIRouter()


@router.get("/", response_model=List[NewsResponse])
def get_all_news(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    news = db.query(News).offset(skip).limit(limit).all()
    return news


@router.get("/{news_id}", response_model=NewsResponse)
def get_news(news_id: int, db: Session = Depends(get_db)):
    news = db.query(News).filter(News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news


@router.post("/", response_model=NewsResponse)
def create_news(
    news: NewsCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_news = News(**news.dict())
    if news.published:
        db_news.published_at = datetime.utcnow()
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return db_news


@router.put("/{news_id}", response_model=NewsResponse)
def update_news(
    news_id: int,
    news: NewsUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_news = db.query(News).filter(News.id == news_id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News not found")

    update_data = news.dict(exclude_unset=True)
    if "published" in update_data and update_data["published"] and not db_news.published:
        update_data["published_at"] = datetime.utcnow()

    for key, value in update_data.items():
        setattr(db_news, key, value)

    db.commit()
    db.refresh(db_news)
    return db_news


@router.delete("/{news_id}")
def delete_news(
    news_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    db_news = db.query(News).filter(News.id == news_id).first()
    if not db_news:
        raise HTTPException(status_code=404, detail="News not found")

    db.delete(db_news)
    db.commit()
    return {"message": "News deleted successfully"}
