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
      className={`mentor-section ${inView ? "in-view" : ""}`}
      ref={containerRef}
      aria-label="Meet our Mentor"
    >
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mentor-text pe-lg-5">
            <h2 className={`section-subtitle ${inView ? "reveal-title" : ""}`}>
              Meet our Mentor
            </h2>

            <h3 className={`mentor-name ${inView ? "reveal-name" : ""}`}>
              {mentor.name} Sir
            </h3>

            {/* Typed tagline */}
            <div className={`mentor-typed-wrap ${inView ? "reveal-typed" : ""}`}>
              <span className="mentor-typed" aria-live="polite">
                {typed}
                <span className="typed-cursor" aria-hidden="true" />
              </span>
            </div>

            <div className="mentor-lines">
              {mentor.lines.map((line, idx) => (
                <p
                  key={idx}
                  className="mentor-desc reveal-line"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                >
                  {line}
                </p>
              ))}
            </div>
          </Col>

          <Col lg={6} className="text-lg-end mt-4 mt-lg-0">
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.98 }}
              animate={inView ? { opacity: 1, x: 0, scale: 1 } : {}}
              transition={{ duration: 0.7, ease: [0.2, 0.9, 0.3, 1] }}
              className={`mentor-card`}
              whileHover={{ y: -8, scale: 1.02 }}
            >
              <img src={mentor.img} alt={mentor.name} className="mentor-img" />
              <div className="mentor-glow-ornament" aria-hidden="true" />
            </motion.div>

            <div className={`d-inline-block ms-lg-4 mt-3 mt-lg-0 ${inView ? "reveal-button" : ""}`}>
              {/* Use Link for navigation so it's less likely to be blocked by event handlers */}
              <motion.div whileTap={{ scale: 0.98 }}>
                <Link
                  to={`/mentor/${mentor.slug}`}
                  className="know-btn d-inline-flex align-items-center text-decoration-none"
                  aria-label={`Know more about ${mentor.name}`}
                  onClick={() => console.log("navigating to:", `/mentor/${mentor.slug}`)}
                >
                  <span>Know More</span>
                  <span className="k-icon ms-2">
                    <FaArrowRight />
                  </span>
                </Link>
              </motion.div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
