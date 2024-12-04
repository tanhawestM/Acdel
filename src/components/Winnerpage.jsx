import React from "react";
import "../styles/fonts.css";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

const Winnerpage = () => {
  const location = useLocation();
  const {
    userData,
    prizeImageURL,
    prizeName,
    ticketNumber,
    phoneNumber,
    Sale,
  } = location.state;
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const getPrizeDisplay = (prizeName) => {
    let displayName;
    switch (prizeName.toLowerCase()) {
      case "iphone":
        displayName = "Iphone 15 Pro Max";
        break;
      case "gold":
        displayName = "Gold 24K";
        break;
      case "car":
        displayName = "Toyota Vios";
        break;
      default:
        displayName = prizeName; // fallback to original prize name if not matched
    }
    return displayName.toUpperCase(); // Convert to uppercase
  };

  if (!userData || !ticketNumber) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">
          No user data or ticket number found. Please go back and search again.
        </Typography>
        <Link to="/">Back to Search</Link>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        background: "linear-gradient(to right bottom, #082036, #41719d)",
        color: "black",
        position: "relative",
        overflow: "hidden",
        backgroundImage: "url('BG_Luckdraw.png')",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Box sx={{ position: "relative", zIndex: 2, width: "100%" }}>
        {/* Back button */}
        <IconButton
          component={Link}
          to="/SearchWinner"
          sx={{
            position: "absolute",
            top: 80,
            left: 0,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "#082036",
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Content container */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 0,
            pr: { xs: 4, sm: 6, md: 8 },
            mt: 30,
          }}
        >
          {/* Name and Sale container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: "55%", // This creates a box that's half the width
            }}
          >
            {/* Prize Name */}
            <Typography
              variant="h5"
              sx={{
                fontFamily: "DBOzoneXBold",
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "4.3rem" },
                // color: "#0C3C6F",
                color: "white",
                textShadow: "#2F2F2F 1px 0 8px",
                width: 1,
                mb: 0,
                mt: 2,
              }}
            >
              รางวัล {getPrizeDisplay(prizeName.split(" (")[0])}
            </Typography>

            {/* Name */}
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "DBOzoneXBold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "4rem" },
                color: "white",
                textAlign: "center",
                width: "100%",
                textShadow: "#2F2F2F 1px 0 8px",
                mb: 0,
                mt: 0,
              }}
            >
              คุณ {userData.firstname} {userData.lastname}
            </Typography>
            {/* Sale (centered within the box) */}
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "DBOzoneXBold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "4rem" },
                color: "white",
                textAlign: "center", // Center the sale text
                width: "100%",
                textShadow: "#2F2F2F 1px 0 8px",
                mb: 0,
                mt: -4,
              }}
            >
              {userData.Sale?.toString().replaceAll("B2B_", "")}
            </Typography>
          </Box>

          {/* Ticket Number */}

          <Box
            sx={{
              width: "60%",
              aspectRatio: "2 / 1",
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundImage: "url('Ticket.png')",
              backgroundSize: "130% 130%",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
              mt: -12,
              pr: 20,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontFamily: "DBOzoneXBold",
                letterSpacing: "8px",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "7rem" },
                color: "white",
                mt: 0,
                mb:1,
                alignSelf: "center",
              }}
            >
              {ticketNumber}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Winnerpage;
