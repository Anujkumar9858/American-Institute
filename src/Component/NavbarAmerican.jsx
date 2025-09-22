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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!navRef.current) return;
      if (expanded && !navRef.current.contains(e.target)) {
        setExpanded(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [expanded]);

  // Close collapse on route change
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  // If we navigated to home and a scroll was pending, scroll to top
  useEffect(() => {
    if (location.pathname === "/" && pendingHomeScroll.current) {
      // fast, smooth scroll to top
      scroll.scrollToTop({ duration: 220, smooth: true });
      pendingHomeScroll.current = false;
    }
  }, [location]);

  const logoVar = {
    hidden: { opacity: 0, y: -6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };
  const navVar = {
    hidden: { opacity: 0, y: -6 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.06 },
    },
  };

  const handleNavLinkClick = () => setExpanded(false);

  // Handle Home click: if already on '/', scroll to top immediately.
  // Otherwise navigate to '/' and remember to scroll once route changes.
  const handleHomeClick = (e) => {
    e.preventDefault?.();
    if (location.pathname === "/") {
      scroll.scrollToTop({ duration: 180, smooth: true });
    } else {
      pendingHomeScroll.current = true;
      navigate("/");
    }
    handleNavLinkClick();
  };

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
        <motion.div
          className="brand-wrap"
          initial="hidden"
          animate="show"
          variants={logoVar}
        >
          <Navbar.Brand as={RouterLink} to="/" className="brand-text" onClick={handleHomeClick}>
            <img src={American} alt="American Institute" className="brand-logo" />
          </Navbar.Brand>
        </motion.div>

        <Navbar.Toggle aria-controls="main-navbar" className="nav-toggle" onClick={() => setExpanded(!expanded)} />

        <Navbar.Collapse id="main-navbar" className="justify-content-end">
          <motion.nav
            className="nav-links"
            initial="hidden"
            animate="show"
            variants={navVar}
          >
            <Nav className="align-items-center">

              {/* HOME - unified handler works from any route */}
              <Nav.Item>
                {/* using Nav.Link as a button keeps bootstrap styles */}
                <Nav.Link as="button" className="nav-link-item" onClick={handleHomeClick}>
                  Home
                </Nav.Link>
              </Nav.Item>

              {/* SCROLL TO COURSES / WHAT WE OFFER (only works when on home page) */}
              <Nav.Item>
                <ScrollLink
                  to="courses-section"
                  smooth={true}
                  duration={350}
                  offset={-88}
                  className="nav-link-item"
                  onClick={handleNavLinkClick}
                  style={{ cursor: "pointer", display: "inline-block" }}
                >
                  Courses
                </ScrollLink>
              </Nav.Item>

              {/* Regular router links (open new route) */}
              <Nav.Link as={RouterLink} to="/gallery" className="nav-link-item" onClick={handleNavLinkClick}>
                Gallery
              </Nav.Link>

              <Nav.Link as={RouterLink} to="/contact" className="nav-link-item" onClick={handleNavLinkClick}>
                Contact
              </Nav.Link>

              <Nav.Link as={RouterLink} to="/login" className="user-link" onClick={handleNavLinkClick}>
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
