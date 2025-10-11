// src/components/ServicePage.jsx
import React, {
  useEffect,
  lazy,
  Suspense,
  useRef,
  useState,
} from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import { Box, Typography, Button, GlobalStyles, useMediaQuery } from "@mui/material";

// Always-eager light pieces
import Topbar from "../key-components/Topbar";
import Footer from "../key-components/Footer";

/* --------------------------- Lazy sections --------------------------- */
const HeroGallery        = lazy(() => import("./hero/ServiceHero"));
const ServicesBullets    = lazy(() => import("./content/ServicesBullets"));
const PricingComponent   = lazy(() => import("./content/Pricing"));
const HowItWorks         = lazy(() => import("./content/HowItWorks"));
const FAQSection         = lazy(() => import("./content/FAQ"));
const Overview         = lazy(() => import("./content/Overview"));
// const CallToAction    = lazy(() => import("./SubCTA"));
// const Contact         = lazy(() => import("./SubContact"));
// const ImageCarousel   = lazy(() => import("./ImageCarousel"));
// const QuickLinks      = lazy(() => import("./SubQuickLinks"));

/* ---------------------------- Page styling bg --------------------------- */
const GRADIENT = `
  radial-gradient(circle at top left, rgba(39,148,210,0.15), transparent 50%),
  radial-gradient(circle at bottom right, rgba(77,184,240,0.15), transparent 50%),
  linear-gradient(180deg, #0a0a0a 0%, #0f0f0f 100%)
`;

/* ------------------------ In-view gate (mount) ------------------------ */
function InViewMount({ children, rootMargin = "200px" }) {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { rootMargin }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return <div ref={ref}>{ready ? children : null}</div>;
}

const Fallback = <Box sx={{ minHeight: 120 }} />;

/* -------------------------- Service Registry -------------------------- */
const services = {
  "ac-heating": {
    title: "AC & Heating",
    description:
      "Stay comfortable in every season with expert AC and heating diagnostics, repair, and recharge.",
    sections: ["Overview","HeroGallery", "ServicesBullets", "Pricing", "HowItWorks", "FAQ", "CTA", "Contact"],
  },
  alignments: {
    title: "Alignments",
    description:
      "Improve handling, tire wear, and safety with precision four-wheel alignments.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "FAQ", "CTA", "Contact"],
  },
  "batteries-alternators": {
    title: "Batteries / Alternators",
    description:
      "Quick testing and replacement to keep your vehicle starting strong and charging properly.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "FAQ", "CTA", "Contact"],
  },
  brakes: {
    title: "Brakes",
    description:
      "From pads and rotors to hydraulics—get confident stopping power with quality parts.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "HowItWorks", "FAQ", "CTA", "Contact"],
  },
  "computer-diagnostics": {
    title: "Computer Diagnostics",
    description:
      "Pinpoint issues fast with advanced OBD-II and manufacturer-level diagnostics.",
    sections: ["HeroGallery", "ServicesBullets", "FAQ", "CTA", "Contact"],
  },
  "check-engine-light": {
    title: "Check Engine Light",
    description:
      "We identify the cause behind your CEL and provide a clear, actionable repair plan.",
    sections: ["HeroGallery", "ServicesBullets", "FAQ", "CTA", "Contact"],
  },
  "cooling-system": {
    title: "Cooling System",
    description:
      "Radiators, water pumps, hoses, and thermostats—keep your engine running cool.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "FAQ", "CTA", "Contact"],
  },
  "engine-service": {
    title: "Engine Service",
    description:
      "From tune-ups to major repairs—comprehensive engine diagnostics and restoration.",
    sections: ["HeroGallery", "ServicesBullets", "HowItWorks", "FAQ", "CTA", "Contact"],
  },
  "fleet-services": {
    title: "Fleet Services",
    description:
      "Fast, reliable maintenance and repairs tailored for business fleets to minimize downtime.",
    sections: ["HeroGallery", "ServicesBullets", "FAQ", "CTA", "Contact"],
  },
  "free-repair-estimates": {
    title: "Free Repair Estimates",
    description:
      "Transparent, upfront estimates—no surprises. Get clarity before any work begins.",
    sections: ["HeroGallery", "CTA", "Contact"],
  },
  "fuel-system": {
    title: "Fuel System",
    description:
      "Fuel pumps, injectors, and cleaning services to restore performance and mileage.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "FAQ", "CTA", "Contact"],
  },
  "multi-point-inspection": {
    title: "Multi-Point / Pre-Purchase Inspection",
    description:
      "A comprehensive inspection that covers safety, wear, leaks, and road-test findings.",
    sections: ["HeroGallery", "ServicesBullets", "FAQ", "CTA", "Contact"],
  },
  "oil-filter-change": {
    title: "Oil & Filter Change",
    description:
      "Premium oil and filters, torque-spec drain plugs, and inspection—done right, fast.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "FAQ", "CTA", "Contact"],
  },
  "scheduled-maintenance": {
    title: "Scheduled Maintenance",
    description:
      "Stay on schedule with OEM-recommended services that protect performance and warranty.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "FAQ", "CTA", "Contact"],
  },
  "state-inspection": {
    title: "State Inspection",
    description:
      "Quick, compliant inspections to keep you legal and safe on the road.",
    sections: ["HeroGallery", "FAQ", "CTA", "Contact"],
  },
  "suspension-steering": {
    title: "Suspension & Steering",
    description:
      "Shocks, struts, control arms, and racks—restore ride comfort and control.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "FAQ", "CTA", "Contact"],
  },
  tires: {
    title: "Tires",
    description:
      "Mounting, balancing, rotation, and TPMS—maximize tread life and safety.",
    sections: ["HeroGallery", "ServicesBullets", "Pricing", "FAQ", "CTA", "Contact"],
  },
};

/* ---------------------- Section Component Switch ---------------------- */
const SectionSwitch = ({ name, serviceId }) => {
  switch (name) {
    case "HeroGallery":
      return (
        <InViewMount>
          <HeroGallery serviceId={serviceId} />
        </InViewMount>
      );
    case "Overview":
      return (
        <InViewMount>
          <Overview serviceId={serviceId} />
        </InViewMount>
      );
    case "ServicesBullets":
      return (
        <InViewMount>
          <ServicesBullets serviceId={serviceId} />
        </InViewMount>
      );
    case "Pricing":
      return (
        <InViewMount>
          <PricingComponent serviceId={serviceId} />
        </InViewMount>
      );
    case "HowItWorks":
      return (
        <InViewMount>
          <HowItWorks serviceId={serviceId} />
        </InViewMount>
      );
    case "FAQ":
      return (
        <InViewMount>
          <FAQSection serviceId={serviceId} />
        </InViewMount>
      );
    // case "Gallery":
    // case "CTA":
    // case "Contact":
    // case "QuickLinks":
    default:
      return null;
  }
};

/* ----------------------------- Component ------------------------------ */
export default function ServicePage() {
  const { serviceId } = useParams();
  const isMobile = useMediaQuery("(max-width:768px)");
  const service = services[serviceId];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [serviceId]);

  /* ------------------------------ 404 ------------------------------ */
  if (!service) {
    return (
      <Box className="ServicePageRoot" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <GlobalStyles
          styles={{
            ".ServicePageRoot": { position: "relative" },
            ".ServicePageRoot::before": {
              content: '""',
              position: "fixed",
              inset: 0,
              zIndex: -1,
              background: GRADIENT,
            },
            ".glass-section": {
              backgroundColor: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "16px",
              backdropFilter: "blur(6px)",
            },
          }}
        />

        <Topbar notFound />

        <Box sx={{ display: "grid", placeItems: "center", flexGrow: 1, p: 6, mt: { xs: "56px", md: "64px" } }}>
          <Box sx={{ textAlign: "center", color: "#fff" }}>
            <Typography variant="h2" fontWeight={800} sx={{ mb: 1 }}>
              404
            </Typography>
            <Typography sx={{ opacity: 0.8, mb: 3 }}>
              We couldn’t find that service.
            </Typography>
            <Button
              component={RouterLink}
              to="/services"
              variant="contained"
              sx={{ borderRadius: 2 }}
            >
              Browse Services
            </Button>
          </Box>
        </Box>

        <Suspense fallback={Fallback}>
          <Footer />
        </Suspense>
      </Box>
    );
  }

  /* ---------------------------- Normal Page ---------------------------- */
  return (
    <Box className="ServicePageRoot" sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <GlobalStyles
        styles={{
          ".ServicePageRoot": { position: "relative" },
          ".ServicePageRoot::before": {
            content: '""',
            position: "fixed",
            inset: 0,
            zIndex: -1,
            background: GRADIENT,
          },
          ".glass-section": {
            backgroundColor: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            backdropFilter: "blur(6px)",
          },
          ".bg-clear, .bg-clear *": {
            background: "transparent !important",
            backgroundImage: "none !important",
          },
        }}
      />

      {/* Hero */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          pt: 10,
          minHeight: { xs: "38vh", md: "40vh" },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          textAlign: "center",
          px: { xs: 1.5, md: 2 },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            mb: 1,
            fontWeight: 800,
            fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem", lg: "3.4rem" },
          }}
        >
          {service.title}
        </Typography>
        <Typography
          variant="h6"
          sx={{
            opacity: 0.9,
            maxWidth: 900,
            mx: "auto",
            fontSize: { xs: "1rem", md: "1.25rem" },
            "&::after": {
              content: '""',
              display: "block",
              width: 80,
              height: 5,
              backgroundColor: "#f2c230",
              borderRadius: 2,
              margin: "10px auto 0",
              boxShadow: "0 0 8px rgba(242,194,48,0.7), 0 0 16px rgba(242,194,48,0.5)",
            },
          }}
        >
          {service.description}
        </Typography>
      </Box>

      {/* Dynamic sections */}
      <Suspense fallback={Fallback}>
        {(service.sections || []).map((name, idx) => (
          <SectionSwitch key={`${serviceId}-${name}-${idx}`} name={name} serviceId={serviceId} />
        ))}
      </Suspense>
    </Box>
  );
}
