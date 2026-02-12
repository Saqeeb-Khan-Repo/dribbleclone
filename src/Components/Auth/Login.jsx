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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginRequest(form); // { message, success, accessKey }
      login(data); // save token + role in context
      navigate("/"); // redirect to home page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login_container">
      <form onSubmit={handleSubmit} autoComplete="off" noValidate>
        <h1>Login to Continue</h1>

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

        {error && (
          <p className="login_error" style={{ color: "red" }}>
            {error}
          </p>
        )}

        <button type="submit" className="login_btn">
          Login
        </button>

        <p className="login_register_text">
          Don&apos;t have an account?
          <Link to="/register" className="login_register_link">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
