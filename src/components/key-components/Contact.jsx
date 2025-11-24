// src/components/contact/ContactSplit.jsx
import React, { useState, useEffect } from "react";
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

/* ------------------------- Form field styling -------------------------- */
const FieldLabel = styled(Typography)(({ theme }) => ({
  fontSize: 13,
  opacity: 0.9,
  marginBottom: 4,
}));

const Required = styled("span")(({ theme }) => ({
  opacity: 0.9,
}));

const BaseControl = {
  width: "100%",
  borderRadius: 10,
  border: `1px solid ${alpha("#fff", 0.16)}`,
  background:
    "linear-gradient(180deg, rgba(40,40,40,0.9), rgba(15,15,15,0.9))",
  color: "#fff",
  padding: "12px 14px",
  fontSize: 14,
  outline: "none",
  boxSizing: "border-box",
};

const TextInput = styled("input")(({ theme }) => ({
  ...BaseControl,
  "&::placeholder": {
    color: alpha("#fff", 0.55),
  },
  "&:focus": {
    borderColor: ACCENT,
    boxShadow: `0 0 0 1px ${alpha(ACCENT, 0.45)}`,
  },
}));

const SelectInput = styled("select")(({ theme }) => ({
  ...BaseControl,
  appearance: "none",
  "& option": {
    color: "#000",
  },
  "&:focus": {
    borderColor: ACCENT,
    boxShadow: `0 0 0 1px ${alpha(ACCENT, 0.45)}`,
  },
}));

const TextArea = styled("textarea")(({ theme }) => ({
  ...BaseControl,
  minHeight: 140,
  resize: "vertical",
  "&::placeholder": {
    color: alpha("#fff", 0.55),
  },
  "&:focus": {
    borderColor: ACCENT,
    boxShadow: `0 0 0 1px ${alpha(ACCENT, 0.45)}`,
  },
}));

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
  // Vehicle data state
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMake, setSelectedMake] = useState("");
  const [makes, setMakes] = useState([]);
  const [models, setModels] = useState([]);
  const [loadingMakes, setLoadingMakes] = useState(false);
  const [loadingModels, setLoadingModels] = useState(false);

  // Generate years (1981-2025) - NHTSA API supports vehicles from 1981 onwards
  const years = Array.from({ length: 85 }, (_, i) => 2025 - i);

  // Fetch makes when year is selected
  useEffect(() => {
    if (!selectedYear) {
      setMakes([]);
      setSelectedMake("");
      setModels([]);
      return;
    }

    const fetchMakes = async () => {
      setLoadingMakes(true);
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json` // using National Highway Traffic Safety Administration API
        );
        const data = await response.json();
        if (data.Results) {
          // Sort makes alphabetically
          const sortedMakes = data.Results.sort((a, b) =>
            a.MakeName.localeCompare(b.MakeName)
          );
          setMakes(sortedMakes);
        }
      } catch (error) {
        console.error("Error fetching makes:", error);
      } finally {
        setLoadingMakes(false);
      }
    };

    fetchMakes();
  }, [selectedYear]);

  // Fetch models when make is selected
  useEffect(() => {
    if (!selectedYear || !selectedMake) {
      setModels([]);
      return;
    }

    const fetchModels = async () => {
      setLoadingModels(true);
      try {
        const response = await fetch(
          `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMakeYear/make/${encodeURIComponent(
            selectedMake
          )}/modelyear/${selectedYear}?format=json`
        );
        const data = await response.json();
        if (data.Results) {
          // Sort models alphabetically
          const sortedModels = data.Results.sort((a, b) =>
            a.Model_Name.localeCompare(b.Model_Name)
          );
          setModels(sortedModels);
        }
      } catch (error) {
        console.error("Error fetching models:", error);
      } finally {
        setLoadingModels(false);
      }
    };

    fetchModels();
  }, [selectedYear, selectedMake]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire this up to your backend or lead capture service
    console.log("Lead form submitted");
  };

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
            <Stack spacing={2.5}>
              <Heading variant="h2">Get Your Free Auto Tint Quote!</Heading>

              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <Stack spacing={2.4}>
                  {/* Name */}
                  <Box>
                    <FieldLabel>
                      Your Name <Required>(required)</Required>
                    </FieldLabel>
                    <TextInput
                      required
                      name="name"
                      placeholder="Enter your full name"
                    />
                  </Box>

                  {/* Phone */}
                  <Box>
                    <FieldLabel>
                      Phone Number <Required>(required)</Required>
                    </FieldLabel>
                    <Box sx={{ position: "relative" }}>
                      <Box
                        sx={{
                          position: "absolute",
                          left: 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          pointerEvents: "none",
                          color: alpha("#fff", 0.7),
                        }}
                      >
                        <CallRoundedIcon fontSize="small" />
                      </Box>
                      <TextInput
                        required
                        name="phone"
                        placeholder="(555) 555-5555"
                        style={{ paddingLeft: 44 }}
                      />
                    </Box>
                  </Box>

                  {/* Vehicle Year */}
                  <Box>
                    <FieldLabel>
                      Vehicle Year <Required>(required)</Required>
                    </FieldLabel>
                    <SelectInput
                      name="vehicleYear"
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value);
                        setSelectedMake("");
                        setModels([]);
                      }}
                      required
                    >
                      <option value="" disabled>
                        Select Year
                      </option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </SelectInput>
                  </Box>

                  {/* Vehicle Make */}
                  <Box>
                    <FieldLabel>
                      Vehicle Make <Required>(required)</Required>
                    </FieldLabel>
                    <SelectInput
                      name="vehicleMake"
                      value={selectedMake}
                      onChange={(e) => setSelectedMake(e.target.value)}
                      disabled={!selectedYear || loadingMakes}
                      required
                    >
                      <option value="" disabled>
                        {loadingMakes
                          ? "Loading makes..."
                          : selectedYear
                            ? "Select Make"
                            : "Select year first"}
                      </option>
                      {makes.map((make) => (
                        <option key={make.MakeId} value={make.MakeName}>
                          {make.MakeName}
                        </option>
                      ))}
                    </SelectInput>
                  </Box>

                  {/* Vehicle Model */}
                  <Box>
                    <FieldLabel>
                      Vehicle Model <Required>(required)</Required>
                    </FieldLabel>
                    <SelectInput
                      name="vehicleModel"
                      disabled={!selectedMake || loadingModels}
                      required
                    >
                      <option value="" disabled selected>
                        {loadingModels
                          ? "Loading models..."
                          : selectedMake
                            ? "Select Model"
                            : "Select make first"}
                      </option>
                      {models.map((model) => (
                        <option key={model.Model_ID} value={model.Model_Name}>
                          {model.Model_Name}
                        </option>
                      ))}
                    </SelectInput>
                  </Box>

                  {/* Message */}
                  <Box>
                    <FieldLabel>Your Message</FieldLabel>
                    <TextArea
                      name="message"
                      placeholder="Tell us what services you’re interested in or any questions you have."
                    />
                  </Box>

                  {/* Submit */}
                  <Box sx={{ pt: 0.5 }}>
                    <CTA
                      type="submit"
                      size="large"
                      fullWidth
                      endIcon={<ArrowForwardRoundedIcon />}
                    >
                      Get My Auto Quote
                    </CTA>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Card>
        </GridWrap>
      </Container>
    </Section>
  );
}
