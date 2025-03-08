import { useAtom } from "jotai";
import { useEffect } from "react";
import { chat } from "../api/chat";
import { SAMPLE_AVATAR } from "../config/constants";
import {
  accessTokenAtom,
  contactsAtom,
  startWebSocketAtom,
} from "../store/atoms";
import { Contact } from "../types";

export default function useChatContacts() {
  const [accessToken] = useAtom(accessTokenAtom);
  const [contacts, setContacts] = useAtom(contactsAtom);
  const [, setStartWebSocket] = useAtom(startWebSocketAtom);

  useEffect(() => {
    if (!accessToken) return;

    chat.getChatLibrary(accessToken).then((users) => {
      const updatedContacts = { ...contacts };
      users.forEach((user) => {
        const contact: Contact = {
          id: user.user_id,
          name: user.username,
          lastMessage: "",
          time: "",
          avatar: SAMPLE_AVATAR,
          messages: [],
        };
        updatedContacts[user.user_id] = contact;
      });
      setContacts(updatedContacts);
      setStartWebSocket(true);
    });
  }, []);
}
