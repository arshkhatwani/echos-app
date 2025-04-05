import { useAtom } from "jotai";
import React, { useState } from "react";
import { auth } from "../api/auth";
import {
  accessTokenAtom,
  currentUserAtom,
  isAuthenticatedAtom,
} from "../store/atoms";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [, setAccessToken] = useAtom(accessTokenAtom);
  const [, setIsAuthenticated] = useAtom(isAuthenticatedAtom);
  const [currentUser, setCurrentUser] = useAtom(currentUserAtom);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await auth.login({ username, password });
      setAccessToken(response.access_token);
      setIsAuthenticated(true);
      setCurrentUser({ ...currentUser, name: username });
      onLogin();
    } catch (err: any) {
      setError(err.response?.data?.message || "An error occurred during login");
    }
  };

  return (
    <div className="bg-base-200 min-h-screen flex items-center justify-center p-4">
      <div className="bg-base-100 max-w-md w-full space-y-8 p-8 rounded-xl shadow-lg">
        <div className="text-center">
          <span className="icon-[tabler--message-circle] size-20"></span>
          <h2 className="text-base-content text-3xl">
            {isRegister ? "Create your account" : "Welcome back"}
          </h2>
          <h6 className="text-base-content text-base">
            {isRegister
              ? "Sign up to start chatting"
              : "Sign in to continue to Echos"}
          </h6>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="alert alert-soft alert-error" role="alert">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="input-floating mb-6">
              <input
                type="text"
                placeholder="Enter your username"
                className="input"
                id="username"
                name="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="input-floating-label" htmlFor="username">
                Username
              </label>
            </div>

            <div className="input-floating">
              <input
                type="password"
                placeholder="Enter your password"
                className="input"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label className="input-floating-label" htmlFor="password">
                Password
              </label>
            </div>
          </div>

          <div>
            <button type="submit" className="btn btn-primary btn-block">
              {isRegister ? "Sign up" : "Sign in"}
            </button>
          </div>
        </form>

        <div className="text-center">
          <a
            className="link link-primary link-animated font-light"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister
              ? "Already have an account? Sign in"
              : "Don't have an account? Sign up"}
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
