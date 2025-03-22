from pydantic import BaseModel, Field


class MessageRequest(BaseModel):
    message: str = Field(min_length=1)


class ReplySuggestionsResponse(BaseModel):
    reply: list[str]


class MessageCompositionResponse(BaseModel):
    message: str
