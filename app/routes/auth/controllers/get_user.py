from fastapi import HTTPException, status

from app.services.db.postgres.database import get_db
from app.services.db.postgres.models import User
from app.routes.auth.models import GetUserResponse


class GetUser:
    def __init__(self, user_id):
        self.user_id = user_id

    async def handle_request(self):
        user = await self._get_user()
        return GetUserResponse(username=user.username, id=user.id)

    async def _get_user(self) -> User:
        async with get_db() as db:
            result = await User.get_user_by_id(db, self.user_id)
            if not result:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND, detail="User not found"
                )
        return result
