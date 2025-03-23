from app.services.ai.ollama.service import ollama_service
from app.routes.ai.models import TextCompletionResponse


class GetTextCompletion:
    def __init__(self, user_id: str, message: str) -> None:
        self.user_id = user_id
        self.message = message

    async def handle_request(self) -> TextCompletionResponse:
        result = await ollama_service.get_text_completion(self.message)
        return TextCompletionResponse(completion=result)
