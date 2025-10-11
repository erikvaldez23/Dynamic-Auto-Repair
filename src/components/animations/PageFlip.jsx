// src/components/animations/ScrollLift.jsx
import React, { useRef } from "react";
import { Box } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * ScrollLift v2
 * - Hero stays static.
 * - This creates a new layer above the hero and slides children up over it.
 * - No transforms/opacity applied to the hero or its ancestors.
 */
export default function ScrollLift({
  children,
  stageVH = 180,          // total scroll distance this effect occupies
  range = [0, 0.3],       // portion of that distance used for the motion
  addShadow = true,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Slide from off-screen bottom to 0
  const y = useTransform(scrollYProgress, range, ["100vh", "0vh"], { clamp: true });

  return (
    <Box
      ref={ref}
      sx={{
        position: "relative",
        height: `${stageVH}vh`,
        marginTop: "-100vh",  // place this block on top of the full-viewport hero
        zIndex: 2,            // ensure it sits OVER the hero
        pointerEvents: "none",// lift layer doesn't block scrolling
      }}
    >
      {/* sticky viewport host */}
      <Box
        sx={{
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        {/* actual sliding content */}
        <Box
          component={motion.div}
          style={{ y }}
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            alignContent: "start",
            pointerEvents: "auto", // re-enable interactions for children
            background: "transparent",
            ...(addShadow && {
              boxShadow:
                "0 -30px 80px rgba(0,0,0,0.45), 0 -8px 30px rgba(0,0,0,0.35)",
            }),
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
