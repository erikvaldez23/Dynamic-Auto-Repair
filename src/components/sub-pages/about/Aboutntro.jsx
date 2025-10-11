// src/components/about/AboutSplit60_40.jsx
import React from "react";
import { Box, Container, Typography, Stack } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ------------------------------ Styled Shell ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  color: "#fff",
  paddingBlock: theme.spacing(8),
}));

const GridWrap = styled(Box)(({ theme }) => ({
  display: "grid",
  gridTemplateColumns: "minmax(0, 3fr) minmax(0, 2fr)", // 60 / 40
  gap: theme.spacing(6),
  alignItems: "center",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
  },
}));

const ImageFrame = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  aspectRatio: "4 / 3",
  borderRadius: 20,
  overflow: "hidden",
  background: theme.palette.mode === "dark" ? alpha("#fff", 0.04) : alpha("#000", 0.04),
  border: `1px solid ${alpha(theme.palette.common.black, 0.08)}`,
  boxShadow: theme.palette.mode === "dark" ? "0 12px 40px rgba(0,0,0,.5)" : "0 12px 40px rgba(0,0,0,.12)",
}));

export default function AboutSplit60_40({
  title = "About Dynamic Auto Repair",
  introBold = "Are you looking for a competent auto repair specialist for your vehicle?",
  paragraphs = [
    "Do you need to do some restorative work on your automobile? Or maybe you are just in search of an expert auto repair service that can service your car regularly and help you prolong its life? Then you need to end your search right now because you are in the right place.",
    "Dynamic Auto Repair is a car repair service that specializes in various types of automobile repair. Whether you are looking to change the oil of your vehicle or carry out comprehensive troubleshooting and servicing, you can rely on our expertise and professionalism to get the job done in no time.",
    "Our passion for cars knows no bounds, and it is one of the factors that continue to drive our business, and the reason our clients can always count on us to deliver top‑notch services at the most affordable prices.",
  ],
  image = "/placeholder.jpg",
  imageAlt = "Dynamic Auto Repair shop and team",
  align = "center",
}) {
  return (
    <Section>
      <Container maxWidth="xl">
        <GridWrap>
          {/* ------------------------------- Left: Copy ------------------------------ */}
          <Box sx={{ textAlign: { xs: "left", md: align } }}>
            <Stack spacing={3} sx={{ maxWidth: 820, mx: { xs: 0, md: align === "center" ? "auto" : 0 } }}>
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{ letterSpacing: -0.3 }}
              >
                {title}
              </Typography>

              <Typography component="p" sx={{ fontSize: { xs: 16, md: 18 }, lineHeight: 1.7 }}>
                <strong>{introBold}</strong>
              </Typography>

              {paragraphs.map((p, i) => (
                <Typography key={i} component="p" sx={{ opacity: 0.9, fontSize: { xs: 16, md: 18 }, lineHeight: 1.8 }}>
                  {p}
                </Typography>
              ))}
            </Stack>
          </Box>

          {/* ------------------------------ Right: Image ----------------------------- */}
          <ImageFrame>
            <Box
              component="img"
              src={image}
              alt={imageAlt}
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </ImageFrame>
        </GridWrap>
      </Container>
    </Section>
  );
}
