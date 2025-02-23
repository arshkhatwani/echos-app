import { useAtom } from "jotai";
import Login from "./components/Login";
import Chat from "./components/Chat";
import { isAuthenticatedAtom } from "./store/atoms";
import useWebSocket from "./hooks/useWebsocket";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useAtom(isAuthenticatedAtom);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  useWebSocket();

  return (
    <div className="h-screen bg-gray-100">
      {!isAuthenticated ? <Login onLogin={handleLogin} /> : <Chat />}
    </div>
  );
}

export default App;
