// src/components/sections/AllServices.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ServicesHero from "./ServicesHero"

/* -------------------------------- Tokens ------------------------------- */
const ACCENT = "#f2c230";
const ACCENT_SOFT = "#ffd95a";

/* ------------------------------ Styled Bits ---------------------------- */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: alpha("#fff", 0.95),
}));

const Tile = styled(MuiLink)(({ theme }) => ({
  position: "relative",
  display: "block",
  width: "100%",
  height: "100%",
  overflow: "hidden",
  borderRadius: 14,
  textDecoration: "none",
  backgroundColor: "#0e0f11",
  boxShadow: `0 14px 40px ${alpha("#000", 0.32)}`,
  transition: "box-shadow 400ms ease, transform 400ms ease",
  willChange: "transform, filter, box-shadow",

  "& .img": {
    position: "absolute",
    inset: 0,
    backgroundSize: "cover",
    backgroundPosition: "center",
    transform: "scale(1.03)",
    transition: "transform 500ms ease, filter 500ms ease",
    filter: "saturate(0.95) contrast(1.02)",
    zIndex: 1,
  },
  "& .veil": {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.35) 100%)",
    zIndex: 2,
  },
  "& .label": {
    position: "absolute",
    left: 18,
    bottom: 18,
    color: "#fff",
    textShadow: "0 1px 2px rgba(0,0,0,0.45)",
    zIndex: 3,
  },
  "& .underline": {
    marginTop: 6,
    width: 42,
    height: 3,
    borderRadius: 3,
    background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT})`,
  },

  "&:hover": {
    boxShadow: `
      0 18px 60px ${alpha("#000", 0.5)},
      0 0 0 1px ${alpha(ACCENT, 0.25)},
      0 35px 90px ${alpha(ACCENT, 0.28)}
    `,
  },
  "&:hover .img": { filter: "saturate(1.05)" },
}));

/* ----------------------------- Layout helper --------------------------- */
/** Uniform responsive grid that can hold many tiles */
const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2.25),
  gridTemplateColumns: "1fr",
  gridAutoRows: "minmax(180px, 1fr)",
  [theme.breakpoints.up("sm")]: {
    gridTemplateColumns: "1fr 1fr",
  },
  [theme.breakpoints.up("lg")]: {
    gridTemplateColumns: "1fr 1fr 1fr",
  },
}));

/* ------------------------------- Data ---------------------------------- */
/** Map each service to a slug, image (placeholder-friendly), and href */
const SERVICES = [
  { title: "AC & Heating", slug: "ac-heating" },
  { title: "Alignments", slug: "alignments" },
  { title: "Batteries / Alternators", slug: "batteries-alternators" },
  { title: "Brakes", slug: "brakes" },
  { title: "Computer Diagnostics", slug: "computer-diagnostics" },
  { title: "Check Engine Light", slug: "check-engine-light" },
  { title: "Cooling System", slug: "cooling-system" },
  { title: "Engine Service", slug: "engine-service" },
  { title: "Fleet Services", slug: "fleet-services" },
  { title: "Fuel System", slug: "fuel-system" },
  {
    title: "Multi-Point Inspection / Pre-Purchase Inspection",
    slug: "multi-point-inspection",
  },
  { title: "Oil & Filter Change", slug: "oil-filter-change" },
  { title: "Scheduled Maintenance", slug: "scheduled-maintenance" },
  { title: "State Inspection", slug: "state-inspection" },
  { title: "Suspension & Steering", slug: "suspension-steering" },
  { title: "Tires", slug: "tires" },
  { title: "Tune-Ups", slug: "tune-ups" },
].map(({ title, slug }) => ({
  title,
  slug,
  href: `/services/${slug}`,
  // Use a consistent hero image path per service; keep /public/placeholder.jpg as fallback asset
  image: `/services/${slug}/cover.jpg`,
}));

/* -------------------------------- Component ----------------------------- */
export default function AllServices() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <Section>
      <Container maxWidth="xl">
        <ServicesHero />

        <GridWrap>
          {SERVICES.map((item) => (
            <Tile key={item.slug} href={item.href}>
              {/* If a cover image is missing in /public/services/<slug>/cover.jpg,
                  you’ll still see a nice tile because of the gradient veil.
                  Optionally swap to a universal placeholder: url('/placeholder.jpg') */}
              <Box
                className="img"
                sx={{
                  backgroundImage: `url(${item.image}), url('/placeholder.jpg')`,
                }}
              />
              <Box className="veil" />
              <Box className="label">
                <Typography variant="subtitle1" fontWeight={900}>
                  {item.title}
                </Typography>
                <div className="underline" />
              </Box>
            </Tile>
          ))}
        </GridWrap>

        {/* Optional: Back to Home or CTA could go here */}
      </Container>
    </Section>
  );
}
