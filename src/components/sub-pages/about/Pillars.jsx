// src/components/about/AboutPillars.jsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

/* ------------------------------- Tokens -------------------------------- */
const ACCENT = "#f2c230"; // brand yellow for micro-accents

/* ------------------------------ Styled UI ------------------------------ */
const Section = styled("section")(({ theme }) => ({
  width: "100%",
  paddingBlock: theme.spacing(12),
}));

const Split = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)", // 60 / 40
  gap: theme.spacing(6),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    justifyItems: "center",
    textAlign: "center",
  },
}));

const Kicker = styled(Typography)(({ theme }) => ({
  fontSize: "0.85rem",
  letterSpacing: 2,
  textTransform: "uppercase",
  color: "#fff",
  marginBottom: theme.spacing(1),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: -0.5,
  lineHeight: 1.02,
  fontSize: "clamp(2.25rem, 3.2vw + 1rem, 3.75rem)",
  marginBottom: theme.spacing(1.5),
  textAlign: "left",
  [theme.breakpoints.down("md")]: { textAlign: "center" }, // ✅ center on mobile
}));

const Body = styled(Typography)(({ theme }) => ({
  textAlign: "left",
  fontSize: "clamp(1rem, 0.35vw + 0.95rem, 1.125rem)",
  lineHeight: 1.85,
  opacity: 0.96,
  [theme.breakpoints.down("md")]: { textAlign: "center" }, // ✅ center on mobile
}));

const ImageFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 3",
  borderRadius: 20,
  overflow: "hidden",
  background:
    theme.palette.mode === "dark" ? alpha("#fff", 0.04) : alpha("#000", 0.04),
  border: `1px solid ${theme.palette.mode === "dark"
    ? alpha("#fff", 0.08)
    : alpha(theme.palette.common.black, 0.08)
    }`,
  boxShadow:
    theme.palette.mode === "dark"
      ? "0 30px 80px rgba(0,0,0,.55)"
      : "0 30px 80px rgba(0,0,0,.16)",
  /* subtle glossy highlight */
  "&::after": {
    content: '""',
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(180deg, rgba(255,255,255,.08), rgba(255,255,255,0))",
    pointerEvents: "none",
  },
}));

/* Separator line now between title and body */
const AccentLine = styled("span")(({ theme }) => ({
  display: "block",
  height: 5,
  width: 56,
  background: ACCENT,
  borderRadius: 3,
  marginBottom: theme.spacing(2.5),
  /* center on mobile, left on md+ to match text alignment */
  marginLeft: 0,
  [theme.breakpoints.down("md")]: {
    marginInline: "auto",
  },
}));

/* ------------------------------ Motion --------------------------------- */
const containerVariants = {
  hidden: {},
  show: {
    transition: { delayChildren: 0.05, staggerChildren: 0.16 },
  },
};

const rowVariants = {
  hidden: (custom) => ({
    opacity: 0,
    y: 18,
    x: custom.from === "left" ? -28 : 28,
  }),
  show: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function AboutPillars({
  items = [
    {
      title: "Affordable Auto Repair, Transparent Pricing",
      body:
        "At Dynamic Auto Repair, we deliver high-quality service without surprises. Our transparent estimates and competitive rates make professional maintenance and repairs easier to say yes to—so your vehicle stays safe, efficient, and road-ready.",
      image: "/about/maintenance-1.jpg",
      imageAlt: "Technician performing affordable, high-quality auto repair",
      kicker: "Value You Can Trust",
      seoSuffix: " | Dynamic Auto Repair",
    },
    {
      title: "Customer Satisfaction That Earns Repeat Business",
      body:
        "Every visit is built around clarity, communication, and craftsmanship. From diagnostics to delivery, we focus on doing the job right the first time—so you leave confident, refer friends, and come back for routine service with a shop you trust.",
      image: "/about/check-engine.png",
      imageAlt: "Happy customer picking up vehicle after repair",
      kicker: "Service That Puts You First",
      seoSuffix: " | Dynamic Auto Repair",
    },
  ],
}) {
  return (
    <Section aria-label="About Dynamic Auto Repair pillars">
      <Container
        maxWidth="xl"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Box sx={{ display: "grid", gap: { xs: 8, md: 12 } }}>
          {items.map((item, idx) => {
            const reversed = idx % 2 === 1; // odd rows reversed
            const fromSide = reversed ? "right" : "left";

            return (
              <Split
                key={idx}
                component={motion.div}
                custom={{ from: fromSide }}
                variants={rowVariants}
                sx={{
                  gridTemplateColumns: {
                    md: reversed
                      ? "minmax(0, 2fr) minmax(0, 3fr)"
                      : "minmax(0, 3fr) minmax(0, 2fr)",
                  },
                }}
                itemScope
                itemType="https://schema.org/Service"
              >
                {/* Copy */}
                <Box sx={{ order: reversed ? { md: 2 } : 1 }}>
                  {item.kicker && <Kicker>{item.kicker}</Kicker>}

                  <Title
                    component="h2"
                    itemProp="name"
                    aria-label={`${item.title}${item.seoSuffix ?? ""}`}
                  >
                    {item.title}
                  </Title>

                  {/* ✅ Accent line now between title and body */}
                  <AccentLine aria-hidden role="presentation" />

                  {String(item.body)
                    .split("\n\n")
                    .map((p, i) => (
                      <Body
                        key={i}
                        itemProp={i === 0 ? "description" : undefined}
                        sx={{ mt: i === 0 ? 0 : 2 }}
                      >
                        {p}
                      </Body>
                    ))}
                </Box>

                {/* Media */}
                <ImageFrame sx={{ order: reversed ? { md: 1 } : 2 }}>
                  {item.image && (
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      loading="lazy"
                      decoding="async"
                      itemProp="image"
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
                  )}
                </ImageFrame>
              </Split>
            );
          })}
        </Box>
      </Container>
    </Section>
  );
}
