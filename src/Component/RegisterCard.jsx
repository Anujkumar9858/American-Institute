// src/components/RegisterCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import Password from "./Image/Password.webp" ;
import { FaGoogle, FaApple, FaFacebook } from "react-icons/fa";

export default function RegisterCard() {
  const [first, setFirst] = React.useState("");
  const [last, setLast] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const isDisabled = !first.trim() || !last.trim() || !email.trim() || !password.trim();

  const handleRegister = (e) => {
    e.preventDefault();
    if (isDisabled) return;
    alert(`Registered: ${first} ${last} (${email})`);
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="card shadow-lg rounded-4 overflow-hidden border-0 w-100"
        style={{ maxWidth: 980 }}
      >
        <div className="row g-0">
          {/* Left image */}
          <motion.div
            className="col-md-6 d-none d-md-block"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.08 }}
          >
            <div className="h-100 d-flex align-items-center justify-content-center p-4">
              <div className="rounded-3 overflow-hidden shadow" style={{ width: 420, height: 480 }}>
                <img
                  src={Password}
                  alt="team"
                  className="img-fluid h-100 w-100"
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </motion.div>

          {/* Right form */}
          <motion.div
            className="col-md-6 p-5 bg-white d-flex flex-column justify-content-center"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.12 }}
          >
            <h2 className="fw-bold text-center mb-4" style={{ fontSize: "1.9rem" }}>
              Create an account
            </h2>

            <form onSubmit={handleRegister}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-pill ps-4"
                  id="firstName"
                  placeholder="First name"
                  value={first}
                  onChange={(e) => setFirst(e.target.value)}
                />
                <label htmlFor="firstName" className="ps-3">First name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-pill ps-4"
                  id="lastName"
                  placeholder="Last name"
                  value={last}
                  onChange={(e) => setLast(e.target.value)}
                />
                <label htmlFor="lastName" className="ps-3">Last name</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control rounded-pill ps-4"
                  id="emailphone"
                  placeholder="Email/Phone no."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="emailphone" className="ps-3">Email/Phone no.</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control rounded-pill ps-4"
                  id="regPassword"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="regPassword" className="ps-3">Password</label>
              </div>

              <motion.button
                whileHover={{ scale: isDisabled ? 1 : 1.02 }}
                whileTap={{ scale: isDisabled ? 1 : 0.98 }}
                type="submit"
                className="btn btn-primary w-100 py-2 mt-3 rounded-pill fw-semibold"
                disabled={isDisabled}
                style={{ opacity: isDisabled ? 0.6 : 1, cursor: isDisabled ? "not-allowed" : "pointer" }}
              >
                Register
              </motion.button>
            </form>

            <div className="text-center fw-semibold text-dark my-4 position-relative">
              <span className="bg-white px-2">Or continue with</span>
              <hr className="position-absolute top-50 start-0 w-100 translate-middle-y m-0" />
            </div>

            <div className="d-flex gap-3 justify-content-center mb-4">
              <motion.button type="button" whileHover={{ scale: 1.06 }} className="btn bg-white border rounded-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 44 }}>
                <FaGoogle size={22} color="#EA4335" />
              </motion.button>
              <motion.button type="button" whileHover={{ scale: 1.06 }} className="btn bg-white border rounded-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 44 }}>
                <FaApple size={22} color="#000" />
              </motion.button>
              <motion.button type="button" whileHover={{ scale: 1.06 }} className="btn bg-white border rounded-3 d-flex align-items-center justify-content-center" style={{ width: 54, height: 44 }}>
                <FaFacebook size={22} color="#1877F2" />
              </motion.button>
            </div>

            <div className="text-center fw-bold text-dark">
              <small>
                Already a member ?{" "}
                <Link to="/" className="fw-bold text-decoration-none">
                  Login here
                </Link>
              </small>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

