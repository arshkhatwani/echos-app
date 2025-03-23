from pydantic import BaseModel, Field


class MessageRequest(BaseModel):
    message: str = Field(min_length=1)


class ReplySuggestionsResponse(BaseModel):
    reply: list[str]


class MessageCompositionResponse(BaseModel):
    message: str


class TextCompletionResponse(BaseModel):
    completion: str


class RephraseResponse(BaseModel):
    rephrase: str


class SummarizationResponse(BaseModel):
    summary: str


class OneWordRepliesResponse(BaseModel):
    one_word_replies: list[str]
