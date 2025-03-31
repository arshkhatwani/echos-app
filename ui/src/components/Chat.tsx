import { useAtom } from "jotai";
import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { MessageStatus, MessageType } from "../enums";
import useScrollToBottom from "../hooks/useScrollToBottom";
import {
  contactsAtom,
  newMessageAtom,
  selectedChatAtom,
  sendMessageAtom,
} from "../store/atoms";
import { Message } from "../types";
import ChatMessage from "./ChatMessage";
import Sidebar from "./Sidebar";

const Chat = () => {
  const [contacts, setContacts] = useAtom(contactsAtom);
  const [selectedChat] = useAtom(selectedChatAtom);
  const [newMessage, setNewMessage] = useAtom(newMessageAtom);
  const [, setSendMessage] = useAtom(sendMessageAtom);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  useScrollToBottom(scrollRef.current, contacts);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: uuidv4(),
      content: newMessage.trim(),
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sent: true,
      status: MessageStatus.SENT,
    };

    const updatedContacts = { ...contacts };
    updatedContacts[selectedChat] = {
      ...updatedContacts[selectedChat],
      messages: [...updatedContacts[selectedChat].messages, message],
      lastMessage: newMessage,
      time: message.time,
    };

    setSendMessage({
      message: newMessage.trim(),
      receiverId: updatedContacts[selectedChat].id,
      type: MessageType.SEND_MESSAGE,
      id: message.id,
      timestamp: message.time,
    });

    setContacts(updatedContacts);
    setNewMessage("");
  };

  return (
    <div className="flex h-screen">
      <Sidebar />

      {selectedChat ? (
        <>
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="h-16 border-b border-neutral flex items-center justify-between px-4">
              <div className="flex items-center">
                <img
                  className="h-10 w-10 rounded-full"
                  src={contacts[selectedChat].avatar}
                  alt={contacts[selectedChat].name}
                />
                <div className="ml-4">
                  <h3 className="text-sm font-medium">
                    {contacts[selectedChat].name}
                  </h3>
                  <p className="text-xs text-gray-500">Online</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 pb-0 bg-base-300 overflow-y-auto">
              <div ref={scrollRef} className="space-y-4 pb-4">
                {contacts[selectedChat].messages.map((message: Message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="h-16  px-4 flex items-center space-x-4"
            >
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="input"
              />
              <button
                type="submit"
                className="btn btn-soft btn-primary waves waves-primary btn-circle btn-lg"
              >
                <span className="icon-[tabler--send] size-5"></span>
              </button>
            </form>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Chat;
