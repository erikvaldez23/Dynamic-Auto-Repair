import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

/* ----------------------------- Design Tokens ---------------------------- */
// You can swap this to match your brand yellow
const ACCENT = "#f2c230"; // brand yellow
const ACCENT_DARK = "#1a1a1a"; // text/buttons on yellow
const ACCENT_HOVER = "#ffd95a"; // slightly lighter on hover

/* ------------------------------- Styled UI ------------------------------ */
const Shell = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  // full-bleed background band (keeps a nice edge-to-edge yellow)
  background: ACCENT,
  // add very subtle texture + shine so the yellow feels premium
  backgroundImage: `
    radial-gradient(1200px 400px at 20% -20%, ${alpha("#fff", 0.18)} 0%, transparent 60%),
    radial-gradient(900px 300px at 90% 120%, ${alpha("#fff", 0.10)} 0%, transparent 60%)
  `,
  color: ACCENT_DARK,
  borderRadius: 20,
  overflow: "hidden",
  borderTop: `1px solid ${alpha("#000", 0.12)}`,
  borderBottom: `1px solid ${alpha("#000", 0.12)}`,
}));

const Inner = styled(Container)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(2.5),
  alignItems: "center",
  paddingBlock: theme.spacing(5),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: theme.spacing(4),
    paddingBlock: theme.spacing(6),
  },
  [theme.breakpoints.up("lg")]: {
    paddingBlock: theme.spacing(7),
  },
}));

const Eyebrow = styled(Typography)(({ theme }) => ({
  fontSize: theme.typography.pxToRem(12),
  fontWeight: 800,
  letterSpacing: 2.2,
  textTransform: "uppercase",
  opacity: 0.8,
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  lineHeight: 1.05,
  letterSpacing: -0.2,
  fontSize: "clamp(24px, 4.2vw, 46px)",
}));

const Subhead = styled(Typography)(({ theme }) => ({
  opacity: 0.9,
  lineHeight: 1.5,
  fontSize: "clamp(14px, 1.4vw, 18px)",
  maxWidth: 720,
}));

const CtaPrimary = styled(Button)(({ theme }) => ({
  fontWeight: 800,
  textTransform: "none",
  paddingInline: theme.spacing(2.75),
  paddingBlock: theme.spacing(1.25),
  borderRadius: 14,
  background: ACCENT_DARK,
  color: "#fff",
  boxShadow: `0 8px 22px ${alpha("#000", 0.25)}`,
  "&:hover": {
    background: "#000",
    transform: "translateY(-1px)",
    boxShadow: `0 10px 26px ${alpha("#000", 0.28)}`,
  },
}));

const CtaGhost = styled(Button)(({ theme }) => ({
  fontWeight: 800,
  textTransform: "none",
  paddingInline: theme.spacing(2.25),
  paddingBlock: theme.spacing(1.25),
  borderRadius: 14,
  background: alpha("#000", 0.06),
  color: ACCENT_DARK,
  border: `1px solid ${alpha("#000", 0.15)}`,
  backdropFilter: "saturate(140%) blur(2px)",
  "&:hover": {
    background: alpha("#000", 0.1),
    borderColor: alpha("#000", 0.22),
  },
}));

/* ------------------------------- Component ------------------------------ */
/**
 * CTAHighlightBanner
 * A bright, edge-to-edge yellow banner for your landing page.
 *
 * Props:
 * - eyebrow?: string
 * - title: string
 * - subtitle?: string
 * - primaryLabel?: string
 * - onPrimaryClick?: () => void
 * - secondaryLabel?: string
 * - onSecondaryClick?: () => void
 * - maxWidth?: Container['props']['maxWidth'] (default 'xl')
 */
export default function CTAHighlightBanner({
  eyebrow = "Limited Time",
  title = "Book your appointment today",
  subtitle = "Premium work. Honest pricing. Fast turnaround. Let’s get you taken care of.",
  primaryLabel = "Get a Free Quote",
  onPrimaryClick,
  secondaryLabel = "See Services",
  onSecondaryClick,
  maxWidth = "xl",
}) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Shell>
      <Inner maxWidth={maxWidth}>
        {/* Left: Text */}
        <Stack spacing={1.25}>
          {eyebrow && <Eyebrow variant="overline">{eyebrow}</Eyebrow>}
          <Headline component="h2">{title}</Headline>
          {subtitle && <Subhead>{subtitle}</Subhead>}
        </Stack>

        {/* Right: Actions */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25} justifyContent={{ xs: "flex-start", md: "flex-end" }} alignItems={{ xs: "stretch", sm: "center" }}>
          {primaryLabel && (
            <CtaPrimary size={isMdUp ? "large" : "medium"} endIcon={<ArrowForwardRoundedIcon />} onClick={onPrimaryClick}>
              {primaryLabel}
            </CtaPrimary>
          )}
          {secondaryLabel && (
            <CtaGhost size={isMdUp ? "large" : "medium"} onClick={onSecondaryClick}>
              {secondaryLabel}
            </CtaGhost>
          )}
        </Stack>
      </Inner>

      {/* Soft corner vignettes for depth */}
      <Box
        sx={{
          pointerEvents: "none",
          position: "absolute",
          inset: 0,
          background: `radial-gradient(1200px 220px at 50% -160px, ${alpha("#fff", 0.22)} 0%, transparent 60%)`,
        }}
      />
    </Shell>
  );
}