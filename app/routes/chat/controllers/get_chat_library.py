from app.routes.chat.models import SearchUserResult

from app.services.db.postgres.database import get_db
from app.services.db.postgres.models import ChatLibrary


class GetChatLibrary:
    def __init__(self, user_id):
        self.user_id = user_id

    async def handle_request(self):
        async with get_db() as db:
            result = await ChatLibrary.get_chat_library_by_user_id(db, self.user_id)

        return [
            SearchUserResult(user_id=user.id, username=user.username) for user in result
        ]
