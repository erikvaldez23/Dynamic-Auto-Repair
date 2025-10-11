// src/components/Pricing.jsx
import React, { useMemo } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Stack,
  Typography,
  Button,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";

/* --------------------------- Styled --------------------------- */
const Section = styled(Box)(({ theme }) => ({
  width: "min(1200px, 92vw)",
  marginInline: "auto",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const PriceCard = styled(Card)(({ theme }) => ({
  height: "100%",
  borderRadius: 18,
  background:
    "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
  border: "1px solid rgba(255,255,255,.10)",
  color: alpha("#fff", 0.96),
  backdropFilter: "blur(6px)",
}));

const Price = ({ value, from = false }) => (
  <Stack direction="row" alignItems="baseline" spacing={1}>
    {from && (
      <Typography variant="subtitle2" sx={{ opacity: 0.85 }}>
        From
      </Typography>
    )}
    <Typography variant="h4" fontWeight={900}>
      {value}
    </Typography>
  </Stack>
);

/* ---------------------- Registry (edit me) ---------------------- */
/** Keys match your /services/:serviceId slugs. */
export const PRICING_REGISTRY = {
  brakes: {
    accent: "#f2c230",
    note: "Final pricing may vary by vehicle and parts selection.",
    plans: [
      {
        title: "Front or Rear Pads & Rotors",
        price: "$349",
        period: "",
        from: true,
        features: [
          "Premium pads & coated rotors",
          "Hardware & lubricant",
          "Caliper slide service",
          "Road test & bed-in tips",
        ],
        cta: { label: "Get Free Estimate", href: "/quote" },
        badge: "Popular",
      },
      {
        title: "Brake Fluid Exchange",
        price: "$129",
        from: false,
        features: [
          "DOT-spec fluid",
          "ABS bleed procedure",
          "Moisture/boiling point test",
        ],
        cta: { label: "Book Now", href: "tel:+14699690043" },
      },
    ],
  },

  alignments: {
    accent: "#f2c230",
    note: "Includes printout with before/after specs.",
    plans: [
      {
        title: "Four-Wheel Alignment",
        price: "$99",
        from: true,
        features: [
          "Toe, camber & caster set",
          "Steering wheel centering",
          "Suspension inspection",
        ],
        cta: { label: "Schedule", href: "/quote" },
        badge: "Best Value",
      },
    ],
  },

  "oil-filter-change": {
    accent: "#f2c230",
    note: "Synthetic blend or full synthetic available.",
    plans: [
      {
        title: "Oil & Filter Change",
        price: "$59",
        from: true,
        features: [
          "Premium oil & filter",
          "Torque-spec drain plug",
          "Top-offs & inspection",
        ],
        cta: { label: "Book Now", href: "tel:+14699690043" },
      },
    ],
  },

  tires: {
    accent: "#f2c230",
    note: "Ask about tire options to fit any budget.",
    plans: [
      {
        title: "Mount & Balance (per tire)",
        price: "$25",
        from: true,
        features: ["Road-force balance", "New valve stem", "TPMS reset"],
        cta: { label: "Get Quote", href: "/quote" },
      },
      {
        title: "Flat Repair",
        price: "$25",
        from: true,
        features: ["Patch/plug combo", "Inside repair", "Balance check"],
        cta: { label: "Call Now", href: "tel:+14699690043" },
      },
    ],
  },

  "ac-heating": {
    accent: "#f2c230",
    note: "Recharge price varies by refrigerant type and capacity.",
    plans: [
      {
        title: "AC Recharge & Leak Test",
        price: "$149",
        from: true,
        features: ["Vacuum & recharge", "UV dye & leak check", "Temp test"],
        cta: { label: "Schedule", href: "/quote" },
        badge: "Summer Saver",
      },
    ],
  },

  // Fallback for any service without a custom entry
  _default: {
    accent: "#f2c230",
    note: "Prices vary by vehicle and parts. We’ll provide a clear estimate.",
    plans: [
      {
        title: "Diagnostic & Estimate",
        price: "$0",
        from: false,
        features: [
          "Code scan / inspection",
          "Actionable repair plan",
          "Upfront pricing",
        ],
        cta: { label: "Start Free Estimate", href: "/quote" },
        badge: "Free",
      },
    ],
  },
};

/* --------------------------- Component --------------------------- */
export default function Pricing({
  serviceId,
  registry = PRICING_REGISTRY,
  phoneHref = "tel:+14699690043",
}) {
  const cfg = registry[serviceId] || registry._default;

  const { plans, note, accent } = useMemo(
    () => ({
      plans: cfg.plans || [],
      note: cfg.note || "",
      accent: cfg.accent || "#f2c230",
    }),
    [cfg]
  );

  if (!plans.length) return null;

  return (
    <Section>
      <Grid container spacing={2}>
        {plans.map((p, idx) => (
          <Grid item xs={12} md={plans.length > 1 ? 6 : 12} key={idx}>
            <PriceCard elevation={0} className="glass-section">
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={1.25}>
                  <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
                    <Typography variant="h6" fontWeight={900}>
                      {p.title}
                    </Typography>
                    {p.badge && (
                      <Chip
                        label={p.badge}
                        size="small"
                        sx={{
                          bgcolor: alpha(accent, 0.95),
                          color: "#111",
                          fontWeight: 800,
                          border: `1px solid ${alpha("#000", 0.2)}`,
                        }}
                      />
                    )}
                  </Stack>

                  <Price value={p.price} from={p.from} />

                  <Stack spacing={0.75} sx={{ mt: 0.5 }}>
                    {(p.features || []).map((f, i) => (
                      <Stack direction="row" spacing={1} alignItems="flex-start" key={i}>
                        <CheckRoundedIcon sx={{ color: accent, fontSize: 20, mt: "2px" }} />
                        <Typography sx={{ color: alpha("#fff", 0.95) }}>{f}</Typography>
                      </Stack>
                    ))}
                  </Stack>

                  <Stack direction="row" spacing={1.25} sx={{ pt: 1 }}>
                    <Button
                      variant="contained"
                      disableElevation
                      onClick={() => (window.location.href = p.cta?.href || phoneHref)}
                      sx={{
                        bgcolor: accent,
                        color: "#111",
                        fontWeight: 900,
                        borderRadius: 2,
                        px: 2.25,
                        "&:hover": { bgcolor: alpha(accent, 0.9) },
                      }}
                    >
                      {p.cta?.label || "Call Now"}
                    </Button>
                    <Button
                      variant="outlined"
                      onClick={() => (window.location.href = phoneHref)}
                      sx={{
                        borderColor: alpha("#fff", 0.35),
                        color: alpha("#fff", 0.98),
                        borderRadius: 2,
                        "&:hover": {
                          borderColor: alpha("#fff", 0.6),
                          background: alpha("#fff", 0.06),
                        },
                      }}
                    >
                      Call Now
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </PriceCard>
          </Grid>
        ))}
      </Grid>

      {note && (
        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            textAlign: "center",
            color: alpha("#fff", 0.8),
          }}
        >
          {note}
        </Typography>
      )}
    </Section>
  );
}
