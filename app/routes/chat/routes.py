from fastapi import APIRouter, WebSocket, Depends, Query
from app.services.jwt.service import (
    get_user_id_from_token,
    get_user_id_from_token_for_websocket,
)
from app.routes.chat.controllers.websocket_endpoint import WebSocketEndpoint
from app.routes.chat.controllers.search_users import SearchUsers
from app.routes.chat.controllers.add_user_in_chat import AddUserInChat
from app.routes.chat.models import AddUserRequest, SearchUserResult, SuccessResponse

router = APIRouter(
    prefix="/chat",
    tags=["Chat"],
)


@router.websocket("/ws")
async def websocket_endpoint(
    websocket: WebSocket, user_id: str = Depends(get_user_id_from_token_for_websocket)
):
    await WebSocketEndpoint(
        websocket=websocket,
        user_id=user_id,
    ).handle_request()


@router.get("/users", response_model=list[SearchUserResult])
async def search_users(
    search: str = Query(description="Username to search for"),
    user_id: str = Depends(get_user_id_from_token),
) -> list[SearchUserResult]:
    return await SearchUsers(search=search, user_id=user_id).handle_request()


@router.post(
    "/user",
    description="Add user in chat library",
    response_model=SuccessResponse,
    status_code=201,
)
async def add_user_in_chat(
    user: AddUserRequest,
    user_id: str = Depends(get_user_id_from_token),
) -> SuccessResponse:
    return await AddUserInChat(user_id=user_id, user=user).handle_request()
