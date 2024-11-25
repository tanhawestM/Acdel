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
  const { userData, prizeImageURL, prizeName, ticketNumber, phoneNumber } =
    location.state;
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
        background: "linear-gradient(to right bottom, #082036, #2C6293)",
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
            top: 16,
            left: 16,
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
            fontWeight: "bold",
            fontSize: { xs: "1.5rem", sm: "2.5rem", md: "5rem" },
            // color: "#0C3C6F",
            color: "#357BCE",
            mt: 0,
          }}
        >
          ขอแสดงความยินดี
        </Typography>

        {/* Flex container for ticket number, prize image, and prize name */}
        <Box
          sx={{
            mt: 2,
            width: 1,
            // display: "flex",
            // flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            justifyItems: "center",
            justifyContent: "center",
            gap: { xs: 2, sm: 6, md: 2 }, // Spacing between items
          }}
        >
          {/* Prize Image */}
          <Box
            sx={{
              width: { xs: "50%", sm: "30%", md: "50%" },
              // maxWidth: "150px",
              height: "auto",
            }}
          >
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                fontSize: { xs: "1.2rem", sm: "1.5rem", md: "3rem" },
                // color: "#0C3C6F",
                color: "white",
                width: 1,
                // mt:2
              }}
            >
              {getPrizeDisplay(prizeName.split(" (")[0])}
            </Typography>
            {prizeImageURL ? (
              <img
                src={prizeImageURL}
                alt="Prize"
                style={{
                  width: "40%",
                  height: "auto",
                  // display: "block",
                }}
              />
            ) : (
              <Typography>No prize image available.</Typography>
            )}

            {/* Prize Name */}
            {/* <Typography
            variant="h5"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              // color: "#0C3C6F",
              color: "white",
              width: 1,
              mt:1
            }}
          >
            คุณได้รับ
          </Typography> */}
          </Box>

          <Typography
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
              // color: "#0C3C6F",
              color: "white",
              width: 1,
              mt: 8,
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
            {phoneNumber}
          </Typography>

          <Box
            sx={{
              width: "50%",
              height: "auto",
              alignItems: "center",
              justifyItems: "center",
              justifyContent: "center",
            }}
          >
            {/* Ticket Number */}
            <Box
              sx={{
                width: { xs: "100%", sm: "60%", md: "60%" },
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
                // mt:6,
                // mb:6
              }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  letterSpacing: "8px",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "4rem" },
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
  );
};

export default Winnerpage;
