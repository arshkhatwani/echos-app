import { MessageStatus } from "../enums";

export default function MessageStatusIcon({
  status,
}: {
  status: MessageStatus;
}) {
  switch (status) {
    case MessageStatus.SENT:
      return (
        <span className="icon-[tabler--check] h-4 w-4 align-bottom"></span>
      );
    case MessageStatus.DELIVERED:
      return (
        <span className="icon-[tabler--checks] h-4 w-4 align-bottom"></span>
      );
    case MessageStatus.READ:
      return (
        <span className="icon-[tabler--checks] h-4 w-4 text-success align-bottom"></span>
      );
    default:
      return (
        <span className="icon-[tabler--clock] h-4 w-4 align-bottom"></span>
      );
  }
}
