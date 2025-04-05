import { useAtom } from "jotai";
import { accessTokenAtom, isAuthenticatedAtom } from "../store/atoms";

function LogoutBtn() {
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleLogout = () => {
    setAccessToken(null);
    setIsAuthenticated(false);
    window.location.reload();
  };

  return (
    <li>
      <a onClick={handleLogout} className="dropdown-item" href="">
        Logout
      </a>
    </li>
  );
}

export default LogoutBtn;
