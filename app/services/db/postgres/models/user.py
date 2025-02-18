from uuid import uuid4

from sqlalchemy import Column, String, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.db.postgres.database import Base
from app.services.hash.service import hash_service


class User(Base):
    __tablename__ = "users"
    id = Column(String, primary_key=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    @classmethod
    async def create(cls, db: AsyncSession, id=None, **kwargs):
        if not id:
            id = uuid4().hex

        kwargs["password"] = hash_service.hash_password(kwargs["password"])

        transaction = cls(id=id, **kwargs)
        db.add(transaction)
        await db.commit()
        await db.refresh(transaction)
        return transaction

    @classmethod
    async def get_user_by_username(cls, db: AsyncSession, username: str):
        query = select(cls).filter(cls.username == username)
        transaction = await db.scalars(query)
        return transaction.first()

    @classmethod
    async def search_users_except_current(
        cls, db: AsyncSession, username: str, user_id: int
    ):
        query = (
            select(cls)
            .filter(cls.username.contains(username))
            .filter(cls.id != user_id)
        )
        transaction = await db.scalars(query)
        return transaction.all()
