// src/components/about/AboutMissionVision.jsx
import React from "react";
import { Box, Container, Typography, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";

/* ------------------------------- Tokens -------------------------------- */
const ACCENT = "#f2c230"; // yellow divider

/* ------------------------------ Styled UI ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  paddingBlock: theme.spacing(8),
  background: "transparent",
}));

const GridWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr", // 50/50
  gap: theme.spacing(6),
  alignItems: "start",
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(5),
  },
}));

const VerticalDivider = styled(Box)(({ theme }) => ({
  position: "absolute",
  left: "50%",
  top: 0,
  transform: "translateX(-1px)",
  width: 2,
  height: "100%",
  background: ACCENT,
  borderRadius: 2,
  opacity: 1,
  [theme.breakpoints.down("md")]: {
    display: "none",
  },
}));

const Title = (props) => (
  <Typography
    variant="h4"
    fontWeight={900}
    sx={{ letterSpacing: -0.2, mb: 1.5, textAlign: "center", color: "#f2c230" }}
    {...props}
  />
);

const Paragraph = (props) => (
  <Typography
    variant="body1"
    sx={{
      textAlign: "center",
      maxWidth: 600,
      mx: "auto",
      lineHeight: 1.8,
      fontSize: { xs: 15.5, md: 16.5 },
      opacity: 0.95,
    }}
    {...props}
  />
);

/**
 * AboutMissionVision — Simple centered layout with a vertical yellow divider
 */
export default function Mission({
  missionTitle = "Our Mission",
  missionText = `Our primary mission at Dynamic Auto Repair is to build a large customer base of happy and satisfied clients who are always happy to recommend our services to their friends and loved ones.`,
  visionTitle = "Our Vision",
  visionText = `The vision of our auto repair service is to grow and establish ourselves as one of the leading auto repair services in Texas and its environs.`,
}) {
  return (
    <Section>
      <Container maxWidth="xl">
        <GridWrap>
          <VerticalDivider />

          {/* Mission (left) */}
          <Box>
            <Stack >
              <Title>{missionTitle}</Title>
              {missionText.split("\n\n").map((para, i) => (
                <Paragraph key={i}>{para}</Paragraph>
              ))}
            </Stack>
          </Box>

          {/* Vision (right) */}
          <Box>
            <Stack>
              <Title>{visionTitle}</Title>
              {visionText.split("\n\n").map((para, i) => (
                <Paragraph key={i}>{para}</Paragraph>
              ))}
            </Stack>
          </Box>
        </GridWrap>
      </Container>
    </Section>
  );
}
