from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.db.session import get_db
from app.models.site_content import SiteContent
from app.models.user import User
from app.schemas.site_content import SiteContentUpdate, SiteContentResponse
from app.core.security import get_current_active_user

router = APIRouter()


@router.get("/", response_model=SiteContentResponse)
def get_site_content(db: Session = Depends(get_db)):
    site_content = db.query(SiteContent).order_by(SiteContent.id.asc()).first()

    if not site_content:
        site_content = SiteContent(
            mission="Our mission is to empower vulnerable communities in Eastern DRC through education, health, and economic development programs.",
            vision="We envision a future where every child is safe, every woman is empowered, and every community is resilient and self-sufficient.",
            story="LULA Congo was founded in 2010 to address the urgent needs of communities affected by conflict and displacement in Eastern DRC. We have grown to become a leading humanitarian organization, implementing a wide range of programs that improve the lives of over 100,000 people annually.",
        )
        db.add(site_content)
        db.commit()
        db.refresh(site_content)

    return site_content


@router.put("/", response_model=SiteContentResponse)
def update_site_content(
    site_content_update: SiteContentUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user),
):
    site_content = db.query(SiteContent).order_by(SiteContent.id.asc()).first()

    if not site_content:
        site_content = SiteContent(
            mission=site_content_update.mission or "",
            vision=site_content_update.vision or "",
            story=site_content_update.story or "",
        )
        db.add(site_content)
    else:
        update_data = site_content_update.dict(exclude_unset=True)
        for key, value in update_data.items():
            setattr(site_content, key, value)

    db.commit()
    db.refresh(site_content)
    return site_content
