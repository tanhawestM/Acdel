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
  const isMacbook = useMediaQuery('(min-width: 1280px) and (max-width: 1440px)');
  const isDesktop = useMediaQuery('(min-width: 1441px)');

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
        displayName = prizeName;
    }
    return displayName.toUpperCase();
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
        backgroundSize: {
          xs: "cover",
          sm: "cover",
          md: isMacbook ? "110% 100%" : "cover", // Adjust background size for MacBook
        },
        backgroundPosition: {
          xs: "center",
          sm: "center",
          md: isMacbook ? "60% center" : "center", // Adjust position for MacBook
        },
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <Box 
        sx={{ 
          position: "relative", 
          zIndex: 2, 
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          pt: isMacbook ? "5vh" : "0", // Add top padding for MacBook
        }}
      >
        {/* Back button */}
        <IconButton
          component={Link}
          to="/SearchWinner"
          sx={{
            position: "absolute",
            top: { xs: 80, md: isMacbook ? 40 : 80 },
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
            mt: { xs: 30, md: isMacbook ? "15vh" : 30 }, // Adjust margin top for MacBook
          }}
        >
          {/* Name and Sale container */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              width: { xs: "58%", md: isMacbook ? "50%" : "58%" },
            }}
          >
            {/* Prize Name */}
            <Typography
              variant="h5"
              sx={{
                fontFamily: "DBOzoneXBold",
                fontWeight: "bold",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: isMacbook ? "3.5rem" : "4.5rem",
                },
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
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: isMacbook ? "3rem" : "4rem",
                },
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

            {/* Sale */}
            <Typography
              sx={{
                fontWeight: "bold",
                fontFamily: "DBOzoneXBold",
                fontSize: {
                  xs: "1.2rem",
                  sm: "1.5rem",
                  md: isMacbook ? "3rem" : "4rem",
                },
                color: "white",
                textAlign: "center",
                width: "100%",
                textShadow: "#2F2F2F 1px 0 8px",
                mb: 0,
                mt: isMacbook ? -2 : -4,
              }}
            >
              {userData.Sale?.toString().replaceAll("B2B_", "")}
            </Typography>
          </Box>

          {/* Ticket Number */}
          <Box
            sx={{
              width: { xs: "60%", md: isMacbook ? "50%" : "60%" },
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
              mt: isMacbook ? -8 : -12,
              pr: { xs: 20, md: isMacbook ? 16 : 20 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                fontFamily: "DBOzoneXBold",
                letterSpacing: "8px",
                fontSize: {
                  xs: "2rem",
                  sm: "2.5rem",
                  md: isMacbook ? "5rem" : "7rem",
                },
                color: "white",
                mt: 0,
                mb: 1,
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