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
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";
import ScheduleRoundedIcon from "@mui/icons-material/ScheduleRounded";
import MailRoundedIcon from "@mui/icons-material/MailRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ContactForm from "./ContactForm";

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
  alignItems: "stretch",
  [theme.breakpoints.up("md")]: {
    gridTemplateColumns: "1fr 1fr",
    gap: theme.spacing(6),
  },
}));

const Card = styled(Box)(({ theme }) => ({
  width: "100%",
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
  [theme.breakpoints.down("sm")]: {
    padding: theme.spacing(2.5),
  },
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
  fontWeight: 900,
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

/* Map container */
const MapWrap = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(2.5),
  borderRadius: 12,
  overflow: "hidden",
  border: `1px solid ${alpha("#fff", 0.08)}`,
  boxShadow: `0 10px 28px ${alpha("#000", 0.35)}`,
}));

const MapFrame = styled("iframe")(({ theme }) => ({
  display: "block",
  width: "100%",
  height: 220,
  border: 0,
  [theme.breakpoints.up("sm")]: { height: 260 },
  [theme.breakpoints.up("md")]: { height: 270 },
}));

/* -------------------------------- Component ----------------------------- */
export default function Contact({
  companyName = "Dynamic Auto Repair",
  blurb = "Need  an expert? You are more than welcome to leave your contact info and we will be in touch shortly.",
  phone = "+1 (469) 969-0043",
  phoneHref = "tel:+14699690043",
  email = "ryan@dynamicautorepair.com",
  emailHref = "mailto:service@dynamicautorepair.com",
  address = "2518 W. Kingsley RD #113, Garland, TX 75041",
  mapsHref = "https://maps.google.com/?q=Dynamic+Auto+Repair+Plano",
  hours = [
    { d: "Mon–Fri", h: "8:00 AM – 6:00 PM" },
    { d: "Saturday", h: "9:00 AM – 3:00 PM" },
    { d: "Sunday", h: "Closed" },
  ],
  mapEmbedSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3347.889217980437!2d-96.7009056!3d32.8879152!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864c1fd6f9c3b2c1%3A0x0000000000000000!2s2518%20W%20Kingsley%20Rd%20%23113%2C%20Garland%2C%20TX%2075041!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
}) {
  return (
    <Section>
      <Container maxWidth="xl">
        <GridWrap>
          {/* Company Info + Map (second on mobile) */}
          <Card
            sx={{
              order: { xs: 2, md: 1 },
            }}
          >
            <Stack spacing={2}>
              <Heading variant="h2">{companyName}</Heading>

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
                      <Typography key={i} variant="body2" sx={{ opacity: 0.9 }}>
                        <strong style={{ opacity: 0.95 }}>{r.d}:</strong> {r.h}
                      </Typography>
                    ))}
                  </Stack>
                </InfoRow>
              </Stack>

              {/* Buttons: stacked on mobile, side-by-side on desktop */}
              <Stack
                direction={{ xs: "column", md: "row" }}
                spacing={1.25}
                sx={{ mt: 2, width: "100%" }}
              >
                <CTA
                  size="large"
                  startIcon={<CallRoundedIcon />}
                  href={phoneHref}
                  fullWidth
                  sx={{
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
                    justifyContent: "center",
                    px: 2.6,
                    py: 1.2,
                  }}
                >
                  Get Directions
                </GhostBtn>
              </Stack>

              <MapWrap>
                <MapFrame
                  title="Map"
                  src={mapEmbedSrc}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </MapWrap>
            </Stack>
          </Card>

          {/* Lead Form (first on mobile) */}
          <Card
            sx={{
              order: { xs: 1, md: 2 },
            }}
          >
            <ContactForm />
          </Card>
        </GridWrap>
      </Container>
    </Section>
  );
}
