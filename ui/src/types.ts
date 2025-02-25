import { MessageType } from "./enums";

export interface Message {
  id: number;
  content: string;
  time: string;
  sent: boolean;
}

export interface Contact {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  messages: Message[];
}

export type ContactsMap = Record<any, any>;

export interface User {
  name: string;
  avatar: string;
}

export interface SendMessageRequest {
  message: string;
  receiverId: string;
  type: MessageType;
}
