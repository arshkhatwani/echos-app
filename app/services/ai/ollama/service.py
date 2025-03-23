import xmltodict

from ollama import AsyncClient
from app.services.ai.ollama.constants import TaskType


class OllamaService:
    def __init__(self) -> None:
        self.model = "echo-responder"
        self.client = AsyncClient()

    async def generate(self, prompt: str) -> str:
        result = await self.client.generate(model=self.model, prompt=prompt)
        return result.response

    async def generate_and_parse_xml(self, prompt: str) -> str:
        result = await self.generate(prompt)
        return self._extract_xml_string(result)

    def get_prompt(self, task: TaskType, message: str) -> str:
        return f"""
        Task: {task}
        Message: {message}
        """

    async def get_reply_suggestions(self, message: str) -> list[str]:
        prompt = self.get_prompt(TaskType.REPLY_SUGGESTIONS, message)
        response = await self.generate_and_parse_xml(prompt)
        return self._ensure_list(
            xmltodict.parse(response).get("response", {}).get("reply", [])
        )

    async def get_message_composition(self, prompt: str) -> str:
        prompt = self.get_prompt(TaskType.MESSAGE_COMPOSITION, prompt)
        response = await self.generate_and_parse_xml(prompt)
        return xmltodict.parse(response).get("response", {}).get("message", "")

    async def get_text_completion(self, initial_phrase: str) -> str:
        prompt = self.get_prompt(TaskType.TEXT_COMPLETION, initial_phrase)
        response = await self.generate_and_parse_xml(prompt)
        return xmltodict.parse(response).get("response", {}).get("completion", "")

    async def get_rephrasing(self, original_text: str) -> str:
        prompt = self.get_prompt(TaskType.REPHRASING, original_text)
        response = await self.generate_and_parse_xml(prompt)
        return xmltodict.parse(response).get("response", {}).get("rephrase", "")

    async def get_summarization(self, original_text: str) -> str:
        prompt = self.get_prompt(TaskType.SUMMARIZATION, original_text)
        response = await self.generate_and_parse_xml(prompt)
        return xmltodict.parse(response).get("response", {}).get("summary", "")

    async def get_one_word_replies(self, original_text: str) -> list[str]:
        prompt = self.get_prompt(TaskType.ONE_WORD_REPLIES, original_text)
        response = await self.generate_and_parse_xml(prompt)
        return self._ensure_list(
            xmltodict.parse(response).get("response", {}).get("one_word_reply", [])
        )

    def _extract_xml_string(self, xml_string) -> str:
        start_index = xml_string.find("```xml")
        end_index = xml_string.find("```", start_index + 1)
        return xml_string[start_index + 6 : end_index]

    def _ensure_list(self, value: list[str] | str) -> list[str]:
        if isinstance(value, str):
            return [value]
        return value


ollama_service = OllamaService()
