import { Message } from "../types";
import MessageStatusIcon from "./MessageStatusIcon";
import SummariseBtn from "./SummariseBtn";

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div className={`flex ${message.sent ? "justify-end" : "justify-start"}`}>
      <div
        className={`rounded-lg p-3 max-w-xs lg:max-w-md ${
          message.sent ? "bg-green-100" : "bg-white"
        }`}
      >
        <p className="text-sm">{message.content}</p>
        <div className="mt-1 flex justify-end items-center space-x-1">
          <span className="text-xs text-gray-500 block">{message.time}</span>
          {message.sent ? <MessageStatusIcon status={message.status} /> : <></>}
        </div>
        {!message.sent && message.content.split(" ").length > 10 && (
          <SummariseBtn message={message.content} />
        )}
      </div>
    </div>
  );
}
