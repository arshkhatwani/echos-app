from fastapi import APIRouter, WebSocket, Depends
from app.services.jwt.service import get_user_id_from_token
from app.routes.chat.controllers.websocket_endpoint import WebSocketEndpoint

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket, user_id: str = Depends(get_user_id_from_token)
):
    await WebSocketEndpoint(
        websocket=websocket,
        user_id=user_id,
    ).handle_request()
