import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { API_CONFIG } from "../config/constants";
import { MessageType } from "../enums";
import {
  accessTokenAtom,
  contactsAtom,
  isAuthenticatedAtom,
  receiveMessageAtom,
  sendMessageAtom,
} from "../store/atoms";
import { Message } from "../types";

function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const [accessToken] = useAtom(accessTokenAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [sendMessage, setSendMessage] = useAtom(sendMessageAtom);
  const [contacts, setContacts] = useAtom(contactsAtom);
  const [receiveMessage, setReceiveMessage] = useAtom(receiveMessageAtom);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    ws.current = new WebSocket(
      `${API_CONFIG.WEBSOCKET_URL}?token=${accessToken}`,
    );
    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      console.log("Received message from server:", event.data);
      const data = JSON.parse(event.data);
      switch (data.type) {
        case MessageType.SEND_MESSAGE:
          setReceiveMessage({
            senderId: data.sender_id,
            message: data.message,
            type: MessageType.SEND_MESSAGE,
            id: data.id,
          });
          break;
        default:
          console.log("Unknown message type:", data.type);
      }
    };
    const wsCurrent = ws.current;

    return () => {
      wsCurrent?.close();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!sendMessage) return;

    const wsCurrent = ws.current;
    if (!wsCurrent) return;

    wsCurrent.send(JSON.stringify(sendMessage));
    console.log(sendMessage);

    setSendMessage(null);
  }, [sendMessage]);

  useEffect(() => {
    if (!receiveMessage) return;

    const contactId = receiveMessage.senderId;
    if (!contacts[contactId])
      //  TODO: Handle non added user
      return;

    const message: Message = {
      id: contacts[contactId].messages.length + 1,
      content: receiveMessage.message,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: false,
    };

    const updatedContacts = { ...contacts };
    updatedContacts[contactId] = {
      ...updatedContacts[contactId],
      messages: [...updatedContacts[contactId].messages, message],
      lastMessage: message.content,
      time: message.time,
    };
    console.log(updatedContacts);
    setContacts(updatedContacts);

    setReceiveMessage(null);
  }, [receiveMessage]);
}

export default useWebSocket;
