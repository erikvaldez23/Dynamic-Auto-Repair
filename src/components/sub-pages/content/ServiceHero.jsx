// src/components/ImageCarousel.jsx
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

/* -------------------- Service catalog with explicit images -------------------- */
const SERVICE_CATALOG = {
  "ac-heating": {
    title: "AC & Heating",
    images: ["/services/ac-heating/1.jpg","/services/ac-heating/2.jpg","/services/ac-heating/3.jpg","/services/ac-heating/4.jpg"],
  },
  alignments: {
    title: "Alignments",
    images: ["/services/alignments/1.jpg","/services/alignments/2.jpg","/services/alignments/3.jpg","/services/alignments/4.jpg"],
  },
  "batteries-alternators": {
    title: "Batteries / Alternators",
    images: ["/services/batteries-alternators/1.jpg","/services/batteries-alternators/2.jpg","/services/batteries-alternators/3.jpg","/services/batteries-alternators/4.jpg"],
  },
  brakes: {
    title: "Brakes",
    images: ["/services/brakes/1.jpg","/services/brakes/2.jpg","/services/brakes/3.jpg","/services/brakes/4.jpg"],
  },
  "computer-diagnostics": {
    title: "Computer Diagnostics",
    images: ["/services/computer-diagnostics/1.jpg","/services/computer-diagnostics/2.jpg","/services/computer-diagnostics/3.jpg","/services/computer-diagnostics/4.jpg"],
  },
  "check-engine-light": {
    title: "Check Engine Light",
    images: ["/services/check-engine-light/1.jpg","/services/check-engine-light/2.jpg","/services/check-engine-light/3.jpg","/services/check-engine-light/4.jpg"],
  },
  "cooling-system": {
    title: "Cooling System",
    images: ["/services/cooling-system/1.jpg","/services/cooling-system/2.jpg","/services/cooling-system/3.jpg","/services/cooling-system/4.jpg"],
  },
  "engine-service": {
    title: "Engine Service",
    images: ["/services/engine-service/1.jpg","/services/engine-service/2.jpg","/services/engine-service/3.jpg","/services/engine-service/4.jpg"],
  },
  "fleet-services": {
    title: "Fleet Services",
    images: ["/services/fleet-services/1.jpg","/services/fleet-services/2.jpg","/services/fleet-services/3.jpg","/services/fleet-services/4.jpg"],
  },
  "fuel-system": {
    title: "Fuel System",
    images: ["/services/fuel-system/1.jpg","/services/fuel-system/2.jpg","/services/fuel-system/3.jpg","/services/fuel-system/4.jpg"],
  },
  "multi-point-inspection": {
    title: "Multi-Point Inspection / Pre-Purchase Inspection",
    images: ["/services/multi-point-inspection/1.jpg","/services/multi-point-inspection/2.jpg","/services/multi-point-inspection/3.jpg","/services/multi-point-inspection/4.jpg"],
  },
  "oil-filter-change": {
    title: "Oil & Filter Change",
    images: ["/services/oil-filter-change/1.jpg","/services/oil-filter-change/2.jpg","/services/oil-filter-change/3.jpg","/services/oil-filter-change/4.jpg"],
  },
  "scheduled-maintenance": {
    title: "Scheduled Maintenance",
    images: ["/services/scheduled-maintenance/1.jpg","/services/scheduled-maintenance/2.jpg","/services/scheduled-maintenance/3.jpg","/services/scheduled-maintenance/4.jpg"],
  },
  "state-inspection": {
    title: "State Inspection",
    images: ["/services/state-inspection/1.jpg","/services/state-inspection/2.jpg","/services/state-inspection/3.jpg","/services/state-inspection/4.jpg"],
  },
  "suspension-steering": {
    title: "Suspension & Steering",
    images: ["/services/suspension-steering/1.jpg","/services/suspension-steering/2.jpg","/services/suspension-steering/3.jpg","/services/suspension-steering/4.jpg"],
  },
  tires: {
    title: "Tires",
    images: ["/services/tires/1.jpg","/services/tires/2.jpg","/services/tires/3.jpg","/services/tires/4.jpg"],
  },
  "tune-ups": {
    title: "Tune-Ups",
    images: ["/services/tune-ups/1.jpg","/services/tune-ups/2.jpg","/services/tune-ups/3.jpg","/services/tune-ups/4.jpg"],
  },
};

/** Accessible custom arrows */
const Arrow = ({ className, onClick, dir = "next" }) => (
  <IconButton
    aria-label={dir === "next" ? "Next slide" : "Previous slide"}
    onClick={onClick}
    className={className}
    sx={{
      zIndex: 3,
      color: "#fff",
      "&::before": { display: "none" },
      bgcolor: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(2px)",
      "&:hover": { bgcolor: "rgba(0,0,0,0.65)" },
      boxShadow: "0 6px 24px rgba(0,0,0,0.35)",
      width: 40,
      height: 40,
      borderRadius: "999px",
    }}
  />
);

const ImageCarousel = () => {
  const theme = useTheme();
  const isMdDown = useMediaQuery(theme.breakpoints.down("md"));
  const isSmDown = useMediaQuery(theme.breakpoints.down("sm"));
  const { serviceId } = useParams();

  /** Resolve the service; if missing, fall back to a sensible default */
  const resolvedKey = useMemo(() => {
    if (serviceId && SERVICE_CATALOG[serviceId]) return serviceId;
    return "ac-heating";
  }, [serviceId]);

  const meta = SERVICE_CATALOG[resolvedKey];

  // ✅ Only use explicitly provided images (no auto-build paths)
  const images = Array.isArray(meta.images) ? meta.images : [];

  /** Slider settings tuned for desktop/tablet/phone */
  const sliderSettings = useMemo(
    () => ({
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 3000,
      pauseOnHover: true,
      arrows: false,
      nextArrow: <Arrow dir="next" />,
      prevArrow: <Arrow dir="prev" />,
      lazyLoad: "ondemand",
      swipeToSlide: true,
      adaptiveHeight: true,
      centerMode: !isMdDown,
      centerPadding: isSmDown ? "0px" : isMdDown ? "40px" : "80px",
      slidesToShow: isSmDown ? 1 : isMdDown ? 2 : 3,
      responsive: [
        { breakpoint: 960, settings: { slidesToShow: 2, centerMode: false } },
        { breakpoint: 600, settings: { slidesToShow: 1, centerMode: false } },
      ],
    }),
    [isMdDown, isSmDown]
  );

  /** Framer container for staggered mount */
  const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.15 } } };

  // Optional: gentle guard so the slider doesn't break if a service has no images
  const slides = images.length > 0 ? images : ["/placeholder.jpg"];

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.25 }}
      variants={containerVariants}
    >
      <Box
        sx={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "#000",
          overflow: "hidden",
          px: { xs: 1.5, sm: 2, md: 3 },
          pt: 15
        }}
      >
        <Box sx={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 1500 }}>
          <Box sx={{ py: { xs: 2, md: 3 } }}>
            <Slider {...sliderSettings}>
              {slides.map((src, idx) => (
                <Box key={idx} sx={{ px: { xs: 1, sm: 1.5, md: 2 } }}>
                  <Box
                    component="img"
                    src={src}
                    alt={`${meta.title} image ${idx + 1}`}
                    loading="lazy"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src.includes("placeholder.jpg")) return;
                      target.src = "/placeholder.jpg";
                    }}
                    sx={{
                      width: "100%",
                      aspectRatio: { xs: "4 / 3", md: "2 / 3" },
                      objectFit: "cover",
                      display: "block",
                      borderRadius: "24px",
                      boxShadow: "0 6px 20px rgba(0,0,0,0.18)",
                      transition: "transform .35s ease, box-shadow .35s ease",
                      userSelect: "none",
                      WebkitUserDrag: "none",
                      "&:hover": {
                        transform: "scale(1.02)",
                        boxShadow: "0 10px 28px rgba(0,0,0,0.28)",
                        cursor: "pointer",
                      },
                    }}
                  />
                </Box>
              ))}
            </Slider>
          </Box>
        </Box>
      </Box>
    </motion.div>
  );
};

export default ImageCarousel;
