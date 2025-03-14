import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  accessTokenAtom,
  currentUserAtom,
  isAuthenticatedAtom,
} from "../store/atoms";
import { auth } from "../api/auth";

export default function useAutoLogin() {
  const [accessToken] = useAtom(accessTokenAtom);
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [, setCurrentUser] = useAtom(currentUserAtom);

  useEffect(() => {
    if (isAuthenticated) return;
    if (!accessToken) return;

    auth.getUser(accessToken).then((user) => {
      setCurrentUser((prev) => ({ ...prev, name: user.username }));
      setIsAuthenticated(true);
    });
  }, [accessToken]);
}
