import React, { useEffect, useRef, useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";
import { motion } from "framer-motion";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import American from "../Component/Image/american_logo_transparent.png";
import "./NavbarAmerican.css";

export default function NavbarAmerican() {
  const [scrolled, setScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const navRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const pendingHomeScroll = useRef(false);

  const { role, logout } = useAuth();

  const isHomePage = location.pathname === "/"; // ✅ check route

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setExpanded(false), [location]);

  const handleHomeClick = (e) => {
    e?.preventDefault();
    if (location.pathname === "/") {
      scroll.scrollToTop({ duration: 180, smooth: true });
    } else {
      pendingHomeScroll.current = true;
      navigate("/");
    }
    setExpanded(false);
  };

  const logoVar = {
    hidden: { opacity: 0, y: -6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.42 } },
  };
  const navVar = {
    hidden: { opacity: 0, y: -6 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.06 } },
  };

  return (
    <Navbar
      expand="lg"
      expanded={expanded}
      collapseOnSelect
      className={`animated-navbar ${scrolled ? "scrolled" : "top"} ${!isHomePage ? "force-dark" : ""}`} 
      fixed="top"
      ref={navRef}
    >
      <div className="nav-full">
        {/* Brand Logo */}
        <motion.div className="brand-wrap" initial="hidden" animate="show" variants={logoVar}>
          <Navbar.Brand as={RouterLink} to="/" className="brand-text" onClick={handleHomeClick}>
            <img src={American} alt="American Institute" className="brand-logo" />
          </Navbar.Brand>
        </motion.div>

        {/* Right side controls */}
        <div className="right-controls">
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

                {/* ✅ Login / Logout toggle */}
                {role ? (
                  <Nav.Link as="button" className="user-link" onClick={logout}>
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ duration: 0.3 }}>
                      <FaSignOutAlt size={22} />
                    </motion.div>
                  </Nav.Link>
                ) : (
                  <Nav.Link as={RouterLink} to="/login" className="user-link" onClick={() => setExpanded(false)}>
                    <motion.div whileHover={{ rotate: 360 }} transition={{ duration: 0.6 }}>
                      <FaUserCircle size={22} />
                    </motion.div>
                  </Nav.Link>
                )}
              </Nav>
            </motion.nav>
          </Navbar.Collapse>
        </div>
      </div>
    </Navbar>
  );
}
