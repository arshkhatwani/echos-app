from fastapi import APIRouter, Depends

from app.services.jwt.service import get_user_id_from_token
from app.routes.ai.controllers.get_reply_suggestions import GetReplySuggestions
from app.routes.ai.models import MessageRequest, ReplySuggestionsResponse

router = APIRouter(
    prefix="/ai",
    tags=["AI"],
)


@router.post("/reply-suggestions", response_model=ReplySuggestionsResponse)
async def get_reply_suggestions(
    request: MessageRequest,
    user_id: str = Depends(get_user_id_from_token),
) -> ReplySuggestionsResponse:
    return await GetReplySuggestions(
        user_id=user_id, message=request.message
    ).handle_request()
