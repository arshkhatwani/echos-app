from app.services.ai.ollama.service import ollama_service
from app.routes.ai.models import ReplySuggestionsResponse


class GetReplySuggestions:
    def __init__(self, user_id: str, message: str) -> None:
        self.user_id = user_id
        self.message = message

    async def handle_request(self) -> ReplySuggestionsResponse:
        result = await ollama_service.get_reply_suggestions(self.message)
        return ReplySuggestionsResponse(reply=result)
