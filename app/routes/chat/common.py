from fastapi import WebSocket
from app.services.db.postgres.database import get_db
from app.services.db.postgres.models.pending_message import PendingMessage
from app.routes.chat.constants import MessageType


class UserConnectionManager:
    active_connections: dict[str, WebSocket]

    def __init__(self):
        self.active_connections = {}

    async def connect(self, user_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    async def disconnect(self, user_id: str):
        self.active_connections.pop(user_id)

    async def send_personal_message(
        self, sender_id: str, receiver_id: str, message: str
    ):
        receiver_socket = self.active_connections.get(receiver_id)
        if not receiver_socket:
            await self.save_personal_message(
                sender_id=sender_id, receiver_id=receiver_id, message=message
            )
            return False

        await receiver_socket.send_json({"sender_id": sender_id, "message": message})
        return True

    async def save_personal_message(
        self, sender_id: str, receiver_id: str, message: str
    ):
        async with get_db() as db:
            await PendingMessage.create(
                db=db,
                sender_id=sender_id,
                receiver_id=receiver_id,
                type=MessageType.SEND_MESSAGE,
                message=message,
            )


user_connection_manager = UserConnectionManager()
