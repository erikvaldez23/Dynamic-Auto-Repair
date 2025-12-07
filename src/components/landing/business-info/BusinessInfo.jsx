import React, { useState } from "react";
import { Box, Typography, Modal, Button } from "@mui/material";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import "./BusinessInfo.css"; // Import styles

const BusinessInfo = () => {
  const [openHoursModal, setOpenHoursModal] = useState(false);

  // Phone click triggers the phone dialer
  const handlePhoneClick = () => {
    window.location.href = "tel:+19723628468";
  };

  // Email click opens the default email client
  const handleEmailClick = () => {
    window.location.href = "mailto:info@tinttekplus.com";
  };

  // Address click opens Google Maps in a new tab
  const handleAddressClick = () => {
    window.open(
      "https://www.google.com/maps/place/Tint+Tek+Plus/@32.8783221,-96.6691041,17z/data=!3m1!4b1!4m6!3m5!1s0x864ea153db5dd237:0xe54143946793a9e6!8m2!3d32.8783221!4d-96.6665292!16s%2Fg%2F11w46vds7d?entry=ttu&g_ep=EgoyMDI1MDMxOS4xIKXMDSoJLDEwMjExNDU1SAFQAw%3D%3D",
      "_blank"
    );
  };

  // Hours click opens a modal displaying business hours
  const handleHoursClick = () => {
    setOpenHoursModal(true);
  };

  const handleCloseModal = () => {
    setOpenHoursModal(false);
  };

  return (
    <>
      <Box className="business-info-overlay">
        <Box
          className="business-info-item phone-only"
          onClick={handlePhoneClick}
          style={{ cursor: "pointer" }}
        >
          <FaPhone className="business-icon" />
          <Typography variant="h6" className="business-text">
            +1 (469) 969-0043
          </Typography>
        </Box>
        <Box
          className="business-info-item email-only"
          onClick={handleEmailClick}
          style={{ cursor: "pointer" }}
        >
          <FaEnvelope className="business-icon" />
          <Typography variant="h6" className="business-text">
            ryan@dynamicautorepair.com
          </Typography>
        </Box>
        <Box
          className="business-info-item"
          onClick={handleAddressClick}
          style={{ cursor: "pointer" }}
        >
          <FaMapMarkerAlt className="business-icon" />
          <Typography variant="h6" className="business-text">
            2518 West Kingsley Rd
          </Typography>
        </Box>
        <Box
          className="business-info-item"
          onClick={handleHoursClick}
          style={{ cursor: "pointer" }}
        >
          <FaClock className="business-icon" />
          <Typography variant="h6" className="business-text">
            Click for Hours
          </Typography>
        </Box>
      </Box>

      <Modal
        open={openHoursModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(5px)",
          bgcolor: "rgba(0, 0, 0, 0.4)",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: 400 },
            bgcolor: "rgba(20, 20, 20, 0.75)", // Dark transparent
            backdropFilter: "blur(16px)",       // Strong blur
            WebkitBackdropFilter: "blur(16px)",
            borderRadius: "24px",
            p: 4,
            boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            textAlign: "center",
            color: "#fff",
          }}
        >
          <Typography
            variant="h5"
            component="h2"
            sx={{ fontWeight: 800, mb: 3, letterSpacing: 0.5 }}
          >
            Business Hours
          </Typography>

          {[
            { day: "Monday", time: "8:30 AM - 6:00 PM" },
            { day: "Tuesday", time: "8:30 AM - 6:00 PM" },
            { day: "Wednesday", time: "8:30 AM - 6:00 PM" },
            { day: "Thursday", time: "8:30 AM - 6:00 PM" },
            { day: "Friday", time: "8:30 AM - 6:00 PM" },
            { day: "Saturday", time: "8:30 AM - 4:00 PM" },
            { day: "Sunday", time: "Closed" },
          ].map((item) => (
            <Box
              key={item.day}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mb: 1.5,
                borderBottom: "1px solid rgba(255,255,255,0.1)",
                pb: 0.5
              }}
            >
              <Typography sx={{ opacity: 0.8, fontWeight: 500 }}>{item.day}</Typography>
              <Typography sx={{ fontWeight: 600 }}>{item.time}</Typography>
            </Box>
          ))}

          <Button
            onClick={handleCloseModal}
            sx={{
              mt: 3,
              borderRadius: "12px",
              color: "#000",
              background: "#f2c230",
              fontWeight: 700,
              px: 4,
              py: 1,
              textTransform: "none",
              fontSize: "1rem",
              "&:hover": {
                background: "#ffd95a",
              },
            }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default BusinessInfo;
