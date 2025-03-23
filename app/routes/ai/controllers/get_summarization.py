from app.services.ai.ollama.service import ollama_service
from app.routes.ai.models import SummarizationResponse


class GetSummarization:
    def __init__(self, user_id: str, message: str) -> None:
        self.user_id = user_id
        self.message = message

    async def handle_request(self) -> SummarizationResponse:
        result = await ollama_service.get_summarization(self.message)
        return SummarizationResponse(summary=result)
