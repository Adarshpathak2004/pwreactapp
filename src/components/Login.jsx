import { useState } from "react";
import API from "../api";

function Login({ setToken }) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Please enter your email");
      return;
    }

    try {
      setLoading(true);
      const response = await API.post("/login", { email: email.trim() });
      const token = response.data?.token;

      if (!token) {
        setError("Token was not returned by server");
        return;
      }

      localStorage.setItem("token", token);
      setToken(token);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "420px" }}>
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="h4 mb-3">Login</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control mb-3"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            {error ? <div className="alert alert-danger py-2">{error}</div> : null}

            <button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
