import json
from fastapi import WebSocket, WebSocketDisconnect
from app.routes.chat.common import user_connection_manager
from app.routes.chat.constants import MessageType


class WebSocketEndpoint:
    def __init__(self, websocket: WebSocket, user_id: str) -> None:
        self.websocket = websocket
        self.user_id = user_id

    async def handle_request(self):
        await user_connection_manager.connect(self.user_id, self.websocket)
        try:
            while True:
                data = json.loads(await self.websocket.receive_text())
                if data.get("type") == MessageType.SEND_MESSAGE:
                    await user_connection_manager.send_personal_message(
                        sender_id=self.user_id,
                        receiver_id=data.get("receiverId"),
                        message=data.get("message"),
                        message_id=data.get("id"),
                        timestamp=data.get("timestamp"),
                    )
        except WebSocketDisconnect:
            await user_connection_manager.disconnect(self.user_id)
