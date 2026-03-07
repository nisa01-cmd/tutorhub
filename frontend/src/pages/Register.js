import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "student",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const registerUser = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await axios.post(
        "http://127.0.0.1:8000/api/register/",
        form
      );

      alert("Registration successful!");
      navigate("/");

    } catch (err) {
      console.log(err.response?.data);
      setError("Registration failed. Check console.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Register</h2>

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
        />

        <input
          className="auth-input"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          className="auth-input"
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <select
          className="auth-input"
          name="role"
          onChange={handleChange}
        >
          <option value="student">Student</option>
          <option value="class_owner">Class Owner</option>
        </select>

        <button
          className="auth-button"
          onClick={registerUser}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

      </div>
    </div>
  );
}

export default Register;