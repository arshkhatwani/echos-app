import json
from fastapi import APIRouter, WebSocket, Depends, WebSocketDisconnect
from app.services.jwt.service import get_user_id_from_token
from app.routes.chat.common import user_connection_manager

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket, user_id: str = Depends(get_user_id_from_token)
):
    await user_connection_manager.connect(user_id, websocket)
    try:
        while True:
            data = json.loads(await websocket.receive_text())
            if data.get("type") == "send_message":
                await user_connection_manager.send_personal_message(
                    sender_id=user_id,
                    receiver_id=data.get("receiver_id"),
                    message=data.get("message"),
                )
    except WebSocketDisconnect:
        await user_connection_manager.disconnect(user_id)
