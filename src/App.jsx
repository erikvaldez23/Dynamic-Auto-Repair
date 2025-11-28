import { HashRouter as Router, Routes, Route } from "react-router-dom";
import React, { useRef, useState } from "react";
import { createTheme, ThemeProvider, Box, Dialog, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

// Key Components
import Topbar from "./components/key-components/Topbar";
import Footer from "./components/key-components/Footer";
import Contact from "./components/key-components/Contact";
import ContactForm from "./components/key-components/ContactForm";

// Landing Page
import VideoHero from "./components/landing/VideoHero";
import Hero from "./components/landing/Hero";
import Services from "./components/landing/Services";
import ServicesStrip from "./components/landing/ServicesStrip";
import CTA from "./components/key-components/CTA";

// Sub Pages
import SubPages from "./components/sub-pages/SubPage";
import AboutPage from "./components/sub-pages/about/About"
import PrivacyPolicy from "./components/sub-pages/PrivacyPolicy";
import AllServices from "./components/sub-pages/services/AllServices";
import ContactPage from "./components/sub-pages/contact/ContactPage"
import Testimonials from "./components/landing/Testimonials";
import BlogPage from "./components/sub-pages/blogs/BlogPage";
import Gallery from "./components/sub-pages/Gallery";

const theme = createTheme({
  palette: {
    primary: { main: "#f2c230" },
  },
});

function App() {
  const contactRef = useRef(null);
  const [contactOpen, setContactOpen] = useState(false);

  const handleLearnMore = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCtaClick = () => {
    setContactOpen(true);
  };

  const handleCloseContact = () => {
    setContactOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          background: `
  radial-gradient(1200px 700px at 78% 22%, #ffffff12 0%, #ffffff00 60%),
  radial-gradient(900px 600px at 18% 82%, #ffffff0e 0%, #ffffff00 55%),
  linear-gradient(125deg, #ffffff14 0%, #ffffff00 36%, #ffffff12 68%, #ffffff08 100%),

  radial-gradient(900px 650px at 68% 28%, rgba(255,210,74,0.055) 0%, rgba(255,210,74,0.00) 55%),
  radial-gradient(700px 520px at 22% 78%, rgba(255,210,74,0.045) 0%, rgba(255,210,74,0.00) 60%),
  linear-gradient(100deg, rgba(255,210,74,0.035) 0%, rgba(255,210,74,0.00) 35%, rgba(255,210,74,0.05) 60%, rgba(255,210,74,0.00) 100%),

  radial-gradient(1100px 900px at 64% 40%, #282f38 0%, transparent 62%),
  radial-gradient(950px 820px at 30% 72%, #21262d 0%, transparent 60%),
  linear-gradient(180deg, #1a1d21 0%, #141619 100%)`,
        }}
      >
        <Router>
          <ScrollToTop />
          <Topbar />
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <VideoHero
                    onLearnMore={handleLearnMore}
                    onCtaClick={handleCtaClick}
                  />
                  <div ref={contactRef}>
                    <Contact />
                  </div>
                  <Testimonials />
                  {/* <Hero /> */}
                  <ServicesStrip />
                  <Services />
                  <CTA />
                </>
              }
            />
            <Route path="/services/:serviceId" element={<SubPages />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/services" element={<AllServices />} />
            <Route path="/blogs" element={<BlogPage />} />
            <Route path="/gallery" element={<Gallery />} />
          </Routes>
          <Footer />

          {/* Contact Modal */}
          <Dialog
            open={contactOpen}
            onClose={handleCloseContact}
            maxWidth="xl"
            fullWidth
            PaperProps={{
              sx: {
                bgcolor: "transparent",
                boxShadow: "none",
                backgroundImage: "none",
                m: 2,
              },
            }}
            slotProps={{
              backdrop: {
                sx: {
                  backdropFilter: "blur(8px)",
                  backgroundColor: "rgba(0,0,0,0.7)",
                },
              },
            }}
          >
            <Box sx={{ position: "relative" }}>
              <IconButton
                onClick={handleCloseContact}
                sx={{
                  position: "absolute",
                  right: 16,
                  top: 16,
                  zIndex: 999,
                  color: "white",
                  bgcolor: "rgba(0,0,0,0.5)",
                  "&:hover": { bgcolor: "rgba(0,0,0,0.7)" },
                }}
              >
                <CloseIcon />
              </IconButton>
              <ContactForm />
            </Box>
          </Dialog>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
