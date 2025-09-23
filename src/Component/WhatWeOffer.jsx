// src/components/WhatWeOffer.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Offline from "./Image/Stage_performance.jpg";
import Online from "./Image/Group_discuss.jpg";
import "./WhatWeOffer.css";

/* ---------- Utilities ---------- */
function calcDiff(targetDate) {
  const now = Date.now();
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

/* ---------- Simple typing hook (kept small) ---------- */
function useTyping(lines = [], opts = {}) {
  const { typingSpeed = 60, deletingSpeed = 45, pauseAfterTyping = 1100 } = opts;
  const [text, setText] = useState("");
  const idxRef = useRef(0);
  const charRef = useRef(0);
  const deletingRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!lines || lines.length === 0) return;
    function tick() {
      const current = lines[idxRef.current % lines.length];
      if (!deletingRef.current) {
        charRef.current = Math.min(charRef.current + 1, current.length);
        setText(current.slice(0, charRef.current));
        if (charRef.current === current.length) {
          timerRef.current = setTimeout(() => {
            deletingRef.current = true;
            tick();
          }, pauseAfterTyping);
          return;
        }
        timerRef.current = setTimeout(tick, typingSpeed);
      } else {
        charRef.current = Math.max(charRef.current - 1, 0);
        setText(current.slice(0, charRef.current));
        if (charRef.current === 0) {
          deletingRef.current = false;
          idxRef.current = (idxRef.current + 1) % lines.length;
          timerRef.current = setTimeout(tick, typingSpeed);
          return;
        }
        timerRef.current = setTimeout(tick, deletingSpeed);
      }
    }

    timerRef.current = setTimeout(tick, typingSpeed);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|"), typingSpeed, deletingSpeed, pauseAfterTyping]);

  return text;
}

/* ---------- Component ---------- */
export default function WhatWeOffer() {
  // stable target: 20 days from first mount
  const targetRef = useRef(null);
  if (!targetRef.current) {
    const t = new Date();
    t.setDate(t.getDate() + 20);
    targetRef.current = t;
  }
  const target = targetRef.current;

  // initial calc (ensures correct initial UI if target already passed)
  const [timeLeft, setTimeLeft] = useState(() => calcDiff(target));
  const intervalRef = useRef(null);

  // Robust interval: sets state every second, and clears itself immediately when finished
  useEffect(() => {
    // If already finished on mount, nothing to do
    const initial = calcDiff(target);
    setTimeLeft(initial);
    if (initial.finished) return;

    intervalRef.current = setInterval(() => {
      const next = calcDiff(target);
      setTimeLeft(next);
      if (next.finished) {
        // ensure we stop exactly when finished and clear interval
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // targetRef is stable; no additional deps so interval runs once
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const finished = Boolean(timeLeft.finished);

  const typedSubtitle = useTyping(
    [
      "Learn Your Way — Online or Offline, Growth Guaranteed.",
      "Practical, Live Training • Real Speaking Confidence."
    ],
    { typingSpeed: 55, deletingSpeed: 40, pauseAfterTyping: 1400 }
  );

  return (
    <section id="courses-section" className="offer-section">
      <Container>
        {/* Heading */}
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

          <motion.p
            className="offer-sub typed-sub"
            initial={{ y: 12, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true, amount: 0.2 }}
            aria-live="polite"
          >
            {typedSubtitle}
            <span className="typed-cursor" aria-hidden="true" />
          </motion.p>
        </div>

        {/* Cards + Countdown */}
        <Row className="align-items-center offer-row">
          <Col md={8}>
            <Row className="g-4">
              <Col md={6}>
                <motion.div
                  className="offer-card small-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ translateY: -6, scale: 1.01 }}
                >
                  <div className="offer-img">
                    <img src={Offline} alt="offline" />
                    <span className="offer-badge">Offline</span>
                  </div>

                  <div className="offer-body">
                    <h5>Business English Mastery</h5>
                    <p>Perfect your professional communication for corporate success</p>
                    <ul className="meta">
                      <li>10 weeks</li>
                      <li>New batch every 2 months</li>
                      <li>₹3,999</li>
                    </ul>
                    <div className="offer-actions">
                      <button className="enroll-btn" disabled={finished}>
                        {finished ? "Enrollment Closed" : "Enroll Now"}
                      </button>
                      <button className="details-btn">Details</button>
                    </div>
                  </div>
                </motion.div>
              </Col>

              <Col md={6}>
                <motion.div
                  className="offer-card small-card"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 }}
                  viewport={{ once: true, amount: 0.3 }}
                  whileHover={{ translateY: -6, scale: 1.01 }}
                >
                  <div className="offer-img">
                    <img src={Online} alt="online" />
                    <span className="offer-badge">Online</span>
                  </div>

                  <div className="offer-body">
                    <h5>Business English Mastery (Online)</h5>
                    <p>Perfect your professional communication for corporate success</p>
                    <ul className="meta">
                      <li>12 weeks</li>
                      <li>New batch every 3 months</li>
                      <li>₹4,999</li>
                    </ul>
                    <div className="offer-actions">
                      <button className="enroll-btn" disabled={finished}>
                        {finished ? "Enrollment Closed" : "Enroll Now"}
                      </button>
                      <button className="details-btn">Details</button>
                    </div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Col>

          {/* Countdown */}
          <Col md={4} className="text-center countdown-col">
            <motion.h4
              initial={{ x: 40, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.4 }}
            >
              Next batch <br /> Starting Soon
            </motion.h4>
            <p className="next-sub">Secure your spot before all seats are filled</p>

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
