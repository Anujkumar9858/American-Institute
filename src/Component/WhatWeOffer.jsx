// src/components/WhatWeOffer.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Offline from "./Image/Stage_performance.jpg";

import Online from "./Image/Group_discuss.jpg"
import "./WhatWeOffer.css";

// calculate remaining time
function calcDiff(targetDate) {
  const now = new Date().getTime();
  const diff = targetDate.getTime() - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, mins: 0, secs: 0, finished: true };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  return { days, hours, mins, secs, finished: false };
}

// animated number
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
  // countdown target (20 days from now)
  const targetRef = useRef(null);
  if (!targetRef.current) {
    const t = new Date();
    t.setDate(t.getDate() + 20);
    targetRef.current = t;
  }
  const target = targetRef.current;

  const [timeLeft, setTimeLeft] = useState(() => calcDiff(target));
  const intervalRef = useRef(null);

  useEffect(() => {
    if (timeLeft.finished) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft(calcDiff(target));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [timeLeft, target]);

  const finished = timeLeft.finished;

  return (
    /* NOTE: id="courses-section" so navbar ScrollLink finds it */
    <section id="courses-section" className="offer-section">
      <Container>
        {/* Heading */}
        <div className="offer-top text-center">
          <h2 className="offer-title">What We Offer</h2>
          <p className="offer-sub">Learn Your Way — Online or Offline, Growth Guaranteed.</p>
        </div>

        {/* Cards + Countdown */}
        <Row className="align-items-center offer-row">
          <Col md={8}>
            <Row className="g-4">
              <Col md={6}>
                <div className="offer-card small-card">
                  <div className="offer-img">
                    <img
                      src={Offline}
                      alt="offline"
                    />
                    <span className="offer-badge">Offline</span>
                  </div>
                  <div className="offer-body">
                    <h5>Business English Mastery</h5>
                    <p>Perfect your professional communication for corporate success</p>
                    <ul className="meta">
                      <li>10 weeks</li>
                      <li>New batch every 2 months</li>
                      <li>3999/-</li>
                    </ul>
                    <div className="offer-actions">
                      <button className="enroll-btn" disabled={finished}>
                        {finished ? "Enrollment Closed" : "Enroll Now"}
                      </button>
                      <button className="details-btn">Details</button>
                    </div>
                  </div>
                </div>
              </Col>

              <Col md={6}>
                <div className="offer-card small-card">
                  <div className="offer-img">
                    <img
                      src={Online}
                      alt="online"
                    />
                    <span className="offer-badge">Online</span>
                  </div>
                  <div className="offer-body">
                    <h5>Business English Mastery (Online)</h5>
                    <p>Perfect your professional communication for corporate success</p>
                    <ul className="meta">
                      <li>12 weeks</li>
                      <li>New batch every 3 months</li>
                      <li>4999/-</li>
                    </ul>
                    <div className="offer-actions">
                      <button className="enroll-btn" disabled={finished}>
                        {finished ? "Enrollment Closed" : "Enroll Now"}
                      </button>
                      <button className="details-btn">Details</button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>
          </Col>

          {/* Countdown */}
          <Col md={4} className="text-center countdown-col">
            <motion.h4
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
            >
              Next batch <br /> Starting Soon
            </motion.h4>
            <p className="next-sub">Secure your spot before all seats are filled</p>

            {!finished ? (
              <div className="countdown">
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
              <motion.p className="batch-finished" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                ⏳ Batch Started / Enrollment Closed
              </motion.p>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
