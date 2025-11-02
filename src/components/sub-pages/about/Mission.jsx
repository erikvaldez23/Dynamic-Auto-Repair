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
import EmojiEventsRoundedIcon from "@mui/icons-material/EmojiEventsRounded";
import BoltRoundedIcon from "@mui/icons-material/BoltRounded";
import FavoriteRoundedIcon from "@mui/icons-material/FavoriteRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";

/* ------------------------------- Tokens -------------------------------- */
const ACCENT = "#f2c230"; // yellow

/* ------------------------------ Animations ------------------------------ */
const float = keyframes`
  0% { transform: translateY(0px) }
  50% { transform: translateY(-6px) }
  100% { transform: translateY(0px) }
`;
const shimmer = keyframes`
  0% { opacity: .25; transform: translateX(-20%) }
  100% { opacity: .25; transform: translateX(120%) }
`;

/* ------------------------------ Styled UI ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  paddingBlock: theme.spacing(10),
  overflow: "hidden",
  isolation: "isolate",
}));

const AngledDivider = styled("div")(({ theme }) => ({
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
  "&::before": {
    content: '""',
    position: "absolute",
    left: "50%",
    top: 0,
    height: "100%",
    width: 2,
    transform: "skewY(-6deg)",
    backgroundImage: `linear-gradient(${ACCENT}, ${alpha(ACCENT, 0.2)})`,
    borderRadius: 2,
    opacity: 0.9,
    [theme.breakpoints.down("md")]: { display: "none" },
  },
  "&::after": {
    content: '""',
    position: "absolute",
    left: "50%",
    top: 0,
    height: "100%",
    width: 80,
    transform: "skewY(-6deg) translateX(-40px)",
    background: `linear-gradient(90deg, transparent, ${alpha("#fff", 0.08)}, transparent)`,
    filter: "blur(8px)",
    animation: `${shimmer} 4.5s ease-in-out infinite`,
    [theme.breakpoints.down("md")]: { display: "none" },
  },
}));

const GridWrap = styled(Box)(({ theme }) => ({
  position: "relative",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: theme.spacing(6),
  alignItems: "stretch", // <-- ensures equal column stretch
  [theme.breakpoints.down("md")]: {
    gridTemplateColumns: "1fr",
    gap: theme.spacing(4),
  },
}));

const GlassCard = styled(Box)(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(4.5),
  borderRadius: 24,
  background: "rgba(255,255,255,0.06)",
  backdropFilter: "blur(14px)",
  WebkitBackdropFilter: "blur(14px)",
  border: "1px solid rgba(255,255,255,0.18)",
  color: alpha("#fff", 0.95),
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
  overflow: "hidden",
  transition: "transform .4s ease, box-shadow .4s ease, background .4s ease",
  display: "flex",                // <-- flex column
  flexDirection: "column",        // <--
  height: "100%",                 // <-- stretch to equal height
  minHeight: 420,                 // <-- consistent baseline (tweak as needed)
  "&:hover": {
    transform: "translateY(-6px)",
    boxShadow: "0 16px 40px rgba(0,0,0,0.45)",
    background: "rgba(255,255,255,0.075)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    inset: -2,
    borderRadius: 26,
    padding: 2,
    background: `linear-gradient(135deg, ${alpha(ACCENT, 0.6)}, transparent 35%, transparent 65%, ${alpha(
      ACCENT,
      0.35
    )})`,
    WebkitMask:
      "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
    WebkitMaskComposite: "xor",
    maskComposite: "exclude",
    opacity: 0.35,
  },
}));

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: -0.2,
  color: ACCENT,
  textAlign: "left",
  marginBottom: theme.spacing(1),
}));

const Sub = styled(Typography)(({ theme }) => ({
  color: alpha("#fff", 0.75),
  fontSize: 14,
  marginBottom: theme.spacing(2.5),
}));

const Para = styled(Typography)(({ theme }) => ({
  lineHeight: 1.8,
  fontSize: 16.5,
  color: alpha("#fff", 0.96),
}));

const TagRow = styled(Stack)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  flexWrap: "wrap",
  gap: theme.spacing(1),
}));

const Dot = styled("span")(({ theme }) => ({
  position: "absolute",
  width: 10,
  height: 10,
  borderRadius: "50%",
  background: ACCENT,
  opacity: 0.6,
  right: 22,
  top: 22,
  filter: "blur(0.5px)",
  animation: `${float} 5s ease-in-out infinite`,
}));

/* ----------------------------- Motion Variants ---------------------------- */
const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.18 } },
};
const item = {
  hidden: { opacity: 0, y: 20, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

/* ------------------------------- Component -------------------------------- */
export default function MissionVisionCreative({
  missionTitle = "Our Mission",
  missionText = `Our primary mission at Dynamic Auto Repair is to build a large customer base of happy and satisfied clients who are always happy to recommend our services to their friends and loved ones.`,
  visionTitle = "Our Vision",
  visionText = `The vision of our auto repair service is to grow and establish ourselves as one of the leading auto repair services in Texas and its environs.`,
  missionSubtitle = "Service with integrity • Quality without compromise",
  visionSubtitle = "Relentless improvement • Community-first excellence",
  missionHighlights = ["Honesty", "Precision", "On-time", "Transparent Pricing"],
  visionHighlights = ["Growth", "Innovation", "Community", "Leadership"],
}) {
  const isMobile = useMediaQuery("(max-width: 900px)");

  const iconStyle = { fontSize: 26, color: ACCENT, mr: 1 };
  const chipsColor = alpha("#fff", 0.14);
  const chipText = alpha("#fff", 0.9);

  /** Helper: reusable footer row */
  const Footer = ({ icon, text }) => (
    <Stack direction="row" alignItems="center" spacing={1}>
      {icon}
      <Typography variant="body2" sx={{ color: alpha("#fff", 0.8) }}>
        {text}
      </Typography>
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
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography
            variant={isMobile ? "h4" : "h3"}
            sx={{ color: "#fff", fontWeight: 800, letterSpacing: -0.3 }}
          >
            What Drives Us
          </Typography>
          <Typography variant="body1" sx={{ color: alpha("#fff", 0.78), mt: 1.2 }}>
            The promises we keep today shape the road we lead tomorrow.
          </Typography>
        </Box>

        <GridWrap>
          <AngledDivider />

          {/* ------------------------------ Mission ------------------------------ */}
          <GlassCard component={motion.div} variants={item}>
            <Dot />

            {/* CONTENT AREA (grows) */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              <Stack spacing={1.2} sx={{ mb: 0.5 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <BoltRoundedIcon sx={iconStyle} />
                  <Title variant="h4">{missionTitle}</Title>
                </Stack>
                <Sub>{missionSubtitle}</Sub>
              </Stack>

              <Stack spacing={2.2} sx={{ flex: 1, minHeight: 0 }}>
                {missionText.split("\n\n").map((p, i) => (
                  <Para key={i}>{p}</Para>
                ))}
              </Stack>

              <TagRow direction="row">
                {missionHighlights.map((t, i) => (
                  <Chip
                    key={t + i}
                    label={t}
                    variant="outlined"
                    sx={{
                      borderColor: alpha(ACCENT, 0.45),
                      background: chipsColor,
                      color: chipText,
                      fontWeight: 600,
                      letterSpacing: 0.2,
                      "& .MuiChip-label": { px: 1.2, py: 0.25 },
                    }}
                  />
                ))}
              </TagRow>
            </Box>

            {/* FOOTER (pinned at bottom) */}
            <Box sx={{ mt: "auto" }}>
              <Divider sx={{ my: 2.5, borderColor: alpha("#fff", 0.08) }} />
              <Footer
                icon={<EmojiEventsRoundedIcon sx={{ ...iconStyle, fontSize: 22, mr: 1 }} />}
                text="Consistency earns trust—trust earns referrals."
              />
            </Box>
          </GlassCard>

          {/* ------------------------------ Vision ------------------------------ */}
          <GlassCard component={motion.div} variants={item}>
            <Dot />

            {/* CONTENT AREA (grows) */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2, flex: 1 }}>
              <Stack spacing={1.2} sx={{ mb: 0.5 }}>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <AutoAwesomeRoundedIcon sx={iconStyle} />
                  <Title variant="h4">{visionTitle}</Title>
                </Stack>
                <Sub>{visionSubtitle}</Sub>
              </Stack>

              <Stack spacing={2.2} sx={{ flex: 1, minHeight: 0 }}>
                {visionText.split("\n\n").map((p, i) => (
                  <Para key={i}>{p}</Para>
                ))}
              </Stack>

              <TagRow direction="row">
                {visionHighlights.map((t, i) => (
                  <Chip
                    key={t + i}
                    label={t}
                    variant="outlined"
                    sx={{
                      borderColor: alpha(ACCENT, 0.45),
                      background: chipsColor,
                      color: chipText,
                      fontWeight: 600,
                      letterSpacing: 0.2,
                      "& .MuiChip-label": { px: 1.2, py: 0.25 },
                    }}
                  />
                ))}
              </TagRow>
            </Box>

            {/* FOOTER (pinned at bottom) */}
            <Box sx={{ mt: "auto" }}>
              <Divider sx={{ my: 2.5, borderColor: alpha("#fff", 0.08) }} />
              <Footer
                icon={<FavoriteRoundedIcon sx={{ ...iconStyle, fontSize: 22, mr: 1 }} />}
                text="Build a shop people love—inside and out."
              />
            </Box>
          </GlassCard>
        </GridWrap>
      </Container>
    </Section>
  );
}
