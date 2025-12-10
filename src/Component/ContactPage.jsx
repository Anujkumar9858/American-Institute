// src/Component/ContactPage.jsx
import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTelegramPlane
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import VisitUs from "./VisitUs";
import FooterBottom from "./FooterBottom";
import "./ContactPage.css";

export default function ContactPage() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent (demo). Replace with API call.");
  };

  return (
    <main className="contact-page-premium">
      {/* Background Ambience */}
      <div className="contact-bg-glow" />

      <Container className="contact-premium-container">
        <Row className="justify-content-between align-items-center">
          {/* Left: Info & Copy */}
          <Col lg={5} className="contact-info-side">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h5 className="premium-label">CONTACT US</h5>
              <h1 className="premium-headline">
                Let’s Start a <br /> <span className="text-gradient">Conversation.</span>
              </h1>
              <p className="premium-desc">
                Whether you're looking to enroll, have a question about our curriculum,
                or just want to say hello, we'd love to hear from you.
              </p>

              <div className="premium-details-grid">
                <a href="tel:+917723006091" className="detail-item">
                  <div className="icon-box"><FaPhoneAlt /></div>
                  <div>
                    <span className="label">Call Us</span>
                    <span className="value">+91 77230 06091</span>
                  </div>
                </a>
                <a href="mailto:Institute@gmail.com" className="detail-item">
                  <div className="icon-box"><FaEnvelope /></div>
                  <div>
                    <span className="label">Email Us</span>
                    <span className="value">Institute@gmail.com</span>
                  </div>
                </a>
                <div className="detail-item">
                  <div className="icon-box"><FaMapMarkerAlt /></div>
                  <div>
                    <span className="label">Visit Us</span>
                    <span className="value">Indrapuri B Sector, Bhopal</span>
                  </div>
                </div>
              </div>

              <div className="social-connect">
                <span className="social-label">Follow our journey</span>
                <div className="social-icons">
                  <a href="https://www.facebook.com/share/173ig1Ww91/" aria-label="Facebook"><FaFacebookF /></a>
                  <a href="https://www.instagram.com/impsenglish?igsh=MWkzazgyNnpmejZ4Zg==" aria-label="Instagram"><FaInstagram /></a>
                  <a href="https://www.youtube.com/@ImpressiveEnglish" aria-label="YouTube"><FaYoutube /></a>
                  <a href="#" aria-label="Twitter"><FaXTwitter /></a>
                  <a href="#" aria-label="Telegram"><FaTelegramPlane /></a>
                </div>
              </div>
            </motion.div>
          </Col>

          {/* Right: Floating Form Card */}
          <Col lg={6} className="contact-form-side">
            <motion.div
              className="premium-form-card"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="card-header-premium">
                <h3>Send a Message</h3>
                <p>We typically reply within 2 hours.</p>
              </div>

              <Form onSubmit={handleSubmit} className="premium-form">
                <Row className="g-4">
                  <Col md={6}>
                    <div className="floating-group">
                      <Form.Control type="text" placeholder=" " required className="premium-input" />
                      <label>First Name</label>
                    </div>
                  </Col>
                  <Col md={6}>
                    <div className="floating-group">
                      <Form.Control type="text" placeholder=" " required className="premium-input" />
                      <label>Last Name</label>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="floating-group">
                      <Form.Control type="email" placeholder=" " required className="premium-input" />
                      <label>Email Address</label>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="floating-group">
                      <Form.Control type="text" placeholder=" " className="premium-input" />
                      <label>Phone Number (Optional)</label>
                    </div>
                  </Col>
                  <Col md={12}>
                    <div className="floating-group">
                      <Form.Control as="textarea" rows={4} placeholder=" " required className="premium-input" style={{ minHeight: '120px' }} />
                      <label>How can we help?</label>
                    </div>
                  </Col>
                  <Col xs={12}>
                    <motion.button
                      className="premium-submit-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                    >
                      Send Message
                    </motion.button>
                  </Col>
                </Row>
              </Form>
            </motion.div>
          </Col>
        </Row>
      </Container>

      {/* Preserve existing VisitUs and Footer */}
      <VisitUs />
      <FooterBottom />
    </main>
  );
}
