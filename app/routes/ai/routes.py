from fastapi import APIRouter, Depends

from app.services.jwt.service import get_user_id_from_token
from app.routes.ai.controllers.get_reply_suggestions import GetReplySuggestions
from app.routes.ai.controllers.get_message_composition import GetMessageComposition
from app.routes.ai.controllers.get_text_completion import GetTextCompletion
from app.routes.ai.controllers.get_rephrase import GetRephrase
from app.routes.ai.controllers.get_summarization import GetSummarization
from app.routes.ai.controllers.get_one_word_replies import GetOneWordReplies
from app.routes.ai.models import (
    MessageRequest,
    ReplySuggestionsResponse,
    MessageCompositionResponse,
    TextCompletionResponse,
    RephraseResponse,
    SummarizationResponse,
    OneWordRepliesResponse,
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


@router.post("/rephrase", response_model=RephraseResponse)
async def get_rephrase(
    request: MessageRequest,
    user_id: str = Depends(get_user_id_from_token),
) -> RephraseResponse:
    return await GetRephrase(user_id=user_id, message=request.message).handle_request()


@router.post("/summarization", response_model=SummarizationResponse)
async def get_summarization(
    request: MessageRequest,
    user_id: str = Depends(get_user_id_from_token),
) -> SummarizationResponse:
    return await GetSummarization(
        user_id=user_id, message=request.message
    ).handle_request()


@router.post("/one-word-replies", response_model=OneWordRepliesResponse)
async def get_one_word_replies(
    request: MessageRequest,
    user_id: str = Depends(get_user_id_from_token),
) -> OneWordRepliesResponse:
    return await GetOneWordReplies(
        user_id=user_id, message=request.message
    ).handle_request()
