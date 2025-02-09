from app.routes.auth.models import LoginResponse, UserBody
from app.services.db.postgres.database import get_db
from app.services.db.postgres.models.user import User


class LoginUser:
    def __init__(self, user_body: UserBody):
        self.user_body = user_body

    async def handle_request(self) -> LoginResponse:
        if await self._check_user_exists():
            return LoginResponse(access_token="test token")

        return LoginResponse(access_token="test token")

    async def _check_user_exists(self) -> bool:
        async with get_db() as db:
            result = await User.get_user_by_username(db, self.user_body.username)
        return True if result else False
