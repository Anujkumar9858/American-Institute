// src/Component/VisitUs.jsx
import React from "react";
import { Container } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaMapMarkerAlt } from "react-icons/fa";
import Map2 from "./Image/Map0.png";
import "./VisitUs.css";

export default function VisitUs() {
  // Use an address (or coordinates) to open in Google Maps.
  // You can replace this with exact coordinates if you prefer: "https://www.google.com/maps?q=lat,lng"
  const branches = [
    {
      id: "b1",
      title: "American Institute - Indrapuri",
      address: "12–B, Beside Indian Coffee House, Indrapuri, Bhopal (M.P)",
      // optional: you can place coordinates here instead
      // coords: "23.2599,77.4126"
    },
    {
      id: "b3",
      title: "American Institute - Vidisha",
      address: "Gopal Complex, Opp. Dehat Thana, Vidisha (M.P)",
    },
  ];

  const openInMaps = (address) => {
    const q = encodeURIComponent(address + " American Institute");
    // open in new tab
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, "_blank", "noopener");
  };

  const handleKeyPress = (e, address) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      openInMaps(address);
    }
  };

  return (
    <section className="visit-section">
      <Container>
        {/* Heading */}
        <motion.div
          className="visit-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="visit-title">Visit Us Here</h2>
          <p className="visit-sub">Any of our three branches</p>
        </motion.div>

        {/* Map */}
        <motion.div
          className="map-wrapper"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <img src={Map2} alt="map" className="map-img" />

          {/* Markers - adjust positions (.marker-1/.marker-3 in CSS) */}
          <motion.div
            role="button"
            tabIndex={0}
            aria-label={`${branches[0].title} — Open in Google Maps`}
            className="map-marker marker-1"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, type: "spring", stiffness: 200 }}
            onClick={() => openInMaps(branches[0].address)}
            onKeyDown={(e) => handleKeyPress(e, branches[0].address)}
          >
            <FaMapMarkerAlt />
          </motion.div>

          <motion.div
            role="button"
            tabIndex={0}
            aria-label={`${branches[1].title} — Open in Google Maps`}
            className="map-marker marker-3"
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
            onClick={() => openInMaps(branches[1].address)}
            onKeyDown={(e) => handleKeyPress(e, branches[1].address)}
          >
            <FaMapMarkerAlt />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
