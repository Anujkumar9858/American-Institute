import React, { useEffect, useRef, useState } from "react";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaPlus, FaPlay, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import FooterBottom from "./FooterBottom";
import "./DemoGallery.css";

/* ----- sample items: note these are YouTube URLs (play via iframe) ----- */
const SAMPLE_VIDEOS = [
  {
    id: "v1",
    title: "Basic English Teaching - 30 mins",
    duration: "30 minutes",
    src: "https://youtu.be/3WzBOlyqwMc?si=DBZAYNTGbYIfPcqehttps://youtu.be/wUtJs8GqYYo?si=U85ULw8dNHuJEJiK",
  },
  {
    id: "v2",
    title: "Pronunciation Basics - 20 mins",
    duration: "20 minutes",
    src: "https://youtube.com/shorts/WEERqWxl174?si=ieWCxm9msPvAIEAS",
  },
];

/* helpers */
function isYouTubeUrl(url = "") {
  return /youtube\.com|youtu\.be/.test(url);
}
function extractYouTubeId(url = "") {
  // Match watch?v=, /shorts/, youtu.be/
  try {
    const u = new URL(url);
    if (u.hostname.includes("youtu.be")) {
      return u.pathname.slice(1);
    }
    if (u.pathname.startsWith("/shorts/")) {
      return u.pathname.split("/shorts/")[1];
    }
    // watch?v=....
    if (u.searchParams.get("v")) return u.searchParams.get("v");
    // fallback attempt: last path segment
    const seg = u.pathname.split("/").filter(Boolean).pop();
    return seg || null;
  } catch (e) {
    return null;
  }
}
function youtubeThumbnailUrl(id) {
  if (!id) return null;
  return `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;
}

export default function DemoGallery() {
  const [videos, setVideos] = useState(() => SAMPLE_VIDEOS.map(v => ({ ...v })));
  const [index, setIndex] = useState(0);
  const [playerOpen, setPlayerOpen] = useState(false);
  const [activeVideo, setActiveVideo] = useState(videos[0] || null);
  const [activeIsYouTube, setActiveIsYouTube] = useState(false);
  const fileRef = useRef(null);

  // make sure route shows top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => {
    setActiveVideo(videos[index] || null);
  }, [index, videos]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") setPlayerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, videos]);

  const prev = () => setIndex(i => (i - 1 + videos.length) % Math.max(1, videos.length));
  const next = () => setIndex(i => (i + 1) % Math.max(1, videos.length));

  const openPlayer = (vid) => {
    setActiveVideo(vid);
    setActiveIsYouTube(isYouTubeUrl(vid.src));
    setPlayerOpen(true);
  };

  const handleUpload = (e) => {
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
    setVideos(prev => [...prev, ...newItems]);
    setIndex(prev => prev + newItems.length);
    e.target.value = "";
  };

  const dirRef = useRef(1);
  const handlePrev = () => { dirRef.current = -1; prev(); };
  const handleNext = () => { dirRef.current = 1; next(); };

  const cardVar = {
    enter: dir => ({ x: dir > 0 ? 200 : -200, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: dir => ({ x: dir > 0 ? -200 : 200, opacity: 0 })
  };

  return (
    <main className="demo-gallery-page">
      <div className="demo-banner">
        <div className="demo-banner-inner">
          <h1 className="demo-banner-giant">FREE DEMO</h1>
        </div>
      </div>

      <Container>
        <div className="demo-intro-row">
          <Row className="align-items-start">
            <Col lg={6} md={12}>
              <motion.h2 className="demo-title" initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                Still Thinking? <br /> Let the <span className="accent">Demo Decide.</span>
              </motion.h2>
            </Col>
            <Col lg={6} md={12}>
              <motion.p className="demo-desc-intro" initial={{ opacity: 0, y: -6 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.08 }}>
                Not ready to commit? Try our <strong>5 free video lessons</strong> and experience the quality of our teaching. Learn at your pace, get a feel of the course, and take your first step toward confident communication — <strong>completely free!</strong>
              </motion.p>
            </Col>
          </Row>
        </div>

        <div className="demo-controls" style={{ marginTop: 6 }}>
          <label className="upload-btn">
            <FaPlus /> Upload Demo
            <input ref={fileRef} type="file" accept="video/*" multiple onChange={handleUpload} />
          </label>
        </div>

        <section className="demo-carousel" style={{ marginTop: 8 }}>
          <button className="carousel-nav left" onClick={handlePrev} aria-label="Previous">
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
                        {/* if youtube: show thumbnail image; if local blob: show HTML video */}
                        {isYouTubeUrl(videos[index].src) ? (
                          <img
                            src={youtubeThumbnailUrl(extractYouTubeId(videos[index].src)) || ""}
                            alt={videos[index].title}
                            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                          />
                        ) : (
                          <video src={videos[index].src} preload="metadata" muted playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )}
                        <div className="play-overlay"><FaPlay /></div>
                      </div>
                      <div className="card-body">
                        <h3>{videos[index].title}</h3>
                        <p className="duration">{videos[index].duration}</p>
                      </div>
                    </>
                  ) : (
                    <div className="empty-card">No demos available. Upload one!</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button className="carousel-nav right" onClick={handleNext} aria-label="Next">
            <FaChevronRight />
          </button>
        </section>

        <div className="carousel-dots" aria-hidden={videos.length === 0}>
          {videos.map((v, i) => (
            <button
              key={v.id}
              className={`dot ${i === index ? "active" : ""}`}
              onClick={() => { dirRef.current = i > index ? 1 : -1; setIndex(i); }}
              aria-label={`Go to demo ${i + 1}`}
            />
          ))}
        </div>

        <Row className="mt-4 gx-3">
          {videos.map((v) => (
            <Col md={4} sm={6} xs={12} key={v.id} className="mb-3">
              <motion.div whileHover={{ scale: 1.02 }} className="thumb-card" onClick={() => {
                const idx = videos.findIndex(x => x.id === v.id);
                dirRef.current = idx > index ? 1 : -1;
                setIndex(idx);
                openPlayer(v);
              }}>
                <div className="thumb-video">
                  {isYouTubeUrl(v.src) ? (
                    <img src={youtubeThumbnailUrl(extractYouTubeId(v.src))} alt={v.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  ) : (
                    <video src={v.src} muted preload="metadata" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
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

      {/* bottom CTA */}
      <div className="questions-section page-bottom-cta">
        <motion.h4 className="questions-title" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          Still got some Questions?
        </motion.h4>
        <motion.div className="ask-row" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.06 }}>
          <Link to="/contact" className="ask-btn">
            <span>Ask here</span>
            <FaArrowRight className="ask-icon" />
          </Link>
        </motion.div>
      </div>

      {/* Player modal: iframe for youtube, video tag for local blobs */}
      <Modal show={playerOpen} onHide={() => setPlayerOpen(false)} size="lg" centered>
        <Modal.Header closeButton>{activeVideo?.title}</Modal.Header>
        <Modal.Body className="p-0" style={{ background: "#000" }}>
          {activeVideo ? (
            <div style={{ position: "relative", paddingTop: "56.25%" }}>
              {isYouTubeUrl(activeVideo.src) ? (
                // build embed url from ID
                (() => {
                  const id = extractYouTubeId(activeVideo.src);
                  const embed = id ? `https://www.youtube.com/embed/${id}?rel=0&autoplay=1` : activeVideo.src;
                  return (
                    <iframe
                      title={activeVideo.title}
                      src={embed}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
                    />
                  );
                })()
              ) : (
                <video
                  src={activeVideo.src}
                  controls
                  autoPlay
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                />
              )}
            </div>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setPlayerOpen(false)}>Close</Button>
        </Modal.Footer>
      </Modal>

      <FooterBottom />
    </main>
  );
}
