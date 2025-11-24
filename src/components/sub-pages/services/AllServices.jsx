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
  { title: "AC & Heating", slug: "ac-heating", image: "/sub-pages/a-c/ac2.jpg" },
  { title: "Alignments", slug: "alignments", image: "/sub-pages/alignments/alignments-1.jpg" },
  { title: "Batteries / Alternators", slug: "batteries-alternators", image: "/sub-pages/batteries/batteries-2.jpg" },
  { title: "Brakes", slug: "brakes", image: "/sub-pages/brakes/brakes-1.jpg" },
  { title: "Computer Diagnostics", slug: "computer-diagnostics", image: "/sub-pages/computer/computer.jpg" },
  { title: "Check Engine Light", slug: "check-engine-light", image: "/sub-pages/check-engine/check-engine.jpg" },
  { title: "Cooling System", slug: "cooling-system", image: "/sub-pages/cooling/cooling-1.jpg" },
  { title: "Engine Service", slug: "engine-service", image: "/sub-pages/engine/engine-2.jpg" },
  { title: "Fleet Services", slug: "fleet-services", image: "/sub-pages/fleet/fleet-2.jpg" },
  { title: "Fuel System", slug: "fuel-system", image: "/sub-pages/fuel/fuel-3.webp" },
  {
    title: "Multi-Point Inspection / Pre-Purchase Inspection",
    slug: "multi-point-inspection",
    image: "/sub-pages/inspection/inspection-2.png"
  },
  { title: "Oil & Filter Change", slug: "oil-filter-change", image: "/sub-pages/oil-change/oil-change-1.jpg" },
  { title: "Scheduled Maintenance", slug: "scheduled-maintenance", image: "/sub-pages/maintenance/maintenance-1.jpg" },
  { title: "State Inspection", slug: "state-inspection", image: "/sub-pages/state-inspection/inspection-1.png" },
  { title: "Suspension & Steering", slug: "suspension-steering", image: "/sub-pages/suspension/suspension-3.jpeg" },
  { title: "Tires", slug: "tires", image: "/sub-pages/tires/tires-1.jpg" },
  { title: "Tune-Ups", slug: "tune-ups", image: "/sub-pages/tune-ups/tune-ups-1.jpg" },
].map((service) => ({
  ...service,
  href: `/#/services/${service.slug}`,
  // Use custom image if provided, otherwise fall back to default pattern
  image: service.image || `/services/${service.slug}/cover.jpg`,
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
