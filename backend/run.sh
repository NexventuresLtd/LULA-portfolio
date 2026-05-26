#!/bin/bash

# Admin Dashboard Backend Runner

echo "Starting Admin Dashboard Backend..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Check if .env exists
if [ ! -f ".env" ]; then
    echo "WARNING: .env file not found. Please create it from .env.example"
    echo "Copying .env.example to .env..."
    cp .env.example .env
    echo "Please edit .env with your database credentials before running the server."
    exit 1
fi

# Run migrations
echo "Running database migrations..."
alembic upgrade head

# Start server
echo "Starting FastAPI server..."
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
