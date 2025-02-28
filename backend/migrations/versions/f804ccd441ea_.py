"""empty message

Revision ID: f804ccd441ea
Revises: 27566fd002ca
Create Date: 2025-01-30 11:42:53.181419

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'f804ccd441ea'
down_revision = '27566fd002ca'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('contact_us',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('contact_us')
    # ### end Alembic commands ###
