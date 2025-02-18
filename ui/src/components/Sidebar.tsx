import { useAtom } from "jotai";
import { Search } from "lucide-react";
import {
  contactsAtom,
  currentUserAtom,
  selectedChatAtom,
} from "../store/atoms";
import ProfileDropdown from "./ProfileDropdown";

function Sidebar() {
  const [currentUser] = useAtom(currentUserAtom);
  const [contacts, setContacts] = useAtom(contactsAtom);
  const [selectedChat, setSelectedChat] = useAtom(selectedChatAtom);

  return (
    <>
      <div className="w-1/3 border-r bg-white">
        <div className="h-16 border-b flex items-center justify-between px-4">
          <div className="flex items-center space-x-3">
            <img
              className="h-10 w-10 rounded-full"
              src={currentUser.avatar}
              alt="Your avatar"
            />
            <span className="font-medium text-gray-900">
              {currentUser.name}
            </span>
          </div>
          <div className="flex space-x-2">
            <ProfileDropdown />
          </div>
        </div>

        <div className="p-2">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        <div className="overflow-y-auto h-[calc(100vh-8rem)]">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              onClick={() => setSelectedChat(contact.id)}
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                selectedChat === contact.id ? "bg-gray-100" : ""
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
                <p className="text-sm text-gray-500 truncate">
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
