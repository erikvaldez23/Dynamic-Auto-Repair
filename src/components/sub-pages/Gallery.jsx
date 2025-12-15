// src/components/gallery/Gallery.jsx
import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
    Grid,
    Card,
    CardMedia,
    Container,
    Box,
    Typography,
    Dialog,
    IconButton,
    Button,
    useMediaQuery,
    Pagination,
} from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useSwipeable } from "react-swipeable";
import { motion } from "framer-motion";


// ---- SITE SETTINGS ----
const images = [
    "/gallery/compressed/0D5A1733.jpg",
    "/gallery/compressed/0D5A1735.jpg",
    "/gallery/compressed/0D5A1738.jpg",
    "/gallery/compressed/0D5A1740.jpg",
    "/gallery/compressed/0D5A1741.jpg",
    "/gallery/compressed/0D5A1742.jpg",
    "/gallery/compressed/0D5A1750.jpg",
    "/gallery/compressed/0D5A1751.jpg",
    "/gallery/compressed/0D5A1752.jpg",
    "/gallery/compressed/0D5A1754.jpg",
    "/gallery/compressed/0D5A1758.jpg",
    "/gallery/compressed/0D5A1759.jpg",
    "/gallery/compressed/0D5A1760.jpg",
    "/gallery/compressed/0D5A1761.jpg",
    "/gallery/compressed/0D5A1762.jpg",
    "/gallery/compressed/0D5A1763.jpg",
    "/gallery/compressed/0D5A1764.jpg",
    "/gallery/compressed/0D5A1765.jpg",
    "/gallery/compressed/0D5A1766.jpg",
    "/gallery/compressed/0D5A1768.jpg",
    "/gallery/compressed/0D5A1769.jpg",
    "/gallery/compressed/0D5A1770.jpg",
    "/gallery/compressed/0D5A1772.jpg",
    "/gallery/compressed/0D5A1774.jpg",
    "/gallery/compressed/0D5A1778.jpg",
    "/gallery/compressed/0D5A1780.jpg",
    "/gallery/compressed/0D5A1782.jpg",
    "/gallery/compressed/0D5A1783.jpg",
    "/gallery/compressed/0D5A1784.jpg",
    "/gallery/compressed/0D5A1786.jpg",
    "/gallery/compressed/0D5A1787.jpg",
    "/gallery/compressed/0D5A1788.jpg",
    "/gallery/compressed/0D5A1789.jpg",
    "/gallery/compressed/0D5A1790.jpg",
    "/gallery/compressed/0D5A1791.jpg",
    "/gallery/compressed/0D5A1809.jpg",
    "/gallery/compressed/0D5A1812.jpg",
    "/gallery/compressed/0D5A1813.jpg",
    "/gallery/compressed/0D5A1814.jpg",
    "/gallery/compressed/0D5A1815.jpg",
    "/gallery/compressed/0D5A1816.jpg",
    "/gallery/compressed/0D5A1817.jpg",
    "/gallery/compressed/0D5A1818.jpg",
    "/gallery/compressed/0D5A1819.jpg",
    "/gallery/compressed/0D5A1822.jpg",
    "/gallery/compressed/0D5A1823.jpg",
    "/gallery/compressed/0D5A1824.jpg",
    "/gallery/compressed/0D5A1825.jpg",
    "/gallery/compressed/0D5A1826.jpg",
    "/gallery/compressed/0D5A1827.jpg",
    "/gallery/compressed/0D5A1828.jpg",
    "/gallery/compressed/0D5A1829.jpg",
    "/gallery/compressed/0D5A1830.jpg",
    "/gallery/compressed/0D5A1831.jpg",
    "/gallery/compressed/0D5A1832.jpg",
    "/gallery/compressed/0D5A1833.jpg",
    "/gallery/compressed/0D5A1834.jpg",
    "/gallery/compressed/0D5A1835.jpg",
    "/gallery/compressed/0D5A1838.jpg",
    "/gallery/compressed/0D5A1839.jpg",
    "/gallery/compressed/0D5A1840.jpg",
    "/gallery/compressed/0D5A1841.jpg",
    "/gallery/compressed/0D5A1842.jpg",
    "/gallery/compressed/0D5A1843.jpg",
    "/gallery/compressed/0D5A1846.jpg",
    "/gallery/compressed/0D5A1848.jpg",
    "/gallery/compressed/0D5A1853.jpg",
    "/gallery/compressed/0D5A1856.jpg",
    "/gallery/compressed/0D5A1857.jpg",
    "/gallery/compressed/0D5A1858.jpg",
    "/gallery/compressed/0D5A1859.jpg",
    "/gallery/compressed/0D5A1860.jpg",
    "/gallery/compressed/0D5A1861.jpg",
    "/gallery/compressed/0D5A1864.jpg",
    "/gallery/compressed/0D5A1867.jpg",
    "/gallery/compressed/0D5A1868.jpg",
    "/gallery/compressed/0D5A1869.jpg",
    "/gallery/compressed/0D5A1870.jpg",
    "/gallery/compressed/0D5A1871.jpg",
    "/gallery/compressed/0D5A1872.jpg",
    "/gallery/compressed/0D5A1873.jpg",
    "/gallery/compressed/0D5A1875.jpg",
    "/gallery/compressed/0D5A1876.jpg",
    "/gallery/compressed/0D5A1879.jpg",
    "/gallery/compressed/0D5A1880.jpg",
    "/gallery/compressed/0D5A1881.jpg",
    "/gallery/compressed/0D5A1883.jpg",
    "/gallery/compressed/0D5A1894.jpg",
    "/gallery/compressed/0D5A1897.jpg",
    "/gallery/compressed/0D5A1900.jpg",
    "/gallery/compressed/0D5A1901.jpg",
    "/gallery/compressed/0D5A1903.jpg",
    "/gallery/compressed/0D5A1905.jpg",
    "/gallery/compressed/0D5A1906.jpg",
    "/gallery/compressed/0D5A1907.jpg",
    "/gallery/compressed/0D5A1908.jpg",
    "/gallery/compressed/0D5A1953.jpg",
    "/gallery/compressed/0D5A1954.jpg",
    "/gallery/compressed/0D5A1955.jpg",
    "/gallery/compressed/0D5A1956.jpg",
    "/gallery/compressed/0D5A1969.jpg",
    "/gallery/compressed/0D5A1976.jpg",
    "/gallery/compressed/0D5A1977.jpg",
];

const Gallery = () => {
    const [open, setOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const isMobile = useMediaQuery("(max-width:600px)");
    const isDialogFull = useMediaQuery("(max-width:900px)");
    const accent = "#f2c230";
    const minHeight = { xs: "38vh", md: "40vh" };

    const [page, setPage] = useState(1);
    const ITEMS_PER_PAGE = 16;
    const pageCount = Math.ceil(images.length / ITEMS_PER_PAGE);

    const handlePageChange = (event, value) => {
        setPage(value);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const currentImages = images.slice(
        (page - 1) * ITEMS_PER_PAGE,
        page * ITEMS_PER_PAGE
    );

    const handleImageClick = (index) => {
        setCurrentImageIndex(index);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const handleNext = useCallback(
        () => setCurrentImageIndex((i) => (i + 1) % images.length),
        []
    );
    const handlePrev = useCallback(
        () => setCurrentImageIndex((i) => (i - 1 + images.length) % images.length),
        []
    );

    // Keyboard nav inside dialog
    useEffect(() => {
        if (!open) return;
        const onKey = (e) => {
            if (e.key === "ArrowRight") handleNext();
            if (e.key === "ArrowLeft") handlePrev();
            if (e.key === "Escape") handleClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, handleNext, handlePrev]);

    // Swipe handlers (mobile)
    const swipeHandlers = useSwipeable({
        onSwipedLeft: handleNext,
        onSwipedRight: handlePrev,
        trackMouse: true,
        preventScrollOnSwipe: true,
    });

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
            }}
        >
            <Box
                sx={{
                    color: "#FFFFFF",
                    minHeight: "100vh",
                }}
            >
                {/* Hero */}
                <Box
                    sx={{
                        position: "relative",
                        width: "100%",
                        pt: 10,
                        minHeight,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        textAlign: "center",
                        px: { xs: 1.5, md: 2 },
                    }}
                >
                    <Typography
                        variant="h2"
                        sx={{
                            mb: 1,
                            fontWeight: 800,
                            fontSize: { xs: "3rem", sm: "3rem", md: "3rem", lg: "5rem" },
                        }}
                    >
                        Our Gallery
                    </Typography>

                    <Typography
                        variant="h6"
                        sx={{
                            opacity: 0.9,
                            maxWidth: 900,
                            mx: "auto",
                            fontSize: { xs: "1rem", md: "1.25rem" },
                            "&::after": {
                                content: '""',
                                display: "block",
                                width: 80,
                                height: 5,
                                backgroundColor: accent,
                                borderRadius: 2,
                                margin: "10px auto 0",
                                boxShadow: `0 0 8px ${accent}B3, 0 0 16px ${accent}80`, // B3=70%, 80=50%
                            },
                        }}
                    >
                        A glimpse into our workshop and the quality work we deliver.                 </Typography>
                </Box>

                {/* Gallery Grid */}
                <Box
                    sx={{
                        flex: "1",
                        maxWidth: "1600px",
                        margin: "0 auto",
                        padding: 2,
                        mt: "20px",
                        pb: 10,
                    }}
                >
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: {
                                xs: "repeat(1, 1fr)",
                                sm: "repeat(2, 1fr)",
                                md: "repeat(4, 1fr)",
                            },
                            gap: 2,
                        }}
                    >
                        {currentImages.map((image, index) => {
                            // Calculate the true index for the lightbox
                            const trueIndex = (page - 1) * ITEMS_PER_PAGE + index;
                            return (
                                <Card
                                    key={image}
                                    sx={{
                                        boxShadow: 3,
                                        display: "flex",
                                        flexDirection: "column",
                                        height: "100%",
                                        bgcolor: "rgba(20, 20, 30, 0.5)",
                                        border: "1px solid rgba(255,255,255,0.05)",
                                    }}
                                    aria-label={`Gallery thumbnail ${trueIndex + 1} `}
                                    onClick={() => handleImageClick(trueIndex)}
                                >
                                    <CardMedia
                                        component="img"
                                        image={image.replace(
                                            "/gallery/compressed/",
                                            "/gallery/thumbnails/"
                                        )}
                                        alt={`Tint Tek Plus project ${trueIndex + 1} `}
                                        loading="lazy"
                                        sx={{
                                            width: "100%",
                                            height: 250,
                                            objectFit: "cover",
                                            borderRadius: "5px",
                                            transition: "transform 0.25s ease, opacity 0.25s ease",
                                            "&:hover": {
                                                transform: "scale(1.03)",
                                                cursor: "pointer",
                                                opacity: 0.9,
                                            },
                                        }}
                                    />
                                </Card>
                            );
                        })}
                    </Box>

                    {/* Pagination */}
                    <Box sx={{ display: "flex", justifyContent: "center", mt: 6 }}>
                        <Pagination
                            count={pageCount}
                            page={page}
                            onChange={handlePageChange}
                            color="primary"
                            size={isMobile ? "medium" : "large"}
                            sx={{
                                "& .MuiPaginationItem-root": {
                                    color: "white",
                                    borderColor: "rgba(255,255,255,0.3)",
                                },
                                "& .Mui-selected": {
                                    borderColor: "#f2c230",
                                    color: "#000"
                                },
                            }}
                        />
                    </Box>
                </Box>

                {/* Lightbox / Image Modal */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    maxWidth="lg"
                    fullWidth
                    fullScreen={isDialogFull}
                    PaperProps={{ sx: { backgroundColor: "black" } }}
                >
                    <Box
                        {...swipeHandlers}
                        sx={{
                            position: "relative",
                            p: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minHeight: isDialogFull ? "100vh" : 600,
                        }}
                        aria-label="Image lightbox viewer"
                    >
                        <img
                            src={images[currentImageIndex]}
                            alt={`Project image ${currentImageIndex + 1} of ${images.length} `}
                            style={{
                                width: "100%",
                                height: "100%",
                                maxHeight: isDialogFull ? "100vh" : "calc(100vh - 120px)",
                                objectFit: "contain",
                                display: "block",
                                margin: 0,
                            }}
                        />

                        {/* Left Arrow */}
                        <IconButton
                            onClick={handlePrev}
                            aria-label="Previous image"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                left: 10,
                                transform: "translateY(-50%)",
                                zIndex: 1,
                                bgcolor: "rgba(255,255,255,0.15)",
                                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                            }}
                        >
                            <ChevronLeft sx={{ color: "white", fontSize: 44 }} />
                        </IconButton>

                        {/* Right Arrow */}
                        <IconButton
                            onClick={handleNext}
                            aria-label="Next image"
                            sx={{
                                position: "absolute",
                                top: "50%",
                                right: 10,
                                transform: "translateY(-50%)",
                                zIndex: 1,
                                bgcolor: "rgba(255,255,255,0.15)",
                                "&:hover": { bgcolor: "rgba(255,255,255,0.3)" },
                            }}
                        >
                            <ChevronRight sx={{ color: "white", fontSize: 44 }} />
                        </IconButton>
                    </Box>
                </Dialog>
            </Box>
        </Box>
    );
};

export default Gallery;