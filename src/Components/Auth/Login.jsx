// Login.jsx
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../api/Auth";
import { useAuth } from "../Auth/AuthContext";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [popup, setPopup] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setPopup({ type: "", message: "" });

    try {
      const data = await loginRequest(form); // { message, success, accessKey }
      login(data); // save token + role in context

      setPopup({ type: "success", message: "Login successful!" });
      setTimeout(() => {
        setPopup({ type: "", message: "" });
        navigate("/"); // redirect to home page
      }, 1500);
    } catch (err) {
      const msg = err.message || "Login failed. Please try again.";
      setError(msg);
      setPopup({ type: "error", message: msg });
      setTimeout(() => {
        setPopup({ type: "", message: "" });
      }, 3000);
    }
  };

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <h1>Login to Continue Dribble</h1>

        <input
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          placeholder="Username"
          className="login_input"
          autoComplete="username"
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Password"
          className="login_input"
        />

        {error && <p className="login_error">{error}</p>}

        <button type="submit" className="login_btn">
          Login
        </button>

        <p className="login_register_text">
          Don&apos;t have an account?
          <Link to="/register" className="login_register_link">
            Register
          </Link>
        </p>
        {popup.message && (
          <div className={popup.type === "success" ? "success" : "error"}>
            {popup.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
