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
    <section className="free-demo-animated">
      <Container>
        <motion.div className="demo-wrap" variants={container} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.45 }}>
          <Row className="align-items-center">
            {/* LEFT */}
            <Col md={6} className="demo-left">
              <motion.h2 className="demo-heading" variants={headingVar}>
                Try Before You Decide.
                <br />
                <motion.span className="demo-subtitle" variants={subVar}>
                  {/* typed subtitle */}
                  <span aria-live="polite" className="typed-inline">
                    {typed}
                    <span className="typed-cursor" aria-hidden="true" />
                  </span>
                </motion.span>
              </motion.h2>

              <motion.p className="demo-desc" variants={subVar}>
                Join a free live demo to experience our teaching style, meet the mentor, and ask questions live.
              </motion.p>

              <motion.button
                className="demo-btn"
                variants={btnVar}
                whileHover={{ y: -4, boxShadow: "0 18px 40px rgba(109,77,223,0.18)" }}
                onClick={() => navigate("/free-demo")}
                aria-label="Get a free demo"
              >
                <span>Get a Free Demo</span>
                <FaExternalLinkAlt className="btn-icon" />
              </motion.button>
            </Col>

            {/* RIGHT */}
            <Col md={6} className="demo-right">
              <motion.div
                className="video-frame"
                variants={frameVar}
                whileHover={{ y: -6 }}
                onClick={() => navigate("/free-demo")}
                role="button"
                tabIndex={0}
                aria-label="Open free demo page"
              >
                <img
                  src="https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?auto=format&fit=crop&w=1200&q=80"
                  alt="Demo preview"
                />
                <div className="play-overlay">
                  <motion.div className="play-circle" initial={{ scale: 1 }} animate={{ scale: [1, 1.06, 1] }} transition={{ repeat: Infinity, duration: 2.6 }}>
                    <FaPlay />
                  </motion.div>
                </div>
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}
