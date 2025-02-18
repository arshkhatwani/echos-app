import { atom } from "jotai";
import { Contact, User } from "../types";

export const accessTokenAtom = atom<string | null>(null);
export const isAuthenticatedAtom = atom<boolean>(false);

export const currentUserAtom = atom<User>({
  name: "Alex Thompson",
  avatar:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
});

export const contactsAtom = atom<Contact[]>([
  {
    id: 0,
    name: "John Doe",
    lastMessage: "Hey, how are you?",
    time: "10:30 AM",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    messages: [
      { id: 1, content: "Hey! How are you?", time: "10:30 AM", sent: false },
      {
        id: 2,
        content: "I'm good, thanks! How about you?",
        time: "10:31 AM",
        sent: true,
      },
      {
        id: 3,
        content: "Great! Did you check the project I sent?",
        time: "10:32 AM",
        sent: false,
      },
      {
        id: 4,
        content: "Yes, I did! It looks amazing!",
        time: "10:33 AM",
        sent: true,
      },
    ],
  },
  {
    id: 1,
    name: "Jane Smith",
    lastMessage: "The meeting is at 3 PM",
    time: "9:15 AM",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    messages: [
      {
        id: 1,
        content: "Hi Jane, about the meeting today...",
        time: "9:10 AM",
        sent: true,
      },
      {
        id: 2,
        content: "The meeting is at 3 PM",
        time: "9:15 AM",
        sent: false,
      },
      { id: 3, content: "Perfect, thanks!", time: "9:16 AM", sent: true },
    ],
  },
  {
    id: 2,
    name: "Mike Johnson",
    lastMessage: "Thanks for your help!",
    time: "Yesterday",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    messages: [
      {
        id: 1,
        content: "Hey Mike, could you help me with the database issue?",
        time: "Yesterday",
        sent: true,
      },
      {
        id: 2,
        content: "Sure, what seems to be the problem?",
        time: "Yesterday",
        sent: false,
      },
      {
        id: 3,
        content: "The queries are taking too long to execute",
        time: "Yesterday",
        sent: true,
      },
      {
        id: 4,
        content: "Let's add some indexes to improve performance",
        time: "Yesterday",
        sent: false,
      },
      {
        id: 5,
        content: "Thanks for your help!",
        time: "Yesterday",
        sent: false,
      },
    ],
  },
]);

export const selectedChatAtom = atom<number>(0);
export const newMessageAtom = atom<string>("");
