import { useAtom } from "jotai";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { chat, SearchUserResponse } from "../api/chat";
import { SAMPLE_AVATAR } from "../config/constants";
import { useDebounceAsync } from "../hooks/useDebounceAsync";
import { accessTokenAtom, contactsAtom, selectedChatAtom } from "../store/atoms";

function SearchUsers() {
  const searchUsers = useDebounceAsync(chat.searchUsers, 2000);

  const [accessToken] = useAtom(accessTokenAtom);
  const [contacts, setContacts] = useAtom(contactsAtom);
  const [, setSelectedChat] = useAtom(selectedChatAtom);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchUserResponse[]>([]);

  const addUserToContacts = (user: SearchUserResponse) => {
    const contactsCopy = { ...contacts };
    contactsCopy[user.user_id] = {
      id: user.user_id,
      name: user.username,
      lastMessage: "",
      time: new Date().toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      avatar: SAMPLE_AVATAR,
      messages: [],
    };
    setContacts(contactsCopy);
    setSelectedChat(user.user_id);
    chat.addUserInChatLibrary(user.user_id, accessToken as string);
  };

  useEffect(() => {
    if (!searchQuery.trim() || !accessToken) return;
    searchUsers(searchQuery.trim(), accessToken).then((users) => {
      setSearchResults(users);
    });
  }, [searchQuery]);

  return (
    <div className="p-2 relative">
      <div className="relative">
        <input
          type="text"
          placeholder="Search chats"
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      {searchQuery.trim() && (
        <div className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-[300px] overflow-y-auto z-50">
          {searchResults.length > 0 ? (
            searchResults.map((contact) => (
              <div
                key={contact.user_id}
                onClick={() => {
                  addUserToContacts(contact);
                  setSearchQuery("");
                }}
                className="flex items-center px-4 py-3 cursor-pointer hover:bg-gray-50"
              >
                <img
                  className="h-10 w-10 rounded-full"
                  src={
                    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  }
                  alt={contact.username}
                />
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">
                    {contact.username}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500">
              No contacts found
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SearchUsers;
