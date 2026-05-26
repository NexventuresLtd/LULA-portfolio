"""add featured to projects

Revision ID: c1a78debb6a1
Revises: b5f5f3444d04
Create Date: 2026-05-26 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


revision = 'c1a78debb6a1'
down_revision = 'b5f5f3444d04'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        'projects',
        sa.Column('featured', sa.Boolean(), nullable=False, server_default='false')
    )
    op.execute("UPDATE projects SET featured = false WHERE featured IS NULL")


def downgrade() -> None:
    op.drop_column('projects', 'featured')
