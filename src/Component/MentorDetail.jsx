// src/Component/MentorDetail.jsx
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaInstagram, FaYoutube, FaFacebook } from "react-icons/fa";
import AboutInstitute from "./AboutInstitute";
import AwardsCarousel from "./AwardsCarousel";
import TeamSection from "./TeamSection";
import Footer from "./FooterBottom";
import BranchLocations from "./BranchLocations";
import Sameer_sir from "./Image/Sameer_sir.jpg";
import "./MentorDetail.css";

function Typewriter({ lines = [], typingSpeed = 50, pause = 1200, loop = true }) {
  const [text, setText] = React.useState("");
  const [lineIndex, setLineIndex] = React.useState(0);
  const [isDeleting, setIsDeleting] = React.useState(false);

  React.useEffect(() => {
    let timeout;
    const currentLine = lines[lineIndex] || "";

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setText(currentLine.slice(0, text.length + 1));
        if (text.length + 1 === currentLine.length) {
          timeout = setTimeout(() => setIsDeleting(true), pause);
        }
      }, typingSpeed);
    } else {
      timeout = setTimeout(() => {
        setText(currentLine.slice(0, text.length - 1));
        if (text.length - 1 === 0) {
          setIsDeleting(false);
          setLineIndex((prev) => (prev + 1) % lines.length);
          if (!loop && lineIndex + 1 >= lines.length) clearTimeout(timeout);
        }
      }, Math.max(20, Math.floor(typingSpeed / 1.7)));
    }

    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, isDeleting, lineIndex, lines, typingSpeed, pause, loop]);

  return (
    <span className="typewriter" aria-live="polite">
      {text}
      <span className="cursor" aria-hidden="true" />
    </span>
  );
}

const MENTORS = {
  sameer: {
    name: "Sameer Sir",
    title: "English Communication Mentor • Content Creator",
    img: Sameer_sir,
    stats: [
      { value: "10+", label: "Years of Experience" },
      { value: "12k+", label: "Students Taught" },
      { value: "1.5M+", label: "Followers on Instagram" }
    ],
    paragraphs: [
      "With over a decade of experience in English communication training, Sameer is not just a teacher — he’s a mentor, motivator, and influencer to millions.",
      "Followed by over 1.5 million people on Instagram and YouTube, his energetic teaching style and practical techniques make learning fun."
    ],
    highlights: [
      "Public speaking coach",
      "Exam preparation strategies",
      "Content creator & educator"
    ]
  }
};

export default function MentorDetail() {
  const { id } = useParams();
  const mentor = MENTORS[id || "sameer"];

  useEffect(() => {
    console.log("MentorDetail mounted with id:", id);
  }, [id]);

  if (!mentor) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Container className="text-center">
          <h3>Mentor not found</h3>
          <Link to="/" className="btn btn-outline-primary mt-3">Back to home</Link>
        </Container>
      </div>
    );
  }

  return (
    <div className="mentor-detail-page">
      {/* Top banner: made sticky-safe and with higher z-index to avoid navbar overlap */}
      <div className="about-banner" role="banner" aria-hidden="false">
        <Container>
          <h1 className="about-title">ABOUT US</h1>
        </Container>
      </div>

      {/* Main card */}
      <section className="mentor-detail-section" aria-label={`Details about ${mentor.name}`}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="card shadow-lg rounded-4 border-0 mentor-card"
          >
            <Row className="g-0 align-items-center">
              <Col lg={4} md={12} className="p-5 intro-col-left">
                <Link to="/" className="text-decoration-none back-link mb-3 d-inline-block" aria-label="Back to home">
                  <FaArrowLeft /> <span className="ms-2">Back</span>
                </Link>

                <motion.div initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
                  <p className="hi">Hello, I'm</p>

                  <h2 className="mentor-bigname">
                    {mentor.name.replace(" Sir", "")}
                    <div className="mentor-subtitle">{mentor.title}</div>
                  </h2>

                  <div className="typewriter-wrap" aria-hidden="false">
                    <Typewriter lines={mentor.highlights} typingSpeed={50} pause={1000} />
                  </div>

                  <p className="mentor-paragraph">{mentor.paragraphs[0]}</p>
                  <p className="mentor-paragraph small">{mentor.paragraphs[1]}</p>

                  <div className="mt-4">
                    <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} className="btn know-more-btn" aria-label="Contact mentor">
                      Contact <span className="arrow">➜</span>
                    </motion.button>
                  </div>
                </motion.div>
              </Col>

              <Col lg={4} md={12} className="portrait-col text-center">
                <motion.div className="portrait-wrap" initial={{ scale: 0.98, opacity: 0, y: 12 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                  <div className="portrait-frame" aria-hidden="false">
                    <motion.img src={mentor.img} alt={mentor.name} className="mentor-portrait" animate={{ y: [0, -6, 0] }} transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }} />
                  </div>
                </motion.div>
              </Col>

              <Col lg={4} md={12} className="p-5 stats-col-right">
                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.55 }}>
                  <div className="stat-list" role="list">
                    {mentor.stats.map((s, i) => (
                      <div key={i} className="stat-row" role="listitem">
                        <div className="stat-value" aria-hidden="false">{s.value}</div>
                        <div className="stat-label">{s.label}</div>
                      </div>
                    ))}
                  </div>

                  <div className="follow-block mt-4">
                    <div className="follow-title">Follow Us on</div>
                    <div className="social-icons mt-3" role="navigation" aria-label="Social links">
                      <a aria-label="Instagram" href="https://www.instagram.com/impsenglish" className="social-btn ig" title="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
                      <a aria-label="YouTube" href="#" className="social-btn yt" title="YouTube" target="_blank" rel="noopener noreferrer"><FaYoutube /></a>
                      <a aria-label="Facebook" href="https://www.facebook.com/share/173ig1Ww91/" className="social-btn fb" title="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebook /></a>
                    </div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* Keep the other site sections below Mentor detail */}
      <AboutInstitute />
      <AwardsCarousel />
      <TeamSection />
      <BranchLocations />
      <Footer />
    </div>
  );
}
