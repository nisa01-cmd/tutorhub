import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "../styles/Auth.css";

function Login({ setToken }) {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const login = async () => {
    if (!form.username || !form.password) {
      setError("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        form
      );

      const token = res.data.access;
      const decoded = jwtDecode(token);

      localStorage.setItem("token", token);
      setToken(token);

      // Role-based redirect
      if (decoded.role === "student") {
        navigate("/student/dashboard");
      } else if (decoded.role === "class_owner") {
        navigate("/class-owner/dashboard");
      } else if (decoded.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }

    } catch (err) {
      setError("Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>

        {error && (
          <p style={{ color: "red", marginBottom: "10px" }}>
            {error}
          </p>
        )}

        <input
          className="auth-input"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />

        <input
          className="auth-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />

        <button
          className="auth-button"
          onClick={login}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p style={{ marginTop: "15px", textAlign: "center" }}>
          Don’t have an account?{" "}
          <span
            style={{ color: "#2563eb", cursor: "pointer" }}
            onClick={() => navigate("/register")}
          >
            Register
          </span>
        </p>

      </div>
    </div>
  );
}

export default Login;