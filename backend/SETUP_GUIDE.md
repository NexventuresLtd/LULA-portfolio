# Quick Setup Guide

This guide will help you set up the FastAPI backend with PostgreSQL for your admin dashboard.

## Prerequisites

- Python 3.9 or higher
- PostgreSQL 12 or higher
- pip (Python package manager)

## Quick Start (Development)

### 1. Install PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Windows:**
Download and install from: https://www.postgresql.org/download/windows/

### 2. Create Database

```bash
# Access PostgreSQL prompt
sudo -u postgres psql

# In PostgreSQL prompt, run these commands:
CREATE DATABASE admin_dashboard_db;
CREATE USER admin_user WITH PASSWORD 'admin_password123';
GRANT ALL PRIVILEGES ON DATABASE admin_dashboard_db TO admin_user;
ALTER DATABASE admin_dashboard_db OWNER TO admin_user;
\q
```

### 3. Setup Backend

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Linux/macOS:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env file
cp .env.example .env
```

### 4. Configure Environment

Edit the `.env` file with your settings:

```bash
# Update these values in .env
DATABASE_URL=postgresql://admin_user:admin_password123@localhost:5432/admin_dashboard_db
SECRET_KEY=change-this-to-a-random-secret-key-in-production
```

**Generate a secure SECRET_KEY:**
```bash
python3 -c "import secrets; print(secrets.token_urlsafe(32))"
```

### 5. Initialize Database

```bash
# Create initial migration
alembic revision --autogenerate -m "Initial tables"

# Apply migrations
alembic upgrade head
```

### 6. Create Admin User

Run this Python script to create an admin user:

```bash
python3 << EOF
from app.db.session import SessionLocal
from app.models.user import User
from app.core.security import get_password_hash

db = SessionLocal()

# Check if admin exists
existing_admin = db.query(User).filter(User.email == "admin@example.com").first()
if existing_admin:
    print("Admin user already exists!")
else:
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
    print("Admin user created successfully!")
    print("Email: admin@example.com")
    print("Password: admin123")
    print("CHANGE THIS PASSWORD IN PRODUCTION!")

db.close()
EOF
```

### 7. Run the Server

```bash
# Using the run script
./run.sh

# Or manually
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 8. Test the API

The API will be available at:
- **API Root**: http://localhost:8000
- **Swagger Docs**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

**Test Login:**
1. Go to http://localhost:8000/docs
2. Find the `POST /api/auth/login` endpoint
3. Click "Try it out"
4. Use credentials:
   - username: `admin@example.com`
   - password: `admin123`
5. Copy the `access_token` from the response
6. Click "Authorize" button at the top
7. Enter: `Bearer <paste-your-token-here>`
8. Now you can test all protected endpoints!

## Frontend Integration

Update your React frontend to use the backend API:

```typescript
// Example API configuration
const API_BASE_URL = "http://localhost:8000/api";

// Login function
async function login(email: string, password: string) {
  const formData = new FormData();
  formData.append('username', email);
  formData.append('password', password);
  
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    body: formData,
  });
  
  const data = await response.json();
  localStorage.setItem('access_token', data.access_token);
  return data;
}

// Authenticated request
async function fetchNews() {
  const token = localStorage.getItem('access_token');
  const response = await fetch(`${API_BASE_URL}/news`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  return response.json();
}
```

## Production Deployment

### 1. Security Checklist
- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Set `DEBUG=False` in .env
- [ ] Update `ALLOWED_ORIGINS` to your frontend domain
- [ ] Use strong database password
- [ ] Enable HTTPS
- [ ] Set up database backups
- [ ] Configure firewall rules

### 2. Run with Production Server

```bash
# Install gunicorn
pip install gunicorn

# Run with multiple workers
gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### 3. Use Process Manager (systemd example)

Create `/etc/systemd/system/admin-api.service`:

```ini
[Unit]
Description=Admin Dashboard API
After=network.target

[Service]
User=www-data
Group=www-data
WorkingDirectory=/path/to/backend
Environment="PATH=/path/to/backend/venv/bin"
ExecStart=/path/to/backend/venv/bin/gunicorn app.main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000

[Install]
WantedBy=multi-user.target
```

Enable and start:
```bash
sudo systemctl enable admin-api
sudo systemctl start admin-api
```

## Troubleshooting

### Database Connection Error
```bash
# Check PostgreSQL is running
sudo systemctl status postgresql

# Check connection
psql -U admin_user -d admin_dashboard_db -h localhost
```

### Migration Issues
```bash
# Drop all tables and restart
alembic downgrade base
alembic upgrade head
```

### Port Already in Use
```bash
# Find process on port 8000
lsof -i :8000

# Kill it
kill -9 <PID>
```

### Import Errors
```bash
# Make sure virtual environment is activated
source venv/bin/activate

# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

## API Endpoints Summary

| Endpoint | Method | Auth Required | Description |
|----------|--------|---------------|-------------|
| `/api/auth/register` | POST | No | Register new user |
| `/api/auth/login` | POST | No | Login |
| `/api/news` | GET | No | Get all news |
| `/api/news/{id}` | GET | No | Get news by ID |
| `/api/news` | POST | Yes | Create news |
| `/api/news/{id}` | PUT | Yes | Update news |
| `/api/news/{id}` | DELETE | Yes | Delete news |
| `/api/projects` | GET | No | Get all projects |
| `/api/projects` | POST | Yes | Create project |
| `/api/partners` | GET | No | Get all partners |
| `/api/partners` | POST | Yes | Create partner |
| `/api/enquiries` | GET | Yes | Get all enquiries |
| `/api/enquiries` | POST | No | Submit enquiry |

## Next Steps

1. Integrate frontend with backend API
2. Add more endpoints as needed
3. Implement file upload for images
4. Add email notifications
5. Set up automated backups
6. Configure monitoring and logging

For detailed information, see the main README.md file.
