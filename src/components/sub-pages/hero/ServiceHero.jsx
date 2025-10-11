// src/components/hero/ServiceHero.jsx
import React, { useMemo } from "react";
import {
  Box,
  Stack,
  Chip,
  Button,
  Typography,
  useMediaQuery,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import { Link as RouterLink } from "react-router-dom";

/* ----------------------------- Design Tokens ----------------------------- */
// Default accent (can be overridden per service in registry)
const ACCENT_DEFAULT = "#f2c230"; // Dynamic Auto Repair yellow

// Subtle backdrop gradient used over media
const BG_GRADIENT = `
  linear-gradient(180deg, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 38%, rgba(0,0,0,0.20) 56%, rgba(0,0,0,0.28) 100%),
  radial-gradient(1200px 600px at 10% -10%, rgba(242,194,48,.18), transparent 55%),
  radial-gradient(1000px 500px at 105% 120%, rgba(242,194,48,.10), transparent 60%)
`;

/* --------------------------------- Shell -------------------------------- */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "42vh",
  maxHeight: "760px",
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
  borderRadius: 24,
  isolation: "isolate",
  // make it breathe from page edges on small screens
  margin: "0 auto",
}));

const MediaLayer = styled(Box)({
  position: "absolute",
  inset: 0,
  zIndex: 0,
  overflow: "hidden",
});

const Overlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  inset: 0,
  zIndex: 1,
  background: BG_GRADIENT,
  // Prevent GPU seams
  transform: "translateZ(0)",
}));

const ContentWrap = styled(motion.div)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  width: "min(1200px, 92vw)",
  marginInline: "auto",
  display: "grid",
  gap: theme.spacing(2.5),
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2),
  width: "100%",
  padding: theme.spacing(3),
  borderRadius: 20,
  backdropFilter: "blur(8px)",
  background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
  border: "1px solid rgba(255,255,255,0.12)",
  color: alpha("#fff", 0.98),
}));

const TagRow = styled(Stack)(({ theme }) => ({
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

/* ----------------------------- Service Registry ----------------------------- */
/** Customize per service: title, description, media, accent, chips */
export const SERVICE_HERO_REGISTRY = {
  "ac-heating": {
    title: "AC & Heating",
    description:
      "Stay comfortable all year. Expert AC recharge, heater diagnostics, and climate control repairs.",
    media: { image: "/services/hero/ac-heating.jpg" },
    accent: "#f2c230",
    chips: ["AC Recharge", "Leak Tests", "Cabin Filters"],
  },
  alignments: {
    title: "Alignments",
    description:
      "Sharper handling and longer tire life with precision four-wheel alignments.",
    media: { image: "/services/hero/alignments.jpg" },
    accent: "#f2c230",
    chips: ["Four-Wheel", "Steering Center", "Specs Report"],
  },
  brakes: {
    title: "Brakes",
    description:
      "Pads, rotors, hydraulics—everything for confident, quiet stopping.",
    media: { video: "/services/hero/brakes.mp4", poster: "/services/hero/brakes.jpg" },
    accent: "#f2c230",
    chips: ["Pads & Rotors", "Brake Flush", "ABS Diagnostics"],
  },
  "batteries-alternators": {
    title: "Batteries / Alternators",
    description:
      "Fast testing and replacement to keep your vehicle starting and charging right.",
    media: { image: "/services/hero/batteries.jpg" },
    accent: "#f2c230",
    chips: ["Load Test", "Alternator", "Starter"],
  },
  "computer-diagnostics": {
    title: "Computer Diagnostics",
    description: "Advanced OBD-II and manufacturer-level scanning for clear answers.",
    media: { image: "/services/hero/diagnostics.jpg" },
    accent: "#f2c230",
    chips: ["Scan & Verify", "Live Data", "Action Plan"],
  },
  // ...add the rest as you like (cooling-system, fuel-system, tires, etc.)
};

/* --------------------------------- Component --------------------------------- */
export default function ServiceHero({
  serviceId,
  // you can override registry at call-site if needed
  registry = SERVICE_HERO_REGISTRY,
  // action handlers
  onPrimary = () => (window.location.href = "tel:+14699690043"),
  onSecondary = () => (window.location.href = "/quote"),
}) {
  const isSm = useMediaQuery("(max-width:600px)");
  const cfg = registry[serviceId];

  // Fallback to a harmless default if route key is missing
  const data = useMemo(
    () =>
      cfg || {
        title: "Auto Service",
        description:
          "Professional diagnostics, transparent estimates, and quality repairs.",
        media: { image: "/services/hero/default.jpg" },
        accent: ACCENT_DEFAULT,
        chips: ["Transparent", "Warranty-Backed", "Certified Techs"],
      },
    [cfg]
  );

  const accent = data.accent || ACCENT_DEFAULT;

  return (
    <Section sx={{ mt: { xs: 1, md: 2 }, minHeight: { xs: "46vh", md: "52vh" } }}>
      {/* Background media */}
      <MediaLayer aria-hidden>
        {data.media?.video ? (
          <video
            src={data.media.video}
            poster={data.media.poster}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        ) : (
          <img
            src={data.media?.image}
            alt=""
            loading="eager"
            decoding="async"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center",
              display: "block",
            }}
          />
        )}
      </MediaLayer>

      <Overlay />

      {/* Content */}
      <ContentWrap
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Breadcrumbs */}
        <Breadcrumbs
          sx={{
            color: alpha("#fff", 0.9),
            textShadow: "0 1px 2px rgba(0,0,0,.4)",
            fontSize: 13,
          }}
          separator="›"
        >
          <MuiLink component={RouterLink} to="/" underline="hover" color="inherit">
            Home
          </MuiLink>
          <MuiLink component={RouterLink} to="/services" underline="hover" color="inherit">
            Services
          </MuiLink>
          <Typography component="span" sx={{ opacity: 0.9 }}>
            {data.title}
          </Typography>
        </Breadcrumbs>

        {/* Headline card */}
        <GlassCard
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.5 }}
        >
          <Typography
            variant={isSm ? "h4" : "h3"}
            fontWeight={900}
            sx={{ lineHeight: 1.1 }}
          >
            {data.title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              opacity: 0.92,
              maxWidth: 940,
              lineHeight: 1.5,
            }}
          >
            {data.description}
          </Typography>

          {!!data.chips?.length && (
            <TagRow direction="row">
              {data.chips.map((c, i) => (
                <Chip
                  key={i}
                  label={c}
                  sx={{
                    color: "#111",
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    bgcolor: alpha(accent, 0.96),
                    border: `1px solid ${alpha("#000", 0.2)}`,
                    "& .MuiChip-label": { px: 1.25, py: 0.5 },
                  }}
                />
              ))}
            </TagRow>
          )}

          <Stack direction="row" spacing={1.5} sx={{ pt: 0.5, flexWrap: "wrap" }}>
            <Button
              onClick={onPrimary}
              variant="contained"
              disableElevation
              sx={{
                borderRadius: 2,
                px: 2.5,
                py: 1.1,
                fontWeight: 800,
                bgcolor: accent,
                color: "#111",
                "&:hover": { bgcolor: alpha(accent, 0.9) },
              }}
            >
              Call Now
            </Button>
            <Button
              onClick={onSecondary}
              variant="outlined"
              sx={{
                borderRadius: 2,
                px: 2.25,
                py: 1.05,
                fontWeight: 800,
                color: alpha("#fff", 0.98),
                borderColor: alpha("#fff", 0.35),
                backdropFilter: "blur(2px)",
                "&:hover": {
                  borderColor: alpha("#fff", 0.6),
                  background: alpha("#fff", 0.06),
                },
              }}
            >
              Get Free Estimate
            </Button>
          </Stack>
        </GlassCard>

        {/* Accent underline (subtle, brand-colored) */}
        <Box
          component={motion.div}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.55 }}
          sx={{
            height: 5,
            width: 88,
            borderRadius: 3,
            background: accent,
            boxShadow: `0 0 8px ${alpha(accent, 0.6)}, 0 0 16px ${alpha(accent, 0.4)}`,
          }}
        />
      </ContentWrap>
    </Section>
  );
}
