import { useAtom } from "jotai";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { isAuthenticatedAtom } from "./store/atoms";
import useWebSocket from "./hooks/useWebSocket";
import useAutoLogin from "./hooks/useAutoLogin";
import useFlyonUI from "./hooks/useFlyonUI";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useFlyonUI();
  useAutoLogin();
  useWebSocket();

  return (
    <div className="h-screen">
      {!isAuthenticated ? <Login onLogin={handleLogin} /> : <Chat />}
    </div>
  );
}

export default App;
