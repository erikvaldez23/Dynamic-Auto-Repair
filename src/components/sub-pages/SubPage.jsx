// src/pages/ServiceSubPage.jsx
import React, { useMemo, useEffect } from "react";
import { useParams, Link as RouterLink } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  Button,
  Stack,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha, useTheme } from "@mui/material/styles";

/* ----------------------------- Meta Helper Hook ---------------------------- */
function usePageMeta({ title, description, keywords, ogImage }) {
  useEffect(() => {
    if (title) document.title = title;

    const ensure = (selector, create) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = create();
        document.head.appendChild(el);
      }
      return el;
    };
    const setNamed = (name, content) => {
      const el = ensure(`meta[name="${name}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("name", name);
        return m;
      });
      el.setAttribute("content", content || "");
    };
    const setProp = (property, content) => {
      const el = ensure(`meta[property="${property}"]`, () => {
        const m = document.createElement("meta");
        m.setAttribute("property", property);
        return m;
      });
      el.setAttribute("content", content || "");
    };

    setNamed("description", description);
    setNamed("keywords", keywords);
    setProp("og:title", title);
    setProp("og:description", description);
    setProp("og:image", ogImage);
    setProp("og:type", "website");
    setNamed("twitter:card", "summary_large_image");
  }, [title, description, keywords, ogImage]);
}

/* ------------------------------ Service Config ------------------------------ */
const SERVICES = {
  "ac-heating": {
    name: "A/C & Heating",
    slug: "ac-heating",
    meta: {
      title: "A/C & Heating Repair | Dynamic Auto Repair",
      description:
        "Stay comfortable year-round. We diagnose and repair automotive A/C & heating systems: refrigerant issues, leaks, compressors, and more.",
      keywords:
        "auto ac repair, car ac recharge, heater core, compressor, refrigerant leak",
      ogImage: "/images/services/ac-heating-hero.jpg",
    },
    hero: {
      kicker: "Climate Control Experts",
      headline: "A/C & Heating Service",
      subhead:
        "Fast diagnostics, honest recommendations, and repairs that last.",
      image: "/images/services/ac-heating-hero.jpg",
      imageAlt: "A/C manifold gauges connected to an engine bay",
    },
    details: {
      introTitle:
        "One of the best in town for vehicle A/C and heating problems.",
      introBody:
        "Proper climate control is essential in every season. From poor cooling to strange smells or weak airflow, our ASE-certified techs find the root cause and fix it right.",
      bulletsTitle: "8 common A/C problems we fix:",
      bullets: [
        "Improper refrigerant level",
        "Refrigerant contamination",
        "Unresponsive pressure switches",
        "Damaged compressor",
        "Broken belt",
        "Clutch issues",
        "Leaks",
        "A/C control head malfunctions",
      ],
      notesTitle: "Warning signs your A/C needs service:",
      notes: [
        "Unusual noises when the A/C engages",
        "Musty or unpleasant odors from vents",
        "Weak cooling or no cooling at stoplights",
      ],
      sideImage: "/images/services/ac-heating-side.jpg",
      sideImageAlt: "Close-up of A/C gauges",
      ctaLabel: "Schedule Appointment",
      ctaHref: "/contact#book",
    },
  },
  brakes: {
    name: "Brakes",
    slug: "brakes",
    meta: {
      title: "Brake Service & Repair | Dynamic Auto Repair",
      description:
        "Pads, rotors, fluid flushes, ABS diagnostics—get confident stopping power with our complete brake services.",
      keywords: "brake pads, rotors, brake fluid, ABS light, squeaking brakes",
      ogImage: "/images/services/brakes-hero.jpg",
    },
    hero: {
      kicker: "Stop With Confidence",
      headline: "Brake Service & Repair",
      subhead: "Quiet, smooth, and safe—done right the first time.",
      image: "/images/services/brakes-hero.jpg",
      imageAlt: "Mechanic inspecting brake rotor",
    },
    details: {
      introTitle: "Safety starts with reliable brakes.",
      introBody:
        "From routine pad replacements to ABS diagnostics, we service every part of your braking system using OEM-quality parts.",
      bulletsTitle: "What we service:",
      bullets: [
        "Pads & rotors",
        "Calipers & hardware",
        "Brake hoses & lines",
        "Master cylinder",
        "ABS sensors & modules",
        "Brake fluid flush",
      ],
      notesTitle: "Common symptoms:",
      notes: [
        "Grinding or squealing noises",
        "Vibration when braking",
        "Soft or spongy pedal",
        "ABS warning light",
      ],
      sideImage: "/images/services/brakes-side.jpg",
      sideImageAlt: "Brake caliper and rotor close-up",
      ctaLabel: "Get a Brake Check",
      ctaHref: "/contact#book",
    },
  },
  "oil-change": {
    name: "Oil Change",
    slug: "oil-change",
    meta: {
      title: "Full-Service Oil Change | Dynamic Auto Repair",
      description:
        "Premium oil & filter, multi-point inspection, correct weight for your engine. Keep your warranty and extend engine life.",
      keywords: "oil change, synthetic oil, oil filter, engine maintenance",
      ogImage: "/images/services/oil-hero.jpg",
    },
    hero: {
      kicker: "Essential Maintenance",
      headline: "Full-Service Oil Change",
      subhead: "Quality oil, quality filter, quality checkup.",
      image: "/images/services/oil-hero.jpg",
      imageAlt: "Oil being poured into an engine",
    },
    details: {
      introTitle: "Protect your engine.",
      introBody:
        "We use the right oil spec for your vehicle and include a multi-point inspection to catch issues early.",
      bulletsTitle: "Includes:",
      bullets: [
        "Premium oil & filter",
        "Correct weight/spec per manufacturer",
        "Fluid top-offs",
        "Tire pressure check",
        "Service reminder reset (when supported)",
      ],
      notesTitle: "Recommended intervals:",
      notes: [
        "Every 5,000–7,500 miles for synthetic (check your owner’s manual).",
      ],
      sideImage: "/images/services/oil-side.jpg",
      sideImageAlt: "Mechanic removing oil filter",
      ctaLabel: "Book Oil Change",
      ctaHref: "/contact#book",
    },
  },
};

/* ------------------------------- Layout / Styles ------------------------------- */
const APPBAR_MOBILE = 56;
const APPBAR_DESKTOP = 64;

const HeroWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  minHeight: 420,
  color: "#fff",
  display: "grid",
  placeItems: "center",
  overflow: "hidden",
  borderBottom: "1px solid rgba(255,255,255,0.08)",
  background:
    "linear-gradient(180deg, rgba(0,0,0,0.66) 0%, rgba(0,0,0,0.35) 52%, rgba(0,0,0,0.66) 100%)",
  marginTop: `-${APPBAR_MOBILE}px`,
  [theme.breakpoints.up("md")]: {
    marginTop: `-${APPBAR_DESKTOP}px`,
    minHeight: 520,
  },
}));

const HeroBg = styled("div", {
  shouldForwardProp: (prop) => prop !== "$src",
})(({ $src }) => ({
  position: "absolute",
  inset: 0,
  backgroundImage: `url(${$src})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  filter: "grayscale(0) brightness(0.7)",
  transform: "scale(1.03)",
  zIndex: 0,
}));

const HeroOverlay = styled("div")(() => ({
  position: "absolute",
  inset: 0,
background:
  "radial-gradient(1200px 600px at 15% 20%, rgba(242,194,48,0.18), transparent 55%), \
   radial-gradient(1000px 600px at 85% 80%, rgba(255,217,90,0.12), transparent 50%), \
   linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 100%)",
  zIndex: 1,
}));

const HeroContent = styled(Container)(({ theme }) => ({
  position: "relative",
  zIndex: 2,
  textAlign: "center",
  paddingBlock: theme.spacing(10),
}));

const DetailsWrap = styled(Container)(({ theme }) => ({
  paddingBlock: theme.spacing(6),
  display: "grid",
  gridTemplateColumns: "1fr",
  gap: theme.spacing(6),
  [theme.breakpoints.up("md")]: {
    paddingBlock: theme.spacing(10),
    gridTemplateColumns: "3fr 2fr", // 60% / 40%
    alignItems: "start",
  },
}));

const DetailImage = styled("img")(({ theme }) => ({
  width: "100%",
  height: "auto",
  borderRadius: 14,
  boxShadow: `0 16px 48px ${alpha("#000", 0.45)}`,
}));

/* ------------------------------ JSON-LD Helper ------------------------------ */
const ServiceJsonLD = ({ service }) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    serviceType: service.name,
    areaServed: "Local",
    description: service.meta.description,
    image: service.meta.ogImage || service.hero.image,
    provider: { "@type": "LocalBusiness", name: "Dynamic Auto Repair" },
  };
  return <script type="application/ld+json">{JSON.stringify(data)}</script>;
};

/* --------------------------------- Page --------------------------------- */
export default function ServiceSubPage() {
  const { serviceId } = useParams();
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));

  // Always compute svc first
  const svc = useMemo(() => SERVICES[serviceId] ?? null, [serviceId]);

  // Always run hooks in the same order (avoid conditional hooks)
  const fallbackHero = "/images/services/fallback-hero.jpg";
  const fallbackSide = "/images/services/fallback-side.jpg";
  const meta = svc?.meta ?? {
    title: "Service | Dynamic Auto Repair",
    description:
      "Explore our full range of automotive services performed by certified technicians.",
    keywords: "",
    ogImage: fallbackHero,
  };

  usePageMeta({
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    ogImage: meta.ogImage,
  });

  // Scroll to top on param change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [serviceId]);

  // If no service, render the not-found UI AFTER hooks have run
  if (!svc) {
    return (
      <Container sx={{ py: 10 }}>
        <Typography variant="h3" fontWeight={800} gutterBottom>
          Service Not Found
        </Typography>
        <Typography sx={{ mb: 3 }}>
          We couldn’t find that service. Browse all services below.
        </Typography>
        <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
          {Object.values(SERVICES).map((s) => (
            <Button
              key={s.slug}
              component={RouterLink}
              to={`/services/${s.slug}`}
              variant="outlined"
              sx={{ borderRadius: 999 }}
            >
              {s.name}
            </Button>
          ))}
        </Stack>
      </Container>
    );
  }

  const { hero, details } = svc;

  return (
    // Key forces a clean visual reset on service changes (good for overlays)
    <Box key={serviceId}>
      <ServiceJsonLD service={svc} />

      {/* ------------------------------- HERO -------------------------------- */}
      <HeroWrap role="img" aria-label={hero.imageAlt}>
        <HeroBg $src={hero.image || fallbackHero} />
        <HeroOverlay />
        <HeroContent maxWidth="lg">
          {hero.kicker && (
            <Typography variant="overline" sx={{ letterSpacing: 2, opacity: 0.9 }}>
              {hero.kicker}
            </Typography>
          )}
          <Typography
            variant={isMdUp ? "h2" : "h3"}
            fontWeight={900}
            sx={{ textShadow: "0 6px 28px rgba(0,0,0,0.55)" }}
          >
            {hero.headline}
          </Typography>
          {hero.subhead && (
            <Typography
              sx={{
                mt: 1.5,
                mx: "auto",
                maxWidth: 720,
                opacity: 0.92,
                fontSize: isMdUp ? 18 : 16,
              }}
            >
              {hero.subhead}
            </Typography>
          )}
        </HeroContent>
      </HeroWrap>

      {/* ----------------------------- DETAILS (60/40) ------------------------ */}
      <DetailsWrap maxWidth="xl">
        {/* Left: 60% content */}
        <Stack spacing={2}>
          <Typography variant="h4" fontWeight={800}>
            {details.introTitle}
          </Typography>
          <Typography sx={{ opacity: 0.9 }}>{details.introBody}</Typography>

          <Box>
            <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>
              {details.bulletsTitle}
            </Typography>
            <Stack component="ul" sx={{ pl: 3, m: 0, gap: 0.5 }}>
              {details.bullets.map((b, i) => (
                <Typography key={i} component="li" sx={{ lineHeight: 1.8 }}>
                  {b}
                </Typography>
              ))}
            </Stack>
          </Box>

          {details.notes?.length ? (
            <Box>
              <Typography variant="h6" fontWeight={800} sx={{ mb: 1.25 }}>
                {details.notesTitle}
              </Typography>
              <Stack component="ol" sx={{ pl: 3, m: 0, gap: 0.75 }}>
                {details.notes.map((n, i) => (
                  <Typography key={i} component="li" sx={{ lineHeight: 1.8 }}>
                    {n}
                  </Typography>
                ))}
              </Stack>
            </Box>
          ) : null}

          <Stack direction="row" spacing={2} sx={{ pt: 1 }}>
            <Button
              size="large"
              variant="contained"
              component={RouterLink}
              to={details.ctaHref}
              sx={{
                fontWeight: 800,
                borderRadius: 999,
                background: "#f2c230",
                "&:hover": { background: "#ffd95a" },
              }}
            >
              {details.ctaLabel}
            </Button>
          </Stack>
        </Stack>

        {/* Right: 40% image */}
        <DetailImage
          src={details.sideImage || fallbackSide}
          alt={details.sideImageAlt || hero.imageAlt}
        />
      </DetailsWrap>
    </Box>
  );
}

/* ------------------------------ Router reminder ------------------------------
<Route path="/services/:serviceId" element={<ServiceSubPage />} />
--------------------------------------------------------------------------- */
