// src/components/sections/Services.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  useTheme,
  useMediaQuery,
  Link as MuiLink,
  Grid,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* -------------------------------- Tokens ------------------------------- */
const ACCENT = "#f2c230"; // brand gold
const ACCENT_SOFT = "#ffd95a";

/* ------------------------------ Styled Bits ---------------------------- */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: alpha("#fff", 0.95),
  paddingBlock: theme.spacing(8),
}));

const TitleWrap = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "baseline",
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
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

  "@media (hover:hover)": {
    "&:hover": {
      boxShadow: `
        0 18px 60px ${alpha("#000", 0.5)},
        0 0 0 1px ${alpha(ACCENT, 0.25)},
        0 35px 90px ${alpha(ACCENT, 0.28)}
      `,
    },
    "&:hover .img": { filter: "saturate(1.05)" },
  },
}));

// View All button
const ViewAllBtn = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 900,
  borderRadius: 12,
  paddingInline: theme.spacing(2.6),
  paddingBlock: theme.spacing(1.2),
  color: "#0e0f11",
  background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT_SOFT} 100%)`,
  boxShadow: `0 10px 26px ${alpha("#000", 0.35)}`,
  "&:hover": {
    background: `linear-gradient(180deg, ${ACCENT_SOFT} 0%, ${ACCENT} 100%)`,
    boxShadow: `0 14px 34px ${alpha("#000", 0.45)}`,
  },
}));

/* ----------------------------- Desktop mosaic -------------------------- */
const Mosaic = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(2.25),
  gridTemplateColumns: "1fr",
  gridAutoRows: "minmax(180px, 1fr)",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1.2fr 1fr 1fr",
    gridTemplateRows: "minmax(320px, 1fr) minmax(320px, 1fr)",
    gridTemplateAreas: `
      "hero t1 t2"
      "hero t3 t4"
    `,
    height: 660,
  },
}));

const areaStyles = {
  hero: { gridArea: "hero" },
  t1: { gridArea: "t1" },
  t2: { gridArea: "t2" },
  t3: { gridArea: "t3" },
  t4: { gridArea: "t4" },
};

/* ------------------------- Mobile sizing constants --------------------- */
const CARD_W_MOBILE = 320; // consistent width for every card
const CARD_H_MOBILE = 420; // consistent height for every card
const SLIDE_GAP = 12;      // horizontal gap between cards

/* ------------------------------- Component ----------------------------- */
export default function Services({ items }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Defaults (replace with your real image URLs)
  const fallback = [
    { title: "A/C & Heating", image: "/services/a-c.jpg", href: "/#/services/ac-heating" },
    { title: "Check Engine Light", image: "/services/check-engine.jpg", href: "/#/services/check-engine-light" },
    { title: "Oil Change", image: "/services/oil-change.jpg", href: "/#/services/oil-change" },
    { title: "Suspension", image: "/services/suspension.jpg", href: "/#/services/suspension-steering" },
    { title: "Battery/Alternator", image: "/services/alternator.jpg", href: "/#/services/batteries" },
  ];

  const data = (items && items.length >= 5 ? items : fallback).slice(0, 5);

  return (
    <Section>
      <Container maxWidth="xl">
        <TitleWrap>
          <Typography
            variant={isMdUp ? "h3" : "h4"}
            sx={{
              fontWeight: 900,
              position: "relative",
              display: "inline-block",
              pb: 2,
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                bottom: 0,
                width: 56,
                height: 8,
                borderRadius: 4,
                background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT})`,
              },
            }}
          >
            Service Highlight
          </Typography>
        </TitleWrap>

        {isMdUp ? (
          /* ---------- Desktop Mosaic ---------- */
          <Mosaic>
            <Tile href={data[0].href} sx={areaStyles.hero}>
              <Box className="img" sx={{ backgroundImage: `url(${data[0].image})` }} />
              <Box className="veil" />
              <Box className="label">
                <Typography variant="h5" fontWeight={900}>
                  {data[0].title}
                </Typography>
                <div className="underline" />
              </Box>
            </Tile>

            {data.slice(1).map((item, i) => (
              <Tile key={item.title} href={item.href} sx={areaStyles[`t${i + 1}`]}>
                <Box className="img" sx={{ backgroundImage: `url(${item.image})` }} />
                <Box className="veil" />
                <Box className="label">
                  <Typography variant="subtitle1" fontWeight={900}>
                    {item.title}
                  </Typography>
                  <div className="underline" />
                </Box>
              </Tile>
            ))}
          </Mosaic>
        ) : (
          /* ---------- Mobile: SAME STRIP LOGIC AS BenefitsFourColumns ---------- */
          <Grid
            container
            columns={{ xs: 12 }}
            wrap="nowrap"
            spacing={0}
            sx={{
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              px: 1, // page padding
              pb: 1,
              columnGap: `${SLIDE_GAP}px`, // visual gap between cards
              // nice scrollbar (optional)
              "::-webkit-scrollbar": { height: 8 },
              "::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(255,255,255,0.18)",
                borderRadius: 8,
              },
            }}
          >
            {data.map((item) => (
              <Grid
                key={item.title}
                item
                xs="auto"
                sx={{
                  scrollSnapAlign: "start",
                  minWidth: `${CARD_W_MOBILE}px`,
                  // keep every card EXACTLY the same size
                  "& > .card-frame": {
                    width: `${CARD_W_MOBILE}px`,
                    height: `${CARD_H_MOBILE}px`,
                  },
                }}
              >
                <Box className="card-frame">
                  <Tile href={item.href} sx={{ height: "100%" }}>
                    <Box className="img" sx={{ backgroundImage: `url(${item.image})` }} />
                    <Box className="veil" />
                    <Box className="label">
                      <Typography variant="subtitle1" fontWeight={900} sx={{ maxWidth: 240 }}>
                        {item.title}
                      </Typography>
                      <div className="underline" />
                    </Box>
                  </Tile>
                </Box>
              </Grid>
            ))}
          </Grid>
        )}

        {/* View All Services button */}
        <Box
          sx={{
            mt: 3,
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
          }}
        >
          <ViewAllBtn href="/#/services">View All Services</ViewAllBtn>
        </Box>
      </Container>
    </Section>
  );
}
