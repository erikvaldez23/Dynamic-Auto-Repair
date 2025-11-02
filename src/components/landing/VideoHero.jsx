// src/components/landing/HeroVideoBackground.jsx
import React, { useRef, useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import BusinessInfo from "./business-info/BusinessInfo";

/* ------------------------------ Defaults ------------------------------ */
const BASE_URL = (import.meta?.env?.BASE_URL ?? "/").replace(/\/+/g, "/");

const DEFAULTS = {
  src: `/tesla-video.mov`,
  poster: `${BASE_URL}images/hero.jpg`,
  heading: "Precision. Protection. Performance.",
  // subheading: "Expert window tinting & paint protection film.",
  ctaLabel: "Get a Free Quote",
  height: "100svh",
  overlay: true,
  overlayStrength: 0.55,
};

const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

const NOOP = () => {};

/* ------------------------------ Styled ------------------------------ */
const Root = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "100svh",
  overflow: "hidden",
  backgroundColor: "#000",
  color: alpha(ACCENT, 0.95),
}));

const Video = styled("video")(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transform: "translateZ(0)",
}));

const Overlay = styled(Box)(({ strength = 0.55 }) => ({
  position: "absolute",
  inset: 0,
  background: `linear-gradient(180deg, rgba(0,0,0,${Math.min(
    strength + 0.25,
    0.92
  )}) 0%, rgba(0,0,0,${strength}) 40%, rgba(0,0,0,${Math.max(
    strength - 0.2,
    0
  )}) 100%),
  radial-gradient(circle at top left, rgba(39,148,210,0.18), transparent 48%),
  radial-gradient(circle at bottom right, rgba(77,184,240,0.12), transparent 52%)`,
  pointerEvents: "none",
}));

/** Foreground canvas — relative so we can anchor corners inside it */
const Content = styled(Box)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  minHeight: "inherit",
  width: "100%",
}));

/** Bottom-left block (headline + subheading) */
const LeftBlock = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "clamp(12px, 3vw, 10px)",
  bottom: "clamp(16px, 6vh, 12px)",
  maxWidth: "min(960px, 92vw)",
  display: "grid",
  gap: theme.spacing(2),
  textAlign: "left",
}));

/** Bottom-right CTA block */
/** Bottom-right CTA block */
const RightCTA = styled(Box)(({ theme }) => ({
  position: "absolute",
  right: "clamp(12px, 3vw, 40px)",
  bottom: "clamp(16px, 6vh, 72px)",
  display: "grid",
  gap: theme.spacing(1.25),
  // equal widths:
  gridTemplateColumns: "1fr",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  // optional: limit total width so both look balanced
  width: "min(520px, 92vw)",
}));


/* ------------------------ Staggered Heading ------------------------ */
function StaggerHeading() {
  const indents = [
    "0", // PRECISION
    "clamp(12px, 6vw, 80px)", // PROTECTION
    "clamp(24px, 12vw, 160px)", // PERFORMANCE
  ];

  const baseTypo = {
    fontWeight: 900,
    letterSpacing: { xs: -0.5, md: -1 },
    lineHeight: 1.02,
    fontSize: { xs: "clamp(26px, 8vw, 40px)", md: "clamp(46px, 8vw, 98px)" },
    textShadow: "0 2px 16px rgba(0,0,0,0.6)",
  };

  return (
    <Box>
      <Typography
        variant="h1"
        sx={{
          ...baseTypo,
          lineHeight: 1,
          paddingLeft: indents[0],
          textTransform: "uppercase",
        }}
      >
        HONESTY
      </Typography>

      <Typography
        variant="h1"
        sx={{
          ...baseTypo,
          paddingLeft: indents[1],
          textTransform: "uppercase",
          mt: "4px",
        }}
      >
        RELIABILITY
      </Typography>

      <Typography
        variant="h1"
        sx={{
          ...baseTypo,
          paddingLeft: indents[2],
          textTransform: "uppercase",
          mt: "4px",
        }}
      >
        PERFORMANCE
      </Typography>
    </Box>
  );
}

/* ------------------------------ Component ------------------------------ */
export default function HeroVideoBackground({
  src = DEFAULTS.src,
  poster = DEFAULTS.poster,
  heading = DEFAULTS.heading, // kept for API compat (unused by stagger)
  subheading = DEFAULTS.subheading,
  ctaLabel = DEFAULTS.ctaLabel,
  onCtaClick = NOOP,
  height = DEFAULTS.height,
  overlay = DEFAULTS.overlay,
  overlayStrength = DEFAULTS.overlayStrength,
  children,
  onLearnMore = NOOP, // optional: handler for Learn More
}) {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const onLoadedMeta = () => {
      v.muted = true;
      v.play().catch(() => {});
    };
    const onCanPlay = () => setCanPlay(true);
    v.addEventListener("loadedmetadata", onLoadedMeta);
    v.addEventListener("canplay", onCanPlay);
    return () => {
      v.removeEventListener("loadedmetadata", onLoadedMeta);
      v.removeEventListener("canplay", onCanPlay);
    };
  }, []);

  return (
    <Root sx={{ minHeight: height }}>
      {/* Background Video */}
      <Video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={poster}
        onError={() => setCanPlay(false)}
      >
        {src && <source src={src} type="video/mp4" />}
      </Video>

      {overlay && <Overlay strength={overlayStrength} />}
      <BusinessInfo />

      {/* Foreground anchors */}
      <Content>
        {children ? (
          children
        ) : (
          <>
            {/* Bottom-left: headline + subheading */}
            <LeftBlock>
              <StaggerHeading />

              {subheading && (
                <Typography
                  component="p"
                  variant="h6"
                  sx={{
                    opacity: 0.92,
                    maxWidth: 820,
                    mt: 1,
                    textShadow: "0 1px 10px rgba(0,0,0,0.5)",
                  }}
                >
                  {subheading}
                </Typography>
              )}
            </LeftBlock>

            {/* Bottom-right: CTAs */}
            <RightCTA sx={{ gap: 1.25, flexWrap: "wrap" }}>
              {/* Learn More — transparent + blurred with yellow border/text */}
              <Button
                aria-label="Learn more"
                onClick={onLearnMore}
                sx={{
                  fontWeight: 800,
                  textTransform: "none",
                  px: 2.75,
                  py: 1.1,
                  borderRadius: 2,
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  backgroundColor: "rgba(0,0,0,0.18)",
                  border: `2px solid ${ACCENT}`,
                  color: ACCENT,
                  boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.32)",
                    borderColor: ACCENT_HOVER,
                    color: ACCENT_HOVER,
                  },
                }}
              >
                Learn More
              </Button>

              {/* Primary CTA */}
              {ctaLabel && (
                <Button
                  variant="contained"
                  size="large"
                  onClick={onCtaClick}
                  aria-label={ctaLabel}
                  sx={{
                    fontWeight: 800,
                    textTransform: "none",
                    px: 3.25,
                    py: 1.25,
                    borderRadius: 2,
                    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {ctaLabel}
                </Button>
              )}
            </RightCTA>
          </>
        )}
      </Content>

      {!canPlay && overlay && <Overlay strength={overlayStrength} />}
    </Root>
  );
}
