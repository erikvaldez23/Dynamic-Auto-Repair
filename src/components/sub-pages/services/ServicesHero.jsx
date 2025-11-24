// src/components/content/ServiceSubHero.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

export default function AboutHero({
  title,
  description,
  accent = "#f2c230",
  minHeight = { xs: "38vh", md: "40vh" },
}) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        pt: 10,
        minHeight,
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
          fontSize: { xs: "3rem", sm: "3rem", md: "3rem", lg: "5rem" },
        }}
      >
        All Services
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
              backgroundColor: accent,
              borderRadius: 2,
              margin: "10px auto 0",
              boxShadow: `0 0 8px ${accent}B3, 0 0 16px ${accent}80`, // B3=70%, 80=50%
            },
          }}
        >
          Every Repair, One Trusted Shop.
        </Typography>
    </Box>
  );
}
