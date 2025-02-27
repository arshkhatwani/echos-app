from uuid import uuid4
from app.services.db.postgres.database import Base
from sqlalchemy import Column, String, select
from sqlalchemy.ext.asyncio import AsyncSession


class PendingMessage(Base):
    __tablename__ = "pending_messages"

    id = Column(String, primary_key=True)
    sender_id = Column(String, nullable=False)
    receiver_id = Column(String, nullable=False)
    type = Column(String, nullable=False)
    message = Column(String, nullable=False)
    timestamp = Column(String, nullable=True)

    @classmethod
    async def create(cls, db: AsyncSession, id=None, **kwargs):
        if not id:
            id = str(uuid4())

        transaction = cls(id=id, **kwargs)
        db.add(transaction)
        await db.commit()
        await db.refresh(transaction)
        return transaction

    @classmethod
    async def get_pending_messages_for_receiver(
        cls, db: AsyncSession, receiver_id: str
    ):
        query = select(cls).filter(cls.receiver_id == receiver_id)
        transaction = await db.scalars(query)
        return transaction.all()
