import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Offline from "./Image/Stage_performance.jpg";
import Online from "./Image/Group_discuss.jpg";
import "./WhatWeOffer.css";

function calcDiff(targetDate) {
  const now = Date.now();
  const diff = targetDate.getTime() - now;
  if (diff <= 0) return { days: 0, hours: 0, mins: 0, secs: 0, finished: true };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs, finished: false };
}

function AnimatedNumber({ value }) {
  return (
    <motion.span
      key={String(value)}
      initial={{ y: 8, opacity: 0, scale: 0.98 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 450, damping: 28 }}
      className="count-num"
    >
      {String(value).padStart(2, "0")}
    </motion.span>
  );
}

export default function WhatWeOffer() {
  const navigate = useNavigate();

  const targetRef = useRef(null);
  if (!targetRef.current) {
    const t = new Date();
    t.setDate(t.getDate() + 20);
    targetRef.current = t;
  }
  const target = targetRef.current;

  const [timeLeft, setTimeLeft] = useState(() => calcDiff(target));
  const [showDetails, setShowDetails] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => setTimeLeft(calcDiff(target)), 1000);
    return () => clearInterval(interval);
  }, [target]);

  const finished = Boolean(timeLeft.finished);

  const courses = [
    {
      id: "offline",
      title: "Business English Mastery",
      desc: "Perfect your professional communication for corporate success",
      duration: "10 weeks",
      batch: "New batch every 2 months",
      price: "₹3,999",
      img: Offline,
      details: [
        "1 hr main class daily",
        "1 hr practice class daily",
        "Group discussion sessions",
        "Presentation training",
        "Interview preparation",
        "Conversation practice"
      ]
    },
    {
      id: "online",
      title: "Business English Mastery (Online)",
      desc: "Perfect your professional communication for corporate success",
      duration: "12 weeks",
      batch: "New batch every 3 months",
      price: "₹4,999",
      img: Online,
      details: [
        "1 hr main class (virtual)",
        "1 hr online practice",
        "Group discussions via Zoom",
        "Live presentation sessions",
        "Interview role-plays",
        "Daily conversation practice"
      ]
    }
  ];

  return (
    <section id="courses-section" className="offer-section">
      <Container>
        <div className="offer-top text-center">
          <motion.h2
            className="offer-title"
            initial={{ y: -18, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            What We Offer
          </motion.h2>
        </div>

        <Row className="align-items-center offer-row">
          <Col md={8}>
            <Row className="g-4">
              {courses.map((c, i) => (
                <Col md={6} key={c.id}>
                  <motion.div
                    className="offer-card small-card"
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.08 }}
                    viewport={{ once: true, amount: 0.3 }}
                    whileHover={{ translateY: -6, scale: 1.01 }}
                  >
                    <div className="offer-img">
                      <img src={c.img} alt={c.title} />
                      <span className="offer-badge">
                        {c.id === "offline" ? "Offline" : "Online"}
                      </span>
                    </div>

                    <div className="offer-body">
                      <h5>{c.title}</h5>
                      <p>{c.desc}</p>
                      <ul className="meta">
                        <li>{c.duration}</li>
                        <li>{c.batch}</li>
                        <li>{c.price}</li>
                      </ul>
                      <div className="offer-actions">
                        <button
                          className="enroll-btn"
                          onClick={() => navigate("/enroll")}
                          disabled={finished}
                        >
                          {finished ? "Enrollment Closed" : "Enroll Now"}
                        </button>
                        <button
                          className="details-btn"
                          onClick={() => {
                            setSelectedCourse(c);
                            setShowDetails(true);
                          }}
                        >
                          Details
                        </button>
                      </div>
                    </div>
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Col>

          <Col md={4} className="text-center countdown-col">
            <motion.h4
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              Next batch <br /> Starting Soon
            </motion.h4>
            {!finished ? (
              <div className="countdown" role="timer" aria-live="polite">
                <div className="count-item">
                  <div className="count-box">
                    <AnimatedNumber value={timeLeft.days} />
                  </div>
                  <div className="count-label">Days</div>
                </div>
                <div className="count-item">
                  <div className="count-box">
                    <AnimatedNumber value={timeLeft.hours} />
                  </div>
                  <div className="count-label">Hours</div>
                </div>
                <div className="count-item">
                  <div className="count-box">
                    <AnimatedNumber value={timeLeft.mins} />
                  </div>
                  <div className="count-label">Mins</div>
                </div>
                <div className="count-item">
                  <div className="count-box">
                    <AnimatedNumber value={timeLeft.secs} />
                  </div>
                  <div className="count-label">Secs</div>
                </div>
              </div>
            ) : (
              <motion.p
                className="batch-finished"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                ⏳ Batch Started / Enrollment Closed
              </motion.p>
            )}
          </Col>
        </Row>
      </Container>

      {/* ✅ Details Modal */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} centered size="lg">
        {selectedCourse && (
          <Modal.Body className="details-modal">
            <div className="details-img">
              <img src={selectedCourse.img} alt={selectedCourse.title} />
            </div>
            <div className="details-text">
              <h3>{selectedCourse.title}</h3>
              <p>{selectedCourse.desc}</p>
              <ul>
                {selectedCourse.details.map((d, idx) => (
                  <li key={idx}>✅ {d}</li>
                ))}
              </ul>
              <div className="d-flex gap-2 mt-3">
                <button className="enroll-btn" onClick={() => navigate("/enroll")}>
                  Enroll Now
                </button>
                {/* ✅ Close button */}
                <button
                  className="details-btn"
                  onClick={() => setShowDetails(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </Modal.Body>
        )}
      </Modal>
    </section>
  );
}
