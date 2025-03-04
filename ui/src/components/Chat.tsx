import { useAtom } from "jotai";
import { MoreVertical, Paperclip, Search, Send, Smile } from "lucide-react";
import React, { useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { MessageStatus, MessageType } from "../enums";
import {
  contactsAtom,
  newMessageAtom,
  selectedChatAtom,
  sendMessageAtom,
} from "../store/atoms";
import { Message } from "../types";
import MessageStatusIcon from "./MessageStatusIcon";
import Sidebar from "./Sidebar";
import useScrollToBottom from "../hooks/useScrollToBottom";

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
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      {selectedChat ? (
        <>
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="h-16 border-b bg-white flex items-center justify-between px-4">
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
              <div className="flex space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <Search className="h-5 w-5 text-gray-500" />
                </button>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-5 w-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 bg-[#e5ded8] p-4 pb-0 overflow-y-auto">
              <div ref={scrollRef} className="space-y-4 pb-4">
                {contacts[selectedChat].messages.map((message: Message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sent ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
                        message.sent ? "bg-green-100" : "bg-white"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <div className="mt-1 flex justify-end items-center space-x-1">
                        <span className="text-xs text-gray-500 block">
                          {message.time}
                        </span>
                        {message.sent ? (
                          <MessageStatusIcon status={message.status} />
                        ) : (
                          <></>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <form
              onSubmit={handleSendMessage}
              className="h-16 bg-white px-4 flex items-center space-x-4"
            >
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Smile className="h-6 w-6 text-gray-500" />
              </button>
              <button
                type="button"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Paperclip className="h-6 w-6 text-gray-500" />
              </button>
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-green-500"
              />
              <button
                type="submit"
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <Send className="h-6 w-6 text-gray-500" />
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
