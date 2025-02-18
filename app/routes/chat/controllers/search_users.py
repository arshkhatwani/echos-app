from app.services.db.postgres.database import get_db
from app.services.db.postgres.models.user import User
from app.routes.chat.models import SearchUserResult


class SearchUsers:
    def __init__(self, search, user_id):
        self.user_id = user_id
        self.search = search

    async def handle_request(self) -> list[SearchUserResult]:
        async with get_db() as db:
            result = await User.get_users_by_username(db, self.search)

        return [
            SearchUserResult(user_id=user.id, username=user.username) for user in result
        ]
