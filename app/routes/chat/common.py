from fastapi import WebSocket


class UserConnectionManager:
    active_connections: dict[str, WebSocket]

    def __init__(self):
        self.active_connections = {}

    async def connect(self, user_id: str, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[user_id] = websocket

    async def disconnect(self, user_id: str):
        websocket = self.active_connections[user_id]
        await websocket.close()
        self.active_connections.pop(user_id)

    async def send_personal_message(
        self, sender_id: str, receiver_id: str, message: str
    ):
        receiver_socket = self.active_connections.get(receiver_id)
        if not receiver_socket:
            return False

        await receiver_socket.send_json({"sender_id": sender_id, "message": message})
        return True


user_connection_manager = UserConnectionManager()
