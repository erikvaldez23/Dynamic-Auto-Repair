// src/components/animations/PageFlip.jsx
import React from "react";
import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import { motion } from "framer-motion";

/** Scene adds the 3D perspective once for everything inside */
export const FlipScene = styled(Box, {
  shouldForwardProp: (p) => p !== "perspective",
})(({ perspective = 1200 }) => ({
  position: "relative",
  perspective,                 // distance of the “camera”
  transformStyle: "preserve-3d",
}));

/**
 * PageFlip
 * - Wrap a single section (e.g., your Hero)
 * - Flips in from the bottom edge like a page
 */
export function PageFlip({
  children,
  initialAngle = 88,           // starting angle (deg)
  origin = "50% 100%",         // bottom-center pivot
  duration = 0.9,
  delay = 0,
  once = true,                 // play only once when in view
  shadow = true,               // subtle dynamic shadow while flipping
}) {
  return (
    <Box
      component={motion.div}
      initial={{ rotateX: initialAngle, y: 40, opacity: 0, transformOrigin: origin }}
      whileInView={{ rotateX: 0, y: 0, opacity: 1 }}
      viewport={{ once, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      sx={{
        transformStyle: "preserve-3d",
        willChange: "transform, opacity",
        position: "relative",
        // optional soft shadow that fades away as the page opens
        ...(shadow && {
          "&::after": {
            content: '""',
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.24), rgba(0,0,0,0.10) 40%, rgba(0,0,0,0) 70%)",
            opacity: 0.6,
            transition: "opacity .6s ease",
          },
          "&[style*='rotateX(0deg)']::after": { opacity: 0 },
        }),
      }}
    >
      {children}
    </Box>
  );
}
