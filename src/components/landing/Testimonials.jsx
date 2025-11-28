// src/components/sections/Testimonials.jsx
import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Rating,
  Container,
  Button,
  useMediaQuery,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "framer-motion";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// Google Reviews URL and logo
const GOOGLE_REVIEWS_URL = "https://www.google.com/search?client=safari&sca_esv=6b9674ac0e0e23e6&rls=en&sxsrf=AE3TifNoSQ-b4ha-SeCy-xr2XKAiPwCdKQ:1764358851005&si=AMgyJEtREmoPL4P1I5IDCfuA8gybfVI2d5Uj7QMwYCZHKDZ-E_kofFru3REbk-tyaea_4QXwI_9kR8HkN2u0crGsYohvgmoWX0LoIjP0zTvayOhulymfQXFKQFbQqIbM25VJJtbjYPO36xEeDXmusQ5SmKZyiCjMPQ%3D%3D&q=Dynamic+Auto+Repair+Reviews&sa=X&ved=2ahUKEwj29sf0zJWRAxWRkmoFHUTHDtYQ0bkNegQIPxAE";
const GOOGLE_LOGO = "/google-logo.png";

// Fixed card heights
const CARD_H_MOBILE = 360;
const CARD_H_DESKTOP = 360;

// Gap between slides (mobile)
const SLIDE_GAP = 12; // px — tweak 12–16 for taste

const reviews = [
  {
    author_name: "Aya Chaaban",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 5,
    time: new Date().setDate(new Date().getDate() - 7) / 1000,
    text: `
    EXCEPTIONAL Service, Honest People, and Quality Work – Dynamic Auto Repair Sets the Standard!
    
    Don't even second guess and choose Dynamic auto for all your car needs! Dynamic Auto Repair has completely redefined what it means to trust a mechanic. From the moment you walk in, you’re treated like family—greeted warmly, given honest and transparent estimates, and never pressured into unnecessary repairs. The team’s integrity and professionalism are unmatched.

    I brought my vehicle in for diagnostics after hearing an unusual noise, and not only did they identify the issue quickly, they walked me through the repair process in a way that was easy to understand. No upselling. No guesswork. Just clear communication and expert workmanship.

    The quality of their work speaks for itself—my car is running smoother than it has in years. On top of that, they finished the job ahead of schedule and kept me updated the entire time. Clean facility, friendly staff, and fair prices.

    If you're looking for a reliable, experienced, and honest auto repair shop, Dynamic Auto Repair is the one. I wouldn’t take my car anywhere else!!!!!!!
    `,
  },
  {
    author_name: "Caroline Cortimilia",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 5,
    time: new Date().setDate(new Date().getDate() - 30) / 1000,
    text: "Me and my family have been going here for years. Ryan is the absolute best and will take care of you 100%. The most trustworthy place to take your car. And if you need your car tinted, do not hesitate to go here.",
  },
  {
    author_name: "Mina B.",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 5,
    time: new Date().setDate(new Date().getDate() - 21) / 1000,
    text: `So glad I found Dynamic! These guys are really passionate about cars. Busy as they are, Ryan takes the time to explain what's going on with your car. Their top notch service, friendly attitude and competitive prices keep me coming back. I would recommend making an appointment so they can give your car their full attention. Thanks Ryan, Cameron, Orlando and Jose... you guys rock!`,
  },
  {
    author_name: "Stephanie Berrier",
    profile_photo_url: "https://via.placeholder.com/40",
    rating: 5,
    time: new Date().setDate(new Date().getDate() - 60) / 1000,
    text: `I went there for a simple oil change and I was helped by Ryan and Jose, they were fast, helpful, and very welcoming. I will for sure make this my forever mechanic shop.`,
  },
];

/* ---------------- Card styles ---------------- */
// Base (no hover here)
const baseCardSX = {
  p: 3,
  borderRadius: 6,
  textAlign: "left",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  backgroundColor: "rgba(255,255,255,0.08)",
  backdropFilter: "blur(10px)",
  WebkitBackdropFilter: "blur(10px)",
  border: "1px solid rgba(255,255,255,0.18)",
  boxShadow: "0 10px 30px rgba(0,0,0,0.25)",
  color: alpha("#fff", 0.95),
  transition: "transform 0.3s, box-shadow 0.3s, background-color 0.3s",
};

// Desktop-only hover
const hoverDesktopSX = {
  "&:hover": {
    transform: "translateY(-8px) scale(1.02)",
    boxShadow: "0 14px 36px rgba(0,0,0,0.35)",
    backgroundColor: "rgba(255,255,255,0.10)",
  },
};

const secondaryText = alpha("#fff", 0.7);



const Testimonials = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Wider cards on mobile + no hover
  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    centerMode: true,
    centerPadding: isMobile ? "0px" : "8%", // let cards expand on mobile
    adaptiveHeight: false,
    appendDots: (dots) => (
      <Box sx={{ textAlign: "center", mt: 2 }}>
        <ul style={{ margin: "0px", padding: "0px" }}>{dots}</ul>
      </Box>
    ),
    customPaging: (i) => (
      <Box
        component="div"
        sx={{
          width: "10px",
          height: "10px",
          backgroundColor: "#888",
          borderRadius: "50%",
          display: "inline-block",
          margin: "0 5px",
          transition: "background-color 0.3s ease",
        }}
        className={`custom-dot-${i}`}
      />
    ),
  };

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.3 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <Box id="reviews" sx={{ py: isMobile ? 4 : 8, textAlign: "center", backgroundColor: "transparent" }}>
      <Container maxWidth="xl">
        {isMobile ? (
          <Box
            sx={{
              // add horizontal padding to each slide for visible gaps
              "& .slick-slide": { padding: `0 ${SLIDE_GAP}px` },
              // pull list edges back so width stays flush
              "& .slick-list": { margin: `0 -${SLIDE_GAP}px` },
            }}
          >
            <Slider {...sliderSettings}>
              {reviews.map((review, index) => (
                <Box key={index}>
                  <Card
                    sx={{
                      ...baseCardSX,
                      // no hover on mobile (do not spread hoverDesktopSX)
                      width: "92vw",
                      maxWidth: 560,
                      height: CARD_H_MOBILE,
                      margin: "0 auto",
                      mb: 2,
                    }}
                  >
                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                      }}
                    >
                      <Box sx={{ position: "absolute", top: 10, right: 10, width: 25, height: 25 }}>
                        <img src={GOOGLE_LOGO} alt="Google" width="100%" />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 2, flexShrink: 0 }}>
                        <Avatar
                          sx={{ width: 40, height: 40, mr: 2, border: "2px solid rgba(255,255,255,0.25)" }}
                          src={review.profile_photo_url}
                          alt={review.author_name}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "0.95rem", color: "#fff" }}>
                            {review.author_name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: secondaryText }}>
                            {new Date(review.time * 1000).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Rating value={review.rating} precision={0.5} readOnly sx={{ mb: 1, flexShrink: 0 }} />

                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha("#fff", 0.9),
                          fontStyle: "italic",
                          fontSize: "0.95rem",
                          lineHeight: 1.5,
                          overflowY: "auto",
                          pr: 1,
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "rgba(255,255,255,0.3)",
                            borderRadius: "4px",
                          },
                        }}
                      >
                        "{review.text}"
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              ))}
            </Slider>
          </Box>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: 3, // slightly larger desktop gap
                justifyContent: "center",
                alignItems: "stretch",
              }}
            >
              {reviews.map((review, index) => (
                <motion.div key={index} variants={cardVariants}>
                  <Card sx={{ ...baseCardSX, ...hoverDesktopSX, height: CARD_H_DESKTOP }}>
                    <CardContent
                      sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                      }}
                    >
                      <Box sx={{ position: "absolute", top: 10, right: 10, width: 25, height: 25 }}>
                        <img src={GOOGLE_LOGO} alt="Google" width="100%" />
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", mb: 2, flexShrink: 0 }}>
                        <Avatar
                          sx={{ width: 40, height: 40, mr: 2, border: "2px solid rgba(255,255,255,0.25)" }}
                          src={review.profile_photo_url}
                          alt={review.author_name}
                        />
                        <Box>
                          <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "0.95rem", color: "#fff" }}>
                            {review.author_name}
                          </Typography>
                          <Typography variant="body2" sx={{ color: secondaryText }}>
                            {new Date(review.time * 1000).toLocaleDateString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Rating value={review.rating} precision={0.5} readOnly sx={{ mb: 1, flexShrink: 0 }} />

                      <Typography
                        variant="body2"
                        sx={{
                          color: alpha("#fff", 0.9),
                          fontStyle: "italic",
                          fontSize: "0.95rem",
                          lineHeight: 1.5,
                          flexGrow: 1,
                          overflowY: "auto",
                          pr: 1, // padding for scrollbar
                          // Custom scrollbar
                          "&::-webkit-scrollbar": {
                            width: "4px",
                          },
                          "&::-webkit-scrollbar-track": {
                            background: "rgba(255,255,255,0.05)",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            background: "rgba(255,255,255,0.3)",
                            borderRadius: "4px",
                          },
                          "&::-webkit-scrollbar-thumb:hover": {
                            background: "rgba(255,255,255,0.5)",
                          },
                        }}
                      >
                        "{review.text}"
                      </Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        )}

        <Button
          component={motion.a}
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          sx={{
            mt: 5,
            backgroundColor: "#f2c230",
            color: "#000",
            fontWeight: "bold",
            px: isMobile ? 3 : 4,
            py: isMobile ? 1.2 : 1.5,
            borderRadius: "30px",
            textTransform: "uppercase",
            fontSize: isMobile ? "1rem" : "1.1rem",
            width: isMobile ? "80%" : "auto",
          }}
          href={GOOGLE_REVIEWS_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW MORE REVIEWS
        </Button>
      </Container>
    </Box>
  );
};

export default Testimonials;
