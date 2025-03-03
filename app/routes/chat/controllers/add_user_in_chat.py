from app.routes.chat.models import AddUserRequest, SuccessResponse
from app.services.db.postgres.models import ChatLibrary
from app.services.db.postgres.database import get_db


class AddUserInChat:
    def __init__(self, user_id: str, user: AddUserRequest):
        self.user_id = user_id
        self.user = user

    async def handle_request(self):
        async with get_db() as db:
            await ChatLibrary.create(
                db=db, user_id=self.user_id, contact_id=self.user.id
            )
        return SuccessResponse(message="User added successfully")
