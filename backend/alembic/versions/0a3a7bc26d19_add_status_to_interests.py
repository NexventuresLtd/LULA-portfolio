"""add status to interests

Revision ID: 0a3a7bc26d19
Revises: 92035a32e1b8
Create Date: 2026-05-25 19:35:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '0a3a7bc26d19'
down_revision = '92035a32e1b8'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        'interests',
        sa.Column('status', sa.String(), nullable=False, server_default='new')
    )


def downgrade() -> None:
    op.drop_column('interests', 'status')
