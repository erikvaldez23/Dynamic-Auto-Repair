// src/components/about/AboutSplit60_40.jsx
import React from "react";
import { Box, Container, Typography, Stack } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ------------------------------- Tokens -------------------------------- */
const ACCENT = "#f2c230";

/* ------------------------------ Styled Shell ------------------------------ */
const Section = styled("section")(({ theme }) => ({
  width: "100%",
  paddingBlock: theme.spacing(12),
  color: alpha("#fff", 0.96),
}));

const GridWrap = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)", // 60 / 40
  gap: theme.spacing(6),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    textAlign: "center",
    justifyItems: "center",
  },
}));

const ImageFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 3",
  borderRadius: 20,
  overflow: "hidden",
  background: theme.palette.mode === "dark" ? alpha("#fff", 0.05) : alpha("#000", 0.05),
  border: `1px solid ${theme.palette.mode === "dark" ? alpha("#fff", 0.08) : alpha(theme.palette.common.black, 0.08)
    }`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 30px 80px rgba(0,0,0,.55)"
      : "0 30px 80px rgba(0,0,0,.16)",
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background: "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,0))",
    pointerEvents: "none",
  },
}));

const Kicker = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  letterSpacing: 2,
  textTransform: "uppercase",
  color: alpha("#fff", 0.7),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: -0.5,
  lineHeight: 1.02,
  fontSize: "clamp(2.25rem, 3.2vw + 1rem, 3.75rem)",
  color: "#fff",
  textAlign: "left",
  [theme.breakpoints.down("md")]: { textAlign: "center" },
}));

/* Desktop/tablet inline accent (to the right of the title) */
const InlineAccent = styled("span")(({ theme }) => ({
  display: "inline-block",
  height: 5,
  width: 56,
  background: ACCENT,
  borderRadius: 2,
  transform: "translateY(-2px)",
  marginLeft: theme.spacing(1.25),
  verticalAlign: "middle",
  [theme.breakpoints.down("md")]: { display: "none" }, // hide on mobile
}));

/* Mobile block accent (below the title) */
const BlockAccent = styled("span")(({ theme }) => ({
  height: 5,
  width: 56,
  background: ACCENT,
  borderRadius: 3,
}));

/* Flex wrapper that centers the mobile accent perfectly */
const AccentRowMobile = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.down("md")]: {
    display: "flex",
    justifyContent: "center",
    marginTop: theme.spacing(1.5),
    marginBottom: theme.spacing(2),
  },
}));

/* --------------------------------- Component -------------------------------- */
export default function AboutSplit60_40({
  title = "About Dynamic Auto Repair",
  introBold = "Expert auto repair and maintenance—transparent, timely, and done right the first time.",
  paragraphs = [
    "Whether you need routine service, diagnostics, or complex repair, our ASE-trained technicians treat your vehicle like it’s their own. We pair modern tooling with meticulous attention to detail for results you can trust.",
    "From oil changes and brake service to alignments and comprehensive troubleshooting, we explain the work clearly and provide upfront pricing—so you’re never surprised on pick-up.",
    "Drivers choose Dynamic Auto Repair for craftsmanship, communication, and long-term reliability. It’s how we keep you safe, efficient, and road-ready.",
  ],
  image = "/about/computer.jpg",
  imageAlt = "Dynamic Auto Repair shop team working on a vehicle",
  align = "center",
  kicker = "Honesty • Reliability • Transparency",
  city = "", // e.g., "Dallas, TX" (optional—used for SEO if provided)
}) {
  const seoSuffix = city ? ` | ${city}` : "";

  return (
    <Section aria-label="About Dynamic Auto Repair" itemScope itemType="https://schema.org/AutoRepair">
      <Container maxWidth="xl">
        <GridWrap>
          {/* ------------------------------- Left: Copy ------------------------------ */}
          <Box sx={{ textAlign: { xs: "center", md: "left" } }}>
            <Stack
              spacing={3}
              sx={{
                maxWidth: 820,
                mx: { xs: "auto", md: align === "center" ? "auto" : 0 },
              }}
            >
              {kicker && <Kicker>{kicker}</Kicker>}

              <Title component="h2" itemProp="name" aria-label={`${title}${seoSuffix}`}>
                {title}
                <InlineAccent aria-hidden />
              </Title>

              {/* ✅ This guarantees the accent is centered on mobile */}
              <AccentRowMobile>
                <BlockAccent aria-hidden />
              </AccentRowMobile>

              <Typography
                component="p"
                itemProp="slogan"
                sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.75, opacity: 0.96 }}
              >
                <strong>{introBold}</strong>
              </Typography>

              {paragraphs.map((p, i) => (
                <Typography
                  key={i}
                  component="p"
                  itemProp={i === 0 ? "description" : undefined}
                  sx={{ opacity: 0.9, fontSize: { xs: 16, md: 18 }, lineHeight: 1.5 }}
                >
                  {p}
                </Typography>
              ))}

              {city ? (
                <Typography
                  component="p"
                  sx={{ opacity: 0.75, fontSize: { xs: 14, md: 16 }, lineHeight: 1.7 }}
                >
                  Serving drivers in <span itemProp="areaServed">{city}</span> with professional auto repair,
                  preventative maintenance, and honest guidance.
                </Typography>
              ) : null}
            </Stack>
          </Box>

          {/* ------------------------------ Right: Image ----------------------------- */}
          <ImageFrame>
            <Box
              component="img"
              src={image}
              alt={imageAlt}
              loading="lazy"
              decoding="async"
              itemProp="image"
              sizes="(max-width: 900px) 100vw, 40vw"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transform: "scale(1.01)",
                willChange: "transform",
              }}
            />
          </ImageFrame>
        </GridWrap>
      </Container>
    </Section>
  );
}
