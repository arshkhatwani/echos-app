import ollama
from app.config import config
from app.services.ai.ollama.prompt import prompt as system_prompt

ollama.create(model="echo-responder", from_=config.BASE_AI_MODEL, system=system_prompt)
