// src/components/about/AboutMissionVision.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Chip,
  Divider,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import { motion } from "framer-motion";
import SparklesRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import VerifiedRoundedIcon from "@mui/icons-material/VerifiedRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";

/* -------------------------------- Tokens -------------------------------- */
const ACCENT = "#f2c230";               // brand gold
const GLASS_BG = "rgba(255,255,255,.04)";

/* ------------------------------ Animations ------------------------------ */
const float = keyframes`
  0% { transform: translateY(0) }
  50% { transform: translateY(-6px) }
  100% { transform: translateY(0) }
`;
const sweep = keyframes`
  0% { transform: translateX(-40%); opacity:.0 }
  15% { opacity:.15 }
  85% { opacity:.15 }
  100% { transform: translateX(140%); opacity:.0 }
`;

/* ------------------------------ Styled UI ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingBlock: theme.spacing(5),
  isolation: "isolate",
  color: alpha("#fff", 0.96),
  overflow: "hidden",
}));

const HeadWrap = styled(Box)(({ theme }) => ({
  textAlign: "center",
  marginBottom: theme.spacing(8),
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: -0.3,
  lineHeight: 1.03,
  fontSize: "clamp(2rem, 4vw, 3rem)",
  background: `#fff`,
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
}));

const Eyebrow = styled(Typography)(({ theme }) => ({
  textTransform: "uppercase",
  letterSpacing: ".22em",
  fontWeight: 800,
  color: alpha("#fff", 0.66),
  marginBottom: theme.spacing(1),
}));

const GridWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  alignItems: "stretch",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(6),
  },
}));

const GlassCard = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  borderRadius: 24,
  padding: theme.spacing(4.5),
  background: GLASS_BG,
  border: `1px solid ${alpha("#fff", 0.12)}`,
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  boxShadow: "0 26px 70px rgba(0,0,0,.45)",
  overflow: "hidden",
  transition: "transform .35s ease, box-shadow .35s ease, background .35s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0 34px 90px rgba(0,0,0,.5)",
    background: "rgba(255,255,255,.06)",
  },
  "&::after": {
    /* gentle highlight sweep */
    content: '""',
    position: "absolute",
    top: 0, bottom: 0, left: 0, width: 90,
    background: `linear-gradient(90deg, transparent, ${alpha("#fff", .08)}, transparent)`,
    transform: "translateX(-40%)",
    animation: `${sweep} 6.5s ease-in-out infinite`,
  },
}));

const CardHead = styled(Stack)(({ theme }) => ({
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const CardTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  color: "#fff",
  letterSpacing: -0.2,
}));

const Sub = styled(Typography)(({ theme }) => ({
  color: alpha("#fff", 0.72),
  fontSize: 14,
}));

const Para = styled(Typography)(({ theme }) => ({
  lineHeight: 1.85,
  fontSize: 16.5,
  color: alpha("#fff", 0.96),
}));

/* ✅ Responsive highlights grid: 1 column on mobile, 2 on md+ */
const TagGrid = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  display: "grid",
  gridTemplateColumns: "1fr", // one column on mobile
  gap: theme.spacing(1.25),
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))", // two columns on md+
  },
}));

const Dot = styled("span")(({ theme }) => ({
  position: "absolute",
  right: 22,
  top: 22,
  width: 10, height: 10, borderRadius: "50%",
  background: ACCENT, opacity: .55, filter: "blur(.4px)",
  animation: `${float} 5.5s ease-in-out infinite`,
}));

/* ----------------------------- Motion Variants ---------------------------- */
const containerVariants = { hidden: {}, show: { transition: { staggerChildren: 0.16 } } };
const item = {
  hidden: { opacity: 0, y: 16, scale: 0.985 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
};

/* -------------------------------- Component -------------------------------- */
export default function MissionVisionCreative({
  missionTitle = "Our Mission",
  missionText = `At Dynamic Auto Repair, our mission is to deliver trusted, ASE-level auto repair in Dallas–Fort Worth with precision diagnostics, quality parts, and transparent pricing. We help drivers extend vehicle life with expert maintenance, same-day service on most jobs, and clear communication from first estimate to final hand-off.`,
  visionTitle = "Our Vision",
  visionText = `Our vision is to be the most recommended auto repair shop in Texas—known for honest advice, consistent workmanship, and a customer experience that feels premium. We’re building a modern service center that blends advanced technology with old-school reliability, so every visit is efficient, accurate, and stress-free.`,
  missionSubtitle = "Precision diagnostics • Honest service • Same-day convenience",
  visionSubtitle = "Innovation with integrity • Community-first excellence",
  missionHighlights = ["Brake & Tire Safety", "Factory-Scheduled Maintenance", "Computer Diagnostics", "Transparent Estimates"],
  visionHighlights = ["Continuous Training", "Premium Parts", "Warranty-Backed Work", "Five-Star Experience"],
}) {
  const isMobile = useMediaQuery("(max-width:900px)");
  const chipBg = alpha("#fff", 0.10);

  const Bullet = ({ icon, text }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      {icon}
      <Typography variant="body2" sx={{ color: alpha("#fff", 0.82) }}>{text}</Typography>
    </Stack>
  );

  return (
    <Section>
      <Container
        maxWidth="xl"
        component={motion.div}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <HeadWrap>
          <Eyebrow variant="overline">Dynamic Auto Repair</Eyebrow>
          <Title>Mission &amp; Vision</Title>
          <Typography variant="body1" sx={{ color: alpha("#fff", 0.78), mt: 1.25 }}>
            Premium car care, built on clarity and craft.
          </Typography>
        </HeadWrap>

        <GridWrap>
          {/* ------------------------------ Mission ------------------------------ */}
          <GlassCard component={motion.div} variants={item}>
            <Dot />
            <CardHead>
              <Stack direction="row" spacing={1} alignItems="center">
                <VerifiedRoundedIcon sx={{ fontSize: 26, color: ACCENT }} />
                <CardTitle variant={isMobile ? "h5" : "h4"}>{missionTitle}</CardTitle>
              </Stack>
              <Sub>{missionSubtitle}</Sub>
            </CardHead>

            <Stack spacing={2.2} sx={{ flex: 1, minHeight: 0 }}>
              {missionText.split("\n\n").map((p, i) => (
                <Para key={i}>{p}</Para>
              ))}
            </Stack>

            {/* ✅ Highlights: 1 col on mobile, 2 cols on md+ */}
            <TagGrid>
              {missionHighlights.map((t, i) => (
                <Chip
                  key={`m-${i}`}
                  label={t}
                  size="small"
                  sx={{
                    justifySelf: "stretch",
                    width: "100%",
                    background: chipBg,
                    color: "#fff",
                    border: `1px solid ${alpha("#fff", 0.16)}`,
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    "& .MuiChip-label": {
                      width: "100%",
                      textAlign: "center",
                      px: 1.2,
                      py: 0.6,
                      whiteSpace: "normal",
                    },
                  }}
                />
              ))}
            </TagGrid>

            <Divider sx={{ my: 2.5, borderColor: alpha("#fff", 0.08) }} />
            <Bullet
              icon={<SparklesRoundedIcon sx={{ fontSize: 22, color: ACCENT }} />}
              text="Accurate the first time—with diagnostics that save you time and cost."
            />
          </GlassCard>

          {/* ------------------------------ Vision ------------------------------ */}
          <GlassCard component={motion.div} variants={item}>
            <Dot />
            <CardHead>
              <Stack direction="row" spacing={1} alignItems="center">
                <TrendingUpRoundedIcon sx={{ fontSize: 26, color: ACCENT }} />
                <CardTitle variant={isMobile ? "h5" : "h4"}>{visionTitle}</CardTitle>
              </Stack>
              <Sub>{visionSubtitle}</Sub>
            </CardHead>

            <Stack spacing={2.2} sx={{ flex: 1, minHeight: 0 }}>
              {visionText.split("\n\n").map((p, i) => (
                <Para key={i}>{p}</Para>
              ))}
            </Stack>

            {/* ✅ Highlights: 1 col on mobile, 2 cols on md+ */}
            <TagGrid>
              {visionHighlights.map((t, i) => (
                <Chip
                  key={`v-${i}`}
                  label={t}
                  size="small"
                  sx={{
                    justifySelf: "stretch",
                    width: "100%",
                    background: chipBg,
                    color: "#fff",
                    border: `1px solid ${alpha("#fff", 0.16)}`,
                    fontWeight: 700,
                    letterSpacing: 0.2,
                    "& .MuiChip-label": {
                      width: "100%",
                      textAlign: "center",
                      px: 1.2,
                      py: 0.6,
                      whiteSpace: "normal",
                    },
                  }}
                />
              ))}
            </TagGrid>

            <Divider sx={{ my: 2.5, borderColor: alpha("#fff", 0.08) }} />
            <Bullet
              icon={<FavoriteRoundedIcon sx={{ fontSize: 22, color: ACCENT }} />}
              text="Service that feels premium—transparent, friendly, and consistent."
            />
          </GlassCard>
        </GridWrap>
      </Container>
    </Section>
  );
}
