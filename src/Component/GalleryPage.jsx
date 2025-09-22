import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal } from "react-bootstrap";
import { motion } from "framer-motion";
import Footer from "./FooterBottom";
import "./GalleryPage.css";

const IMAGES = [
  "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&w=900&q=80", // featured
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&w=900&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&w=900&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&auto=format&fit=crop&q=60",
  "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&w=900&q=80",
  "https://images.unsplash.com/photo-1596495577886-d920f1fb7238?auto=format&w=900&q=80",
  "https://images.unsplash.com/photo-1568992688065-536aad8a12f6?w=600&auto=format&fit=crop&q=60"
];

export default function GalleryPage() {
  const [isMobile, setIsMobile] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 576);
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const featured = IMAGES[0];
  // images to show in grid: skip the featured (start from index 1)
  const otherImages = IMAGES.slice(1);
  // on mobile (and not expanded) show first 4 thumbnails after the featured
  const gridImages = isMobile && !showAll ? otherImages.slice(0, 4) : otherImages;

  const openModal = (img) => {
    setActiveImage(img);
    setModalOpen(true);
  };

  return (
    <main className="gallery-page">
      {/* Banner */}
      <div className="gallery-banner">
        <h1 className="gallery-title">GALLERY</h1>
        <p className="gallery-sub">
          A glimpse into our learning journey — where confidence is built and futures are shaped.
        </p>
      </div>

      <Container className="gallery-content">
        {/* Featured image (single, not duplicated in grid) */}
        <div className="carousel-window clickable" onClick={() => openModal(featured)}>
          <motion.img
            src={featured}
            alt="Gallery featured"
            className="carousel-img"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Image Grid (starts after featured) */}
        <Row className="gallery-grid mt-5 g-3">
          {gridImages.map((img, i) => (
            <Col key={i} xs={12} sm={6} md={4} lg={3}>
              <motion.div
                className="gallery-card"
                whileHover={{ scale: 1.04 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                onClick={() => openModal(img)}
              >
                <img src={img} alt={`Gallery ${i + 1}`} className="gallery-img" />
              </motion.div>
            </Col>
          ))}
        </Row>

        {/* Show more / Show less button on mobile */}
        {isMobile && (
          <div className="more-row">
            {!showAll ? (
              <button className="more-btn" onClick={() => setShowAll(true)}>
                Show more
              </button>
            ) : (
              <button
                className="more-btn secondary"
                onClick={() => {
                  setShowAll(false);
                  window.scrollTo({
                    top: document.querySelector(".gallery-grid")?.offsetTop - 80 || 0,
                    behavior: "smooth"
                  });
                }}
              >
                Show less
              </button>
            )}
          </div>
        )}
      </Container>

      {/* Modal for enlarged image */}
      <Modal show={modalOpen} onHide={() => setModalOpen(false)} size="lg" centered>
        <Modal.Body className="p-0">
          {activeImage && (
            <img src={activeImage} alt="Enlarged view" className="modal-img" />
          )}
        </Modal.Body>
      </Modal>

      <Footer />
    </main>
  );
}
