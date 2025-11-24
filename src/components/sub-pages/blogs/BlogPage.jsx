import React, { useState, useEffect, useMemo } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    Box,
    Typography,
    Card,
    Grid,
    Container,
    Tabs,
    Tab,
    useMediaQuery,
    useTheme,
    CardActionArea,
    Chip,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Key Components
import Footer from "../../key-components/Footer";
import Contact from "../../key-components/Contact";
import CTA from "../../key-components/CTA";
import BlogHero from "./BlogHero";

// Sample blog posts data
const blogPosts = [
    {
        id: 1,
        title: "5 Signs Your Brakes Need Immediate Attention",
        summary:
            "Squealing noises, a spongy pedal, or pulling to one side? Don't ignore these warning signs that your braking system needs professional service.",
        image: "/sub-pages/brakes/brakes-1.jpg",
        estimate: "4 Min Read",
        date: "November 15, 2023",
        category: ["Safety"],
        featured: true,
    },
    {
        id: 2,
        title: "Synthetic vs. Conventional Oil: What's Best?",
        summary:
            "Confused about which oil is right for your engine? We break down the differences, benefits, and why manufacturer recommendations matter.",
        image: "/sub-pages/oil-change/oil-change-1.jpg",
        estimate: "3 Min Read",
        date: "October 28, 2023",
        category: ["Maintenance"],
        featured: false,
    },
    {
        id: 3,
        title: "Understanding the Texas State Inspection",
        summary:
            "From emissions to safety checks, here's exactly what we look for during your annual state inspection and how to prepare your vehicle.",
        image: "/sub-pages/state-inspection/inspection-1.png",
        estimate: "5 Min Read",
        date: "October 10, 2023",
        category: ["Legal"],
        featured: false,
    },
    {
        id: 4,
        title: "How to Extend the Life of Your Car Battery",
        summary:
            "Extreme heat and short trips can kill a battery. Learn simple tips to keep your charging system healthy and avoid a dead battery.",
        image: "/sub-pages/batteries/batteries-1.jpg",
        estimate: "3 Min Read",
        date: "September 22, 2023",
        category: ["Tips"],
        featured: false,
    },
    {
        id: 5,
        title: "Why is My Check Engine Light On?",
        summary:
            "It could be a loose gas cap or a failing catalytic converter. We explain the most common triggers for that pesky dashboard warning.",
        image: "/sub-pages/engine/check-engine.png",
        estimate: "4 Min Read",
        date: "September 05, 2023",
        category: ["Diagnostics"],
        featured: false,
    },
    {
        id: 6,
        title: "The Importance of Wheel Alignment",
        summary:
            "Save your tires and improve gas mileage. Discover why proper wheel alignment is crucial for vehicle handling and safety.",
        image: "/sub-pages/alignments/alignments-3.jpg",
        estimate: "3 Min Read",
        date: "August 18, 2023",
        category: ["Tires"],
        featured: false,
    },
];

// Extract all unique categories
const allCategories = Array.from(
    new Set(blogPosts.flatMap((post) => post.category))
);

const BlogPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
    const isTablet = useMediaQuery(theme.breakpoints.down("md"));

    const [searchTerm, setSearchTerm] = useState("");
    const [activeTab, setActiveTab] = useState("all");
    const [featuredPost, setFeaturedPost] = useState(
        blogPosts.find((post) => post.featured)
    );

    // Derived / filtered posts
    const filteredPosts = useMemo(() => {
        let filtered = blogPosts;

        if (searchTerm) {
            const query = searchTerm.toLowerCase();
            filtered = filtered.filter(
                (post) =>
                    post.title.toLowerCase().includes(query) ||
                    post.summary.toLowerCase().includes(query) ||
                    post.category.some((cat) => cat.toLowerCase().includes(query))
            );
        }
        if (activeTab !== "all") {
            filtered = filtered.filter((post) => post.category.includes(activeTab));
        }
        return filtered;
    }, [searchTerm, activeTab]);

    const handleTabChange = (_e, newValue) => setActiveTab(newValue);

    // Animate cards on appear
    useEffect(() => {
        const cards = document.querySelectorAll(".blog-card");
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("appear");
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1 }
        );
        cards.forEach((card) => observer.observe(card));
        return () => cards.forEach((card) => observer.unobserve(card));
    }, [filteredPosts]);

    return (
        <Box sx={{
            background: `
        `, color: "#FFFFFF", minHeight: "100vh"
        }}>

            <BlogHero
                title="Our Blog"
                description="Expert advice, maintenance tips, and industry news from the Dynamic Auto Repair team."
            />

            {/* Category Filter */}
            {/* Category Filter */}
            <Container maxWidth="lg" sx={{ mt: { xs: -4, md: -6 }, position: "relative", zIndex: 10, display: "flex", justifyContent: "center" }}>
                <Box
                    sx={{
                        p: 1,
                        borderRadius: 12,
                        background: "transparent",
                        display: "inline-flex",
                        maxWidth: "100%",
                        overflowX: "auto"
                    }}
                >
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        variant="scrollable"
                        scrollButtons="auto"
                        aria-label="Filter by category"
                        sx={{
                            minHeight: 0,
                            "& .MuiTabs-indicator": { display: "none" },
                            "& .MuiTab-root": {
                                minHeight: 36,
                                px: 2,
                                borderRadius: 9999,
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: 14,
                                color: "rgba(255,255,255,0.72)",
                                transition: "background-color .2s ease, color .2s ease",
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.06)" },
                                "&.Mui-selected": {
                                    color: "#000",
                                    backgroundColor: "#f2c230",
                                },
                                "&.Mui-selected:hover": {
                                    backgroundColor: "#d9ae2b",
                                },
                                "&.Mui-focusVisible": {
                                    boxShadow: "0 0 0 2px rgba(242, 194, 48, 0.35)",
                                },
                            },
                        }}
                    >
                        <Tab disableRipple value="all" label="All Posts" />
                        {allCategories.map((category) => (
                            <Tab disableRipple key={category} value={category} label={category} />
                        ))}
                    </Tabs>
                </Box>
            </Container>

            {/* Featured Post */}
            {featuredPost && (
                <Container maxWidth="lg" sx={{ mt: 6, mb: 4 }}>
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                            position: "relative",
                            display: "inline-block",
                            "&:after": {
                                content: "''",
                                position: "absolute",
                                bottom: "-6px",
                                left: "0",
                                width: "60px",
                                height: "3px",
                                backgroundColor: "#f2c230",
                            },
                        }}
                    >
                        Featured Article
                    </Typography>

                    <Card
                        className="blog-card featured-card"
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", md: "row" },
                            borderRadius: "16px",
                            overflow: "hidden",
                            backgroundColor: "rgba(20, 20, 30, 0.5)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.05)",
                            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
                            transition: "transform 0.3s ease, box-shadow 0.3s ease",
                            opacity: 0,
                            transform: "translateY(20px)",
                            "&.appear": { opacity: 1, transform: "translateY(0)" },
                            "&:hover": {
                                transform: "translateY(-5px)",
                                boxShadow: "0 20px 50px rgba(0, 0, 0, 0.3)",
                            },
                            textDecoration: "none",
                        }}
                    >
                        <CardActionArea
                            component={Link}
                            to={`/blog/${featuredPost.id}`} // Note: You'll need to set up individual blog routes if you want these to work
                            aria-label={`Read article: ${featuredPost.title}`}
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: "stretch",
                            }}
                        >
                            {/* Featured Image */}
                            <Box
                                sx={{
                                    width: { xs: "100%", md: "50%" },
                                    height: { xs: "250px", md: "auto" },
                                    overflow: "hidden",
                                    position: "relative",
                                }}
                            >
                                <Box
                                    role="img"
                                    aria-label={featuredPost.title}
                                    sx={{
                                        width: "100%",
                                        height: "100%",
                                        backgroundImage: `url(${featuredPost.image})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        transition: "transform 0.5s ease",
                                    }}
                                />
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "16px",
                                        left: "16px",
                                        backgroundColor: "#f2c230",
                                        color: "#000",
                                        padding: "4px 12px",
                                        borderRadius: "4px",
                                        fontWeight: "bold",
                                        fontSize: "0.75rem",
                                        letterSpacing: "0.5px",
                                        textTransform: "uppercase",
                                    }}
                                >
                                    Featured
                                </Box>
                            </Box>

                            {/* Content */}
                            <Box sx={{ width: { xs: "100%", md: "50%" }, p: 4, display: "flex", flexDirection: "column" }}>
                                {/* Categories */}
                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                                    {featuredPost.category.map((cat) => (
                                        <Chip
                                            key={cat}
                                            label={cat}
                                            size="small"
                                            sx={{
                                                backgroundColor: "rgba(242, 194, 48, 0.15)",
                                                color: "#f2c230",
                                                fontWeight: 500,
                                                borderRadius: "4px",
                                            }}
                                        />
                                    ))}
                                </Box>

                                {/* Title */}
                                <Typography
                                    variant="h4"
                                    component="h2"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                        color: "#fff",
                                        fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2rem" },
                                        lineHeight: 1.3,
                                        textDecoration: "none",
                                    }}
                                >
                                    {featuredPost.title}
                                </Typography>

                                {/* Summary */}
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "rgba(255,255,255,0.7)",
                                        mb: 3,
                                        lineHeight: 1.6,
                                        fontSize: "1rem",
                                        flex: 1,
                                    }}
                                >
                                    {featuredPost.summary}
                                </Typography>

                                {/* Meta */}
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        mt: "auto",
                                        flexWrap: "wrap",
                                        gap: 2,
                                    }}
                                >
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <CalendarTodayIcon sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }} />
                                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                                                {featuredPost.date}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                            <AccessTimeIcon sx={{ fontSize: "0.9rem", color: "rgba(255,255,255,0.6)" }} />
                                            <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.6)" }}>
                                                {featuredPost.estimate}
                                            </Typography>
                                        </Box>
                                    </Box>

                                    <ArrowForwardIcon sx={{ color: "rgba(255,255,255,0.5)" }} />
                                </Box>
                            </Box>
                        </CardActionArea>
                    </Card>
                </Container>
            )}

            {/* Blog Listing */}
            <Container maxWidth="lg" sx={{ py: 4, mb: 8 }}>
                {filteredPosts.length > 0 ? (
                    <>
                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                                mb: 3,
                                position: "relative",
                                display: "inline-block",
                                "&:after": {
                                    content: "''",
                                    position: "absolute",
                                    bottom: "-6px",
                                    left: "0",
                                    width: "60px",
                                    height: "3px",
                                    backgroundColor: "#f2c230",
                                },
                            }}
                        >
                            {activeTab === "all" ? "All Articles" : `${activeTab} Articles`}
                        </Typography>

                        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }, gap: 3 }}>
                            {filteredPosts.map((post, index) => (
                                <Card
                                    key={post.id}
                                    className="blog-card"
                                    component="article"
                                    sx={{
                                        borderRadius: "12px",
                                        overflow: "hidden",
                                        height: "100%",
                                        display: "flex",
                                        flexDirection: "column",
                                        backgroundColor: "rgba(20, 20, 30, 0.5)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 255, 255, 0.05)",
                                        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)",
                                        transition: "all 0.3s ease",
                                        opacity: 0,
                                        transform: "translateY(20px)",
                                        transitionDelay: `${index * 0.1}s`,
                                        "&.appear": { opacity: 1, transform: "translateY(0)" },
                                        "&:hover": { transform: "translateY(-5px)", boxShadow: "0 15px 40px rgba(0, 0, 0, 0.3)" },
                                    }}
                                >
                                    <CardActionArea
                                        component={Link}
                                        to={`/blog/${post.id}`}
                                        aria-label={`Read article: ${post.title}`}
                                        sx={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "stretch" }}
                                    >
                                        {/* Image */}
                                        <Box sx={{ position: "relative", height: "200px", width: "100%", overflow: "hidden" }}>
                                            <Box
                                                className="blog-image"
                                                role="img"
                                                aria-label={post.title}
                                                sx={{
                                                    width: "100%",
                                                    height: "100%",
                                                    backgroundImage: `url(${post.image})`,
                                                    backgroundSize: "cover",
                                                    backgroundPosition: "center",
                                                    transition: "transform 0.5s ease-in-out",
                                                }}
                                            />
                                            {post.category && post.category[0] && (
                                                <Chip
                                                    label={post.category[0]}
                                                    size="small"
                                                    sx={{
                                                        position: "absolute",
                                                        top: "12px",
                                                        left: "12px",
                                                        backgroundColor: "rgba(242, 194, 48, 0.9)",
                                                        color: "#000",
                                                        fontWeight: 700,
                                                        fontSize: "0.7rem",
                                                    }}
                                                />
                                            )}
                                        </Box>

                                        {/* Content */}
                                        <Box sx={{ p: 3, display: "flex", flexDirection: "column", flex: 1, width: "100%" }}>
                                            {/* Title */}
                                            <Typography
                                                variant="h6"
                                                component="h3"
                                                sx={{ fontWeight: 700, mb: 1.5, color: "#fff", lineHeight: 1.3 }}
                                            >
                                                {post.title}
                                            </Typography>

                                            <Typography
                                                variant="body2"
                                                sx={{
                                                    color: "rgba(255,255,255,0.7)",
                                                    mb: 2,
                                                    flex: 1,
                                                    overflow: "hidden",
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 3,
                                                    WebkitBoxOrient: "vertical",
                                                }}
                                            >
                                                {post.summary}
                                            </Typography>

                                            {/* Meta */}
                                            <Box
                                                sx={{
                                                    mt: "auto",
                                                    pt: 2,
                                                    borderTop: "1px solid rgba(255,255,255,0.05)",
                                                    display: "flex",
                                                    justifyContent: "space-between",
                                                    alignItems: "center",
                                                    width: "100%",
                                                }}
                                            >
                                                <Typography
                                                    variant="caption"
                                                    sx={{ color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", gap: 0.5 }}
                                                >
                                                    <AccessTimeIcon sx={{ fontSize: "0.9rem" }} />
                                                    {post.estimate}
                                                </Typography>

                                                <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.6)" }}>
                                                    {post.date}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </CardActionArea>
                                </Card>
                            ))}
                        </Box>
                    </>
                ) : (
                    <Box
                        sx={{
                            textAlign: "center",
                            py: 8,
                            backgroundColor: "rgba(20, 20, 30, 0.5)",
                            borderRadius: 4,
                            p: 4,
                        }}
                    >
                        <Typography variant="h5" sx={{ color: "#fff", mb: 2 }}>
                            No articles found
                        </Typography>
                        <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.7)", mb: 3 }}>
                            Try adjusting your search criteria or browse all articles.
                        </Typography>
                        <Box
                            component={Link}
                            to="/blog"
                            sx={{
                                display: "inline-block",
                                px: 3,
                                py: 1.25,
                                borderRadius: "8px",
                                backgroundColor: "#f2c230",
                                color: "#000",
                                textDecoration: "none",
                                fontWeight: 600,
                                "&:hover": { backgroundColor: "#d9ae2b" },
                            }}
                        >
                            View All Articles
                        </Box>
                    </Box>
                )}
            </Container>

            <CTA />
            <Contact />
            <Footer />
        </Box >
    );
};

export default BlogPage;
