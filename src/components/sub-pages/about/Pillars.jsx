// src/components/about/AboutPillars.jsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ------------------------------- Tokens -------------------------------- */
const ACCENT = "#f2c230"; // brand yellow for subtle accents if needed

/* ------------------------------ Styled UI ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingBlock: theme.spacing(10),
  background: "transparent",
}));

const Split = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)", // 60 / 40
  gap: theme.spacing(6),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: -0.5,
  lineHeight: 1.05,
  fontSize: "clamp(2.2rem, 3.2vw + 1rem, 4rem)", // much larger
  marginBottom: theme.spacing(2),
  textAlign: "left",
}));

const Body = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  fontSize: "clamp(1rem, 0.35vw + 0.95rem, 1.125rem)",
  lineHeight: 1.85,
  opacity: 0.96,
}));

const ImageFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 3",
  borderRadius: 16,
  overflow: "hidden",
  background: theme.palette.mode === "dark" ? alpha("#fff", 0.04) : alpha("#000", 0.04),
  border: `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
  boxShadow: theme.palette.mode === "dark" ? "0 18px 50px rgba(0,0,0,.5)" : "0 18px 50px rgba(0,0,0,.18)",
}));

/**
 * AboutPillars (text on page, 60/40 split)
 * Left: big, left‑aligned title and description
 * Right: image (optional)
 * Renders one or more sections stacked with spacing
 */
export default function AboutPillars({
  items = [
    {
      title: "Affordability",
      body:
        "At Dynamic Auto Repair, we want to work with as many clients as possible and give them a first‑hand experience of our quality services. Hence the reason why we offer our services to clients at competitive rates you won't find elsewhere.",
      image: "/placeholder.jpg",
      imageAlt: "Affordable auto repair",
    },
    {
      title: "Customer Satisfaction",
      body:
        "When we work with clients, our goal is to always exceed their expectations so they can spread the word about our services and bring us more customers in the long run. We are confident that our high‑quality services will help us turn visitors into not just customers but raving fans.\n\nYou can check out our various services to learn more about how we can help you increase the lifespan of your automobile. Also, do not hesitate to request a quote for any of your vehicle needs.",
      image: "/placeholder.jpg",
      imageAlt: "Happy customer at auto repair shop",
    },
  ],
}) {
  return (
    <Section>
      <Container maxWidth="xl">
        <Box sx={{ display: "grid", gap: { xs: 8, md: 10 } }}>
          {items.map((item, idx) => (
            <Split key={idx}>
              {/* Left: Text (60%) */}
              <Box>
                <Title>{item.title}</Title>
                {String(item.body)
                  .split("\n\n")
                  .map((p, i) => (
                    <Body key={i} sx={{ mt: i === 0 ? 0 : 2 }}>{p}</Body>
                  ))}
              </Box>

              {/* Right: Image (40%) */}
              <ImageFrame>
                {item.image && (
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.imageAlt || item.title}
                    sx={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                )}
              </ImageFrame>
            </Split>
          ))}
        </Box>
      </Container>
    </Section>
  );
}
