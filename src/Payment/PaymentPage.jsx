import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";

export default function PaymentPage() {
  const navigate = useNavigate();

  const [method, setMethod] = useState("Paypal");
  const [showSuccess, setShowSuccess] = useState(false);

  const order = { fee: 3999, gst: 1000 };
  const total = order.fee + order.gst;

  const [upi, setUpi] = useState({ id: "", phone: "" });
  const [card, setCard] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [netBank, setNetBank] = useState({ bank: "" });

  const payDisabled =
    (method === "UPI" && !(upi.id || upi.phone)) ||
    (method === "Debit/Credit Card" &&
      (!card.number || !card.name || !card.expiry || !card.cvv)) ||
    (method === "Net Banking" && !netBank.bank);

  const handlePay = () => {
    if (payDisabled) return;
    setShowSuccess(true);
  };

  const RightTitle =
    method === "QR Code"
      ? "Scan through your phone"
      : method === "UPI"
      ? "Enter Your UPI ID"
      : method === "Debit/Credit Card"
      ? "Fill Your Card Details"
      : method === "Net Banking"
      ? "Net Banking"
      : "Pay with Paypal";

  return (
    <section className="payment-section">
      <Container>
        <div className="topbar">
          <button className="back-btn" onClick={() => navigate(-1)} aria-label="Go back">
            ←
          </button>
          <div className="stepper">
            <span className="done">1. Enroll</span>
            <span className="sep">—</span>
            <span className="active">2. Payment</span>
          </div>
        </div>

        <div className="payment-grid">
          {/* Left : Methods */}
          <div className="methods">
            <h2 className="headline">
              Select Payment
              <br /> Method
            </h2>

            <div className="method-list">
              {["Paypal", "Net Banking", "Debit/Credit Card", "UPI", "QR Code"].map((m) => (
                <label
                  key={m}
                  className={`method-item ${method === m ? "active" : ""}`}
                  onClick={() => setMethod(m)}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={method === m}
                    onChange={() => setMethod(m)}
                  />
                  <span className="label">{m}</span>
                  <span className="dot" />
                </label>
              ))}
            </div>
          </div>

          {/* Right : Dark Panel with details */}
          <motion.div
            key={method}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="panel"
          >
            <h4 className="panel-title">{RightTitle}</h4>

            {/* Dynamic forms per method */}
            {method === "QR Code" && (
              <div className="qr-wrap">
                <img
                  className="qr"
                  alt="UPI QR"
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=${encodeURIComponent(
                    "upi://pay?pa=yourupi@bank&pn=AmericanInstitute&am=" + total
                  )}`}
                />
                <p className="qr-note">Use any UPI app to scan & pay</p>
              </div>
            )}

            {method === "UPI" && (
              <div className="form-wrap">
                <label className="field">
                  <span>Your UPI ID</span>
                  <input
                    type="text"
                    placeholder="example@upi"
                    value={upi.id}
                    onChange={(e) => setUpi({ ...upi, id: e.target.value })}
                  />
                </label>

                <div className="or">
                  <span>OR</span>
                </div>

                <label className="field">
                  <span>Phone Number</span>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={upi.phone}
                    onChange={(e) => setUpi({ ...upi, phone: e.target.value })}
                  />
                </label>
              </div>
            )}

            {method === "Debit/Credit Card" && (
              <div className="form-wrap">
                <label className="field">
                  <span>Card number</span>
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder="XXXX XXXX XXXX XXXX"
                    value={card.number}
                    onChange={(e) => setCard({ ...card, number: e.target.value })}
                  />
                </label>
                <label className="field">
                  <span>Cardholder name</span>
                  <input
                    type="text"
                    placeholder="Full name"
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                  />
                </label>

                <div className="grid-2">
                  <label className="field">
                    <span>Expiry Date</span>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={card.expiry}
                      onChange={(e) => setCard({ ...card, expiry: e.target.value })}
                    />
                  </label>
                  <label className="field">
                    <span>CVV</span>
                    <input
                      type="password"
                      placeholder="***"
                      value={card.cvv}
                      onChange={(e) => setCard({ ...card, cvv: e.target.value })}
                    />
                  </label>
                </div>
              </div>
            )}

            {method === "Net Banking" && (
              <div className="form-wrap">
                <label className="field">
                  <span>Select Bank</span>
                  <select
                    value={netBank.bank}
                    onChange={(e) => setNetBank({ bank: e.target.value })}
                  >
                    <option value="">Choose bank</option>
                    <option>HDFC Bank</option>
                    <option>ICICI Bank</option>
                    <option>State Bank of India</option>
                    <option>Axis Bank</option>
                    <option>Punjab National Bank</option>
                  </select>
                </label>
              </div>
            )}

            {/* Paypal has no extra fields */}

            {/* Summary */}
            <div className="summary">
              <div className="row">
                <span>Course Fee</span>
                <span>{order.fee}/-</span>
              </div>
              <div className="row">
                <span>GST (Additional)</span>
                <span>{order.gst}/-</span>
              </div>
              <hr />
              <div className="row total">
                <span>Total</span>
                <span>{total}/-</span>
              </div>
            </div>

            <button
              type="button"
              className="pay"
              onClick={handlePay}
              disabled={!!payDisabled}
            >
              {method === "QR Code" ? "I've Paid" : "Pay"}
            </button>
          </motion.div>
        </div>

        {/* Success screen */}
        {showSuccess && (
          <div className="success-overlay">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="success-card"
            >
              <div className="tick">✔</div>
              <h3>Payment successful</h3>
              <p>
                We just sent you a confirmation email.
                <br />
                Check your inbox.
              </p>
              <button className="go" onClick={() => navigate("/")}>
                Go to your profile
              </button>
              <button className="close" onClick={() => setShowSuccess(false)}>
                Close
              </button>
            </motion.div>
          </div>
        )}
      </Container>
    </section>
  );
}
