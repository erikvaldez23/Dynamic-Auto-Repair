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
            +1 (972) 362-8468
          </Typography>
        </Box>
        <Box
          className="business-info-item email-only"
          onClick={handleEmailClick}
          style={{ cursor: "pointer" }}
        >
          <FaEnvelope className="business-icon" />
          <Typography variant="h6" className="business-text">
            info@tinttekplus.com
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
            Mon - Sat, 9am - 6pm
          </Typography>
        </Box>
      </Box>

      {/* Styled Modal for Business Hours */}
      <Modal
        open={openHoursModal}
        onClose={handleCloseModal}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backdropFilter: "blur(4px)",
          bgcolor: "rgba(0, 0, 0, 0.25)",
        }}
      >
        <Box
          sx={{
            width: { xs: "90%", sm: 400 },
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 4,
            boxShadow: 24,
            border: "1px solid rgba(0, 0, 0, 0.1)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h6"
            component="h2"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            Business Hours
          </Typography>
          <Typography sx={{ mt: 1 }}>Monday: 9am - 6pm</Typography>
          <Typography sx={{ mt: 1 }}>Tuesday: 9am - 6pm</Typography>
          <Typography sx={{ mt: 1 }}>Wednesday: 9am - 6pm</Typography>
          <Typography sx={{ mt: 1 }}>Thursday: 9am - 6pm</Typography>
          <Typography sx={{ mt: 1 }}>Friday: 9am - 6pm</Typography>
          <Typography sx={{ mt: 1 }}>Saturday: 9am - 6pm</Typography>
          <Typography sx={{ mt: 1, mb: 2 }}>Sunday: Closed</Typography>
          <Button
            onClick={handleCloseModal}
            variant="contained"
            sx={{ borderRadius: 2, background: "#2794d2" }}
          >
            Close
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default BusinessInfo;
