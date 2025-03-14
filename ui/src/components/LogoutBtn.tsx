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
    <button
      onClick={handleLogout}
      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center"
    >
      <span>Logout</span>
    </button>
  );
}

export default LogoutBtn;
