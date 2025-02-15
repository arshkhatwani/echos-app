from app.routes.auth.models import LoginResponse, UserBody
from app.services.db.postgres.database import get_db
from app.services.db.postgres.models.user import User
from app.services.jwt.service import jwt_service
from app.services.hash.service import hash_service
from fastapi import HTTPException


class LoginUser:
    def __init__(self, user_body: UserBody):
        self.user_body = user_body

    async def handle_request(self) -> LoginResponse:
        user_exists = await self._check_user_exists()

        user = user_exists if user_exists else await self._create_user()
        access_token = jwt_service.encode_user_id(str(user.id))

        return LoginResponse(access_token=access_token)

    async def _check_user_exists(self) -> User | None:
        async with get_db() as db:
            result = await User.get_user_by_username(db, self.user_body.username)

        check_password = (
            hash_service.check_password(self.user_body.password, result.password)
            if result
            else False
        )

        if result and check_password:
            return result
        if result and not check_password:
            raise HTTPException(status_code=403, detail="Incorrect password")

        return result

    async def _create_user(self) -> User:
        async with get_db() as db:
            result = await User.create(db, **self.user_body.model_dump())
        return result
