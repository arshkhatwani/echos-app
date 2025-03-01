import { MessageStatus } from "../enums";
import { Check, Clock, CheckCheck } from "lucide-react";

export default function MessageStatusIcon({
  status,
}: {
  status: MessageStatus;
}) {
  switch (status) {
    case MessageStatus.SENT:
      return <Check className="h-3 w-3 text-gray-500" />;
    case MessageStatus.DELIVERED:
      return <CheckCheck className="h-3 w-3 text-gray-500" />;
    case MessageStatus.READ:
      return <CheckCheck className="h-3 w-3 text-sky-500" />;
    default:
      return <Clock className="h-3 w-3 text-gray-500" />;
  }
}
