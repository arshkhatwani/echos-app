from fastapi import APIRouter, WebSocket, Depends
from app.services.jwt.service import get_user_id_from_token

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket, user_id: str = Depends(get_user_id_from_token)
):
    print("user_id", user_id)
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"Message text was: {data}")
