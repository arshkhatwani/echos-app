import { MessageStatus, MessageType } from "./enums";

export interface Message {
  id: string;
  content: string;
  time: string;
  sent: boolean;
  status: MessageStatus;
}

export interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  messages: Message[];
}

export type ContactsMap = Record<any, Contact>;

export interface User {
  name: string;
  avatar: string;
}

export interface SendMessageRequest {
  message: string;
  receiverId: string;
  type: MessageType;
  id: string;
  timestamp: string;
}

export interface ReceiveMessageRequest {
  senderId: string;
  message: string;
  type: MessageType;
  id: string;
  timestamp: string;
}

export interface DeliveredMessageRequest {
  receiverId: string;
  type: MessageType;
  id: string;
}

export interface ReadMessageRequest {
  userId: string;
  type: MessageType;
}

export interface UnknownUser {
  userId: string;
}
