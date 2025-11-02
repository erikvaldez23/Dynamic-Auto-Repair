// src/components/about/AboutPillars.jsx
import React from "react";
import { Box, Container, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

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
  fontSize: "clamp(2.2rem, 3.2vw + 1rem, 4rem)",
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

/* ------------------------------ Motion --------------------------------- */
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      delayChildren: 0.05,
      staggerChildren: 0.18,
    },
  },
};

const rowVariants = {
  hidden: (custom) => ({
    opacity: 0,
    y: 16,
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
      title: "Affordability",
      body:
        "At Dynamic Auto Repair, we want to work with as many clients as possible and give them a first-hand experience of our quality services. Hence the reason why we offer our services to clients at competitive rates you won't find elsewhere.",
      image: "/placeholder.jpg",
      imageAlt: "Affordable auto repair",
    },
    {
      title: "Customer Satisfaction",
      body:
        "When we work with clients, our goal is to always exceed their expectations so they can spread the word about our services and bring us more customers in the long run. We are confident that our high-quality services will help us turn visitors into not just customers but raving fans.\n\nYou can check out our various services to learn more about how we can help you increase the lifespan of your automobile. Also, do not hesitate to request a quote for any of your vehicle needs.",
      image: "/placeholder.jpg",
      imageAlt: "Happy customer at auto repair shop",
    },
  ],
}) {
  return (
    <Section>
      <Container
        maxWidth="xl"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Box sx={{ display: "grid", gap: { xs: 8, md: 10 } }}>
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
                  // swap column widths on md+ for reversed rows
                  gridTemplateColumns: {
                    md: reversed
                      ? "minmax(0, 2fr) minmax(0, 3fr)"
                      : "minmax(0, 3fr) minmax(0, 2fr)",
                  },
                }}
              >
                {/* Left / Right blocks with order swap on md+ */}
                <Box sx={{ order: reversed ? { md: 2 } : 1 }}>
                  <Title>{item.title}</Title>
                  {String(item.body)
                    .split("\n\n")
                    .map((p, i) => (
                      <Body key={i} sx={{ mt: i === 0 ? 0 : 2 }}>
                        {p}
                      </Body>
                    ))}
                </Box>

                <ImageFrame sx={{ order: reversed ? { md: 1 } : 2 }}>
                  {item.image && (
                    <Box
                      component="img"
                      src={item.image}
                      alt={item.imageAlt || item.title}
                      loading="lazy"
                      sx={{
                        position: "absolute",
                        inset: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        transform: "scale(1.01)",
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
