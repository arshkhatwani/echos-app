export interface Message {
  id: number;
  content: string;
  time: string;
  sent: boolean;
}

export interface Contact {
  id: number;
  name: string;
  lastMessage: string;
  time: string;
  avatar: string;
  messages: Message[];
}

export interface User {
  name: string;
  avatar: string;
}
