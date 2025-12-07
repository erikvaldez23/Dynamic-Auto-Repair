import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, Button } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";

const ACCENT = "#f2c230";
const ACCENT_HOVER = "#ffd95a";

/* ------------------------- Form field styling -------------------------- */
const FieldLabel = styled(Typography)(({ theme }) => ({
    fontSize: 13,
    opacity: 0.9,
    marginBottom: 4,
    color: "#fff",
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
    backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E"), linear-gradient(180deg, rgba(40,40,40,0.9), rgba(15,15,15,0.9))`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundPosition: "right 10px center, center",
    backgroundSize: "16px, auto",
    paddingRight: "32px", // make room for arrow
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

const Heading = styled(Typography)(({ theme }) => ({
    fontWeight: 900,
    letterSpacing: 0.2,
    lineHeight: 1.05,
    fontSize: "clamp(1.8rem, 3.6vw, 2.6rem)",
    color: "#fff",
}));

export default function ContactForm() {
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

    const [status, setStatus] = useState({
        submitting: false,
        info: { error: false, msg: null },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        // Add vehicle data from state
        data.vehicleYear = selectedYear;
        data.vehicleMake = selectedMake;
        data.vehicleModel = data.vehicleModel; // already in form data but good to be explicit if we were building it manually

        if (!data.name || !data.phone || !data.vehicleYear || !data.vehicleMake || !data.vehicleModel) {
            setStatus({
                submitting: false,
                info: { error: true, msg: "Please fill in all required fields." },
            });
            return;
        }

        setStatus({
            submitting: true,
            info: { error: false, msg: null },
        });

        try {
            const response = await fetch('http://localhost:3000/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const resData = await response.json();

            if (response.ok) {
                setStatus({
                    submitting: false,
                    info: { error: false, msg: "Message sent successfully! We'll be in touch soon." },
                });
                // Optional: Reset form here
                e.target.reset();
                setSelectedYear("");
                setSelectedMake("");
                setModels([]);
            } else {
                setStatus({
                    submitting: false,
                    info: { error: true, msg: resData.message || "An error occurred. Please try again." },
                });
            }
        } catch (error) {
            setStatus({
                submitting: false,
                info: { error: true, msg: "Failed to send message. Please check your connection." },
            });
        }
    };

    return (
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
                            disabled={status.submitting}
                        >
                            {status.submitting ? "Sending..." : "Get My Auto Quote"}
                        </CTA>
                    </Box>

                    {status.info.msg && (
                        <Typography
                            sx={{
                                color: status.info.error ? "#ff4d4d" : "#4caf50",
                                textAlign: "center",
                                fontSize: 14,
                                mt: 2
                            }}
                        >
                            {status.info.msg}
                        </Typography>
                    )}
                </Stack>
            </Box>
        </Stack>
    );
}
