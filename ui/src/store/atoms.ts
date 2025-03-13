import { atom } from "jotai";
import {
  ContactsMap,
  DeliveredMessageRequest,
  ReadMessageRequest,
  ReceiveMessageRequest,
  SendMessageRequest,
  UnknownUser,
  User,
} from "../types";

export const accessTokenAtom = atom<string | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);

export const startWebSocketAtom = atom<boolean>(false);

export const currentUserAtom = atom<User>({
  name: "Alex Thompson",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
});

export const contactsAtom = atom<ContactsMap>({});

export const selectedChatAtom = atom<string>("");
export const newMessageAtom = atom<string>("");

export const sendMessageAtom = atom<SendMessageRequest | null>(null);
export const receiveMessageAtom = atom<ReceiveMessageRequest[]>([]);
export const deliveredMessageAtom = atom<DeliveredMessageRequest | null>(null);
export const readMessageAtom = atom<ReadMessageRequest | null>(null);
export const unknownUserAtom = atom<UnknownUser | null>(null);
