import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import Stage_practice from "./Image/Stage_performance.jpg";
import Group_discussion from "./Image/Group_discuss.jpg";
import Interview_practice from "./Image/Interview.jpg";
import "./WhyChooseUs.css";

export default function WhyChooseUs() {
  const cards = [
    {
      title: "On-Stage Confidence",
      desc: "Master the art of public speaking with live on-stage practice sessions that build ironclad confidence.",
      color: "#4f46e5", // Indigo
      img: Stage_practice,
    },
    {
      title: "Group Discussions",
      desc: "Learn to articulate your ideas effectively and lead conversations in dynamic group settings.",
      color: "#0ea5e9", // Sky Blue
      img: Group_discussion,
    },
    {
      title: "Interview Mastery",
      desc: "Prepare for your dream career with rigorous corporate interview simulations and feedback.",
      color: "#f59e0b", // Amber
      img: Interview_practice,
    },
  ];

  // ---- Typed effect for subtitle ----
  const subtitles = [
    "We Don’t Just Teach English, We Build Speakers.",
    "We Transform Hesitation Into Confidence.",
    "Practical Training, Real Speaking Confidence.",
  ];

  const [typed, setTyped] = useState("");
  const [index, setIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = subtitles[index % subtitles.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setTyped(current.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1200);
        }
      } else {
        setTyped(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setIndex((i) => i + 1);
        }
      }
    }, isDeleting ? 45 : 60);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, index, subtitles]);

  return (
    <section className="choose-section">
      <Container>
        {/* Heading */}
        <div className="section-header text-center mb-5">
          <motion.h2
            className="choose-title"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            Why Choose Us
          </motion.h2>

          <motion.p
            className="choose-subtitle typed-subtitle"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
          >
            {typed}
            <span className="typed-cursor" />
          </motion.p>
        </div>

        {/* Cards */}
        <Row className="g-4 justify-content-center">
          {cards.map((card, idx) => (
            <Col lg={4} md={6} key={idx}>
              <motion.div
                className="choose-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true, amount: 0.2 }}
                whileHover={{ y: -10 }}
              >
                {/* Image Section (Top) */}
                <div className="card-image-wrap">
                  <img src={card.img} alt={card.title} />
                  <div className="card-overlay" style={{ background: `linear-gradient(to top, max(rgba(255,255,255,0.9), ${card.color}20), transparent)` }}></div>
                </div>

                {/* Content Section (Bottom) */}
                <div className="card-content">
                  <div className="content-top">
                    <div className="card-icon-box" style={{ color: card.color, background: `${card.color}15` }}>
                      <FaArrowRight />
                    </div>
                  </div>

                  <h4 className="card-title">{card.title}</h4>
                  <p className="card-desc">{card.desc}</p>

                  <div className="card-footer-line" style={{ background: card.color }}></div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
