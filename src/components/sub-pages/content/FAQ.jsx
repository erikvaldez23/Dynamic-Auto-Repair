// src/components/FAQSection.jsx
import React, { useMemo } from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";

/* ----------------------------- Styled ----------------------------- */
const Section = styled(Box)(({ theme }) => ({
  width: "min(1200px, 92vw)",
  marginInline: "auto",
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const Head = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  gap: theme.spacing(1),
  color: alpha("#fff", 0.96),
  marginBottom: theme.spacing(2.5),
}));

const GlassAccordion = styled(Accordion)(({ theme }) => ({
  borderRadius: 14,
  marginBottom: theme.spacing(1),
  overflow: "hidden",
  background:
    "linear-gradient(180deg, rgba(255,255,255,.06), rgba(255,255,255,.02))",
  border: "1px solid rgba(255,255,255,.10)",
  color: alpha("#fff", 0.96),
  backdropFilter: "blur(6px)",
  "&::before": { display: "none" }, // remove default divider line
}));

/* ------------------------- Registry (edit me) ------------------------- */
/** Keys must match your /services/:serviceId slugs. */
export const FAQ_REGISTRY = {
  brakes: {
    accent: "#f2c230",
    items: [
      {
        q: "How do I know if I need new brakes?",
        a: "Common signs include squealing, grinding, vibration while braking, a longer stopping distance, or a soft pedal. We measure rotor thickness and pad life to confirm.",
      },
      {
        q: "Do you use OEM-quality parts?",
        a: "Yes—premium pads/rotors matched to your vehicle with proper hardware and lubricant. We’ll review options by performance and budget.",
      },
      {
        q: "How long does brake service take?",
        a: "Most pad/rotor services take 1–3 hours per axle depending on vehicle and condition.",
      },
    ],
  },

  alignments: {
    accent: "#f2c230",
    items: [
      {
        q: "How often should I get an alignment?",
        a: "At least annually or whenever you install tires/suspension parts, notice uneven wear, pulling, or an off-center steering wheel.",
      },
      {
        q: "Do you provide a printout?",
        a: "Yes—before/after specs for toe, camber, and caster so you can see what changed.",
      },
    ],
  },

  "oil-filter-change": {
    accent: "#f2c230",
    items: [
      {
        q: "What oil do you use?",
        a: "We follow OEM specifications for viscosity and approval. Full synthetic options are available on request.",
      },
      {
        q: "Will you reset my maintenance light?",
        a: "Yes—where applicable, we reset the reminder and apply a new interval sticker.",
      },
    ],
  },

  "ac-heating": {
    accent: "#f2c230",
    items: [
      {
        q: "Why is my AC blowing warm?",
        a: "Low refrigerant, leaks, compressor issues, or blend door faults are typical causes. We test pressures and vent temps, then evacuate/recharge if needed.",
      },
      {
        q: "Do you handle R-1234yf?",
        a: "Yes—we service both R-134a and R-1234yf systems with the correct oil and procedures.",
      },
    ],
  },

  tires: {
    accent: "#f2c230",
    items: [
      {
        q: "Do you offer road-force balancing?",
        a: "Yes—road-force helps diagnose vibration by measuring tire/wheel uniformity under load.",
      },
      {
        q: "Can you service TPMS?",
        a: "We replace sensors, reprogram IDs, and handle relearns where needed.",
      },
    ],
  },

  // Fallback if a service has no custom FAQs yet
  _default: {
    accent: "#f2c230",
    items: [
      {
        q: "Do you provide free estimates?",
        a: "Yes—we diagnose the concern, outline options, and give a transparent parts/labor estimate.",
      },
      {
        q: "What warranty do you offer?",
        a: "We stand behind our work with a parts and labor warranty. Exact coverage varies by part—ask us for details.",
      },
      {
        q: "Can I wait at the shop?",
        a: "Most services have a comfortable wait-time option; longer repairs can be drop-off with updates.",
      },
    ],
  },
};

/* ----------------------------- Component ----------------------------- */
export default function FAQSection({
  serviceId,
  registry = FAQ_REGISTRY,
  emitJsonLd = true,
}) {
  const cfg = registry[serviceId] || registry._default;
  const accent = cfg.accent || "#f2c230";
  const items = useMemo(() => cfg.items || [], [cfg]);

  // Optional SEO: FAQPage JSON-LD
  const jsonLd =
    emitJsonLd && items.length
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: items.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }
      : null;

  return (
    <Section>
      <Head>
        <Typography variant="h4" fontWeight={900}>
          Frequently Asked Questions
        </Typography>
        <Chip
          label="Helpful info"
          size="small"
          sx={{
            bgcolor: alpha(accent, 0.95),
            color: "#111",
            fontWeight: 800,
            border: `1px solid ${alpha("#000", 0.2)}`,
          }}
        />
      </Head>

      {items.map((it, i) => (
        <GlassAccordion key={i} disableGutters elevation={0}>
          <AccordionSummary expandIcon={<ExpandMoreRoundedIcon sx={{ color: alpha("#fff", 0.9) }} />}>
            <Typography variant="h6" fontWeight={800} sx={{ pr: 2 }}>
              {it.q}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ color: alpha("#fff", 0.92) }}>{it.a}</Typography>
          </AccordionDetails>
        </GlassAccordion>
      ))}

      {/* SEO JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Section>
  );
}
