// auth/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
    role: null,
  });
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) {
      try {
        const parsed = JSON.parse(raw);

        // optional: validate JWT expiry
        if (parsed.token) {
          const payload = jwtDecode(parsed.token);
          const now = Date.now() / 1000;
          if (payload.exp && payload.exp < now) {
            localStorage.removeItem("auth");
            setInitializing(false);
            return;
          }
        }

        setAuth(parsed);
      } catch {
        localStorage.removeItem("auth");
      }
    }
    setInitializing(false);
  }, []);

  const login = ({ accessKey }) => {
    const payload = jwtDecode(accessKey); // { userID, username, role, iat, exp }

    const next = {
      token: accessKey,
      user: {
        id: payload.userID,
        username: payload.username,
      },
      role: payload.role,
    };

    setAuth(next);
    localStorage.setItem("auth", JSON.stringify(next));
  };

  const logout = () => {
    setAuth({ token: null, user: null, role: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
