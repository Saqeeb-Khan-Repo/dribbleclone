// Components/Auth/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, token, initializing } = useAuth();

  // Wait until AuthContext finishes restoring from localStorage
  if (initializing) {
    return <div className="loading">Checking session...</div>;
  }

  // If no token/user after init, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
