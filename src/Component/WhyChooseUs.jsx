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
      title: "On stage practice",
      desc: "Helps students build confidence and be fluent in communication",
      color: "#0d1b8c",
      img: Stage_practice,
    },
    {
      title: "Group Discussion",
      desc: "Here students learn to communicate and share their views on any topic.",
      color: "#aef1d1",
      img: Group_discussion,
    },
    {
      title: "Corporate Interview practices",
      desc: "Helps in future ready for company.",
      color: "#8fb3ff",
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
        <motion.h2
          className="choose-title text-center"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          Why Choose us
        </motion.h2>

        <motion.p
          className="choose-subtitle text-center typed-subtitle"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          {typed}
          <span className="typed-cursor" />
        </motion.p>

        {/* Cards */}
        <Row className="mt-5 gx-4 gy-4">
          {cards.map((card, idx) => (
            <Col md={4} key={idx} className="d-flex justify-content-center">
              <motion.div
                className="choose-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.3 }}
                viewport={{ once: true, amount: 0.4 }}
                whileHover={{ scale: 1.05 }}
              >
                {/* top content */}
                <div className="card-top" style={{ background: card.color }}>
                  <h4>{card.title}</h4>
                  <p>{card.desc}</p>
                  <FaArrowRight className="arrow-icon" />
                </div>
                {/* bottom image */}
                <div className="card-bottom">
                  <img src={card.img} alt={card.title} />
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
