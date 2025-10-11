// src/components/HowItWorks.jsx
import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Chip,
  Avatar,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { motion } from "framer-motion";

// Icons (swap or extend as you like)
import CalendarMonthRoundedIcon from "@mui/icons-material/CalendarMonthRounded";
import BuildRoundedIcon from "@mui/icons-material/BuildRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import LocalShippingRoundedIcon from "@mui/icons-material/LocalShippingRounded";
import CreditCardRoundedIcon from "@mui/icons-material/CreditCardRounded";

/* ----------------------------- Styled ----------------------------- */
const Section = styled(Box)(({ theme }) => ({
  width: "min(1200px, 92vw)",
  marginInline: "auto",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const Header = styled(Stack)(({ theme }) => ({
  alignItems: "flex-start",
  gap: theme.spacing(1.25),
  color: alpha("#fff", 0.96),
  marginBottom: theme.spacing(2.5),
}));

const Card = styled(motion.div)(({ theme }) => ({
  position: "relative",
  height: "100%",
  borderRadius: 18,
  padding: theme.spacing(2.25),
  background:
    "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
  border: "1px solid rgba(255,255,255,.10)",
  color: alpha("#fff", 0.96),
  backdropFilter: "blur(6px)",
}));

const StepNum = styled(Avatar)(({ theme }) => ({
  width: 34,
  height: 34,
  fontWeight: 900,
  color: "#111",
}));

/* ---------------------- Registry (edit me) ---------------------- */
/** Keys must match your /services/:serviceId slugs. */
export const HIW_REGISTRY = {
  brakes: {
    title: "How Brake Service Works",
    blurb:
      "Transparent inspection, quality parts, and a proper bed-in for confident stopping.",
    accent: "#f2c230",
    steps: [
      {
        label: "Inspect & Confirm",
        desc: "We measure rotors, check pad life, hoses, calipers, and perform an ABS scan.",
        icon: <CheckCircleRoundedIcon />,
      },
      {
        label: "Clear Estimate",
        desc: "You’ll get parts & labor options by quality and budget—no surprises.",
        icon: <CreditCardRoundedIcon />,
      },
      {
        label: "Precision Install",
        desc: "New pads/rotors with hardware & lubricant, torque-spec fasteners.",
        icon: <BuildRoundedIcon />,
      },
      {
        label: "Road Test & Bed-In",
        desc: "We road-test, verify no vibration, and share bed-in tips for longevity.",
        icon: <LocalShippingRoundedIcon />,
      },
    ],
  },

  alignments: {
    title: "How Alignment Works",
    blurb:
      "We dial in factory specs so your car tracks straight and your tires last longer.",
    accent: "#f2c230",
    steps: [
      {
        label: "Check Suspension",
        desc: "We inspect tie rods, ball joints, and bushings before adjustments.",
        icon: <CheckCircleRoundedIcon />,
      },
      {
        label: "Set to Spec",
        desc: "Toe, camber, and caster adjusted to OEM tolerances.",
        icon: <BuildRoundedIcon />,
      },
      {
        label: "Center Steering",
        desc: "We center the wheel and verify straight-line tracking on a test drive.",
        icon: <LocalShippingRoundedIcon />,
      },
      {
        label: "Printout",
        desc: "Before/after spec printout provided for your records.",
        icon: <CreditCardRoundedIcon />,
      },
    ],
  },

  "oil-filter-change": {
    title: "How an Oil Change Works",
    blurb:
      "Fast service with the right oil, torque-spec, and a quick health check.",
    accent: "#f2c230",
    steps: [
      {
        label: "Confirm Spec",
        desc: "We verify your engine’s spec and select the proper filter.",
        icon: <CalendarMonthRoundedIcon />,
      },
      {
        label: "Drain & Replace",
        desc: "New crush washer, torque-spec drain plug, and premium oil.",
        icon: <BuildRoundedIcon />,
      },
      {
        label: "Top Off & Reset",
        desc: "Fluids topped off and maintenance light reset (where applicable).",
        icon: <CheckCircleRoundedIcon />,
      },
      {
        label: "Courtesy Check",
        desc: "Quick inspection of belts, hoses, tires, and leaks.",
        icon: <LocalShippingRoundedIcon />,
      },
    ],
  },

  "ac-heating": {
    title: "How AC Service Works",
    blurb:
      "Restore cold air with proper evacuation, recharge, and leak detection.",
    accent: "#f2c230",
    steps: [
      {
        label: "Evaluate",
        desc: "Pressure and vent temp checks, visual inspection.",
        icon: <CalendarMonthRoundedIcon />,
      },
      {
        label: "Evacuate & Recharge",
        desc: "Vacuum, recharge with spec refrigerant and oil.",
        icon: <BuildRoundedIcon />,
      },
      {
        label: "Leak Check",
        desc: "UV dye and electronic leak detection as needed.",
        icon: <CheckCircleRoundedIcon />,
      },
      {
        label: "Performance Test",
        desc: "Verify temps at idle and cruise; report findings.",
        icon: <LocalShippingRoundedIcon />,
      },
    ],
  },

  // Fallback for any service not defined above
  _default: {
    title: "How It Works",
    blurb:
      "Simple, transparent process: we diagnose, explain your options, and complete the work with quality parts.",
    accent: "#f2c230",
    steps: [
      {
        label: "Book a Visit",
        desc: "Call or request a free estimate to get on the schedule.",
        icon: <CalendarMonthRoundedIcon />,
      },
      {
        label: "Inspect & Diagnose",
        desc: "We verify the concern and outline a clear repair plan.",
        icon: <CheckCircleRoundedIcon />,
      },
      {
        label: "Approve & Repair",
        desc: "You choose the option; we get to work with quality parts.",
        icon: <BuildRoundedIcon />,
      },
      {
        label: "Test & Deliver",
        desc: "We road-test, quality check, and get you back on the road.",
        icon: <LocalShippingRoundedIcon />,
      },
    ],
  },
};

/* ----------------------------- Component ----------------------------- */
export default function HowItWorks({ serviceId, registry = HIW_REGISTRY }) {
  const cfg = registry[serviceId] || registry._default;

  const data = useMemo(
    () => ({
      title: cfg.title,
      blurb: cfg.blurb,
      steps: cfg.steps || [],
      accent: cfg.accent || "#f2c230",
    }),
    [cfg]
  );

  return (
    <Section>
      {/* Header */}
      <Header>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Typography variant="h4" fontWeight={900}>
            {data.title}
          </Typography>
          <Chip
            label="Easy as 1-2-3-4"
            size="small"
            sx={{
              bgcolor: alpha(data.accent, 0.95),
              color: "#111",
              fontWeight: 800,
              border: `1px solid ${alpha("#000", 0.2)}`,
            }}
          />
        </Stack>
        <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 900 }}>
          {data.blurb}
        </Typography>
      </Header>

      {/* Steps */}
      <Grid container spacing={1.5}>
        {data.steps.map((s, i) => (
          <Grid item xs={12} md={6} key={i}>
            <Card
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="glass-section"
            >
              <Stack direction="row" spacing={1.5} alignItems="flex-start">
                <StepNum
                  sx={{
                    bgcolor: alpha(data.accent, 0.95),
                    border: `1px solid ${alpha("#000", 0.18)}`,
                  }}
                >
                  {i + 1}
                </StepNum>

                <Stack spacing={0.5}>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    {s.icon && (
                      <Box
                        component="span"
                        sx={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          bgcolor: alpha("#000", 0.35),
                          border: "1px solid rgba(255,255,255,.18)",
                          color: alpha("#fff", 0.95),
                        }}
                      >
                        {s.icon}
                      </Box>
                    )}
                    <Typography variant="h6" fontWeight={800}>
                      {s.label}
                    </Typography>
                  </Stack>

                  <Typography sx={{ opacity: 0.9 }}>{s.desc}</Typography>
                </Stack>
              </Stack>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Section>
  );
}
