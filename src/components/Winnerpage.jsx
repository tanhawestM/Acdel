import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import StarBackground from "./StarBackground";

const thaiMonths = [
  "มกราคม",
  "กุมภาพันธ์",
  "มีนาคม",
  "เมษายน",
  "พฤษภาคม",
  "มิถุนายน",
  "กรกฎาคม",
  "สิงหาคม",
  "กันยายน",
  "ตุลาคม",
  "พฤศจิกายน",
  "ธันวาคม",
];

const getCurrentThaiDate = () => {
  const date = new Date();
  const day = date.getDate();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // Convert to Buddhist Era
  return `${day} ${month} ${year}`;
};

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
    switch (prizeName.toLowerCase()) {
      case "iphone":
        return "Iphone 15 Pro Max";
      case "gold":
        return "Gold 24K";
      case "car":
        return "Toyota Vios";
      default:
        return prizeName; // fallback to original prize name if not matched
    }
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
        width: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        textAlign: "center",
        // backgroundColor: "#E7EDF3",
        background: "linear-gradient(to right bottom, #082036, #41719d)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        color: "black",
        // p: { xs: 2, sm: 3, md: 4 },
        position: "relative", // Important for z-index stacking
        overflow: "hidden", // Important to contain the stars
      }}
    >
      <StarBackground />
      <Box sx={{ position: "relative", zIndex: 2 }}>
        {/* Back button */}
        <IconButton
          component={Link}
          to="/SearchWinner"
          sx={{
            position: "absolute",
            top: 0,
            left: 15,
            color: "white",
            "&:hover": {
              backgroundColor: "white",
              color: "#082036",
            },
          }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        {/* Congratulations message */}
        <Typography
          variant="h4"
          sx={{
            fontFamily: "'TH Sarabun PSK', sans-serif",
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2.5rem", md: "5rem" },
            // color: "#0C3C6F",
            // color: "#357BCE",
            color: "transparent",
            WebkitTextStroke: "0.3px #A0A0A0", // text stoke
            WebkitTextFillColor: "#357BCE", // text color
            textShadow: "2px 2px 4px rgba(0, 0, 0, 1)", // text shadow
            mb: 6,
          }}
        >
          ขอแสดงความยินดี
        </Typography>
        {/* <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "3rem" },
                // color: "#0C3C6F",
                color: "white",
                width: 1,
                mt: 0,
              }}
            >
              คุณ {userData.firstname} {userData.lastname}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
                // color: "#0C3C6F",
                color: "white",
                width: 1,
                mb: 0,
              }}
            >
              {userData.Sale}
            </Typography> */}

        {/* Flex container for ticket number, prize image, and prize name */}
        <Box
          sx={{
            mt: 0,
            width: 1,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              width: "50%",
              // maxWidth: "150px",
              height: "auto",
              mt: 3,
            }}
          >
            {/* Prize Name */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2.8rem" },
                // color: "#0C3C6F",
                color: "white",
                width: 1,
                mb: -14,
              }}
            >
              {getPrizeDisplay(prizeName.split(" (")[0])}
            </Typography>

            {/* Prize Image */}
            {prizeImageURL ? (
              <img
                src={prizeImageURL}
                alt="Prize"
                style={{
                  width: "90%",
                  height: "auto",
                  // display: "block",
                }}
              />
            ) : (
              <Typography>No prize image available.</Typography>
            )}
          </Box>

          <Box sx={{ width: "50%", justifyItems: "center" }}>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "3rem" },
                // color: "#0C3C6F",
                color: "white",
                width: 1,
                mt: 0,
              }}
            >
              คุณ {userData.firstname} {userData.lastname}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
                // color: "#0C3C6F",
                color: "white",
                width: 1,
                mb: 5,
              }}
            >
              {userData.Sale?.toString().replaceAll("B2B_", "")}
            </Typography>

            <Box
              sx={{
                width: 1,
                height: "auto",
                alignItems: "center",
                justifyItems: "center",
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  width: "70%",
                  aspectRatio: "2 / 0.8",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundImage: "url('TicBG2.png')",
                  backgroundSize: "100% 100%",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                  textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
                }}
              >
                {/* Ticket Number */}
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    letterSpacing: "8px",
                    fontSize: { xs: "2rem", sm: "2.5rem", md: "4.6rem" },
                    color: "white",
                  }}
                >
                  {ticketNumber}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Winnerpage;
