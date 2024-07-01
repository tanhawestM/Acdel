import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Box, Typography, IconButton, Menu, MenuItem } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShareIcon from "@mui/icons-material/Share";
import PrintIcon from "@mui/icons-material/Print";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkIcon from "@mui/icons-material/Link";

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
  const { userData, prizeImageURL, prizeName } = location.state;
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  

  const currentThaiDate = getCurrentThaiDate();

  const getPrizeDisplay = (prizeName) => {
    switch (prizeName.toLowerCase()) {
      case 'iphone':
        return 'Iphone 15 Pro Max';
      case 'gold':
        return 'Gold 24K';
      case 'car':
        return 'Toyota Vios';
      default:
        return prizeName; // fallback to original prize name if not matched
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShareClick = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  const handleFacebookShare = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
    handleShareClose();
  };

  const handleLineShare = () => {
    window.open(
      `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
        window.location.href
      )}`,
      "_blank"
    );
    handleShareClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
    handleShareClose();
  };

  if (!userData) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">
          No user data found. Please go back and search again.
        </Typography>
        <Link to="/">Back to Search</Link>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F3F4F6",
        minHeight: "100vh",
        width: "100%",
        color: "black",
        p: { xs: 2, sm: 3, md: 4 }, // Responsive padding
      }}
    >
      <Box sx={{ mt: { xs: 2, sm: 3, md: 4 }, mx: { xs: 2, sm: 5, md: 10 } }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: { sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            mb: { xs: 0, sm: 2, md: 2 },
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}
          >
            <IconButton
              component={Link}
              to="/SearchWinner"
              sx={{
                mr: 1,
                backgroundColor: "#1678D1",
                color: "white",
                padding: { xs: "4px", sm: "8px", md: "12px" },
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
            >
              <ArrowBackIosNewIcon
                sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }}
              />
            </IconButton>
            <Typography
              variant="h4"
              sx={{
                ml: 2,
                fontWeight: "bold",
                fontSize: { xs: 20, sm: 30, md: 40 },
              }}
            >
              สวัสดีคุณ {userData.firstname}
            </Typography>
          </Box>
          <Box>
            <IconButton
              sx={{
                mr: 1,
                backgroundColor: "#1678D1",
                color: "white",
                padding: { xs: "4px", sm: "8px", md: "12px" },
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
              onClick={handlePrint}
            >
              <PrintIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
            </IconButton>
            <IconButton
              sx={{
                backgroundColor: "#1678D1",
                color: "white",
                padding: { xs: "4px", sm: "8px", md: "12px" },
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
              onClick={handleShareClick}
            >
              <ShareIcon sx={{ fontSize: { xs: 20, sm: 22, md: 24 } }} />
            </IconButton>
            <Menu
              anchorEl={shareAnchorEl}
              open={Boolean(shareAnchorEl)}
              onClose={handleShareClose}
            >
              <MenuItem onClick={handleFacebookShare}>
                <FacebookIcon sx={{ mr: 1 }} /> Facebook
              </MenuItem>
              <MenuItem onClick={handleLineShare}>
                <img
                  src="line-icon.png"
                  alt="Line"
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />{" "}
                Line
              </MenuItem>
              <MenuItem onClick={handleCopyLink}>
                <LinkIcon sx={{ mr: 1 }} /> Copy Link
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              mb: 3,
              ml: { xs: 0, sm: 9 },
              fontWeight: "bold",
              fontSize: { xs: 20, sm: 30, md: 40 },
              color:"#0072CE"
            }}
          >
            ขอแสดงความยินดี
          </Typography>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              backgroundColor: "#0072CE",
              width: { xs: "80%", sm: "60%", md: "40%" },
              mx: "auto",
              p: { xs: 2, sm: 3, md: 4 },
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                color: "white",
                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              }}
            >
              {userData.TicketNumber}
            </Typography>
          </Box>

          <Typography
      variant="h4"
      sx={{
        mt: { xs: 4, sm: 5, md: 6 },
        mb: 2,
        fontWeight: "bold",
        color: "#0072CE",
        fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
      }}
    >
      คุณได้รับรางวัล {getPrizeDisplay(prizeName)}
    </Typography>
          <Box
  sx={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    mt: { xs: 4, sm: 5, md: 6 },
  }}
>
  <Box
    sx={{
      width: { xs: "80%", sm: "60%", md: "50%" },
      maxWidth: "300px",
      height: "auto",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    {prizeImageURL ? (
      <img 
        src={prizeImageURL} 
        alt="Prize" 
        style={{ 
          maxWidth: '100%', 
          height: 'auto', 
          display: 'block'
        }} 
      />
    ) : (
      <Typography>No prize image available for the specified prize.</Typography>
    )}
  </Box>
</Box>

        </Box>
      </Box>
    </Box>
  );
};

export default Winnerpage;
