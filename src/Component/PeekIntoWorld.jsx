// src/Component/PeekIntoWorld.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col, Modal, Carousel } from "react-bootstrap";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaArrowRight, FaPlus } from "react-icons/fa6"; // ensure you have react-icons v6 or change to 'react-icons/fa'
import Stage from "./Image/Stage_performance.jpg";
import Group from "./Image/Group_discuss.jpg";
import Interview from "./Image/Interview.jpg";
import Img from "./Image/About_Institute.jpg";
import "./PeekIntoWorld.css";

export default function PeekIntoWorld() {
  const sectionRef = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-50, 50]);
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
    <section className="peek-section-premium" ref={sectionRef}>
      <Container className="peek-container">
        <div className="peek-header-wrapper">
          <motion.h2
            className="peek-main-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            A Peek Into <br /> <span className="title-highlight">Our World</span>
          </motion.h2>

          <motion.div
            className="peek-desc-block"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>
              Step inside an environment designed for growth.
              From high-energy interactive sessions to focused mentorship,
              witness the vibrant culture that drives our success.
            </p>
            <motion.button
              className="explore-btn-premium"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openAt(0)}
            >
              Explore Gallery <FaArrowRight className="btn-arrow" />
            </motion.button>
          </motion.div>
        </div>

        {/* Premium Masonry Layout */}
        <div className="peek-masonry-layout">
          {/* Column 1 (Parallax Up) */}
          <motion.div className="masonry-col col-1" style={{ y: y1 }}>
            <div className="gallery-item item-tall" onClick={() => openAt(0)}>
              <div className="img-overlay"></div>
              <img src={IMAGES[0].src} alt={IMAGES[0].alt} />
              <div className="item-caption">
                <span>Classroom Vibes</span>
                <FaPlus className="plus-icon" />
              </div>
            </div>
            <div className="gallery-item item-short" onClick={() => openAt(3)}>
              <div className="img-overlay"></div>
              <img src={IMAGES[3].src} alt={IMAGES[3].alt} />
              <div className="item-caption">
                <span>Stage Performance</span>
                <FaPlus className="plus-icon" />
              </div>
            </div>
          </motion.div>

          {/* Column 2 (Parallax Down) */}
          <motion.div className="masonry-col col-2" style={{ y: y2 }}>
            <div className="gallery-item item-medium" onClick={() => openAt(1)}>
              <div className="img-overlay"></div>
              <img src={IMAGES[1].src} alt={IMAGES[1].alt} />
              <div className="item-caption">
                <span>Group Synergy</span>
                <FaPlus className="plus-icon" />
              </div>
            </div>
            <div className="gallery-item item-tall" onClick={() => openAt(2)}>
              <div className="img-overlay"></div>
              <img src={IMAGES[2].src} alt={IMAGES[2].alt} />
              <div className="item-caption">
                <span>Interview Prep</span>
                <FaPlus className="plus-icon" />
              </div>
            </div>
          </motion.div>

          {/* Column 3 (Static / Mixed) - Optional for larger screens, or stick to 2 cols for better balance on mid-size */}
          {/* We'll stick to a balanced 2-col masonry for better mobile/tablet scaling or 3 if space allows. 
              Let's do a decorative text block or visual element in the 3rd slot if we want asymmetric 3-col.
              For now, 2 distinct parallax columns looks very premium. Let's add a decorative floating graphic. 
          */}
        </div>

      </Container>

      {/* Modern Modal */}
      <Modal show={showModal} onHide={close} centered size="xl" contentClassName="premium-modal-content">
        <Modal.Body className="p-0">
          <button className="modal-close-btn" onClick={close}>&times;</button>
          <Carousel
            activeIndex={modalIndex}
            onSelect={(selectedIndex) => setModalIndex(selectedIndex)}
            indicators={true}
            interval={null}
            wrapperClassName="premium-carousel"
          >
            {IMAGES.map((it, i) => (
              <Carousel.Item key={i}>
                <div className="fullscreen-img-wrap">
                  <img src={it.src} alt={it.alt} />
                  <div className="carousel-caption-overlay">
                    <h3>{it.alt}</h3>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
      </Modal>
    </section>
  );
}
