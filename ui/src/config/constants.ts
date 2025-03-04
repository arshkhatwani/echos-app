export const API_CONFIG = {
  SERVER_URL: "http://localhost:8000",
  LOGIN_ENDPOINT: "/auth/login",
  SEARCH_USERS_ENDPOINT: "/chat/users",
  WEBSOCKET_URL: "ws://localhost:8000/chat/ws",
  GET_CHAT_LIBRARY_ENDPOINT: "/chat/library",
  ADD_USER_IN_CHAT_LIBRARY_ENDPOINT: "/chat/library/user",
} as const;

export const SAMPLE_AVATAR =
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80";
