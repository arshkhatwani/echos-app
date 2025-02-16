import React, { useState } from "react";
import Login from "./components/Login";
import Chat from "./components/Chat";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="h-screen bg-gray-100">
      {!isLoggedIn ? <Login onLogin={handleLogin} /> : <Chat />}
    </div>
  );
}

export default App;
