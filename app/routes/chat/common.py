import asyncio
from fastapi import WebSocket
from typing import Sequence

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
        await self._send_pending_messages(user_id)

    async def disconnect(self, user_id: str):
        self.active_connections.pop(user_id)

    async def send_personal_message(
        self,
        sender_id: str,
        receiver_id: str,
        message: str,
        message_id: str,
        timestamp: str,
    ):
        receiver_socket = self.active_connections.get(receiver_id)
        if not receiver_socket:
            await self._save_personal_message(
                sender_id=sender_id,
                receiver_id=receiver_id,
                message=message,
                message_id=message_id,
                timestamp=timestamp,
            )
            return False

        await self._send_delivered_message_notification(
            sender_id, receiver_id, message_id
        )
        await receiver_socket.send_json(
            {
                "sender_id": sender_id,
                "message": message,
                "type": MessageType.SEND_MESSAGE,
                "id": message_id,
                "timestamp": timestamp,
            }
        )
        return True

    async def _save_personal_message(
        self,
        sender_id: str,
        receiver_id: str,
        message: str,
        message_id: str,
        timestamp: str,
    ):
        async with get_db() as db:
            await PendingMessage.create(
                db=db,
                sender_id=sender_id,
                receiver_id=receiver_id,
                type=MessageType.SEND_MESSAGE,
                message=message,
                id=message_id,
                timestamp=timestamp,
            )

    async def _send_pending_messages(self, user_id: str):
        websocket = self.active_connections[user_id]
        async with get_db() as db:
            result = await PendingMessage.get_pending_messages_for_receiver(
                db=db, receiver_id=user_id
            )

        await asyncio.gather(
            *[websocket.send_json(self._reformat_message(msg)) for msg in result]
        )

        await self._send_delivered_notifications(result)

    def _reformat_message(self, message: PendingMessage):
        return {k: v for k, v in message.__dict__.items() if k != "_sa_instance_state"}

    async def _send_delivered_message_notification(
        self, sender_id: str, receiver_id: str, message_id: str
    ):
        websocket = self.active_connections.get(sender_id)
        if not websocket:
            return
        await websocket.send_json(
            {
                "receiver_id": receiver_id,
                "type": MessageType.DELIVERED_MESSAGE,
                "id": message_id,
            }
        )

    async def send_read_message_notification(self, sender_id: str, receiver_id: str):
        receiverSocket = self.active_connections.get(receiver_id)
        if not receiverSocket:
            return
        await receiverSocket.send_json(
            {
                "user_id": sender_id,
                "type": MessageType.READ_MESSAGE,
            }
        )

    async def _send_delivered_notifications(self, messages: Sequence[PendingMessage]):
        """
        Sends delivered message notifications to the receiver for all pending messages
        """
        await asyncio.gather(
            *[
                self._send_delivered_message_notification(
                    str(msg.sender_id), str(msg.receiver_id), str(msg.id)
                )
                for msg in messages
                if msg.type == MessageType.SEND_MESSAGE
            ]
        )


user_connection_manager = UserConnectionManager()
