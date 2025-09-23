// src/Component/AboutInstitute.jsx
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import About_institute from "./Image/About_Institute.jpg";
import "./AboutInstitute.css";

/* Lightweight Typewriter (no external deps) */
function Typewriter({ lines = [], speed = 50, pause = 1000, loop = true }) {
  const [text, setText] = React.useState("");
  const [lineIdx, setLineIdx] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    let t;
    const current = lines[lineIdx] || "";

    if (!isDeleting) {
      t = setTimeout(() => {
        setText(current.slice(0, text.length + 1));
        if (text.length + 1 === current.length) {
          t = setTimeout(() => setIsDeleting(true), pause);
        }
      }, speed);
    } else {
      t = setTimeout(() => {
        setText(current.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setLineIdx((i) => (i + 1) % lines.length);
          if (!loop && lineIdx + 1 >= lines.length) clearTimeout(t);
        }
      }, Math.max(20, Math.floor(speed / 1.6)));
    }

    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, lineIdx, lines, speed, pause, loop]);

  return (
    <span className="ai-typewriter" aria-live="polite">
      {text}
      <span className="ai-cursor" aria-hidden="true" />
    </span>
  );
}

export default function AboutInstitute() {
  const taglines = [
    "Interactive classes • Real-world practice",
    "Student-focused coaching • Measurable results"
  ];

  return (
    <section className="about-institute-section" aria-label="About our Institute">
      <Container>
        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 18, scale: 0.995 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Row className="g-0 align-items-center">
            <Col md={7} className="about-left p-4 p-md-5">
              <motion.h2
                className="about-head"
                initial={{ scale: 0.98, opacity: 0, x: -6 }}
                whileInView={{ scale: 1, opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.06 }}
              >
                About our Institute
              </motion.h2>

              <motion.div
                className="about-copy"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.12 }}
              >
                <p>
                  At our institute, we believe that English communication is not just a skill — it’s a life-changing tool.
                  Founded to empower learners through expression, we provide an engaging environment where students grow in confidence and clarity.
                </p>

                <p className="about-sub">
                  Our programmes combine interactive classes, real-world practice, and student-focused coaching to deliver measurable results.
                </p>

                <div className="about-typebox" aria-hidden="false">
                  <Typewriter lines={taglines} speed={50} pause={1200} />
                </div>
              </motion.div>
            </Col>

            <Col md={5} className="about-right p-4 p-md-5 text-center">
              <motion.div
                className="about-image-wrap"
                initial={{ scale: 0.98, opacity: 0, rotate: -1 }}
                whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.6, delay: 0.18 }}
              >
                <img src={About_institute} alt="institute classroom" className="about-image" />
              </motion.div>
            </Col>
          </Row>
        </motion.div>
      </Container>
    </section>
  );
}
