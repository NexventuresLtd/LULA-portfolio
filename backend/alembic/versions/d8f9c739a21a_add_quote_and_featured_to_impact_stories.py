"""add quote and featured to impact stories

Revision ID: d8f9c739a21a
Revises: c1a78debb6a1
Create Date: 2026-05-26 00:00:00.000000

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd8f9c739a21a'
down_revision = 'c1a78debb6a1'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column('impact_stories', sa.Column('quote', sa.Text(), nullable=True))
    op.add_column('impact_stories', sa.Column('featured', sa.Boolean(), nullable=False, server_default=sa.false()))
    op.alter_column('impact_stories', 'featured', server_default=None)


def downgrade() -> None:
    op.drop_column('impact_stories', 'featured')
    op.drop_column('impact_stories', 'quote')
