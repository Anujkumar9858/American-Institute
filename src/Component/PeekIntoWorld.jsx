// src/Component/PeekIntoWorld.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Carousel } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6"; // ensure you have react-icons v6 or change to 'react-icons/fa'
import Stage from "./Image/Stage_performance.jpg";
import Group from "./Image/Group_discuss.jpg";
import Interview from "./Image/Interview.jpg";
import Img from "./Image/About_Institute.jpg";
import "./PeekIntoWorld.css";

export default function PeekIntoWorld() {
  // Use plain src strings (or imported image variables) in the array
  const IMAGES = [
    { src: Img, alt: "Students in classroom" },
    { src: Group, alt: "Students collaborating" },
    { src: Interview, alt: "Student interview" },
    { src: Stage, alt: "Stage performance" }, // extra image, optional
  ];

  const [showModal, setShowModal] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  // open at given index
  const openAt = (i) => {
    setModalIndex(i);
    setShowModal(true);
  };
  const close = () => setShowModal(false);

  const fadeUp = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const imgZoom = {
    hidden: { opacity: 0, scale: 0.96 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  // ensure modal resets when closed (optional)
  useEffect(() => {
    if (!showModal) {
      // if you want to reset index when modal closes, uncomment:
      // setModalIndex(0);
    }
  }, [showModal]);

  return (
    <section className="peek-outer" aria-labelledby="peek-title">
      <Container fluid="lg">
        <div className="peek-inner-card">
          <motion.div
            className="peek-wrap"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.35 }}
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.h2 id="peek-title" className="peek-title" variants={fadeUp}>
              A Peek Into Our World
            </motion.h2>
            <motion.p className="peek-sub" variants={fadeUp}>
              A Glimpse Into Our Teaching Environment and Student Success.
            </motion.p>

            <motion.div className="peek-grid" variants={imgZoom}>
              <Row className="g-4 align-items-start">
                {/* LEFT (two stacked) */}
                <Col lg={8} className="left-col">
                  <div className="left-stack">
                    <motion.div
                      className="left-top img-card"
                      variants={imgZoom}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => openAt(0)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter") openAt(0); }}
                      aria-label="Open first image"
                    >
                      <img src={IMAGES[0].src} alt={IMAGES[0].alt} />
                    </motion.div>

                    <motion.div
                      className="left-bottom img-card"
                      variants={imgZoom}
                      whileHover={{ scale: 1.03 }}
                      onClick={() => openAt(1)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => { if (e.key === "Enter") openAt(1); }}
                      aria-label="Open second image"
                    >
                      <img src={IMAGES[1].src} alt={IMAGES[1].alt} />
                    </motion.div>
                  </div>
                </Col>

                {/* RIGHT (one large + CTA) */}
                <Col lg={4} className="right-col">
                  <motion.div
                    className="right-top img-card"
                    variants={imgZoom}
                    whileHover={{ scale: 1.03 }}
                    onClick={() => openAt(2)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") openAt(2); }}
                    aria-label="Open third image"
                  >
                    <img src={IMAGES[2].src} alt={IMAGES[2].alt} />
                  </motion.div>

                  <motion.div className="right-action" variants={fadeUp}>
                    <motion.button
                      className="view-more-btn"
                      whileHover={{
                        scale: 1.04,
                        boxShadow: "0 22px 44px rgba(109,77,223,0.18)",
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => openAt(0)}
                      aria-label="View more photos"
                    >
                      <span className="vm-text">View More</span>
                      <span className="vm-arrow"><FaArrowRight /></span>
                    </motion.button>
                  </motion.div>
                </Col>
              </Row>
            </motion.div>
          </motion.div>
        </div>
      </Container>

      {/* Modal with Carousel */}
      <Modal show={showModal} onHide={close} centered size="xl" dialogClassName="peek-modal" aria-labelledby="peek-modal-title">
        <Modal.Body className="p-0 bg-black">
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35 }}>
            <Carousel
              activeIndex={modalIndex}
              onSelect={(selectedIndex /* , e */) => setModalIndex(selectedIndex)}
              indicators={false}
              interval={3000}
              pause="hover"
              variant="dark"
            >
              {IMAGES.map((it, i) => (
                <Carousel.Item key={i}>
                  <div className="modal-img-wrap" style={{ display: "flex", justifyContent: "center", alignItems: "center", background: "#000" }}>
                    <img src={it.src} alt={it.alt} style={{ width: "100%", height: "auto", maxHeight: "80vh", objectFit: "cover", display: "block" }} />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel>
          </motion.div>
        </Modal.Body>
      </Modal>
    </section>
  );
}
