// src/Component/DemoGallery.jsx
import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlus, FaPlay, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import FooterBottom from "./FooterBottom";
import { useAuth } from "../context/AuthContext"; // ✅ Role based auth
import "./DemoGallery.css";

/* ----- Sample items ----- */
const SAMPLE_VIDEOS = [
  {
    id: "v1",
    title: "Basic English Teaching - 30 mins",
    duration: "30 minutes",
    src: "https://www.youtube.com/watch?v=3WzBOlyqwMc",
  },
  {
    id: "v2",
    title: "Pronunciation Basics - 20 mins",
    duration: "20 minutes",
    src: "https://www.youtube.com/shorts/WEERqWxl174",
  },
];

/* --- Helpers --- */
function isYouTubeUrl(url = "") {
  return /youtube\.com|youtu\.be/.test(url);
}
function extractYouTubeId(url = "") {
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) return u.pathname.slice(1);
    if (u.pathname.startsWith("/shorts/")) return u.pathname.split("/shorts/")[1];
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    return u.pathname.split("/").filter(Boolean).pop();
  } catch (e) {
    return null;
  }
}
function youtubeThumbnailUrl(id) {
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default function DemoGallery() {
  const { role } = useAuth(); // ✅ role from context
  const [videos, setVideos] = useState(() => SAMPLE_VIDEOS.map((v) => ({ ...v })));
  const [index, setIndex] = useState(0);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(videos[0] || null);
  const [activeIsYouTube, setActiveIsYouTube] = useState(false);
  const fileRef = useRef(null);
  const dirRef = useRef(1);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    setActiveVideo(videos[index] || null);
  }, [index, videos]);

  const prev = () => setIndex((i) => (i - 1 + videos.length) % videos.length);
  const next = () => setIndex((i) => (i + 1) % videos.length);

  const openPlayer = (vid) => {
    setActiveVideo(vid);
    setActiveIsYouTube(isYouTubeUrl(vid.src));
    setPlayerOpen(true);
  };

  // ✅ Upload only allowed if admin
  const handleUpload = (e) => {
    if (role !== "admin") return; // student cannot upload
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const newItems = files.map((file, i) => {
      const url = URL.createObjectURL(file);
      return {
        id: `upload-${Date.now()}-${i}`,
        title: file.name,
        duration: "Uploaded",
        src: url,
        uploaded: true,
      };
    });
    setVideos((prev) => [...prev, ...newItems]);
    setIndex(videos.length); // jump to last added
    e.target.value = "";
  };

  const cardVar = {
    enter: (dir) => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -200 : 200, opacity: 0 }),
  };

  return (
    <main className="demo-gallery-page">
      {/* Banner */}
      <div className="demo-banner">
        <div className="demo-banner-inner">
          <h1 className="demo-banner-giant">FREE DEMO</h1>
        </div>
      </div>

      <Container>
        {/* Intro */}
        <div className="demo-intro-row">
          <Row>
            <Col lg={6} md={12}>
              <motion.h2
                className="demo-title"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Still Thinking? <br /> Let the <span className="accent">Demo Decide.</span>
              </motion.h2>
            </Col>
            <Col lg={6} md={12}>
              <motion.p
                className="demo-desc-intro"
                initial={{ opacity: 0, y: -6 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
              >
                Try our <strong>free video lessons</strong> and experience the quality of teaching.  
                Learn at your pace, completely free!
              </motion.p>
            </Col>
          </Row>
        </div>

        {/* ✅ Upload Button only visible for admin */}
        {role === "admin" && (
          <div className="demo-controls" style={{ marginTop: 6 }}>
            <label className="upload-btn">
              <FaPlus /> Upload Demo
              <input ref={fileRef} type="file" accept="video/*" multiple onChange={handleUpload} />
            </label>
          </div>
        )}

        {/* Carousel */}
        <section className="demo-carousel">
          <button className="carousel-nav left" onClick={() => { dirRef.current = -1; prev(); }}>
            <FaChevronLeft />
          </button>

          <div className="carousel-window">
            <AnimatePresence custom={dirRef.current}>
              {videos.length > 0 && (
                <motion.div
                  key={videos[index]?.id || "empty"}
                  className="carousel-card"
                  custom={dirRef.current}
                  variants={cardVar}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  {videos[index] ? (
                    <>
                      <div className="video-thumb" role="button" onClick={() => openPlayer(videos[index])}>
                        {isYouTubeUrl(videos[index].src) ? (
                          <img
                            src={youtubeThumbnailUrl(extractYouTubeId(videos[index].src))}
                            alt={videos[index].title}
                          />
                        ) : (
                          <video src={videos[index].src} muted preload="metadata" />
                        )}
                        <div className="play-overlay"><FaPlay /></div>
                      </div>
                      <div className="card-body">
                        <h3>{videos[index].title}</h3>
                        <p className="duration">{videos[index].duration}</p>
                      </div>
                    </>
                  ) : (
                    <div>No demos available.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="carousel-nav right" onClick={() => { dirRef.current = 1; next(); }}>
            <FaChevronRight />
          </button>
        </section>

        {/* Thumbnails */}
        <Row className="mt-4 gx-3">
          {videos.map((v) => (
            <Col md={4} sm={6} xs={12} key={v.id} className="mb-3">
              <motion.div whileHover={{ scale: 1.02 }} className="thumb-card" onClick={() => openPlayer(v)}>
                <div className="thumb-video">
                  {isYouTubeUrl(v.src) ? (
                    <img src={youtubeThumbnailUrl(extractYouTubeId(v.src))} alt={v.title} />
                  ) : (
                    <video src={v.src} muted preload="metadata" />
                  )}
                  <div className="thumb-overlay"><FaPlay /></div>
                </div>
                <div className="thumb-meta">
                  <strong>{v.title}</strong>
                  <div className="meta-sub">{v.duration}</div>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Player Modal */}
      <Modal show={playerOpen} onHide={() => setPlayerOpen(false)} size="lg" centered>
        <Modal.Header closeButton>{activeVideo?.title}</Modal.Header>
        <Modal.Body className="p-0" style={{ background: "#000" }}>
          {activeVideo && (
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              {activeIsYouTube ? (
                <iframe
                  title={activeVideo.title}
                  src={`https://www.youtube.com/embed/${extractYouTubeId(activeVideo.src)}?rel=0&autoplay=1`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              ) : (
                <video src={activeVideo.src} controls autoPlay style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPlayerOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <FooterBottom />
    </main>
  );
}
