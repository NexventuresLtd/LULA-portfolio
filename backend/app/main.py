from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os
from app.core.config import settings
from app.api.endpoints import auth, news, projects, partners, enquiries, interests as interests_router, programs, impact_stories, team_members, site_content, media
from app.db.session import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    debug=settings.DEBUG
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(news.router, prefix="/api/news", tags=["News"])
app.include_router(projects.router, prefix="/api/projects", tags=["Projects"])
app.include_router(partners.router, prefix="/api/partners", tags=["Partners"])
app.include_router(enquiries.router, prefix="/api/enquiries", tags=["Enquiries"])
app.include_router(interests_router.router, prefix="/api/interests", tags=["Interests"])
app.include_router(programs.router, prefix="/api/programs", tags=["Programs"])
app.include_router(impact_stories.router, prefix="/api/impact-stories", tags=["Impact Stories"])
app.include_router(team_members.router, prefix="/api/team-members", tags=["Team Members"])
app.include_router(site_content.router, prefix="/api/site-content", tags=["Site Content"])
app.include_router(media.router, prefix="/api/media", tags=["Media"])

# Serve uploaded files
UPLOAD_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "uploads")
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")


@app.get("/")
def root():
    return {
        "message": "Admin Dashboard API",
        "version": settings.VERSION,
        "docs": "/docs"
    }


@app.get("/health")
def health_check():
    return {"status": "healthy"}
