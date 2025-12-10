import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import "./FooterBottom.css";

export default function Footer() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <footer className="footer-premium">
      <div className="footer-glow-top" />
      <Container fluid className="px-lg-5">
        <div className="footer-layout">
          {/* Brand / Statement */}
          <div className="footer-brand-section">
            <motion.h2
              className="footer-statement"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Because You <br /> <span className="text-highlight">Deserve to Be Heard.</span>
            </motion.h2>
          </div>

          {/* Info Columns */}
          <div className="footer-info-grid">
            <div className="info-col">
              <h6 className="footer-heading">Visit Us</h6>
              <p className="footer-text">Indrapuri B Sector, Sector B<br />Bhopal, Madhya Pradesh 462022</p>
            </div>
            <div className="info-col">
              <h6 className="footer-heading">Contact</h6>
              <a href="tel:+917723006091" className="footer-link-text">+91 77230 06091</a>
              <a href="mailto:Americaninstitute@gmail.com" className="footer-link-text">Americaninstitute@gmail.com</a>
            </div>
            <div className="info-col">
              <h6 className="footer-heading">Follow Us</h6>
              <div className="footer-social-links">
                <motion.a whileHover={{ scale: 1.1 }} href="#"><FaInstagram /></motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="#"><FaYoutube /></motion.a>
                <motion.a whileHover={{ scale: 1.1 }} href="#"><FaFacebookF /></motion.a>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="footer-bottom-bar">
          <p className="copyright">&copy; {new Date().getFullYear()} American Institute. All Rights Reserved.</p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
