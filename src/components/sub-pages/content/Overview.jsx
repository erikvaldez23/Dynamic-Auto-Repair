// src/components/content/ServiceOverview.jsx
import React, { useMemo } from "react";
import { Box, Container } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

// ⬇️ Bring the data from a separate file (do NOT place the blob here)
import { OVERVIEW_HTML } from "./OverviewRegistry"; 
// If you want to pass a custom registry via props, you still can (see default export).

const ACCENT = "#f2c230";

/* ---------- Full-bleed background wrapper (text sits on page) ---------- */
const Section = styled(Box)(({ theme }) => ({
  width: "100%",
  position: "relative",
  paddingBlock: theme.spacing(6),
  color: alpha("#fff", 0.96),
}));

/* ---------- 60/40 grid inside an xl container ---------- */
const ContentGrid = styled(Box)(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(3.5),
  alignItems: "stretch", // ensure equal column heights
  gridTemplateColumns: "1fr", // mobile
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "3fr 2fr", // 60 / 40
  },
}));

/* ---------- Small helper: safe HTML render box ---------- */
function HtmlBox({ html }) {
  if (!html) return null;
  return (
    <Box
      dangerouslySetInnerHTML={{ __html: html }}
      sx={{
        "& ul": {
          listStyleType: "disc",
          listStylePosition: "outside",
          paddingInlineStart: "1.25rem",
          margin: "0.25rem 0 0.75rem",
        },
        "& ol": {
          listStyleType: "decimal",
          listStylePosition: "outside",
          paddingInlineStart: "1.25rem",
          margin: "0.25rem 0 0.75rem",
        },
        "& li": {
          display: "list-item",
          marginBottom: "6px",
        },
        "& ul li::marker, & ol li::marker": { color: "rgba(255,255,255,0.6)" },
        "& h1,h2,h3": { margin: "0 0 8px 0", fontWeight: 900, letterSpacing: 0.2 },
        "& h1": { fontSize: { xs: "2rem", md: "2.6rem" } },
        "& h2": { fontSize: { xs: "1.6rem", md: "2rem" } },
        "& h3": { fontSize: { xs: "1.2rem", md: "1.25rem" } },
        "& p": { margin: "0 0 10px 0", opacity: 0.96, lineHeight: 1.6 },
        "& a.cta": {
          display: "inline-block",
          backgroundColor: ACCENT,
          color: "#111",
          fontWeight: 800,
          textDecoration: "none",
          borderRadius: 12,
          padding: "10px 16px",
          boxShadow: "0 10px 26px rgba(0,0,0,0.35)",
        },
        "& a.cta:hover": { backgroundColor: "#e8b820" },
      }}
    />
  );
}

/* ---------- Tiny helpers for consistent image rendering ---------- */
function ImgFrame({ children }) {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        p: { xs: 1, sm: 1.5, md: 2 },
        background: "rgba(0,0,0,0.25)",
        display: "grid",
        placeItems: "center",
      }}
    >
      {children}
    </Box>
  );
}

function ImgFill({ src, alt = "", fit = "contain" }) {
  return (
    <Box sx={{ width: "100%", height: "100%", minHeight: 0 }}>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: fit,          // 'contain' to show the full image
          objectPosition: "center",
          transition: "transform .25s ease",
        }}
      />
    </Box>
  );
}

/* ---------- Component ---------- */
export default function ServiceOverview({
  serviceId,
  registry = OVERVIEW_HTML, // you can still override via prop if needed
}) {
  const cfg = registry?.[serviceId] || registry?._default || {
    title: "Service Overview",
    leftHtml:
      "<h1>Service Overview</h1><p>Professional inspection, clear repair options, and quality workmanship.</p>",
    image: "/services/overview/default.jpg",
    imageAlt: "Technician inspecting a vehicle",
  };

  // Normalize images: supports cfg.images array OR legacy image/image2 props.
  const images = useMemo(() => {
    if (Array.isArray(cfg.images) && cfg.images.length) {
      return cfg.images
        .filter(Boolean)
        .map((im) => ({ src: im.src, alt: im.alt ?? "" }))
        .slice(0, 2);
    }
    const arr = [];
    if (cfg.image) arr.push({ src: cfg.image, alt: cfg.imageAlt || "" });
    if (cfg.image2) arr.push({ src: cfg.image2, alt: cfg.imageAlt2 || "" });
    return arr.slice(0, 2);
  }, [cfg]);

  const data = useMemo(
    () => ({
      title: cfg.title,
      leftHtml: cfg.leftHtml || "",
      rightHtml: cfg.rightHtml || "",
      images, // normalized list (0–2)
    }),
    [cfg, images]
  );

  return (
    <Section>
      <Container maxWidth="xl">
        <ContentGrid>
          {/* 60%: LEFT – your HTML blob */}
          <Box>
            {data.title && !data.leftHtml?.includes("<h1") && (
              <Box sx={{ mb: 1 }}>
                <HtmlBox html={`<h1>${data.title}</h1>`} />
              </Box>
            )}
            <HtmlBox html={data.leftHtml} />
          </Box>

          {/* 40%: RIGHT – either HTML blob or images (supports two) */}
          <Box
            sx={{
              borderRadius: 2,
              overflow: "hidden",
              backgroundColor: alpha("#000", 0.35),
              display: "grid",
              height: "100%",          // equal height with left column
              minHeight: 0,
              gridTemplateRows:
                data.rightHtml || data.images.length < 2 ? "1fr" : "1fr 1fr",
              gap: 0,
            }}
          >
            {data.rightHtml ? (
              <Box sx={{ width: "100%", height: "100%", overflow: "auto", p: 2 }}>
                <HtmlBox html={data.rightHtml} />
              </Box>
            ) : data.images.length === 0 ? null : data.images.length === 1 ? (
              <ImgFrame>
                <ImgFill {...data.images[0]} fit="contain" />
              </ImgFrame>
            ) : (
              <>
                <ImgFrame>
                  <ImgFill {...data.images[0]} fit="contain" />
                </ImgFrame>
                <ImgFrame>
                  <ImgFill {...data.images[1]} fit="contain" />
                </ImgFrame>
              </>
            )}
          </Box>
        </ContentGrid>
      </Container>
    </Section>
  );
}
