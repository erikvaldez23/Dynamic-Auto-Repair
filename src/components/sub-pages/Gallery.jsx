import React from "react";
import { Box, Container, Typography, Grid } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";

const PageWrapper = styled(Box)(({ theme }) => ({
    minHeight: "100vh",
    paddingTop: theme.spacing(15),
    paddingBottom: theme.spacing(10),
    background: "transparent",
}));

const ImageCard = styled(Box)(({ theme }) => ({
    width: "100%",
    aspectRatio: "4/3",
    borderRadius: 16,
    overflow: "hidden",
    position: "relative",
    border: `1px solid ${alpha("#fff", 0.1)}`,
    boxShadow: `0 8px 24px ${alpha("#000", 0.2)}`,
    transition: "transform 0.3s ease, box-shadow 0.3s ease",
    "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: `0 12px 32px ${alpha("#000", 0.3)}`,
    },
    "& img": {
        width: "100%",
        height: "100%",
        objectFit: "cover",
        transition: "transform 0.5s ease",
    },
    "&:hover img": {
        transform: "scale(1.05)",
    },
}));

// Placeholder images for now
const IMAGES = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    src: `https://via.placeholder.com/600x450?text=Image+${i + 1}`,
    alt: `Gallery Image ${i + 1}`,
}));

export default function Gallery() {
    return (
        <PageWrapper>
            <Container maxWidth="xl">
                <Box sx={{ mb: 6, textAlign: "center" }}>
                    <Typography
                        variant="h2"
                        sx={{
                            fontWeight: 900,
                            color: "#fff",
                            mb: 2,
                            fontSize: { xs: "2.5rem", md: "3.5rem" },
                        }}
                    >
                        Our Gallery
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{ color: alpha("#fff", 0.7), maxWidth: 800, mx: "auto" }}
                    >
                        A glimpse into our workshop and the quality work we deliver.
                    </Typography>
                </Box>

                <Grid container spacing={3}>
                    {IMAGES.map((img) => (
                        <Grid item xs={12} sm={6} md={3} key={img.id}>
                            <ImageCard>
                                <img src={img.src} alt={img.alt} loading="lazy" />
                            </ImageCard>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </PageWrapper>
    );
}
