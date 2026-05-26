from app.schemas.user import UserCreate, UserUpdate, UserResponse, Token
from app.schemas.news import NewsCreate, NewsUpdate, NewsResponse
from app.schemas.project import ProjectCreate, ProjectUpdate, ProjectResponse
from app.schemas.partner import PartnerCreate, PartnerUpdate, PartnerResponse
from app.schemas.enquiry import EnquiryCreate, EnquiryUpdate, EnquiryResponse

__all__ = [
    "UserCreate", "UserUpdate", "UserResponse", "Token",
    "NewsCreate", "NewsUpdate", "NewsResponse",
    "ProjectCreate", "ProjectUpdate", "ProjectResponse",
    "PartnerCreate", "PartnerUpdate", "PartnerResponse",
    "EnquiryCreate", "EnquiryUpdate", "EnquiryResponse"
]
