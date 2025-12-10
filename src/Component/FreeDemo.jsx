// src/components/FreeDemo.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaPlay } from "react-icons/fa"; // <- fixed (FA5)
import { useNavigate } from "react-router-dom";
import "./FreeDemo.css";

/* ---------- small typing hook (robust + no external libs) ---------- */
function useTyping(lines = [], opts = {}) {
  const { typingSpeed = 60, deletingSpeed = 45, pauseAfterTyping = 1200 } = opts;
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

    // kick off
    timerRef.current = setTimeout(tick, typingSpeed);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.join("|"), typingSpeed, deletingSpeed, pauseAfterTyping]);

  return text;
}

/* ---------- Component ---------- */
export default function FreeDemo() {
  const navigate = useNavigate();

  // typed lines for subtitle — tweak these to match tone
  const typedLines = [
    "Your First Step Starts Here.",
    "Meet the Mentor • Experience the Teaching Style.",
    "Ask Questions Live • Feel the Classroom Energy."
  ];
  const typed = useTyping(typedLines, { typingSpeed: 55, deletingSpeed: 40, pauseAfterTyping: 1400 });

  // motion variants
  const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
  const headingVar = { hidden: { opacity: 0, y: -18 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
  const subVar = { hidden: { opacity: 0, y: -8 }, show: { opacity: 1, y: 0, transition: { duration: 0.55, delay: 0.08 } } };
  const btnVar = { hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 450, damping: 28 } } };
  const frameVar = { hidden: { opacity: 0, scale: 0.98, y: 10 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6 } } };

  return (
    <section className="free-demo-premium">
      <Container fluid className="p-0">
        <div className="premium-demo-layout">
          {/* Left Content Side */}
          <div className="demo-content-side">
            <Container>
              <div className="content-wrapper">
                <motion.div
                  className="demo-badge"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="badge-dot"></span> Free Access
                </motion.div>

                <motion.h2
                  className="premium-heading"
                  variants={headingVar}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  Experience the Difference <br />
                  <span className="highlight-text">Before You Commit.</span>
                </motion.h2>

                <motion.div
                  className="premium-typed-wrapper"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <span aria-live="polite" className="typed-text">
                    {typed}
                    <span className="cursor-blink" aria-hidden="true" />
                  </span>
                </motion.div>

                <motion.p
                  className="premium-desc"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  Join a live session, interact with expert mentors, and see exactly how we transform your communication skills — all for free.
                </motion.p>

                <motion.button
                  className="premium-btn"
                  variants={btnVar}
                  initial="hidden"
                  whileInView="show"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/free-demo")}
                >
                  <span className="btn-text">Book Your Free Session</span>
                  <div className="icon-circle">
                    <FaExternalLinkAlt />
                  </div>
                </motion.button>

                <div className="trust-indicators">
                  <div className="Avatar-stack">
                    <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                    <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                    <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User" />
                  </div>
                  <p>Join <strong>500+</strong> students this month</p>
                </div>
              </div>
            </Container>
          </div>

          {/* Right Visual Side */}
          <div className="demo-visual-side">
            <div className="visual-background"></div>
            <motion.div
              className="video-card-floating"
              variants={frameVar}
              initial="hidden"
              whileInView="show"
              whileHover={{ y: -10, rotate: -1 }}
              viewport={{ once: true }}
              onClick={() => navigate("/free-demo")}
            >
              <div className="card-glass-shine"></div>
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80"
                alt="Classroom Interaction"
              />
              <div className="play-button-wrapper">
                <div className="play-backdrop"></div>
                <FaPlay className="play-icon" />
              </div>
              <div className="live-indicator">
                <span className="indicator-dot"></span> Live Now
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
