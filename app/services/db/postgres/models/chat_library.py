from uuid import uuid4
from sqlalchemy import Column, String, ForeignKey, UniqueConstraint
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.db.postgres.database import Base


class ChatLibrary(Base):
    __tablename__ = "chat_library"

    id = Column(String, primary_key=True)
    user_id = Column(String, ForeignKey("users.id"))
    contact_id = Column(String, ForeignKey("users.id"))
    __table_args__ = (
        UniqueConstraint("user_id", "contact_id", name="unique_user_contact"),
    )

    @classmethod
    async def create(cls, db: AsyncSession, user_id: str, contact_id: str):
        id = str(uuid4())
        transaction = cls(id=id, user_id=user_id, contact_id=contact_id)
        db.add(transaction)
        await db.commit()
        await db.refresh(transaction)
        return transaction
