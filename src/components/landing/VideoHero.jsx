import React, { useRef, useState, useEffect } from "react";
import { Box, Container, Typography, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import BusinessInfo from "./business-info/BusinessInfo";

/* ------------------------------ Defaults ------------------------------ */
// If you deploy with a non-root base (e.g., GitHub Pages), BASE_URL ensures
// paths to /public assets resolve correctly. Put your files in /public/videos & /public/images.
const BASE_URL = (import.meta?.env?.BASE_URL ?? "/").replace(/\/+/g, "/");

const DEFAULTS = {
  src: `/tesla-video.mov`, // place /public/videos/hero.mp4
  poster: `${BASE_URL}images/hero.jpg`, // place /public/images/hero.jpg
  heading: "Precision. Protection. Performance.",
  subheading: "Expert window tinting & paint protection film.",
  ctaLabel: "Get a Free Quote",
  height: "100svh",
  overlay: true,
  overlayStrength: 0.55,
};

const NOOP = () => {};

/**
 * HeroVideoBackground
 * ------------------------------------------------------------
 * Full-bleed hero with a background video that covers the entire
 * component area. Optimized for desktop + mobile (iOS/Safari included).
 *
 * Props
 * - src: string (required) – video source (.mp4 recommended)
 * - poster: string (optional) – fallback image for initial frame
 * - heading: string (optional)
 * - subheading: string (optional)
 * - ctaLabel: string (optional)
 * - onCtaClick: () => void (optional)
 * - height: CSS length (default: "100svh")
 * - overlay: boolean (default: true)
 * - overlayStrength: number 0..1 (default: 0.55) – darkness of overlay
 * - children: ReactNode – custom content in place of default text/CTA
 *
 * Usage
 * <HeroVideoBackground
 *   src="/videos/hero.mp4"
 *   poster="/images/hero-poster.jpg"
 *   heading="Precision. Protection. Performance."
 *   subheading="Expert window tinting & paint protection film"
 *   ctaLabel="Get a Free Quote"
 *   onCtaClick={() => navigate('/contact')}
 * />
 */

const Root = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: "100svh", // safe on iOS Safari
  overflow: "hidden",
  backgroundColor: "#000",
  color: alpha("#fff", 0.95),
}));

const Video = styled("video")(() => ({
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  // Improves performance on some GPUs and prevents subpixel seams
  transform: "translateZ(0)",
}));

const Overlay = styled(Box)(({ strength = 0.55 }) => ({
  position: "absolute",
  inset: 0,
  background:
    `linear-gradient(180deg, rgba(0,0,0,${Math.min(
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

const Content = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  minHeight: "inherit",
  display: "grid",
  placeItems: "center",
  textAlign: "center",
  paddingBlock: theme.spacing(12),
}));

const TextWrap = styled(Box)(({ theme }) => ({
  maxWidth: 880,
  display: "grid",
  gap: theme.spacing(3),
}));

export default function HeroVideoBackground({
  src = DEFAULTS.src,
  poster = DEFAULTS.poster,
  heading = DEFAULTS.heading,
  subheading = DEFAULTS.subheading,
  ctaLabel = DEFAULTS.ctaLabel,
  onCtaClick = NOOP,
  height = DEFAULTS.height,
  overlay = DEFAULTS.overlay,
  overlayStrength = DEFAULTS.overlayStrength,
  children,
}) {
  const videoRef = useRef(null);
  const [canPlay, setCanPlay] = useState(false);

  useEffect(() => {
    // On iOS, autoplay works only if muted + playsInline; we also
    // try to call play() once metadata is loaded to ensure it starts.
    const v = videoRef.current;
    if (!v) return;
    const onLoadedMeta = () => {
      v.muted = true;
      v.play().catch(() => {/* ignore if browser blocks */});
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
        // If source fails, keep a subtle black background via Root
        onError={() => setCanPlay(false)}
      >
        {/* Provide at least one MP4 source; you can add WebM/OGG as needed */}
        {src && <source src={src} type="video/mp4" />}
      </Video>

      {/* Optional dark/brand overlay */}
      {overlay && <Overlay strength={overlayStrength} />}

      {/* Foreground content */}
      <Content maxWidth="xl">
        {children ? (
          children
        ) : (
          <TextWrap>
            {heading && (
              <Typography
                component="h1"
                variant="h2"
                fontWeight={900}
                sx={{
                  letterSpacing: -0.5,
                  textShadow: "0 2px 16px rgba(0,0,0,0.65)",
                }}
              >
                {heading}
              </Typography>
            )}

            {subheading && (
              <Typography
                component="p"
                variant="h6"
                sx={{ opacity: 0.9, maxWidth: 820, marginInline: "auto" }}
              >
                {subheading}
              </Typography>
            )}

            {ctaLabel && (
              <Box sx={{ mt: 1.5 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={onCtaClick}
                  sx={{
                    fontWeight: 800,
                    textTransform: "none",
                    px: 3.25,
                    py: 1.25,
                    borderRadius: 2,
                    boxShadow: "0 14px 40px rgba(0,0,0,0.35)",
                  }}
                >
                  {ctaLabel}
                </Button>
              </Box>
            )}
          </TextWrap>
        )}
      </Content>

      {/* If video hasn't started yet, keep a subtle black gradient so text is readable */}
      {!canPlay && overlay && <Overlay strength={overlayStrength} />}
    </Root>
  );
}
