// src/components/nav/TopbarModern.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Container,
  IconButton,
  Button,
  Stack,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useScrollTrigger,
  useTheme,
  useMediaQuery,
  Typography,
  Link as MuiLink,
  Menu,
  MenuItem,
  Grow,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import CallIcon from "@mui/icons-material/Call";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import { Link as RouterLink, useLocation } from "react-router-dom";

// (Optional) if you actually use this overlay elsewhere.
// import BusinessInfo from "../landing/business-info/BusinessInfo";

/* ----------------------------- Brand Tokens ----------------------------- */
const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";
const TOOLBAR_HEIGHT = 72;

/* Socials */
const INSTAGRAM_URL = "https://www.instagram.com/dynamic_repair/";
const FACEBOOK_URL = "https://www.facebook.com/Dynamicautorepairdfw/";

/* Assets */
const BASE_URL = (import.meta?.env?.BASE_URL ?? "/").replace(/\/+/g, "/");
const LOGO_FULL = `${BASE_URL}logo.png`;

/* ------------------------------- Styled UI ------------------------------ */
const GlassBar = styled(AppBar)(({ theme }) => ({
  position: "fixed",
  top: 0,
  zIndex: theme.zIndex.appBar + 2,
  background: "transparent",
  boxShadow: "none",

  "--bg": "transparent",
  "--stroke": "transparent",
  "--rad1": 0,
  "--rad2": 0,

  backdropFilter: "none",
  WebkitBackdropFilter: "none",
  transition:
    "backdrop-filter .25s ease, -webkit-backdrop-filter .25s ease, border-color .25s ease",

  "& .bar-surface": { background: "transparent", borderBottom: "none" },

  "&.elevated": {
    "--bg": alpha(theme.palette.mode === "dark" ? "#0b0c0e" : "#f9f9fb", 0.18),
    "--stroke": alpha(
      theme.palette.mode === "dark" ? "#fff" : "#000",
      theme.palette.mode === "dark" ? 0.08 : 0.12
    ),
    "--rad1": 0.06,
    "--rad2": 0.04,
    backdropFilter: "saturate(140%) blur(10px)",
    WebkitBackdropFilter: "saturate(140%) blur(10px)",
    "& .bar-surface": {
      background: `
        linear-gradient(180deg, var(--bg), transparent 140%),
        radial-gradient(90% 140% at 8% -40%, rgba(255,255,255,var(--rad1)) 0%, transparent 60%),
        radial-gradient(70% 120% at 92% -40%, rgba(255,255,255,var(--rad2)) 0%, transparent 60%)
      `,
      borderBottom: "1px solid var(--stroke)",
    },
  },
}));

const BarSurface = styled(Box)({});

const LogoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 140,
  textDecoration: "none",
}));

const NavLink = styled(MuiLink, {
  shouldForwardProp: (prop) => prop !== "active",
})(({ theme, active }) => ({
  position: "relative",
  fontWeight: 700,
  letterSpacing: 0.2,
  textDecoration: "none",
  fontSize: "1.5rem",
  color: alpha(theme.palette.common.white, 0.9),
  padding: "10px 12px",
  borderRadius: 10,
  transition: "color .18s ease, background-color .18s ease",
  whiteSpace: "nowrap",
  "&:hover": { color: "#fff", backgroundColor: alpha("#fff", 0.06) },
  ...(active && {
    color: "#fff",
    "&::after": {
      content: '""',
      position: "absolute",
      left: 10,
      right: 10,
      bottom: 6,
      height: 2,
      borderRadius: 2,
      background: `linear-gradient(90deg, ${ACCENT}, ${ACCENT_HOVER})`,
    },
  }),
}));

const PhoneLinkIcon = styled(IconButton)(() => ({
  color: "#fff",
  padding: 8,
  "&:hover": { color: ACCENT_HOVER, backgroundColor: "transparent" },
  "&:focusVisible": { backgroundColor: "transparent" },
}));

const SocialIcon = styled(IconButton)(({ theme }) => ({
  color: alpha("#fff", 0.9),
  padding: 8,
  "&:hover": { color: ACCENT_HOVER, backgroundColor: alpha("#fff", 0.06) },
}));

const PhoneCTA = styled(Button)(({ theme }) => ({
  fontWeight: 800,
  borderRadius: 12,
  textTransform: "none",
  paddingInline: 14,
  color: "#0e0f11",
  background: `linear-gradient(180deg, ${ACCENT} 0%, ${ACCENT_HOVER} 100%)`,
  boxShadow: `0 8px 24px ${alpha("#000", 0.32)}`,
  "&:hover": {
    background: `linear-gradient(180deg, ${ACCENT_HOVER} 0%, ${ACCENT} 100%)`,
    boxShadow: `0 10px 28px ${alpha("#000", 0.38)}`,
  },
}));

/* --------------------------------- Data --------------------------------- */
const NAV = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Services", to: "/services", hasHoverMenu: true },
  // { label: "Blogs", to: "/blogs" },  -- UNCOMMMENT THIS
  { label: "Gallery", to: "/gallery" },
  { label: "Contact", to: "/contact" },
];

const SERVICES_ITEMS = [
  { label: "AC & Heating", to: "/services/ac-heating" },
  { label: "Alignments", to: "/services/alignments" },
  { label: "Batteries / Alternators", to: "/services/batteries" },
  { label: "Brakes", to: "/services/brakes" },
  { label: "Computer Diagnostics", to: "/services/computer-diagnostics" },
  { label: "Check Engine Light", to: "/services/check-engine-light" },
  { label: "Cooling System", to: "/services/cooling-system" },
  { label: "Engine Service", to: "/services/engine-service" },
  { label: "Fleet Services", to: "/services/fleet-services" },
  { label: "Fuel System", to: "/services/fuel-system" },
  { label: "Multi-Point Inspection / Pre-Purchase Inspection", to: "/services/multi-point-inspection" },
  { label: "Oil & Filter Change", to: "/services/oil-change" },
  { label: "Scheduled Maintenance", to: "/services/scheduled-maintenance" },
  { label: "State Inspection", to: "/services/state-inspection" },
  { label: "Suspension & Steering", to: "/services/suspension-steering" },
  { label: "Tires", to: "/services/tires" },
  { label: "Tune-Ups", to: "/services/tune-ups" },
];

const PHONE = "469-969-0043";

/* ------------------------------- Component ------------------------------- */
export default function TopbarModern() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();

  // Keep bar transparent longer over the hero
  const elevate = useScrollTrigger({ disableHysteresis: true, threshold: 120 });

  // Services hover menu
  const [servicesAnchorEl, setServicesAnchorEl] = React.useState(null);
  const servicesOpen = Boolean(servicesAnchorEl);
  const hoverCloseTimer = React.useRef(null);

  const openServices = (event) => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
    setServicesAnchorEl(event.currentTarget);
  };

  const queueCloseServices = () => {
    hoverCloseTimer.current = setTimeout(() => setServicesAnchorEl(null), 120);
  };

  const cancelQueuedClose = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };

  return (
    <>
      {/* Fixed, transparent-before-scroll top bar */}
      <GlassBar
        color="transparent"
        elevation={elevate ? 2 : 0}
        className={elevate ? "elevated" : ""}
      >
        <BarSurface className="bar-surface">
          <Container maxWidth="xl">
            <Toolbar
              disableGutters
              sx={{ minHeight: { xs: 64, md: TOOLBAR_HEIGHT }, position: "relative" }}
            >
              {/* Left: Logo */}
              <LogoBox component={RouterLink} to="/" aria-label="Dynamic Auto Repair home">
                <Box
                  component="img"
                  src={LOGO_FULL}
                  alt="Dynamic Auto Repair"
                  sx={{ height: { xs: 36, md: 50 }, width: "auto" }}
                />
              </LogoBox>

              {/* Center: Navigation */}
              {isMdUp && (
                <Box
                  sx={{
                    position: "absolute",
                    left: "50%",
                    top: 0,
                    transform: "translateX(-50%)",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    {NAV.map((item) => {
                      if (!item.hasHoverMenu) {
                        return (
                          <NavLink
                            key={item.to}
                            component={RouterLink}
                            to={item.to}
                            active={pathname === item.to ? 1 : 0}
                            underline="none"
                          >
                            {item.label}
                          </NavLink>
                        );
                      }

                      return (
                        <Box
                          key={item.to}
                          onMouseEnter={openServices}
                          onMouseLeave={queueCloseServices}
                          sx={{ position: "relative", display: "flex", alignItems: "center" }}
                        >
                          <NavLink
                            component={RouterLink}
                            to={item.to}
                            active={pathname.startsWith("/services") ? 1 : 0}
                            underline="none"
                            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                          >
                            {item.label}
                            <ExpandMoreRoundedIcon
                              sx={{
                                ml: 0.25,
                                fontSize: 22,
                                opacity: 0.9,
                                transition: "transform .2s ease",
                                transform: servicesOpen ? "rotate(180deg)" : "none",
                              }}
                            />
                          </NavLink>

                          {/* Hover menu */}
                          <Menu
                            anchorEl={servicesAnchorEl}
                            open={servicesOpen}
                            onClose={queueCloseServices}
                            TransitionComponent={Grow}
                            MenuListProps={{
                              onMouseEnter: cancelQueuedClose,
                              onMouseLeave: queueCloseServices,
                              sx: { py: 1 },
                            }}
                            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                            transformOrigin={{ vertical: "top", horizontal: "left" }}
                            PaperProps={{
                              sx: {
                                mt: 1.2,
                                borderRadius: 2,
                                minWidth: 240,
                                background: "rgba(255,255,255,0.02)",
                                border: `1px solid ${theme.palette.mode === "dark" ? alpha("#fff", 0.08) : alpha("#000", 0.08)
                                  }`,
                                backdropFilter: "blur(16px)",
                                boxShadow:
                                  "0 24px 64px rgba(0,0,0,0.34), inset 0 1px 0 rgba(255,255,255,0.06)",
                                overflow: "hidden",
                              },
                            }}
                          >
                            {SERVICES_ITEMS.map((s) => (
                              <MenuItem
                                key={s.to}
                                component={RouterLink}
                                to={s.to}
                                onClick={() => setServicesAnchorEl(null)}
                                sx={{
                                  py: 1.2,
                                  px: 2,
                                  fontWeight: 600,
                                  letterSpacing: 0.2,
                                  color: "#fff",
                                  borderLeft: "3px solid transparent",
                                  transition: "all .18s ease",
                                  "&:hover": {
                                    backgroundColor: alpha(ACCENT, 0.08),
                                    borderLeftColor: ACCENT,
                                    transform: "translateX(6px)",
                                  },
                                }}
                              >
                                {s.label}
                              </MenuItem>
                            ))}
                          </Menu>
                        </Box>
                      );
                    })}
                  </Stack>
                </Box>
              )}

              {/* Right: Phone + Socials (desktop) / Hamburger (mobile) */}
              {isMdUp ? (
                <Stack direction="row" spacing={0.5} alignItems="center" sx={{ ml: "auto" }}>
                  <PhoneLinkIcon
                    href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                    aria-label={`Call ${PHONE}`}
                    disableRipple
                  >
                    <CallIcon />
                  </PhoneLinkIcon>
                  <SocialIcon
                    aria-label="Instagram"
                    component="a"
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <InstagramIcon />
                  </SocialIcon>
                  <SocialIcon
                    aria-label="Facebook"
                    component="a"
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FacebookIcon />
                  </SocialIcon>
                </Stack>
              ) : (
                <IconButton
                  aria-label="Open menu"
                  onClick={() => setOpen(true)}
                  sx={{ ml: "auto", color: "#fff", p: 1.25 }}
                >
                  <MenuRoundedIcon />
                </IconButton>
              )}
            </Toolbar>
          </Container>
        </BarSurface>
      </GlassBar>

      {/* (Optional) Space under the app bar for overlays, if you use one */}
      {/* <Box sx={{ position: "fixed", top: `${TOOLBAR_HEIGHT}px`, left: 0, right: 0, zIndex: (t) => t.zIndex.appBar + 1, px: 2 }} /> */}

      {/* Mobile Drawer (dark, glassy, aesthetic) */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        ModalProps={{
          keepMounted: true,
          BackdropProps: {
            sx: {
              backgroundColor: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(2px)",
            },
          },
        }}
        PaperProps={{
          sx: {
            width: "88vw",
            maxWidth: 380,
            // Dark, layered “glass” background
            background: `
              radial-gradient(120% 80% at 100% 0%, rgba(242,194,48,0.05) 0%, rgba(0,0,0,0.0) 60%),
              radial-gradient(90% 60% at -10% 110%, rgba(242,194,48,0.04) 0%, rgba(0,0,0,0.0) 60%),
              linear-gradient(180deg, #0c0d10 0%, #0a0b0d 60%, #090a0c 100%)
            `,
            color: "rgba(255,255,255,0.92)",
            borderLeft: `1px solid ${alpha("#fff", 0.06)}`,
            boxShadow: "0 24px 80px rgba(0,0,0,0.55)",
            backdropFilter: "blur(16px) saturate(140%)",
            WebkitBackdropFilter: "blur(16px) saturate(140%)",
            position: "relative",
            "&::before": {
              content: '""',
              position: "absolute",
              inset: 0,
              pointerEvents: "none",
              background:
                "radial-gradient(120% 70% at 50% -10%, rgba(255,255,255,0.04), rgba(0,0,0,0) 55%)",
            },
          },
        }}
      >
        {/* Header */}
        <Box
          sx={{
            px: 2,
            pt: 2,
            pb: 1.5,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            component={RouterLink}
            to="/"
            onClick={() => setOpen(false)}
            sx={{ display: "inline-flex", alignItems: "center", gap: 1.25, textDecoration: "none" }}
          >
            <Box component="img" src={LOGO_FULL} alt="Dynamic Auto Repair" sx={{ height: 34, width: "auto" }} />
          </Box>
          <IconButton
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            sx={{
              color: "#fff",
              borderRadius: 2,
              backgroundColor: alpha("#fff", 0.04),
              "&:hover": { backgroundColor: alpha("#fff", 0.08), color: ACCENT_HOVER },
            }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        {/* Divider with accent glow */}
        <Divider
          sx={{
            mx: 2,
            mb: 1.5,
            borderColor: alpha("#fff", 0.06),
            "&::after": {
              content: '""',
              display: "block",
              height: 2,
              borderRadius: 2,
              background: `linear-gradient(90deg, ${alpha(ACCENT, 0.35)}, transparent)`,
            },
          }}
        />

        {/* Nav list */}
        <Box sx={{ px: 2, pb: 2 }}>
          <List sx={{ py: 0, display: "grid", gap: 0.75 }}>
            {NAV.map((item) => {
              const active =
                pathname === item.to ||
                (item.to === "/services" && pathname.startsWith("/services"));
              return (
                <ListItem key={item.to} disablePadding>
                  <ListItemButton
                    component={RouterLink}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    sx={{
                      borderRadius: 2,
                      px: 1.5,
                      py: 1.25,
                      alignItems: "center",
                      transition:
                        "transform .16s ease, background-color .16s ease, border-color .16s ease",
                      backgroundColor: active ? alpha(ACCENT, 0.12) : "transparent",
                      border: `1px solid ${active ? alpha(ACCENT, 0.28) : alpha("#fff", 0.06)}`,
                      boxShadow: active ? `0 6px 18px ${alpha(ACCENT, 0.18)}` : "none",
                      "&:hover": {
                        backgroundColor: alpha("#fff", 0.06),
                        borderColor: alpha("#fff", 0.14),
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: 800,
                        letterSpacing: 0.2,
                        color: "#fff",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* Section divider */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 2.5,
              mb: 1,
              px: 0.5,
              color: alpha("#fff", 0.6),
              letterSpacing: 1.3,
              textTransform: "uppercase",
            }}
          >
            Connect
          </Typography>

          {/* Social + phone */}
          <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
            <SocialIcon
              aria-label="Instagram"
              component="a"
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ backgroundColor: alpha("#fff", 0.04) }}
            >
              <InstagramIcon />
            </SocialIcon>
            <SocialIcon
              aria-label="Facebook"
              component="a"
              href={FACEBOOK_URL}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ backgroundColor: alpha("#fff", 0.04) }}
            >
              <FacebookIcon />
            </SocialIcon>
          </Stack>

          {/* Sticky bottom CTA */}
          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              pt: 1.5,
              pb: "env(safe-area-inset-bottom)",
              background:
                "linear-gradient(180deg, rgba(12,13,16,0.0) 0%, rgba(12,13,16,0.85) 30%, rgba(12,13,16,1) 100%)",
            }}
          >
            <PhoneCTA
              fullWidth
              startIcon={<CallIcon />}
              href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
              sx={{
                py: 1.25,
                borderRadius: 2,
                boxShadow: `0 12px 36px ${alpha(ACCENT, 0.28)}`,
              }}
            >
              {PHONE}
            </PhoneCTA>
            <Typography
              variant="caption"
              sx={{ display: "block", mt: 1, textAlign: "center", color: alpha("#fff", 0.6) }}
            >
              Call now for availability & pricing
            </Typography>
          </Box>
        </Box>
      </Drawer>
    </>
  );
}
