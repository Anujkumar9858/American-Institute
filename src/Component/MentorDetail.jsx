// src/Component/MentorDetail.jsx
import React from "react";
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
      "Followed by over 1.5 million people on Instagram and YouTube, his energetic teaching style, real-world speaking techniques, and student-first approach make learning practical and fun."
    ]
  }
  // add more mentors here keyed by slug if needed
};

export default function MentorDetail() {
  const { id } = useParams();
  const mentor = MENTORS[id || "sameer"]; // default to sameer if no id provided

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
      {/* Top banner */}
      <div className="about-banner" role="banner" aria-hidden="false">
        <Container>
          <h1 className="about-title">ABOUT US</h1>
        </Container>
      </div>

      {/* Main mentor area */}
      <section className="mentor-detail-section" aria-label={`Details about ${mentor.name}`}>
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="card shadow-lg rounded-4 border-0"
            style={{ overflow: "hidden", maxWidth: 1200, margin: "0 auto" }}
          >
            <Row className="g-0 align-items-center">
              {/* LEFT: Intro text */}
              <Col lg={4} md={12} className="p-5 intro-col-left">
                <Link to="/" className="text-decoration-none back-link mb-3 d-inline-block" aria-label="Back to home">
                  <FaArrowLeft /> <span className="ms-2">Back</span>
                </Link>

                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
                  <p className="hi">Hello, I'm</p>
                  <h2 className="mentor-bigname">{mentor.name.replace(" Sir", "")}</h2>

                  <p className="mentor-paragraph">{mentor.paragraphs[0]}</p>
                  <p className="mentor-paragraph small">{mentor.paragraphs[1]}</p>

                  <div className="mt-4">
                    <button className="btn know-more-btn" aria-label="Know more about mentor">
                      Know More <span className="arrow">➜</span>
                    </button>
                  </div>
                </motion.div>
              </Col>

              {/* CENTER: Portrait */}
              <Col lg={4} md={12} className="portrait-col text-center">
                <motion.div
                  className="portrait-wrap"
                  initial={{ scale: 0.98, opacity: 0, y: 12 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ duration: 0.7 }}
                >
                  <div className="portrait-frame" aria-hidden="false">
                    <img src={mentor.img} alt={mentor.name} className="mentor-portrait" />
                  </div>
                </motion.div>
              </Col>

              {/* RIGHT: Stats + Socials */}
              <Col lg={4} md={12} className="p-5 stats-col-right">
                <motion.div initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
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
                      <a aria-label="Instagram" href="https://www.instagram.com/impsenglish?igsh=MWkzazgyNnpmejZ4Zg==" className="social-btn ig" title="Instagram">
                        <FaInstagram />
                      </a>
                      <a aria-label="YouTube" href="#" className="social-btn yt" title="YouTube">
                        <FaYoutube />
                      </a>
                      <a aria-label="Facebook" href="https://www.facebook.com/share/173ig1Ww91/" className="social-btn fb" title="Facebook">
                        <FaFacebook />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </motion.div>
        </Container>
      </section>

      {/* About institute section below mentor detail */}
      <AboutInstitute />
      <AwardsCarousel />
      <TeamSection />
      <BranchLocations />
      <Footer />
    </div>
  );
}
