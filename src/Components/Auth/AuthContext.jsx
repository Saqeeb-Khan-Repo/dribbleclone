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

  useEffect(() => {
    const raw = localStorage.getItem("auth");
    if (raw) setAuth(JSON.parse(raw));
  }, []);

  const login = ({ accessKey }) => {
    const payload = jwtDecode(accessKey); // { userID, username, role, iat, exp }

    const next = {
      token: accessKey,
      user: {
        id: payload.userID,
        username: payload.username,
      },
      role: payload.role, // e.g. "admin"
    };

    setAuth(next);
    localStorage.setItem("auth", JSON.stringify(next));
  };

  const logout = () => {
    setAuth({ token: null, user: null, role: null });
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ ...auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
