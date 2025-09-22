import React, { useEffect, useRef, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";
import American from "./Image/American_Logo.png";
import "./NavbarAmerican.css";

export default function NavbarAmerican() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const pendingHomeScroll = useRef(false);

  // track scroll -> toggle scrolled class
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close when route changes
  useEffect(() => setExpanded(false), [location]);

  // after navigate to home, scroll to top if requested
  useEffect(() => {
    if (location.pathname === "/" && pendingHomeScroll.current) {
      scroll.scrollToTop({ duration: 220, smooth: true });
      pendingHomeScroll.current = false;
    }
  }, [location]);

  // lock body scroll when mobile menu open
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (expanded) document.body.style.overflow = "hidden";
    else document.body.style.overflow = prev || "";
    return () => { document.body.style.overflow = prev || ""; };
  }, [expanded]);

  // click outside to close
  useEffect(() => {
    const onDocClick = (e) => {
      if (!navRef.current) return;
      if (expanded && !navRef.current.contains(e.target)) setExpanded(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [expanded]);

  const handleHomeClick = (e) => {
    if (e?.preventDefault) e.preventDefault();
    if (location.pathname === "/") scroll.scrollToTop({ duration: 180, smooth: true });
    else {
      pendingHomeScroll.current = true;
      navigate("/");
    }
    setExpanded(false);
  };

  const logoVar = { hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0, transition: { duration: 0.42 } } };
  const navVar = { hidden: { opacity: 0, y: -6 }, show: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.06 } } };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      onToggle={(val) => setExpanded(val)}
      collapseOnSelect
      className={`animated-navbar ${scrolled ? "scrolled" : "top"}`}
      fixed="top"
      ref={navRef}
    >
      <Container fluid className="nav-container">
        <motion.div className="brand-wrap" initial="hidden" animate="show" variants={logoVar}>
          <Navbar.Brand as={RouterLink} to="/" className="brand-text" onClick={handleHomeClick}>
            <img src={American} alt="American Institute" className="brand-logo" />
          </Navbar.Brand>
        </motion.div>

        <Navbar.Toggle
          aria-controls="main-navbar"
          className="nav-toggle"
          aria-expanded={expanded}
          onClick={() => setExpanded((s) => !s)}
        />

        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <motion.nav className="nav-links" initial="hidden" animate="show" variants={navVar}>
            <Nav className="align-items-center">

              <Nav.Item>
                <Nav.Link as="button" className="nav-link-item" onClick={handleHomeClick}>
                  Home
                </Nav.Link>
              </Nav.Item>

              <Nav.Item>
                <ScrollLink
                  to="courses-section"
                  smooth={true}
                  duration={350}
                  offset={-88}
                  className="nav-link-item"
                  onClick={() => setExpanded(false)}
                  style={{ cursor: "pointer", display: "inline-block" }}
                >
                  Courses
                </ScrollLink>
              </Nav.Item>

              <Nav.Link as={RouterLink} to="/gallery" className="nav-link-item" onClick={() => setExpanded(false)}>
                Gallery
              </Nav.Link>

              <Nav.Link as={RouterLink} to="/contact" className="nav-link-item" onClick={() => setExpanded(false)}>
                Contact
              </Nav.Link>

              <Nav.Link as={RouterLink} to="/login" className="user-link" onClick={() => setExpanded(false)}>
                <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                  <FaUserCircle size={22} />
                </motion.div>
              </Nav.Link>

            </Nav>
          </motion.nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
