from app.services.ai.ollama.service import ollama_service
from app.routes.ai.models import OneWordRepliesResponse


class GetOneWordReplies:
    def __init__(self, user_id: str, message: str) -> None:
        self.user_id = user_id
        self.message = message

    async def handle_request(self) -> OneWordRepliesResponse:
        result = await ollama_service.get_one_word_replies(self.message)
        return OneWordRepliesResponse(one_word_replies=result)
