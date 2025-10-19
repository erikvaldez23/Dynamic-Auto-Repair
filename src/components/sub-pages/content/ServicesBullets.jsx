// src/components/sections/ServicesBullets.jsx
import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

/* ----------------------------- Styled ----------------------------- */
const Panel = styled(Box)(({ theme }) => ({
  width: "min(1200px, 92vw)",
  marginInline: "auto",
  borderRadius: 18,
  padding: theme.spacing(3),
  background: "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
  border: "1px solid rgba(255,255,255,.10)",
  backdropFilter: "blur(6px)",
  color: alpha("#fff", 0.95),
}));

const GroupTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: 0.2,
  marginBottom: theme.spacing(1),
}));

const BulletIcon = styled(CheckCircleRoundedIcon)(({ theme }) => ({
  fontSize: 22,
}));

/* ------------------------- Registry (edit me) ------------------------- */
/** You can add/modify bullets per service here. Keys must match your route slugs. */
export const SERVICE_BULLETS_REGISTRY = {
  "ac-heating": {
    heading: "What’s Included",
    bullets: [
      "AC recharge & leak detection (UV dye/vacuum test)",
      "Heater core & blend door diagnostics",
      "Cabin air filter replacement",
      "Compressor, condenser & hose service",
    ],
    extras: ["Same-day appointments available", "OEM-spec refrigerants & oils"],
    accent: "#f2c230",
  },
  alignments: {
    heading: "We Check & Correct",
    bullets: [
      "Toe, camber & caster to factory specs",
      "Steering wheel centering",
      "Suspension/steering component inspection",
      "Before/after alignment printout",
    ],
    extras: ["Recommended after tire or suspension work"],
    accent: "#f2c230",
  },
  "batteries-alternators": {
    heading: "Service Details",
    bullets: [
      "Battery load test & CCA verification",
      "Starter & alternator diagnostics",
      "Terminal cleaning & corrosion protection",
      "Premium replacement batteries available",
    ],
    extras: ["Battery registration where applicable"],
    accent: "#f2c230",
  },
  brakes: {
    heading: "Brake Service",
    bullets: [
      "Pads/rotors/drums replacement",
      "Brake fluid exchange (DOT spec)",
      "Caliper & hose inspection",
      "ABS scan & diagnostics",
    ],
    extras: ["Bed-in guidance provided"],
    accent: "#f2c230",
  },
  "computer-diagnostics": {
    heading: "Diagnostics We Perform",
    bullets: [
      "OBD-II & manufacturer-level scan",
      "Live data & freeze-frame analysis",
      "Smoke/pressure tests for vacuum leaks",
      "Actionable repair plan & estimate",
    ],
    extras: ["No guesswork: data-driven approach"],
    accent: "#f2c230",
  },
  "check-engine-light": {
    heading: "We Identify The Cause",
    bullets: [
      "CEL code read & triage",
      "Sensor & circuit testing",
      "Emissions readiness checks",
      "Repair quote with priorities",
    ],
    extras: ["We clear codes only after fixing root cause"],
    accent: "#f2c230",
  },
  "cooling-system": {
    heading: "Cooling Coverage",
    bullets: [
      "Radiator, thermostat & water pump",
      "Cooling fan & relay diagnostics",
      "Pressure tests & coolant exchange",
      "Hose & clamp replacement",
    ],
    extras: ["Use of OEM-approved coolants"],
    accent: "#f2c230",
  },
  "engine-service": {
    heading: "Engine Care",
    bullets: [
      "Tune-ups (plugs, coils, filters)",
      "Compression & leak-down tests",
      "Timing components & seals",
      "Intake & carbon cleaning",
    ],
    extras: ["Maintenance plan recommendations"],
    accent: "#f2c230",
  },
  "fleet-services": {
    heading: "Fleet Advantages",
    bullets: [
      "Priority scheduling & rapid turnarounds",
      "Consolidated billing & service history",
      "Preventive maintenance plans",
      "Pickup & dropoff options",
    ],
    extras: ["Custom SLAs on request"],
    accent: "#f2c230",
  },
  "fuel-system": {
    heading: "Fuel System Service",
    bullets: [
      "Fuel pressure & injector balance tests",
      "Injector cleaning or replacement",
      "Filter & pump diagnostics",
      "Air-fuel & sensor correlation checks",
    ],
    extras: ["Restore power & MPG"],
    accent: "#f2c230",
  },
  "multi-point-inspection": {
    heading: "Inspection Coverage",
    bullets: [
      "Brakes, tires & suspension",
      "Fluids, belts & hoses",
      "Leaks & undercarriage",
      "Road-test & scan where applicable",
    ],
    extras: ["Great for pre-purchase peace of mind"],
    accent: "#f2c230",
  },
  "oil-filter-change": {
    heading: "Included Every Time",
    bullets: [
      "Premium oil & filter to spec",
      "Torque-spec drain plug & new washer",
      "Top-offs & fluid checks",
      "Courtesy inspection",
    ],
    extras: ["Sticker & maintenance reminders"],
    accent: "#f2c230",
  },
  "scheduled-maintenance": {
    heading: "Stay On Schedule",
    bullets: [
      "OEM interval services",
      "Fluids, filters & spark plugs",
      "Brakes & tire rotation",
      "Computer resets & relearns",
    ],
    extras: ["Warranty-friendly documentation"],
    accent: "#f2c230",
  },
  "state-inspection": {
    heading: "We Verify",
    bullets: [
      "Safety systems & lighting",
      "Emissions readiness (where required)",
      "OBD/CEL status",
      "VIN & registration checks",
    ],
    extras: ["Fast, compliant process"],
    accent: "#f2c230",
  },
  "suspension-steering": {
    heading: "Ride & Handling",
    bullets: [
      "Shocks/struts & control arms",
      "Ball joints, tie rods, bushings",
      "Rack & pinion, power steering",
      "Post-repair alignment available",
    ],
    extras: ["Noise & vibration diagnosis"],
    accent: "#f2c230",
  },
  tires: {
    heading: "Tire Services",
    bullets: [
      "Mounting & road-force balancing",
      "Flat repair (patch/plug)",
      "TPMS service & programming",
      "Rotation & wear pattern analysis",
    ],
    extras: ["Tire options to fit any budget"],
    accent: "#f2c230",
  },
};

/* --------------------------- Component --------------------------- */
export default function ServicesBullets({
  serviceId,
  registry = SERVICE_BULLETS_REGISTRY,
}) {
  const cfg = registry[serviceId];

  const data = useMemo(
    () =>
      cfg || {
        heading: "Service Details",
        bullets: [
          "Professional inspection & diagnostics",
          "Clear repair plan with options",
          "Quality parts & fluids",
          "Warranty-backed workmanship",
        ],
        extras: ["Questions? We’re happy to help."],
        accent: "#f2c230",
      },
    [cfg]
  );

  const accent = data.accent || "#f2c230";

  return (
    <Panel className="glass-section" sx={{ mt: 3, mb: 2 }}>
      <Stack spacing={2}>
        <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
          <GroupTitle variant="h5">{data.heading}</GroupTitle>
          <Chip
            label="Included"
            size="small"
            sx={{
              bgcolor: alpha(accent, 0.95),
              color: "#111",
              fontWeight: 800,
              border: `1px solid ${alpha("#000", 0.2)}`,
            }}
          />
        </Stack>

        <Grid container spacing={1.5}>
          {chunk(data.bullets, 2).map((col, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <List dense disablePadding>
                {col.map((text, i) => (
                  <ListItem key={i} sx={{ px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <BulletIcon sx={{ color: accent }} />
                    </ListItemIcon>
                    <ListItemText
                      primaryTypographyProps={{
                        sx: { color: alpha("#fff", 0.95), fontSize: 16 },
                      }}
                      primary={text}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          ))}
        </Grid>

        {!!data.extras?.length && (
          <>
            <Divider sx={{ borderColor: alpha("#fff", 0.12) }} />
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {data.extras.map((x, i) => (
                <Chip
                  key={i}
                  label={x}
                  size="small"
                  sx={{
                    bgcolor: alpha("#000", 0.35),
                    border: "1px solid rgba(255,255,255,.18)",
                    color: alpha("#fff", 0.95),
                    fontWeight: 700,
                  }}
                />
              ))}
            </Stack>
          </>
        )}
      </Stack>
    </Panel>
  );
}

/* -------------------------- helpers -------------------------- */
function chunk(arr = [], cols = 2) {
  const res = Array.from({ length: cols }, () => []);
  arr.forEach((v, i) => res[i % cols].push(v));
  return res;
}
