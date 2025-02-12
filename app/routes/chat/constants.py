from enum import StrEnum


class MessageType(StrEnum):
    SEND_MESSAGE = "send_message"
    DELIVERED_MESSAGE = "delivered_message"
    READ_MESSAGE = "read_message"
