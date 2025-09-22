// src/Component/Mentor.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Sir from "./Image/Sameer_sir.jpg";
import "./Mentor.css";

export default function Mentor() {
  const containerRef = useRef(null);
  const [inView, setInView] = useState(false);
  const navigate = useNavigate();

  const mentor = {
    slug: "sameer",
    name: "Sameer",
    img: Sir,
    lines: [
      "Sameer is renowned English communication mentor and content creator with over 1.5 million followers across Instagram and YouTube.",
      "With years of experience and a student-first approach, he transforms nervous learners into confident speakers through engaging activities like group discussions, roleplays, and real-life speaking practice.",
      "A passionate English coach & social media influencer with 1.5M+ followers, helping students turn hesitation into confidence through practical, engaging communication training."
    ]
  };

  useEffect(() => {
    const elem = containerRef.current;
    if (!elem) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] }
    );
    io.observe(elem);
    return () => io.disconnect();
  }, []);

  return (
    <section className={`mentor-section ${inView ? "in-view" : ""}`} ref={containerRef} aria-label="Meet our Mentor">
      <Container>
        <Row className="align-items-center">
          <Col lg={6} className="mentor-text pe-lg-5">
            <h2 className={`section-subtitle ${inView ? "reveal-title" : ""}`}>Meet our Mentor</h2>
            <h3 className={`mentor-name ${inView ? "reveal-name" : ""}`}>{mentor.name} Sir</h3>

            <div className="mentor-lines">
              {mentor.lines.map((line, idx) => (
                <p key={idx} className="mentor-desc reveal-line" style={{ transitionDelay: `${idx * 150}ms` }}>
                  {line}
                </p>
              ))}
            </div>
          </Col>

          <Col lg={6} className="text-lg-end mt-4 mt-lg-0">
            <div className={`mentor-card ${inView ? "reveal-card" : ""}`}>
              <img src={mentor.img} alt={mentor.name} className="mentor-img" />
            </div>

            <div className={`d-inline-block ms-lg-4 mt-3 mt-lg-0 ${inView ? "reveal-button" : ""}`}>
              <button
                className="know-btn"
                onClick={() => navigate(`/mentor/${mentor.slug}`)}
                aria-label={`Know more about ${mentor.name}`}
              >
                <span>Know More</span>
                <span className="k-icon"><FaArrowRight /></span>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
