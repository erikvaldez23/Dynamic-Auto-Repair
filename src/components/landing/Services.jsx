import React from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
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

const TitleAccent = styled("span")(() => ({
  display: "inline-block",
  width: 56,
  height: 4,
  borderRadius: 4,
  background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_SOFT})`,
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
      `linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.35) 100%)`,
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

  // hover: soft accent glow behind the image/tile
  "&:hover": {
    boxShadow: `
      0 18px 60px ${alpha("#000", 0.5)},           /* deeper drop shadow */
      0 0 0 1px ${alpha(ACCENT, 0.25)},            /* subtle gold outline */
      0 35px 90px ${alpha(ACCENT, 0.28)}           /* soft accent bloom */
    `,
  },
  "&:hover .img": { filter: "saturate(1.05)" },
}));


/* ----------------------------- Layout helper --------------------------- */
// A responsive CSS grid that mirrors the screenshot: one large left tile, four smaller right tiles (2x2)
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

/* ------------------------------- Component ----------------------------- */
/**
 * Props:
 * - items: array of { title, image, href }
 *   The first item is the large left tile; next four fill the right grid.
 */
export default function Services({ items }) {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Defaults (replace with your real image URLs)
  const fallback = [
    {
      title: "A/C & Heating",
      image:
        "/services/a-c.jpg",
      href: "/services/ac-heating",
    },
    {
      title: "Check Engine Light",
      image:
        "/services/check-engine.jpg",
      href: "/services/check-engine",
    },
    {
      title: "Oil Change",
      image:
        "/services/oil-change.jpg",
      href: "/services/oil-change",
    },
    {
      title: "Suspension",
      image:
        "/services/suspension.jpg",
      href: "/services/suspension",
    },
    {
      title: "Battery/Alternator",
      image:
        "/services/alternator.jpg",
      href: "/services/battery-alternator",
    },
  ];

  const data = (items && items.length >= 5 ? items : fallback).slice(0, 5);

  return (
    <Section>
      <Container maxWidth="xl">
        <TitleWrap>
          <Typography variant={isMdUp ? "h3" : "h4"} sx={{ fontWeight: 900 }}>
            Service Highlight
          </Typography>
          <TitleAccent />
        </TitleWrap>

        <Mosaic>
          {/* Large left tile */}
          <Tile href={data[0].href} sx={areaStyles.hero}>
            <Box
              className="img"
              sx={{ backgroundImage: `url(${data[0].image})` }}
            />
            <Box className="veil" />
            <Box className="label">
              <Typography variant="h5" fontWeight={900}>
                {data[0].title}
              </Typography>
              <div className="underline" />
            </Box>
          </Tile>

          {/* Right 2x2 tiles */}
          {data.slice(1).map((item, i) => (
            <Tile key={item.title} href={item.href} sx={areaStyles[`t${i + 1}`]}> 
              <Box
                className="img"
                sx={{ backgroundImage: `url(${item.image})` }}
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
        </Mosaic>
      </Container>
    </Section>
  );
}