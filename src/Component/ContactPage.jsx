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
    <main className="contact-page">
      {/* Banner Section */}
      <motion.header
        className="contact-banner"
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h1>CONTACT US</h1>
      </motion.header>

      {/* Main Content */}
      <Container className="contact-content">
        <Row className="align-items-start gx-5">
          {/* Left Form */}
          <Col lg={7} md={12}>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ staggerChildren: 0.08 }}
            >
              {/* Animated big title */}
              <motion.h2
                className="form-title"
                initial={{ opacity: 0, y: -24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.64, ease: "easeOut" }}
              >
                Got Something on Your Mind?
              </motion.h2>

              {/* Animated subtitle */}
              <motion.p
                className="form-sub"
                initial={{ opacity: 0, x: -18 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
              >
                Don't hesitate to reach out.
              </motion.p>

              <Form onSubmit={handleSubmit} className="mt-3">
                <Row className="g-3">
                  <Col md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.48, delay: 0.16 }}
                    >
                      <Form.Group>
                        <Form.Label className="field-label">First name</Form.Label>
                        <Form.Control placeholder="Enter your first name" required />
                      </Form.Group>
                    </motion.div>
                  </Col>

                  <Col md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.48, delay: 0.22 }}
                    >
                      <Form.Group>
                        <Form.Label className="field-label">Last name</Form.Label>
                        <Form.Control placeholder="Enter your last name" required />
                      </Form.Group>
                    </motion.div>
                  </Col>

                  <Col md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.48, delay: 0.28 }}
                    >
                      <Form.Group>
                        <Form.Label className="field-label">E-mail</Form.Label>
                        <Form.Control type="email" placeholder="Enter your email address" required />
                      </Form.Group>
                    </motion.div>
                  </Col>

                  <Col md={6}>
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.48, delay: 0.34 }}
                    >
                      <Form.Group>
                        <Form.Label className="field-label">Phone number</Form.Label>
                        <Form.Control placeholder="Enter your contact number" />
                      </Form.Group>
                    </motion.div>
                  </Col>

                  <Col xs={12}>
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.48, delay: 0.40 }}
                    >
                      <Form.Group>
                        <Form.Label className="field-label">Query</Form.Label>
                        <Form.Control as="textarea" rows={5} placeholder="Ask your query..." required />
                      </Form.Group>
                    </motion.div>
                  </Col>

                  <Col xs={12} className="text-center mt-3">
                    <motion.div
                      initial={{ opacity: 0, y: 14 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.48, delay: 0.46 }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button variant="primary" type="submit" className="send-btn">
                        Send Message
                      </Button>
                    </motion.div>
                  </Col>
                </Row>
              </Form>
            </motion.div>
          </Col>

          {/* Right Info */}
          <Col lg={5} md={12}>
            <motion.aside
              initial={{ opacity: 0, x: 18 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="info-card"
            >
              <h5 className="info-title">Hi We are always here to help you.</h5>

              <div className="info-box">
                <div className="info-label">Phone Number</div>
                <div className="info-value">+91 77230 06091</div>
              </div>

              <div className="info-box">
                <div className="info-label">Email</div>
                <div className="info-value">Institute@gmail.com</div>
              </div>

              <div className="info-box">
                <div className="info-label">Address</div>
                <div className="info-value">Indrapuri B Sector, Sector B, Indrapuri, Bhopal, Madhya Pradesh 462022</div>
              </div>

              <div className="connect">Connect with us</div>

              <div className="socials">
                <motion.a whileHover={{ scale: 1.14, y: -4 }} whileTap={{ scale: 0.96 }} href="https://www.facebook.com/share/173ig1Ww91/" aria-label="facebook"><FaFacebookF /></motion.a>
                <motion.a whileHover={{ scale: 1.14, y: -4 }} whileTap={{ scale: 0.96 }} href="https://www.instagram.com/impsenglish?igsh=MWkzazgyNnpmejZ4Zg==" aria-label="instagram"><FaInstagram /></motion.a>
                <motion.a whileHover={{ scale: 1.14, y: -4 }} whileTap={{ scale: 0.96 }} href="https://www.youtube.com/@ImpressiveEnglish" aria-label="youtube"><FaYoutube /></motion.a>
                <motion.a whileHover={{ scale: 1.14, y: -4 }} whileTap={{ scale: 0.96 }} href="#" aria-label="x"><FaXTwitter /></motion.a>
                <motion.a whileHover={{ scale: 1.14, y: -4 }} whileTap={{ scale: 0.96 }} href="#" aria-label="telegram"><FaTelegramPlane /></motion.a>
              </div>
            </motion.aside>
          </Col>
        </Row>
      </Container>
      <VisitUs />
      <FooterBottom />
    </main>
  );
}
