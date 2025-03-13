import { useAtom } from "jotai";
import { useEffect, useRef } from "react";
import { chat } from "../api/chat";
import { API_CONFIG, SAMPLE_AVATAR } from "../config/constants";
import { MessageStatus, MessageType } from "../enums";
import {
  accessTokenAtom,
  contactsAtom,
  deliveredMessageAtom,
  isAuthenticatedAtom,
  readMessageAtom,
  receiveMessageAtom,
  selectedChatAtom,
  sendMessageAtom,
  startWebSocketAtom,
} from "../store/atoms";
import { Message, ReadMessageRequest } from "../types";

function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const [accessToken] = useAtom(accessTokenAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [startWebSocket] = useAtom(startWebSocketAtom);
  const [selectedChat] = useAtom(selectedChatAtom);
  const [contacts, setContacts] = useAtom(contactsAtom);
  const [sendMessage, setSendMessage] = useAtom(sendMessageAtom);
  const [receiveMessage, setReceiveMessage] = useAtom(receiveMessageAtom);
  const [deliveredMessage, setDeliveredMessage] = useAtom(deliveredMessageAtom);
  const [readMessage, setReadMessage] = useAtom(readMessageAtom);

  const sendReadMessageRequest = (userId: string) => {
    const wsCurrent = ws.current;
    if (!wsCurrent) return;

    const message: ReadMessageRequest = {
      userId: userId,
      type: MessageType.READ_MESSAGE,
    };

    wsCurrent.send(JSON.stringify(message));
  };

  const updateContacts = async (contactId: string) => {
    const data = await chat.addUserInChatLibrary(
      contactId,
      accessToken as string,
    );
    const updatedContacts = {
      ...contacts,
      [contactId]: {
        id: contactId,
        name: data.username,
        lastMessage: "",
        time: "",
        avatar: SAMPLE_AVATAR,
        messages: [],
      },
    };
    return updatedContacts;
  };

  useEffect(() => {
    if (!startWebSocket) return;
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
          setReceiveMessage((prev) => [
            ...prev,
            {
              senderId: data.sender_id,
              message: data.message,
              type: MessageType.SEND_MESSAGE,
              id: data.id,
              timestamp: data.timestamp,
            },
          ]);
          break;
        case MessageType.DELIVERED_MESSAGE:
          setDeliveredMessage({
            receiverId: data.receiver_id,
            type: MessageType.DELIVERED_MESSAGE,
            id: data.id,
          });
          break;
        case MessageType.READ_MESSAGE:
          setReadMessage({
            userId: data.user_id,
            type: MessageType.READ_MESSAGE,
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
  }, [isAuthenticated, startWebSocket]);

  useEffect(() => {
    if (!sendMessage) return;

    const wsCurrent = ws.current;
    if (!wsCurrent) return;

    wsCurrent.send(JSON.stringify(sendMessage));

    setSendMessage(null);
  }, [sendMessage]);

  useEffect(() => {
    if (!receiveMessage.length) return;

    const handleReceiveMessage = async () => {
      const contactId = receiveMessage[0].senderId;
      const updatedContacts = !contacts[contactId]
        ? await updateContacts(contactId)
        : { ...contacts };

      const message: Message = {
        id: receiveMessage[0].id,
        content: receiveMessage[0].message,
        time: receiveMessage[0].timestamp,
        sent: false,
        status: MessageStatus.SENT,
      };

      updatedContacts[contactId] = {
        ...updatedContacts[contactId],
        messages: [...updatedContacts[contactId].messages, message],
        lastMessage: message.content,
        time: message.time,
      };

      setContacts(updatedContacts);

      setReceiveMessage((prev) => prev.slice(1));

      // Send read message request current open chat is same as this contact
      if (selectedChat === contactId) {
        sendReadMessageRequest(selectedChat);
      }
    };

    handleReceiveMessage().catch(console.error);
  }, [receiveMessage]);

  useEffect(() => {
    if (!deliveredMessage) return;

    const contactId = deliveredMessage.receiverId;
    if (!contacts[contactId])
      //  TODO: Handle non added user
      // Doesn't make sense right now since user must already be added to contacts
      // since we're receiving a delivered message event
      return;

    const updatedContacts = { ...contacts };
    updatedContacts[contactId] = {
      ...updatedContacts[contactId],
      messages: updatedContacts[contactId].messages.map((message: Message) => {
        if (message.id === deliveredMessage.id) {
          return {
            ...message,
            status: MessageStatus.DELIVERED,
          };
        }
        return message;
      }),
    };
    setContacts(updatedContacts);

    setDeliveredMessage(null);
  }, [deliveredMessage]);

  useEffect(() => {
    sendReadMessageRequest(selectedChat);
  }, [selectedChat]);

  useEffect(() => {
    if (!readMessage) return;

    const contactId = readMessage.userId;
    if (!contacts[contactId])
      //  TODO: Handle non added user
      // Doesn't make sense right now since user must already be added to contacts
      // since we're receiving a read message event
      return;

    const updatedContacts = { ...contacts };
    updatedContacts[contactId] = {
      ...updatedContacts[contactId],
      messages: updatedContacts[contactId].messages.map((message: Message) => {
        return { ...message, status: MessageStatus.READ };
      }),
    };
    setContacts(updatedContacts);

    setReadMessage(null);
  }, [readMessage]);
}

export default useWebSocket;
