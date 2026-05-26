# Admin Dashboard Backend API

FastAPI backend with PostgreSQL for the admin dashboard.

## Features

- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migrations**: Alembic for database migrations
- **API Documentation**: Auto-generated OpenAPI/Swagger docs
- **CORS**: Configured for frontend integration

## Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and get access token

### News
- `GET /api/news` - Get all news articles
- `GET /api/news/{id}` - Get specific news article
- `POST /api/news` - Create news article (requires auth)
- `PUT /api/news/{id}` - Update news article (requires auth)
- `DELETE /api/news/{id}` - Delete news article (requires auth)

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/{id}` - Get specific project
- `POST /api/projects` - Create project (requires auth)
- `PUT /api/projects/{id}` - Update project (requires auth)
- `DELETE /api/projects/{id}` - Delete project (requires auth)

### Partners
- `GET /api/partners` - Get all partners
- `GET /api/partners/{id}` - Get specific partner
- `POST /api/partners` - Create partner (requires auth)
- `PUT /api/partners/{id}` - Update partner (requires auth)
- `DELETE /api/partners/{id}` - Delete partner (requires auth)

### Enquiries
- `GET /api/enquiries` - Get all enquiries (requires auth)
- `GET /api/enquiries/{id}` - Get specific enquiry (requires auth)
- `POST /api/enquiries` - Submit enquiry (public)
- `PUT /api/enquiries/{id}` - Update enquiry status (requires auth)
- `DELETE /api/enquiries/{id}` - Delete enquiry (requires auth)

## Setup Instructions

### 1. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
```

### 2. Create Database

```bash
# Access PostgreSQL
sudo -u postgres psql

# Create database
CREATE DATABASE admin_dashboard_db;

# Create user
CREATE USER your_username WITH PASSWORD 'your_password';

# Grant privileges
GRANT ALL PRIVILEGES ON DATABASE admin_dashboard_db TO your_username;

# Exit
\q
```

### 3. Environment Setup

```bash
cd backend

# Copy environment file
cp .env.example .env

# Edit .env with your database credentials
nano .env
```

Update the `.env` file:
```
DATABASE_URL=postgresql://your_username:your_password@localhost:5432/admin_dashboard_db
SECRET_KEY=your-very-secret-key-change-this
```

### 4. Install Python Dependencies

```bash
# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### 5. Run Database Migrations

```bash
# Initialize alembic (if not already done)
alembic revision --autogenerate -m "Initial migration"

# Run migrations
alembic upgrade head
```

### 6. Create Admin User

```python
# Run Python shell
python3

# In Python shell:
from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

db = SessionLocal()
admin_user = User(
    email="admin@example.com",
    username="admin",
    full_name="Admin User",
    hashed_password=get_password_hash("admin123"),
    is_active=True,
    is_superuser=True
)
db.add(admin_user)
db.commit()
print("Admin user created!")
```

### 7. Run the Server

```bash
# Development server with auto-reload
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Production server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

The API will be available at:
- API: http://localhost:8000
- Swagger Docs: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Project Structure

```
backend/
├── app/
│   ├── api/
│   │   └── endpoints/
│   │       ├── auth.py
│   │       ├── news.py
│   │       ├── projects.py
│   │       ├── partners.py
│   │       └── enquiries.py
│   ├── core/
│   │   ├── config.py
│   │   └── security.py
│   ├── db/
│   │   └── session.py
│   ├── models/
│   │   ├── user.py
│   │   ├── news.py
│   │   ├── project.py
│   │   ├── partner.py
│   │   ├── enquiry.py
│   │   ├── impact_story.py
│   │   ├── program.py
│   │   └── interest.py
│   ├── schemas/
│   │   ├── user.py
│   │   ├── news.py
│   │   ├── project.py
│   │   ├── partner.py
│   │   └── enquiry.py
│   └── main.py
├── alembic/
│   ├── versions/
│   └── env.py
├── requirements.txt
├── .env.example
├── .env
└── README.md
```

## Development

### Creating New Endpoints

1. Create model in `app/models/`
2. Create schema in `app/schemas/`
3. Create endpoint router in `app/api/endpoints/`
4. Register router in `app/main.py`
5. Run migration: `alembic revision --autogenerate -m "Add new model"`
6. Apply migration: `alembic upgrade head`

### Testing API

Use the Swagger UI at http://localhost:8000/docs to test endpoints interactively.

For authentication-required endpoints:
1. Register or login to get access token
2. Click "Authorize" button in Swagger UI
3. Enter: `Bearer <your_access_token>`

## Security Notes

- Change `SECRET_KEY` in production
- Use strong passwords
- Enable HTTPS in production
- Configure proper CORS origins
- Set `DEBUG=False` in production
- Use environment variables for sensitive data

## Troubleshooting

### Database Connection Issues
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Start PostgreSQL
sudo systemctl start postgresql
```

### Migration Issues
```bash
# Reset database (WARNING: deletes all data)
alembic downgrade base
alembic upgrade head

# Or manually drop and recreate database
```

### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000

# Kill process
kill -9 <PID>
```
