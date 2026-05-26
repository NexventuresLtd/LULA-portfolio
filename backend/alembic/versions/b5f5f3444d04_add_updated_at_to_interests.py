"""add updated_at to interests

Revision ID: b5f5f3444d04
Revises: 0a3a7bc26d19
Create Date: 2026-05-25 19:35:30.000000

"""
from alembic import op
import sqlalchemy as sa


revision = 'b5f5f3444d04'
down_revision = '0a3a7bc26d19'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        'interests',
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True)
    )


def downgrade() -> None:
    op.drop_column('interests', 'updated_at')
