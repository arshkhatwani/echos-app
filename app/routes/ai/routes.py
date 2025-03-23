from fastapi import APIRouter, Depends

from app.services.jwt.service import get_user_id_from_token
from app.routes.ai.controllers.get_reply_suggestions import GetReplySuggestions
from app.routes.ai.controllers.get_message_composition import GetMessageComposition
from app.routes.ai.controllers.get_text_completion import GetTextCompletion
from app.routes.ai.models import (
    MessageRequest,
    ReplySuggestionsResponse,
    MessageCompositionResponse,
    TextCompletionResponse,
)

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


@router.post("/message-composition", response_model=MessageCompositionResponse)
async def get_message_composition(
    request: MessageRequest,
    user_id: str = Depends(get_user_id_from_token),
) -> MessageCompositionResponse:
    return await GetMessageComposition(
        user_id=user_id, message=request.message
    ).handle_request()


@router.post("/text-completion", response_model=TextCompletionResponse)
async def get_text_completion(
    request: MessageRequest,
    user_id: str = Depends(get_user_id_from_token),
) -> TextCompletionResponse:
    return await GetTextCompletion(
        user_id=user_id, message=request.message
    ).handle_request()
