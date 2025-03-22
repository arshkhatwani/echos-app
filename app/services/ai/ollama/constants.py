from enum import StrEnum


class TaskType(StrEnum):
    REPLY_SUGGESTIONS = "Reply Suggestions"
    MESSAGE_COMPOSITION = "Message Composition"
    TEXT_COMPLETION = "Text Completion"
    REPHRASING = "Rephrasing"
    SUMMARIZATION = "Summarization"
    ONE_WORD_REPLIES = "One word replies"
