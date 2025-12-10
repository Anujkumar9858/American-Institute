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
        <div className="offer-header">
          <motion.h2
            className="offer-title"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            Master Business English.
          </motion.h2>
          <motion.p
            className="offer-subtitle"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
          >
            Choose your path to professional fluency with our specialized courses.
          </motion.p>
        </div>

        <div className="offer-layout">
          {/* Main Content: Course Cards */}
          <div className="courses-grid">
            {courses.map((c, i) => (
              <motion.div
                className="course-card-premium"
                key={c.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="course-image-wrapper">
                  <img src={c.img} alt={c.title} />
                  <div className="course-tag">{c.id === "offline" ? "In-Person Class" : "Live Online Class"}</div>
                </div>

                <div className="course-content">
                  <div className="course-header">
                    <h3>{c.title}</h3>
                    <div className="course-price">{c.price}</div>
                  </div>

                  <p className="course-desc">{c.desc}</p>

                  <div className="course-meta-grid">
                    <div className="meta-item">
                      <span className="meta-label">Duration</span>
                      <span className="meta-val">{c.duration}</span>
                    </div>
                    <div className="meta-item">
                      <span className="meta-label">Batch</span>
                      <span className="meta-val">{c.batch}</span>
                    </div>
                  </div>

                  <div className="course-actions">
                    <button
                      className="btn-enroll-premium"
                      onClick={() => navigate("/enroll")}
                      disabled={finished}
                    >
                      {finished ? "Closed" : "Secure Your Seat"}
                    </button>
                    <button
                      className="btn-details-premium"
                      onClick={() => {
                        setSelectedCourse(c);
                        setShowDetails(true);
                      }}
                    >
                      View Syllabus
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Sidebar: Countdown & urgency */}
          <div className="offer-sidebar">
            <motion.div
              className="countdown-panel"
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
            >
              <div className="panel-header">
                <h4>Next Batch Starts In</h4>
                <div className="pulsing-dot"></div>
              </div>

              {!finished ? (
                <div className="timer-grid">
                  <div className="time-unit">
                    <span className="unit-val"><AnimatedNumber value={timeLeft.days} /></span>
                    <span className="unit-label">Days</span>
                  </div>
                  <div className="time-sep">:</div>
                  <div className="time-unit">
                    <span className="unit-val"><AnimatedNumber value={timeLeft.hours} /></span>
                    <span className="unit-label">Hours</span>
                  </div>
                  <div className="time-sep">:</div>
                  <div className="time-unit">
                    <span className="unit-val"><AnimatedNumber value={timeLeft.mins} /></span>
                    <span className="unit-label">Mins</span>
                  </div>
                  <div className="time-sep">:</div>
                  <div className="time-unit">
                    <span className="unit-val"><AnimatedNumber value={timeLeft.secs} /></span>
                    <span className="unit-label">Secs</span>
                  </div>
                </div>
              ) : (
                <div className="timer-finished">
                  Enrollment Closed
                </div>
              )}

              <div className="panel-footer">
                <p>Limited seats available for the upcoming intake.</p>
              </div>
            </motion.div>
          </div>
        </div>
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
