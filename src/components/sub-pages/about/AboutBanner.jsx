// src/components/about/AboutBanner.jsx
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
  Dialog,
  IconButton,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";

/* ---- Brand tokens ---- */
const BG = "#f2c230";     // section background
const CTA_DARK = "#000";  // primary button
const TEXT_LIGHT = "#000";

export default function AboutBanner({
  formUrl = "/quote",      // internal route or full external URL
  useModal = false,        // true = open modal with embedded form
  phoneHref = "tel:+14699690043",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { serviceId } = useParams(); // kept in case you use it later
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.2 } },
  };
  const fadeSlideVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const handlePrimary = () => {
    if (useModal) {
      setOpenModal(true);
      return;
    }
    if (/^https?:\/\//i.test(formUrl)) {
      window.location.href = formUrl;
    } else {
      navigate(formUrl);
    }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <Box
        sx={{
          position: "relative",
          py: 5,
          px: { xs: 1, sm: 2, md: 3 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: BG,
          borderRadius: isMobile ? 10 : 20,
          color: TEXT_LIGHT,
          mt: 5,
          mb: 5,
          overflow: "hidden",
        }}
      >
        {/* subtle UNDERLAY (doesn't block text or clicks) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1 }}
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,                 // under content
            pointerEvents: "none",     // never intercepts clicks
            background:
              "radial-gradient(60% 100% at 50% 0%, rgba(255,255,255,.18), transparent 60%)",
          }}
        />

        {/* content ABOVE the underlay */}
        <Box sx={{ position: "relative", zIndex: 1, maxWidth: 1100, width: "100%" }}>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component={motion.h3}
            variants={fadeSlideVariant}
            sx={{ fontWeight: 900, letterSpacing: 0.5, textTransform: "uppercase", color: TEXT_LIGHT }}
          >
            CTA HEADER
          </Typography>

          <Typography
            variant="body1"
            component={motion.p}
            variants={fadeSlideVariant}
            transition={{ delay: 0.2 }}
            sx={{
              mt: 2,
              fontSize: isMobile ? "1rem" : "1.15rem",
              lineHeight: 1.6,
              opacity: 0.9,
              mx: "auto",
              maxWidth: 980,
              color: TEXT_LIGHT,
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit, quae
            impedit nesciunt molestiae eum molestias laborum ipsam sapiente, esse ad autem.
            Saepe iusto asperiores iure illo suscipit? Velit, exercitationem aliquid?
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              justifyContent: "center",
              flexWrap: "wrap",
              mt: 3,
            }}
          >
            <Button
              component={motion.button}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrimary}
              sx={{
                backgroundColor: CTA_DARK,
                color: "#fff",
                fontWeight: 900,
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.4 },
                borderRadius: "30px",
                textTransform: "uppercase",
                fontSize: { xs: "1rem", md: "1.05rem" },
              }}
            >
              Get a Free Quote
            </Button>

            <Button
              variant="outlined"
              onClick={() => (window.location.href = phoneHref)}
              sx={{
                borderRadius: "30px",
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.4 },
                fontWeight: 900,
                color: "#111",
                borderColor: alpha("#000", 0.35),
                background: alpha("#fff", 0.35),
                "&:hover": {
                  borderColor: alpha("#000", 0.6),
                  background: alpha("#fff", 0.55),
                },
              }}
            >
              Call Now
            </Button>
          </Box>
        </Box>

        {/* Optional modal with embedded form */}
        {useModal && (
          <Dialog
            open={openModal}
            onClose={() => setOpenModal(false)}
            fullWidth
            maxWidth="lg"
            aria-labelledby="about-banner-modal-title"
          >
            <Box sx={{ position: "relative" }}>
              <IconButton
                aria-label="Close"
                onClick={() => setOpenModal(false)}
                sx={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  color: "#fff",
                  backgroundColor: "rgba(0,0,0,0.5)",
                  zIndex: 1,
                  "&:hover": { backgroundColor: "rgba(0,0,0,0.7)" },
                }}
              >
                <CloseIcon />
              </IconButton>
              <iframe
                src={formUrl}
                width="100%"
                height="800"
                style={{ border: "none" }}
                title="Service Quote"
              />
            </Box>
          </Dialog>
        )}
      </Box>
    </motion.div>
  );
}
