from app.routes.chat.models import AddUserRequest, AddUserResponse
from app.services.db.postgres.models import ChatLibrary, User
from app.services.db.postgres.database import get_db

from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException, status


class AddUserInChat:
    def __init__(self, user_id: str, user: AddUserRequest):
        self.user_id = user_id
        self.user = user

    async def handle_request(self):
        async with get_db() as db:
            await ChatLibrary.create(
                db=db, user_id=self.user_id, contact_id=self.user.id
            )
            user = await self._get_user(db)

        return AddUserResponse(
            message="User added successfully", user_id=user.id, username=user.username
        )

    async def _get_user(self, db: AsyncSession) -> User:
        user = await User.get_user_by_id(db, self.user.id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
            )
        return user
