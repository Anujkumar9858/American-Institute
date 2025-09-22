import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaInstagram, FaYoutube, FaTwitter } from "react-icons/fa";
import "./ContactBranches.css";
import Map from "../Component/Image/Map.png";

export default function ContactBranches() {
  const branches = [
    {
      name: "MP Nagar Branch",
      link: "https://www.google.com/maps?q=23.2333,77.4333",
      top: "40%",
      left: "45%",
    },
    {
      name: "Arera Colony Branch",
      link: "https://www.google.com/maps?q=23.2000,77.4000",
      top: "25%",
      left: "70%",
    },
    {
      name: "Kolar Road Branch",
      link: "https://www.google.com/maps?q=23.1800,77.4500",
      top: "70%",
      left: "80%",
    },
  ];

  return (
    <section className="contact-branches">
      <Container fluid="lg">
        <h2 className="contact-title">Get in Touch with Us</h2>
        <p className="contact-sub">We are always here to help you</p>

        <Row>
          {/* LEFT */}
          <Col lg={4} className="contact-left">
            <div className="contact-card">
              <h3>Hi We are always here to help you.</h3>

              <div className="contact-fields">
                <label>Phone Number</label>
                <div className="field">+91 7723006091</div>

                <label>Email</label>
                <div className="field">institute@gmail.com</div>

                <label>Address</label>
                <div className="field">Indrapuri B Sector, Sector B, Indrapuri, Bhopal, Madhya Pradesh 462022</div>
              </div>

              <div className="connect">
                <p>Connect with us</p>
                <div className="socials">
                  <a href="https://www.facebook.com/share/173ig1Ww91/"><FaFacebookF /></a>
                  <a href="https://www.instagram.com/impsenglish?igsh=MWkzazgyNnpmejZ4Zg=="><FaInstagram /></a>
                  <a href="https://www.youtube.com/@ImpressiveEnglish"><FaYoutube /></a>
                  <a href="#"><FaTwitter /></a>
                </div>
              </div>

              <button
                className="visit-btn"
                onClick={() => window.open(branches[0].link, "_blank")}
              >
                Visit Us here →
              </button>
            </div>
          </Col>

          {/* RIGHT */}
          <Col lg={8} className="contact-right">
            <div className="map-wrapper">
              <img src={Map} alt="Bhopal Map" className="map-bg" />

              {branches.map((b, i) => (
                <div
                  key={i}
                  className="map-pin"
                  style={{ top: b.top, left: b.left }}
                  title={b.name}
                  onClick={() => window.open(b.link, "_blank")}
                >
                  <span className="pin-dot" />
                  <span className="pin-pulse" />
                </div>
              ))}
            </div>
          </Col>
        </Row>

        {/* BIG BACKGROUND TEXT */}
        <div className="big-text-wrap">
          <h1 className="big-text">AMERICAN</h1>
          <h1 className="big-text">INSTITUTE</h1>
        </div>
      </Container>
    </section>
  );
}
