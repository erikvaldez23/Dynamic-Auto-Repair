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
  Tooltip,
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
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import { Link as RouterLink, useLocation } from "react-router-dom";

/* ----------------------------- Brand Tokens ----------------------------- */
const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

/* ------------------------------- Styled UI ------------------------------ */
/** Starts transparent; on scroll (.elevated) we set CSS vars for blur + strokes */
const GlassBar = styled(AppBar)(({ theme }) => ({
  position: "sticky",
  top: 0,
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

  "&.elevated": {
    "--bg": alpha(theme.palette.mode === "dark" ? "#0b0c0e" : "#f9f9fb", 0.18),
    "--stroke": alpha(
      theme.palette.common.white,
      theme.palette.mode === "dark" ? 0.08 : 0.18
    ),
    "--rad1": 0.06,
    "--rad2": 0.04,
    backdropFilter: "saturate(140%) blur(10px)",
    WebkitBackdropFilter: "saturate(140%) blur(10px)",
  },
}));

const BarSurface = styled(Box)(() => ({
  background: `
    linear-gradient(180deg, var(--bg), transparent 140%),
    radial-gradient(90% 140% at 8% -40%, rgba(255,255,255,var(--rad1)) 0%, transparent 60%),
    radial-gradient(70% 120% at 92% -40%, rgba(255,255,255,var(--rad2)) 0%, transparent 60%)
  `,
}));

const LogoBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 180,
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

/* Icon-only call */
const PhoneLinkIcon = styled(IconButton)(() => ({
  color: ACCENT,
  padding: 8,
  "&:hover": {
    color: ACCENT_HOVER,
    backgroundColor: "transparent",
  },
  "&:focusVisible": {
    backgroundColor: "transparent",
  },
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
  { label: "Free Repair Estimates", to: "/services/free-repair-estimates" },
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
const HOURS = "M–F 8:30a–6p • Sat 8:30a–4p";

/* ------------------------------- Component ------------------------------- */
export default function TopbarModern() {
  const theme = useTheme();
  const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const [open, setOpen] = React.useState(false);
  const { pathname } = useLocation();
  const elevate = useScrollTrigger({ disableHysteresis: true, threshold: 4 });

  // --- Services hover menu state/logic (matches your hover dropdown pattern) ---
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
    // small delay prevents flicker when moving from trigger to menu
    hoverCloseTimer.current = setTimeout(() => {
      setServicesAnchorEl(null);
    }, 120);
  };

  const cancelQueuedClose = () => {
    if (hoverCloseTimer.current) {
      clearTimeout(hoverCloseTimer.current);
      hoverCloseTimer.current = null;
    }
  };

  return (
    <GlassBar elevation={elevate ? 2 : 0} className={elevate ? "elevated" : ""}>
      <BarSurface>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              minHeight: 72,
              position: "relative",
            }}
          >
            {/* Left: Logo */}
            <LogoBox component={RouterLink} to="/">
              <Box
                component="img"
                src="/logo.png"
                alt="Dynamic Auto Repair"
                sx={{ height: 50, width: "auto", display: { xs: "none", sm: "block" } }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 900,
                  color: alpha("#fff", 0.98),
                  display: { xs: "block", sm: "none" },
                }}
              >
                Dynamic Auto
              </Typography>
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
                <Stack direction="row" spacing={1.5} alignItems="center">
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

                    // --- Services trigger with hover behavior + caret icon ---
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
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
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
                              border: `1px solid ${
                                theme.palette.mode === "dark"
                                  ? alpha("#fff", 0.08)
                                  : alpha("#000", 0.08)
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

            {/* Right: Hours + Call icon */}
            {isMdUp ? (
              <Stack direction="row" spacing={1.5} alignItems="center" sx={{ ml: "auto" }}>
                <Tooltip title="Business Hours">
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ color: alpha("#fff", 0.9) }}
                  >
                    <AccessTimeRoundedIcon fontSize="small" sx={{ opacity: 0.9 }} />
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      {HOURS}
                    </Typography>
                  </Stack>
                </Tooltip>
                <Divider orientation="vertical" flexItem sx={{ mx: 1, opacity: 0.12 }} />
                <PhoneLinkIcon
                  href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
                  aria-label={`Call ${PHONE}`}
                  disableRipple
                >
                  <CallIcon />
                </PhoneLinkIcon>
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

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: {
            width: "86vw",
            maxWidth: 360,
            background:
              theme.palette.mode === "dark"
                ? "linear-gradient(180deg,#141619, #0e0f11)"
                : "linear-gradient(180deg,#ffffff, #f6f7f9)",
            color: theme.palette.text.primary,
            borderLeft: `1px solid ${alpha("#000", 0.12)}`,
          },
        }}
      >
        <Box sx={{ p: 1.5, display: "flex", justifyContent: "flex-end" }}>
          <IconButton aria-label="Close menu" onClick={() => setOpen(false)}>
            <CloseRoundedIcon />
          </IconButton>
        </Box>

        <Box sx={{ px: 2, pb: 2 }}>
          <List sx={{ py: 0 }}>
            {NAV.map((item) => (
              <ListItem key={item.to} disablePadding>
                <ListItemButton
                  component={RouterLink}
                  to={item.to}
                  onClick={() => setOpen(false)}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontWeight: 800 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ my: 2 }} />

          <Stack spacing={1.25}>
            <Stack direction="row" spacing={1} alignItems="center">
              <AccessTimeRoundedIcon fontSize="small" />
              <Typography variant="body2" fontWeight={700}>
                {HOURS}
              </Typography>
            </Stack>
            <PhoneCTA
              fullWidth
              startIcon={<CallIcon />}
              href={`tel:${PHONE.replace(/[^0-9]/g, "")}`}
            >
              {PHONE}
            </PhoneCTA>
          </Stack>
        </Box>
      </Drawer>
    </GlassBar>
  );
}
