// src/components/content/CallToAction.jsx
import React, { useMemo, useState } from "react";
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
const BG = "#f2c230";      // section background
const CTA_DARK = "#000";   // primary button
const TEXT_LIGHT = "#000";

/* Match button widths across variants */
const BTN_WIDTH = { xs: "100%", sm: 220, md: 240 };

/* ---- Copy registry ---- */
const CTA_REGISTRY = {
  "ac-heating": {
    headline: "Restore Cold Air & Comfort",
    body:
      "AC recharge, leak checks, heater and climate control diagnostics—done right so you stay comfortable year-round.",
  },
  alignments: {
    headline: "Tracks Straight. Tires Last Longer.",
    body:
      "Precision four-wheel alignments with suspension checks and a spec report. Better handling, better wear.",
  },
  "batteries-alternators": {
    headline: "Strong Starts & Healthy Charging",
    body:
      "We test and replace batteries, alternators, and starters—so you’re never stuck with a no-start again.",
  },
  brakes: {
    headline: "Confident, Quiet Stopping",
    body:
      "Pads, rotors, fluid exchange, and ABS diagnostics. Transparent options, premium parts, proper bed-in.",
  },
  "computer-diagnostics": {
    headline: "Clear Answers. Smart Repairs.",
    body:
      "Advanced OBD-II and manufacturer-level diagnostics to pinpoint issues and build an action plan you can trust.",
  },
  "check-engine-light": {
    headline: "Check Engine Light On?",
    body:
      "We’ll verify the fault, explain what it means, and give you a clear repair path—no guesswork.",
  },
  "cooling-system": {
    headline: "Keep Your Engine Cool",
    body:
      "Radiators, water pumps, hoses, and thermostats. We stop overheating and protect your engine.",
  },
  "engine-service": {
    headline: "From Tune-Ups to Major Repairs",
    body:
      "Comprehensive engine diagnostics and service to restore power, drivability, and reliability.",
  },
  "fleet-services": {
    headline: "Keep Your Fleet Moving",
    body:
      "Fast, reliable maintenance and repairs with business-friendly scheduling to minimize downtime.",
  },
  "fuel-system": {
    headline: "Performance & MPG Restored",
    body:
      "Pumps, injectors, filters, and induction cleaning to fix hesitation, misfires, and poor economy.",
  },
  "multi-point-inspection": {
    headline: "Know Your Car’s Health",
    body:
      "Pre-purchase and multi-point inspections covering safety, wear, leaks, and a road-test report.",
  },
  "oil-filter-change": {
    headline: "Fast Oil Service. Done Right.",
    body:
      "Correct spec oil and filter, torque-spec plug, top-offs, and maintenance light reset.",
  },
  "scheduled-maintenance": {
    headline: "Stay On Schedule, Stay Protected",
    body:
      "OEM-recommended services that keep your vehicle performing—and your warranty happy.",
  },
  "state-inspection": {
    headline: "Pass With Confidence",
    body:
      "Quick, compliant inspections with clear guidance if anything needs to be addressed.",
  },
  "suspension-steering": {
    headline: "Ride Comfort & Control Restored",
    body:
      "Shocks, struts, control arms, tie-rods, and racks. Eliminate clunks, vibration, and wander.",
  },
  tires: {
    headline: "Grip. Comfort. Safety.",
    body:
      "Mounting, road-force balance, rotations, repairs, and TPMS—plus tire options for any budget.",
  },

  _default: { headline: "CTA Header", body: "CTA Description" },
};

export default function CallToAction({
  formUrl = "/quote",      // internal route or full external URL
  useModal = false,        // true = open modal with embedded form
  phoneHref = "tel:+14699690043",
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);

  const copy = useMemo(
    () => CTA_REGISTRY[serviceId] || CTA_REGISTRY._default,
    [serviceId]
  );

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
    // <motion.div
    //   initial="hidden"
    //   whileInView="visible"
    //   viewport={{ once: true, amount: 0.3 }}
    //   variants={containerVariants}
    // >
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
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: TEXT_LIGHT,
          mt: 5,
          mb: 5,
          overflow: "hidden",
        }}
      >
        {/* subtle overlay */}
        {/* <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.45 }}
          transition={{ duration: 1 }}
          style={{ position: "absolute", inset: 0, zIndex: 1 }}
        /> */}

        <Box sx={{ position: "relative", zIndex: 2, maxWidth: 1100, width: "100%" }}>
          <Typography
            variant={isMobile ? "h4" : "h2"}
            component={motion.h3}
            variants={fadeSlideVariant}
            sx={{ fontWeight: 900, letterSpacing: 0.5, textTransform: "uppercase" }}
          >
            {copy.headline}
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
            }}
          >
            {copy.body}
          </Typography>

          <Box
            sx={{
              display: "flex",
              gap: 1.5,
              justifyContent: "center",
              flexWrap: "wrap",
              mt: 3,
              width: { xs: "min(92vw, 560px)", sm: "auto" },
              mx: "auto",
            }}
          >
            {/* Primary — solid black */}
            <Button
              component={motion.button}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
              onClick={handlePrimary}
              sx={{
                width: BTN_WIDTH,                 // equal width
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

            {/* Secondary — clear background, black text, black border */}
            <Button
              onClick={() => (window.location.href = phoneHref)}
              sx={{
                width: BTN_WIDTH,                 // equal width
                borderRadius: "30px",
                px: { xs: 3, md: 4 },
                py: { xs: 1.2, md: 1.4 },
                fontWeight: 900,
                color: "#000",
                border: "2px solid #000",
                backgroundColor: "transparent",
                textTransform: "uppercase",
                fontSize: { xs: "1rem", md: "1.05rem" },
                "&:hover": {
                  borderColor: "#000",
                  backgroundColor: alpha("#000", 0.06), // tiny tint on hover (still feels clear)
                },
              }}
            >
              Call Now
            </Button>
          </Box>
        </Box>

        {/* Optional modal with embedded form */}
        {useModal && (
          <Dialog open={openModal} onClose={() => setOpenModal(false)} fullWidth maxWidth="lg">
            <Box sx={{ position: "relative" }}>
              <IconButton
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
    // </motion.div>
  );
}
