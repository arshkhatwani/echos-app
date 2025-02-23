import { useEffect, useRef } from "react";
import { API_CONFIG } from "../config/constants";
import { useAtom } from "jotai";
import { accessTokenAtom, isAuthenticatedAtom } from "../store/atoms";

function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const [accessToken] = useAtom(accessTokenAtom);
  const [isAuthenticated] = useAtom(isAuthenticatedAtom);

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
}

export default useWebSocket;
