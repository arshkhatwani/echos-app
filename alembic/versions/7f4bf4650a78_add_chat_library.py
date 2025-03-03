"""Add chat library

Revision ID: 7f4bf4650a78
Revises: f0a2f80b3144
Create Date: 2025-03-03 12:40:13.972450

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '7f4bf4650a78'
down_revision: Union[str, None] = 'f0a2f80b3144'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('chat_library',
    sa.Column('id', sa.String(), nullable=False),
    sa.Column('user_id', sa.String(), nullable=True),
    sa.Column('contact_id', sa.String(), nullable=True),
    sa.ForeignKeyConstraint(['contact_id'], ['users.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('user_id', 'contact_id', name='unique_user_contact')
    )
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('chat_library')
    # ### end Alembic commands ###
