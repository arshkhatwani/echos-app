from ollama import AsyncClient
from app.services.ai.ollama.constants import TaskType


class OllamaService:
    def __init__(self) -> None:
        self.model = "echo-responder"
        self.client = AsyncClient()

    async def generate(self, prompt: str) -> str:
        result = await self.client.generate(model=self.model, prompt=prompt)
        return result.response

    def get_prompt(self, task: TaskType, message: str) -> str:
        return f"""
        Task: {task}
        Message: {message}
        """

    async def get_reply_suggestions(self, message: str) -> str:
        prompt = self.get_prompt(TaskType.REPLY_SUGGESTIONS, message)
        response = await self.generate(prompt)
        return response

    async def get_message_composition(self, prompt: str) -> str:
        prompt = self.get_prompt(TaskType.MESSAGE_COMPOSITION, prompt)
        response = await self.generate(prompt)
        return response

    async def get_text_completion(self, initial_phrase: str) -> str:
        prompt = self.get_prompt(TaskType.TEXT_COMPLETION, initial_phrase)
        response = await self.generate(prompt)
        return response

    async def get_rephrasing(self, original_text: str) -> str:
        prompt = self.get_prompt(TaskType.REPHRASING, original_text)
        response = await self.generate(prompt)
        return response

    async def get_summarization(self, original_text: str) -> str:
        prompt = self.get_prompt(TaskType.SUMMARIZATION, original_text)
        response = await self.generate(prompt)
        return response

    async def get_one_word_replies(self, original_text: str) -> str:
        prompt = self.get_prompt(TaskType.ONE_WORD_REPLIES, original_text)
        response = await self.generate(prompt)
        return response


ollama_service = OllamaService()
