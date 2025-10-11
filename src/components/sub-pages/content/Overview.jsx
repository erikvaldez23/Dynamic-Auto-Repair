// src/components/content/ServiceOverview.jsx
import React, { useMemo } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  List,
  ListItem,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const ACCENT = "#f2c230";

/* ---------- Full-bleed background wrapper (text sits on page) ---------- */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  paddingBlock: theme.spacing(6),
  color: alpha("#fff", 0.96),
}));

/* ---------- 60/40 grid inside an xl container ---------- */
const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3.5),
  alignItems: "start",
  gridTemplateColumns: "1fr", // mobile
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "3fr 2fr", // 60 / 40
  },
}));

/* ---------- Content registry (edit/extend me) ---------- */
export const OVERVIEW_REGISTRY = {
  "ac-heating": {
    title: "A/C & Heating",
    intro: [
      "One of the best in town when it comes to air-conditioning and heating problems with your car or truck.",
      "Talking about the importance of A/C in any vehicle can’t be overlooked—summer or winter. If you’re looking for a shop that knows what they are doing, Dynamic Auto Repair is a great choice.",
    ],
    problemsHeading: "8 Common A/C problems in any vehicle",
    problems: [
      "- Improper refrigerant level",
      "- Refrigerant contamination",
      "- Unresponsive pressure switches",
      "- Damaged compressor",
      "- Broken belt",
      "- Clutch issues",
      "- Leaks",
      "- A/C control head malfunctions",
    ],
    warningsHeading: "Some warning signs for a failing A/C system",
    warnings: [
      "Sound — strange or grinding noises when the A/C runs.",
      "Smell — unpleasant odor as the system starts; possible compressor lockup or contamination.",
      "Poor performance — air isn’t cooling or heating like it used to.",
    ],
    image: "/placeholder.jpg",
    imageAlt: "A/C manifold gauges on vehicle",
    cta: { label: "Schedule Appointment", href: "/quote" },
  },
  brakes: {
    title: "Brakes",
    intro: [
      "Confident stopping starts with a proper inspection and quality parts.",
      "We measure rotors, check pad life & hoses, and verify hydraulics before any recommendation.",
    ],
    problemsHeading: "Common brake issues",
    problems: [
      "Squeal or grinding noises",
      "Steering wheel shake while braking",
      "Soft/low pedal",
      "Uneven pad wear",
    ],
    warningsHeading: "Warning signs",
    warnings: [
      "Brake light on dash or ABS warning",
      "Pulling to one side under braking",
      "Burning smell after stops",
    ],
    image: "/services/overview/brakes.jpg",
    imageAlt: "Brake rotor and caliper",
    cta: { label: "Get Free Estimate", href: "/quote" },
  },
  alignments: {
    title: "Alignments",
    intro: [
      "Improve handling and tire life with a precision four-wheel alignment.",
      "We inspect suspension/steering before dialing in factory specs.",
    ],
    problemsHeading: "Symptoms of poor alignment",
    problems: ["Uneven tire wear", "Vehicle pulls or drifts", "Off-center steering wheel"],
    warningsHeading: "Good times to align",
    warnings: ["After tire or suspension work", "After a pothole/curb hit", "Annually for preventive care"],
    image: "/services/overview/alignments.jpg",
    imageAlt: "Vehicle on an alignment rack",
    cta: { label: "Book Alignment", href: "/quote" },
  },
  "oil-filter-change": {
    title: "Oil & Filter Change",
    intro: [
      "Right oil, right filter, torque-spec drain plug—fast and done properly.",
      "We top off fluids and reset maintenance reminders where applicable.",
    ],
    problemsHeading: "What we address",
    problems: ["Oil level/condition", "Filter quality", "Leaks at plug or gasket"],
    warningsHeading: "When to visit",
    warnings: [
      "Oil life monitor at/below threshold",
      "Visible leak or burning smell",
      "Increased engine noise at startup",
    ],
    image: "/services/overview/oil-change.jpg",
    imageAlt: "Fresh oil being poured",
    cta: { label: "Schedule Service", href: "/quote" },
  },
  tires: {
    title: "Tires",
    intro: [
      "Mounting, road-force balancing, repairs, rotations, and TPMS service.",
      "We help you choose the best tire for safety, comfort, and budget.",
    ],
    problemsHeading: "Common tire services",
    problems: ["Flat repair (patch/plug)", "Rotation & balance", "TPMS sensors"],
    warningsHeading: "Signs you need service",
    warnings: ["Vibration at highway speeds", "Uneven or rapid wear", "Low-pressure warnings"],
    image: "/services/overview/tires.jpg",
    imageAlt: "Stacked car tires",
    cta: { label: "See Tire Options", href: "/quote" },
  },
  _default: {
    title: "Service Overview",
    intro: [
      "Professional inspection, clear repair options, and quality workmanship.",
      "We’ll confirm the concern, outline parts & labor, and keep you updated.",
    ],
    problemsHeading: "What we commonly address",
    problems: ["Inspection & diagnostics", "Quality parts", "Warranty-backed work"],
    warningsHeading: "When to schedule",
    warnings: ["Warning lights", "Unusual noises/smells", "Performance changes"],
    image: "/services/overview/default.jpg",
    imageAlt: "Technician inspecting a vehicle",
    cta: { label: "Start Free Estimate", href: "/quote" },
  },
};

/* ---------- Component ---------- */
export default function ServiceOverview({ serviceId, registry = OVERVIEW_REGISTRY }) {
  const cfg = registry[serviceId] || registry._default;

  const data = useMemo(
    () => ({
      title: cfg.title,
      intro: cfg.intro || [],
      problemsHeading: cfg.problemsHeading || "",
      problems: cfg.problems || [],
      warningsHeading: cfg.warningsHeading || "",
      warnings: cfg.warnings || [],
      image: cfg.image,
      imageAlt: cfg.imageAlt || "",
      cta: cfg.cta || { label: "Get Estimate", href: "/quote" },
    }),
    [cfg]
  );

  return (
    <Section>
      <Container maxWidth="xl">
        <ContentGrid>
          {/* 60%: description on the page background */}
          <Box>
            <Stack spacing={1.5}>
              <Typography
                variant="h4"
                fontWeight={900}
                sx={{ color: "#fff", letterSpacing: 0.2, fontSize: "4rem" }}
              >
                {data.title}
              </Typography>

              {/* Intro paragraphs */}
              {data.intro.map((p, i) => (
                <Typography key={i} sx={{ color: alpha("#fff", 0.95) }}>
                  {p}
                </Typography>
              ))}

              {/* Problems */}
              {data.problems?.length > 0 && (
                <Stack spacing={0.75} sx={{ mt: 1 }}>
                  {data.problemsHeading && (
                    <Typography fontWeight={800} sx={{ color: "#fff" }}>
                      {data.problemsHeading}
                    </Typography>
                  )}
                  <List dense disablePadding sx={{ pl: 2 }}>
                    {data.problems.map((x, i) => (
                      <ListItem
                        key={i}
                        sx={{
                          display: "list-item",
                          p: 0,
                          mb: 0.5,
                          color: alpha("#fff", 0.95),
                        }}
                      >
                        {x}
                      </ListItem>
                    ))}
                  </List>
                </Stack>
              )}

              {/* Warnings (numbered) */}
              {data.warnings?.length > 0 && (
                <Stack spacing={0.75} sx={{ mt: 1 }}>
                  {data.warningsHeading && (
                    <Typography fontWeight={800} sx={{ color: "#fff" }}>
                      {data.warningsHeading}
                    </Typography>
                  )}
                  <Box component="ol" sx={{ pl: 3, m: 0 }}>
                    {data.warnings.map((x, i) => (
                      <Box
                        component="li"
                        key={i}
                        sx={{ mb: 0.75, color: alpha("#fff", 0.95) }}
                      >
                        {x}
                      </Box>
                    ))}
                  </Box>
                </Stack>
              )}

              {/* CTA */}
              <Box sx={{ pt: 1.5 }}>
                <Button
                  variant="contained"
                  disableElevation
                  onClick={() => (window.location.href = data.cta.href)}
                  sx={{
                    backgroundColor: ACCENT,
                    color: "#111",
                    fontWeight: 800,
                    borderRadius: 2,
                    px: 2.25,
                    "&:hover": { backgroundColor: "#e8b820" },
                  }}
                >
                  {data.cta.label}
                </Button>
              </Box>
            </Stack>
          </Box>

          {/* 40%: image with 3/4 aspect ratio */}
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              aspectRatio: "3 / 4",
              backgroundColor: alpha("#000", 0.4),
            }}
          >
            {data.image && (
              <img
                src={data.image}
                alt={data.imageAlt}
                loading="lazy"
                decoding="async"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center",
                  display: "block",
                }}
              />
            )}
          </Box>
        </ContentGrid>
      </Container>
    </Section>
  );
}
