import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Login from "./Image/Login.webp";

export default function LoginPage() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");   // ❌ error
  const [successMessage, setSuccessMessage] = React.useState(""); // ✅ success
  const isDisabled = !email.trim() || !password.trim();

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const result = login(email, password);
    if (result.success) {
      setErrorMessage("");
      setSuccessMessage("✅ Login successful! Redirecting...");
      setTimeout(() => navigate("/"), 1200); // smooth redirect
    } else {
      setSuccessMessage("");
      setErrorMessage(result.message || "Invalid credentials, please try again.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <motion.div
        className="card shadow-lg rounded-4 overflow-hidden border-0"
        style={{ maxWidth: 980, width: "95%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <form onSubmit={handleSubmit}>
          <div className="row g-0">
            <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">

              <h2 className="fw-bold text-center mb-4">Welcome back!</h2>

              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className={`form-control rounded-pill ps-4 ${errorMessage ? "is-invalid" : ""}`}
                  placeholder="Email/Phone no."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label>Email/Phone no.</label>
                {errorMessage && (
                  <div className="text-danger small mt-1">{errorMessage}</div>
                )}
              </div>

              {/* Password */}
              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-pill ps-4"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label>Password</label>
              </div>

              {/* Success */}
              {successMessage && (
                <div className="text-success text-center fw-semibold mb-2">
                  {successMessage}
                </div>
              )}

              {/* Submit */}
              <motion.button
                type="submit"
                className="btn btn-primary w-100 py-2 mt-2 rounded-pill fw-semibold"
                disabled={isDisabled}
              >
                Login
              </motion.button>

              <div className="text-center fw-bold text-dark mt-3">
                <small>
                  Not a member? <Link to="/register">Register now</Link>
                </small>
              </div>
            </div>

            <div className="col-md-6 d-none d-md-block">
              <img
                src={Login}
                alt="login"
                className="img-fluid h-100 w-100"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
