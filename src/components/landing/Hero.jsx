// src/components/hero/HeroSloganForm.jsx
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
const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

/* Helpful: toolbar heights (match your Topbar's <Toolbar minHeight>) */
const BAR_H_XS = 64; // mobile
const BAR_H_MD = 72; // desktop

/* ------------------------------- Styled UI ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  height: "80vh",
  color: alpha("#fff", 0.95),
  /* Pull the hero up under the Topbar; add same padding so content stays put */
  marginTop: `-${BAR_H_XS}px`,
  paddingTop: `calc(${BAR_H_XS}px + ${theme.spacing(10)})`,
  [theme.breakpoints.up("md")]: {
    marginTop: `-${BAR_H_MD}px`,
    paddingTop: `calc(${BAR_H_MD}px + ${theme.spacing(10)})`,
  },
  overflow: "hidden",

  /* Background image layer (black & white) — extend above to cover under Topbar */
  "&::before": {
    content: '""',
    position: "absolute",
    left: 0,
    right: 0,
    top: `-${BAR_H_XS}px`,
    height: `calc(100% + ${BAR_H_XS}px)`,
    [theme.breakpoints.up("md")]: {
      top: `-${BAR_H_MD}px`,
      height: `calc(100% + ${BAR_H_MD}px)`,
    },
    // backgroundImage: "url(/flag-bg.jpg)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    zIndex: 0,
    // filter: "grayscale(1) brightness(0.45) contrast(1.05)",
    transform: "scale(1.02)", // prevent subpixel seams on some GPUs
  },

  // Dark veil overlay for readability — also extended above
  // "&::after": {
  //   content: '""',
  //   position: "absolute",
  //   left: 0,
  //   right: 0,
  //   top: `-${BAR_H_XS}px`,
  //   height: `calc(100% + ${BAR_H_XS}px)`,
  //   [theme.breakpoints.up("md")]: {
  //     top: `-${BAR_H_MD}px`,
  //     height: `calc(100% + ${BAR_H_MD}px)`,
  //   },
  //   zIndex: 1,
  //   pointerEvents: "none",
  //   background: `
  //     linear-gradient(180deg, rgba(0,0,0,0.70) 0%, rgba(0,0,0,0.45) 38%, rgba(0,0,0,0.22) 100%),
  //     radial-gradient(120% 80% at 10% -20%, rgba(255,255,255,0.06), transparent 60%),
  //     radial-gradient(120% 80% at 100% -10%, rgba(255,255,255,0.04), transparent 55%)
  //   `,
  // },
}));

const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  alignItems: "center",
  [theme.breakpoints.up("md")]: {
    // 60 / 40 split (change to 7fr 3fr if you want 70/30)
    gridTemplateColumns: "6fr 4fr",
  },
}));

const Headline = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: 0.2,
  lineHeight: 1.05,
  fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
}));

const Subhead = styled(Typography)(({ theme }) => ({
  color: alpha("#fff", 0.82),
  fontSize: "clamp(1rem, 2vw, 1.1rem)",
  maxWidth: 700,
  marginTop: theme.spacing(1.5),
}));

const CTA = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 900,
  paddingInline: theme.spacing(2.6),
  paddingBlock: theme.spacing(1.2),
  borderRadius: 12,
  color: "#0e0f11",
  background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT_HOVER} 100%)`,
  boxShadow: `0 12px 28px ${alpha("#000", 0.35)}`,
  "&:hover": {
    background: `linear-gradient(180deg, ${ACCENT_HOVER} 0%, ${ACCENT} 100%)`,
    boxShadow: `0 16px 36px ${alpha("#000", 0.45)}`,
  },
}));

const FormCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${alpha("#fff", 0.10)}`,
  background: `linear-gradient(180deg, ${alpha("#16181b", 0.78)}, ${alpha(
    "#0f1012",
    0.70
  )})`,
  boxShadow: `0 30px 70px ${alpha("#000", 0.45)}`,
  overflow: "hidden",
}));

const Frame = styled("iframe")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: "520px",
  border: 0,
  background: "#fff",
  [theme.breakpoints.down("md")]: {
    height: "460px",
  },
}));

/* -------------------------------- Component ----------------------------- */
export default function Hero({
  title = "Complete Auto Repair",
  subtitle = "Whether you are looking to change the oil of your vehicle or carry out comprehensive troubleshooting and servicing, you can rely on our expertise and professionalism to get the job done in no time.",
  ctaText = "Book an Appointment",
  onCtaClick,
  iframeSrc = "https://app.tintwiz.com/web/ce/mm78aa3rvkulrmu65oesvsa63ywubpq3",
}) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Section>
      {/* Content sits above the overlays; Topbar (AppBar) remains above via z-index.appBar */}
      <Container maxWidth="xl" sx={{ position: "relative", zIndex: 2 }}>
        <GridWrap>
          {/* Left — Slogan & CTA */}
          <Box>
            <Headline variant="h1">{title}</Headline>
            <Subhead variant="body1">{subtitle}</Subhead>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 3 }}>
              <CTA size="large" endIcon={<ArrowForwardRoundedIcon />} onClick={onCtaClick}>
                {ctaText}
              </CTA>
            </Stack>
          </Box>

          {/* Right — Form iframe */}
          <FormCard>
            <Frame
              title="Booking form"
              src={iframeSrc}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </FormCard>
        </GridWrap>
      </Container>
    </Section>
  );
}
