// src/Component/Mentor.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom"; // <-- use Link for robust navigation
import { motion } from "framer-motion";
import Sir from "./Image/Sameer_sir.jpg";
import "./Mentor.css";

export default function Mentor() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);

  const mentor = {
    slug: "sameer",
    name: "Sameer",
    img: Sir,
    lines: [
      "Sameer is renowned English communication mentor and content creator with over 1.5 million followers across Instagram and YouTube.",
      "With years of experience and a student-first approach, he transforms nervous learners into confident speakers through engaging activities like group discussions, roleplays, and real-life speaking practice.",
      "A passionate English coach & social media influencer with 1.5M+ followers, helping students turn hesitation into confidence through practical, engaging communication training."
    ],
    taglines: [
      "English Communication Mentor",
      "1.5M+ Followers · Coach & Creator",
      "Turning hesitation into confidence"
    ]
  };

  // Intersection Observer
  useEffect(() => {
    const elem = containerRef.current;
    if (!elem) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.1) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: [0.1, 0.25, 0.5, 0.75, 1] }
    );
    io.observe(elem);
    return () => io.disconnect();
  }, []);

  // Typed text effect (unchanged)
  const [typed, setTyped] = useState("");
  const [tagIndex, setTagIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!inView) return;

    const timeout = setTimeout(() => {
      const currentTag = mentor.taglines[tagIndex % mentor.taglines.length];
      if (!isDeleting) {
        setTyped(currentTag.slice(0, charIndex + 1));
        setCharIndex((ci) => ci + 1);
        if (charIndex + 1 === currentTag.length) {
          setTimeout(() => setIsDeleting(true), 900);
        }
      } else {
        setTyped(currentTag.slice(0, charIndex - 1));
        setCharIndex((ci) => ci - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setTagIndex((ti) => ti + 1);
        }
      }
    }, isDeleting ? 45 : 60);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, inView, tagIndex]);

  return (
    <section
      className={`mentor-premium-section`}
      ref={containerRef}
      aria-label="Meet our Mentor"
    >
      <div className="section-bg-pattern" />
      <Container>
        <Row className="align-items-center flex-lg-row-reverse">
          {/* Image Side (Right on Desktop) */}
          <Col lg={6} className="position-relative mb-5 mb-lg-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true }}
              className="mentor-image-wrapper"
            >
              <div className="image-frame-back" />
              <img src={mentor.img} alt={mentor.name} className="mentor-premium-img" />

              {/* Floating Social Badge */}
              <motion.div
                className="social-floating-badge"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="badge-icon">
                  <span className="pulse-dot"></span>
                </div>
                <div className="badge-info">
                  <span className="badge-count">1.5M+</span>
                  <span className="badge-label">Community Strong</span>
                </div>
              </motion.div>
            </motion.div>
          </Col>

          {/* Text Side (Left on Desktop) */}
          <Col lg={6} className="mentor-content-side">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="eyebrow-text">The Visionary</div>
              <h2 className="mentor-premium-name">
                {mentor.name} <span className="text-highlight">Sir</span>
              </h2>

              <div className="mentor-premium-role">
                <span className="role-line"></span>
                <span className="role-text">{mentor.taglines[0]}</span>
              </div>

              <div className="mentor-premium-desc">
                {mentor.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>

              <div className="action-wrapper">
                <Link
                  to={`/mentor/${mentor.slug}`}
                  className="premium-know-btn"
                >
                  <span className="btn-text">Read Full Story</span>
                  <span className="btn-icon"><FaArrowRight /></span>
                </Link>

                <div className="signature-block">
                  <span className="signature-text">Sameer.</span>
                </div>
              </div>
            </motion.div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
