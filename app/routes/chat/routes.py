from fastapi import APIRouter, WebSocket, Depends, Query
from app.services.jwt.service import get_user_id_from_token
from app.routes.chat.controllers.websocket_endpoint import WebSocketEndpoint
from app.routes.chat.controllers.search_users import SearchUsers

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


@router.get("/users")
async def search_users(
    search: str = Query(description="Username to search for"),
    user_id: str = Depends(get_user_id_from_token),
):
    return await SearchUsers(search=search, user_id=user_id).handle_request()
