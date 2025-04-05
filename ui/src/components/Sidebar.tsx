import { useAtom } from "jotai";
import {
  contactsAtom,
  currentUserAtom,
  selectedChatAtom,
} from "../store/atoms";
import ProfileDropdown from "./ProfileDropdown";
import SearchUsers from "./SearchUsers";
import useChatContacts from "../hooks/useChatContacts";

function Sidebar() {
  const [currentUser] = useAtom(currentUserAtom);
  const [contacts] = useAtom(contactsAtom);
  const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);

  useChatContacts();

  return (
    <>
      <div className="w-1/3 border-r border-neutral">
        <div className="h-16 border-b border-neutral flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <img
              className="h-10 w-10 rounded-full"
              src={currentUser.avatar}
              alt="Your avatar"
            />
            <span className="font-medium">{currentUser.name}</span>
          </div>
          <div className="flex space-x-2">
            <ProfileDropdown />
          </div>
        </div>

        <SearchUsers />

        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {Object.values(contacts).map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedChat(contact.id)}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-neutral ${
                selectedChat === contact.id ? "bg-neutral" : ""
              }`}
            >
              <img
                className="h-12 w-12 rounded-full"
                src={contact.avatar}
                alt={contact.name}
              />
              <div className="ml-4 flex-1">
                <div className="flex justify-between">
                  <h3 className="text-sm font-medium">{contact.name}</h3>
                  <span className="text-xs text-gray-500">{contact.time}</span>
                </div>
                <p className="text-sm text-primary truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
