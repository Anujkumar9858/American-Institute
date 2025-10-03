import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import Password from "./Image/Password.webp";

export default function RegisterCard() {
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const [successMessage, setSuccessMessage] = React.useState("");
  const isDisabled = !first.trim() || !last.trim() || !email.trim() || !password.trim();

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if (isDisabled) return;

    const result = register(email, password);
    if (result.success) {
      setErrorMessage("");
      setSuccessMessage("🎉 Account created successfully! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setSuccessMessage("");
      setErrorMessage(result.message || "Registration failed.");
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <motion.div
        className="card shadow-lg rounded-4 overflow-hidden border-0 w-100"
        style={{ maxWidth: 980 }}
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <div className="row g-0">
          <div className="col-md-6 d-none d-md-block">
            <img
              src={Password}
              alt="register"
              className="img-fluid h-100 w-100"
              style={{ objectFit: "cover" }}
            />
          </div>

          <div className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center">
            <h2 className="fw-bold text-center mb-4">Create an account</h2>

            <form onSubmit={handleRegister}>
              <input type="text" className="form-control mb-3 rounded-pill ps-4"
                placeholder="First name" value={first} onChange={(e) => setFirst(e.target.value)} />
              <input type="text" className="form-control mb-3 rounded-pill ps-4"
                placeholder="Last name" value={last} onChange={(e) => setLast(e.target.value)} />
              <input type="text" className={`form-control mb-3 rounded-pill ps-4 ${errorMessage ? "is-invalid" : ""}`}
                placeholder="Email/Phone no." value={email} onChange={(e) => setEmail(e.target.value)} />
              <input type="password" className="form-control mb-3 rounded-pill ps-4"
                placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

              {errorMessage && (
                <div className="text-danger small mb-2">{errorMessage}</div>
              )}
              {successMessage && (
                <div className="text-success small mb-2">{successMessage}</div>
              )}

              <motion.button type="submit"
                className="btn btn-primary w-100 py-2 mt-2 rounded-pill fw-semibold"
                disabled={isDisabled}>
                Register
              </motion.button>
            </form>

            <div className="text-center fw-bold text-dark mt-3">
              <small>
                Already a member? <Link to="/login">Login here</Link>
              </small>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
