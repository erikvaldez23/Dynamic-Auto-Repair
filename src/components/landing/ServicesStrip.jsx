import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

/* ---- Updated Icons ---- */
import HandymanOutlinedIcon from "@mui/icons-material/HandymanOutlined";            // Tune-Up
import CarRepairOutlinedIcon from "@mui/icons-material/CarRepairOutlined";          // Brake Service
import CenterFocusStrongOutlinedIcon from "@mui/icons-material/CenterFocusStrongOutlined"; // Alignments
import MemoryOutlinedIcon from "@mui/icons-material/MemoryOutlined";                // Computer Diagnostics

/* -------------------------------- Tokens ------------------------------- */
const YELLOW = "#f2c230";

/* ------------------------------- Styled UI ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  paddingBlock: theme.spacing(6),
  [theme.breakpoints.up("md")]: { paddingBlock: theme.spacing(8) },
}));

const SplitLine = ({ show }) => (
  <Box
    sx={{
      display: { xs: "none", md: show ? "block" : "none" },
      position: "absolute",
      top: 24,
      bottom: 24,
      left: 0,
      width: 2,
      borderRadius: 2,
      background: YELLOW,
    }}
  />
);

/* Icon pill: circular, subtle glow */
const Pill = styled(Box)(({ theme }) => ({
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 68,
  height: 68,
  borderRadius: "50%",
  color: YELLOW,
  background:
    "radial-gradient(120% 120% at 50% 0%, rgba(242,194,48,0.25) 0%, rgba(242,194,48,0.08) 60%, transparent 100%)",
  border: `1px solid ${alpha("#fff", 0.12)}`,
  boxShadow: "0 10px 28px rgba(0,0,0,0.35)",
  flexShrink: 0,
}));

export default function BenefitsFourColumns({
  overline = "WHY CHOOSE US?",
  title = "Premium Quality, Guaranteed Results",
  subtitle = "Our expert team delivers exceptional results with industry-leading materials and techniques",
  items,
  ctaLabel = "Get a Free Quote",
  onCtaClick,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  /* ---- Updated defaults with representative icons ---- */
  const defaults = [
    {
      icon: <HandymanOutlinedIcon sx={{ fontSize: 36 }} />,
      title: "Tune-Up",
      body:
        "Tune-Ups play a vital role in any proper vehicle maintenance schedule and should not be disregarded",
    },
    {
      icon: <CarRepairOutlinedIcon sx={{ fontSize: 36 }} />,
      title: "Brake Service",
      body:
        "Brakes are the most critical feature of any vehicle — free courtesy brake check during every visit",
    },
    {
      icon: <CenterFocusStrongOutlinedIcon sx={{ fontSize: 36 }} />,
      title: "Alignments",
      body:
        "We use the latest computerized alignment technology to detect misalignments",
    },
    {
      icon: <MemoryOutlinedIcon sx={{ fontSize: 36 }} />,
      title: "Computer Diagnostics",
      body:
        "Our auto diagnostic testing service takes the guess work out of repairing your vehicle",
    },
  ];

  const data = items?.length === 4 ? items : defaults;

  return (
    <Section>
      <Container maxWidth="xl">
        {/* Header */}
        {/* <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="overline"
            sx={{
              color: YELLOW,
              fontSize: "0.9rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              mb: 2,
              display: "block",
            }}
          >
            {overline}
          </Typography>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              fontSize: { xs: "2.2rem", md: "3rem" },
              mb: 2,
              textTransform: "uppercase",
              letterSpacing: { xs: 0, md: "0.02em" },
            }}
          >
            {title}
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: alpha("#fff", 0.72),
              maxWidth: 980,
              mx: "auto",
              fontWeight: 400,
            }}
          >
            {subtitle}
          </Typography>
        </Box> */}

        {/* 4 Columns (force single row at all breakpoints) */}
        <Grid
          container
          columns={{ xs: 12, sm: 12, md: 12, lg: 12 }}
          spacing={{ xs: 1.5, md: 0 }}
          wrap="nowrap"
          sx={{
            overflowX: { xs: "auto", md: "visible" },
            pb: { xs: 1, md: 0 },
            "::-webkit-scrollbar": { height: 8 },
            "::-webkit-scrollbar-thumb": {
              backgroundColor: "rgba(255,255,255,0.18)",
              borderRadius: 8,
            },
          }}
        >
          {data.map((item, idx) => (
            <Grid
              item
              xs={3}
              sm={3}
              md={3}
              lg={3}
              key={idx}
              sx={{
                px: { xs: 1.5, md: 4 },
                py: { xs: 4, md: 7 },
                textAlign: "center",
                position: "relative",
                minWidth: { xs: "260px", sm: "auto" },
              }}
            >
              <SplitLine show={idx !== 0} />

              {/* Stacked layout: icon above text */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 2,
                }}
              >
                <Pill aria-hidden>{item.icon}</Pill>

                <Box sx={{ maxWidth: 420 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 800, mb: 1, color: "#fff" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: alpha("#fff", 0.8), lineHeight: 1.7 }}
                  >
                    {item.body}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Centered CTA */}
        {/* <Box sx={{ textAlign: "center", mt: { xs: 6, md: 8 } }}>
          <Button
            variant="contained"
            onClick={onCtaClick}
            fullWidth={isMobile}
            sx={{
              px: { xs: 3, md: 5 },
              py: { xs: 1.35, md: 1.5 },
              borderRadius: 999,
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            {ctaLabel}
          </Button>
        </Box> */}
      </Container>
    </Section>
  );
}
