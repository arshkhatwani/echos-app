import { useEffect, useRef } from "react";
import { API_CONFIG } from "../config/constants";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  isAuthenticatedAtom,
  sendMessageAtom,
} from "../store/atoms";

function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const [accessToken] = useAtom(accessTokenAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);
  const [sendMessage, setSendMessage] = useAtom(sendMessageAtom);

  useEffect(() => {
    if (!isAuthenticated || !accessToken) return;

    ws.current = new WebSocket(
      `${API_CONFIG.WEBSOCKET_URL}?token=${accessToken}`,
    );
    ws.current.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.current.onmessage = (event) => {
      console.log("Received message from server:", event.data);
    };

    const wsCurrent = ws.current;

    return () => {
      wsCurrent?.close();
    };
  }, [isAuthenticated]);

  useEffect(() => {
    if (!sendMessage) return;

    const wsCurrent = ws.current;
    if (!wsCurrent) return;

    wsCurrent.send(JSON.stringify(sendMessage));
    console.log(sendMessage);

    setSendMessage(null);
  }, [sendMessage]);
}

export default useWebSocket;
