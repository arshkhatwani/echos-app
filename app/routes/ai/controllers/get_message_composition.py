from app.services.ai.ollama.service import ollama_service
from app.routes.ai.models import MessageCompositionResponse


class GetMessageComposition:
    def __init__(self, user_id: str, message: str) -> None:
        self.user_id = user_id
        self.message = message

    async def handle_request(self) -> MessageCompositionResponse:
        result = await ollama_service.get_message_composition(self.message)
        return MessageCompositionResponse(message=result)
