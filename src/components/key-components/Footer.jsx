import React from "react";
import {
  Box,
  Typography,
  Container,
  IconButton,
  Divider,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaTiktok } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  // ✅ Click Handler for Logo
  const handleLogoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" }); // ✅ Scroll to top if already on homepage
    } else {
      navigate("/"); // ✅ Navigate to homepage if on a subpage
    }
  };

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "transparent",
        color: "white",
        py: isMobile ? 2 : 4,
        textAlign: "center",
      }}
    >
      <Container maxWidth="lg">
        {/* Top Section: Logo + Social Media */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: isMobile ? "center" : "space-between",
            flexWrap: "wrap",
            mb: isMobile ? 3 : 2,
            gap: isMobile ? 2 : 0,
          }}
        >
          {/* Company Logo (With Click Functionality) */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              "&:hover": { cursor: "pointer", transform: "scale(1.05)" },
            }}
            onClick={handleLogoClick} // ✅ Click to Navigate or Scroll
          >
            <img src='/logo.png' alt="Company Logo" style={{ height: isMobile ? "40px" : "50px" }} />
          </Box>

          {/* Social Media Icons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: isMobile ? "1rem" : "1.5rem", // Adjust spacing for mobile
            }}
          >
            <IconButton
              color="inherit"
              sx={{
                transition: "color 0.3s",
                "&:hover": { color: "#f2c230" }, // Blue color on hover
              }}
              href="https://www.facebook.com/people/Tinttekplus/61561991193951/"
              target="_blank"
            >
              <FaFacebook size={isMobile ? 22 : 24} />
            </IconButton>

            <IconButton
              color="inherit"
              sx={{
                transition: "color 0.3s",
                "&:hover": { color: "#f2c230" },
              }}
              href="https://www.instagram.com/tinttekplus/"
              target="_blank"
            >
              <FaInstagram size={isMobile ? 22 : 24} />
            </IconButton>

            <IconButton
              color="inherit"
              sx={{
                transition: "color 0.3s",
                "&:hover": { color: "#f2c230" },
              }}
              href="https://www.tiktok.com/@tinttekplus"
              target="_blank"
            >
              <FaTiktok size={isMobile ? 22 : 24} />
            </IconButton>

            {/* <IconButton
              color="inherit"
              sx={{
                transition: "color 0.3s",
                "&:hover": { color: "#007bff" },
              }}
              href="https://twitter.com"
              target="_blank"
            >
              <FaTwitter size={isMobile ? 22 : 24} />
            </IconButton> */}
          </Box>
        </Box>

        {/* Divider for Separation */}
        <Divider sx={{ bgcolor: "gray", opacity: 0.2, my: 2 }} />

        {/* Middle Section: Website URL + Privacy Policy */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row", // Stack links on mobile
            justifyContent: "center",
            alignItems: "center",
            gap: 2,
            textAlign: "center",
            fontSize: "14px",
          }}
        >
          <Link
            href="https://tinttekplus.com"
            color="inherit"
            underline="hover"
            sx={{ fontSize: isMobile ? "13px" : "14px" }}
          >
            dynamicautorepair.com
          </Link>
          <Link
            href="/#/privacy-policy"
            color="inherit"
            underline="hover"
            sx={{ fontSize: isMobile ? "13px" : "14px" }}
          >
            Privacy Policy
          </Link>
        </Box>

        {/* Bottom Section: All Rights Reserved */}
        <Typography
          variant="body2"
          sx={{
            mt: 2,
            fontSize: isMobile ? "11px" : "12px",
            opacity: 0.7,
          }}
        >
          © {new Date().getFullYear()} Dynamic Auto Repair . All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
