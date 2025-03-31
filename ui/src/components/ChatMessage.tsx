import { Message } from "../types";
import MessageStatusIcon from "./MessageStatusIcon";
import SummariseBtn from "./SummariseBtn";

export default function ChatMessage({ message }: { message: Message }) {
  return (
    <div className={`chat ${message.sent ? "chat-sender" : "chat-receiver"}`}>
      <div className="chat-header text-base-content">
        <time className="text-base-content/50">{message.time}</time>
      </div>
      <div className="chat-bubble">{message.content}</div>
      <div className="chat-footer text-base-content/50">
        {message.sent ? <MessageStatusIcon status={message.status} /> : <></>}
      </div>
    </div>
  );
}
