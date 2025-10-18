// src/components/contact/ContactSplit.jsx
import React from "react";
import {
  Box,
  Container,
  Typography,
  Stack,
  Button,
  Divider,
  Link as MuiLink,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

import ContactHero from "../sub-pages/contact/ContactHero";

const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

/* ------------------------------- Styled UI ------------------------------ */
const Section = styled(Box)(({ theme }) => ({
  position: "relative",
  width: "100%",
  color: alpha("#fff", 0.95),
  paddingBlock: theme.spacing(10),
  overflow: "hidden",
  isolation: "isolate",
}));

const GridWrap = styled("div")(({ theme }) => ({
  display: "grid",
  gap: theme.spacing(4),
  gridTemplateColumns: "1fr",
  // ✅ equal heights on desktop by letting items stretch to the row height
  alignItems: "stretch",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr", // 50 / 50
    gap: theme.spacing(6),
  },
}));

const Card = styled(Box)(({ theme }) => ({
  width: "100%",
  // ✅ allow the card to fill the grid row height
  height: "100%",
  display: "flex",
  flexDirection: "column",
  borderRadius: 18,
  border: `1px solid ${alpha("#fff", 0.1)}`,
  background: `linear-gradient(180deg, ${alpha("#16181b", 0.78)}, ${alpha(
    "#0f1012",
    0.7
  )})`,
  boxShadow: `0 30px 70px ${alpha("#000", 0.45)}`,
  padding: theme.spacing(3),
}));

const Heading = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: 0.2,
  lineHeight: 1.05,
  fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)",
}));

const CTA = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 900,
  paddingInline: theme.spacing(2.6),
  paddingBlock: theme.spacing(1.2),
  borderRadius: 12,
  color: "#0e0f11",
  background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT_HOVER} 100%)`,
  boxShadow: `0 12px 28px ${alpha("#000", 0.35)}`,
  "&:hover": {
    background: `linear-gradient(180deg, ${ACCENT_HOVER} 0%, ${ACCENT} 100%)`,
    boxShadow: `0 16px 36px ${alpha("#000", 0.45)}`,
  },
}));

const GhostBtn = styled(Button)(({ theme }) => ({
  textTransform: "none",
  fontWeight: 800,
  borderRadius: 12,
  color: alpha("#fff", 0.95),
  border: `1px solid ${alpha("#fff", 0.35)}`,
  backgroundColor: "transparent",
  "&:hover": {
    borderColor: alpha("#fff", 0.6),
    backgroundColor: alpha("#fff", 0.06),
  },
}));

const InfoRow = ({ icon, title, children }) => (
  <Stack direction="row" spacing={2} alignItems="flex-start">
    <Box
      sx={{
        width: 42,
        height: 42,
        borderRadius: 2,
        display: "grid",
        placeItems: "center",
        background: alpha("#fff", 0.06),
        border: `1px solid ${alpha("#fff", 0.18)}`,
        flex: "0 0 auto",
      }}
    >
      {icon}
    </Box>
    <Box sx={{ minWidth: 0 }}>
      <Typography
        variant="subtitle2"
        sx={{ opacity: 0.9, fontWeight: 800, letterSpacing: 0.2 }}
      >
        {title}
      </Typography>
      <Typography variant="body2" sx={{ opacity: 0.9, mt: 0.5 }}>
        {children}
      </Typography>
    </Box>
  </Stack>
);

const Frame = styled("iframe")(({ theme }) => ({
  display: "block",
  width: "100%",
  // ✅ let the iframe expand to fill the card on desktop, but keep sane minimums
  flex: 1,
  minHeight: 420,
  height: "100%",
  border: 0,
  background: "#fff",
  borderRadius: 12,
  [theme.breakpoints.down("md")]: {
    // stacked: keep a fixed comfortable height
    height: 520,
    flex: "unset",
  },
}));

/* -------------------------------- Component ----------------------------- */
export default function Contact({
  companyName = "Dynamic Auto Repair",
  blurb = "We’re a full-service auto repair facility focused on transparency, quality parts, and repairs done right the first time.",
  phone = "+1 (469) 969-0043",
  phoneHref = "tel:+14699690043",
  email = "service@dynamicautorepair.com",
  emailHref = "mailto:service@dynamicautorepair.com",
  address = "1234 Service Lane, Plano, TX 75024",
  mapsHref = "https://maps.google.com/?q=Dynamic+Auto+Repair+Plano",
  hours = [
    { d: "Mon–Fri", h: "8:00 AM – 6:00 PM" },
    { d: "Saturday", h: "9:00 AM – 3:00 PM" },
    { d: "Sunday", h: "Closed" },
  ],
  iframeSrc = "https://app.tintwiz.com/web/ce/mm78aa3rvkulrmu65oesvsa63ywubpq3",
}) {
  const theme = useTheme();
  const upMd = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <>
      <ContactHero />

      <Section>
        <Container maxWidth="lg">
          <GridWrap>
            {/* Left: Company Info */}
            <Card>
              {/* Make the inner stack take available height, so buttons sit nicely at the end if needed */}
              <Stack spacing={2} sx={{ flex: 1 }}>
                <Heading variant="h2">{companyName}</Heading>
                <Typography
                  variant="body1"
                  sx={{ opacity: 0.9, maxWidth: 720 }}
                >
                  {blurb}
                </Typography>

                <Divider sx={{ my: 2, borderColor: alpha("#fff", 0.08) }} />

                <Stack spacing={2.25}>
                  <InfoRow icon={<CallRoundedIcon />} title="Phone">
                    <MuiLink href={phoneHref} color="inherit" underline="hover">
                      {phone}
                    </MuiLink>
                  </InfoRow>

                  <InfoRow icon={<MailRoundedIcon />} title="Email">
                    <MuiLink href={emailHref} color="inherit" underline="hover">
                      {email}
                    </MuiLink>
                  </InfoRow>

                  <InfoRow icon={<RoomRoundedIcon />} title="Address">
                    <MuiLink
                      href={mapsHref}
                      target="_blank"
                      rel="noreferrer"
                      color="inherit"
                      underline="hover"
                    >
                      {address}
                    </MuiLink>
                  </InfoRow>

                  <InfoRow icon={<ScheduleRoundedIcon />} title="Hours">
                    <Stack spacing={0.25}>
                      {hours.map((r, i) => (
                        <Typography
                          key={i}
                          variant="body2"
                          sx={{ opacity: 0.9 }}
                        >
                          <strong style={{ opacity: 0.95 }}>{r.d}:</strong>{" "}
                          {r.h}
                        </Typography>
                      ))}
                    </Stack>
                  </InfoRow>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1.25}
                  sx={{ mt: "auto", width: "100%" }} // full row width
                >
                  <CTA
                    size="large"
                    startIcon={<CallRoundedIcon />}
                    href={phoneHref}
                    fullWidth
                    sx={{
                      flex: "1 1 0", // equal width
                      minWidth: 0, // allow shrinking if needed
                      justifyContent: "center",
                      px: 2.6,
                      py: 1.2,
                    }}
                  >
                    Call Now
                  </CTA>

                  <GhostBtn
                    size="large"
                    endIcon={<ArrowForwardRoundedIcon />}
                    href={mapsHref}
                    target="_blank"
                    rel="noreferrer"
                    fullWidth
                    sx={{
                      flex: "1 1 0", // equal width
                      minWidth: 0,
                      justifyContent: "center",
                      px: 2.6,
                      py: 1.2,
                    }}
                  >
                    Get Directions
                  </GhostBtn>
                </Stack>
              </Stack>
            </Card>

            {/* Right: Contact / Booking Form */}
            <Card sx={{ p: { xs: 2, md: 3 } }}>
              <Typography variant="h5" sx={{ fontWeight: 900, mb: 2 }}>
                Book an Appointment
              </Typography>
              <Frame
                title="Booking form"
                src={iframeSrc}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </Card>
          </GridWrap>
        </Container>
      </Section>
    </>
  );
}
