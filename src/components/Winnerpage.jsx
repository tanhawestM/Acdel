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
  const userData = location.state?.userData;
  const [shareAnchorEl, setShareAnchorEl] = useState(null);

  const currentThaiDate = getCurrentThaiDate();

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
        <Link to="/Searchwinner">Back to Search</Link>
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
        p: 4,
        padding: { md: "1rem", sm: "0.8rem", xs: "0.6rem" },
        fontSize: { md: "18px", sm: "14px", xs: "10px" },
      }}
    >
      <Box sx={{ mt: 4, mx: 10 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              component={Link}
              to="/Searchwinner"
              sx={{
                mr: 1,
                backgroundColor: "#1678D1",
                color: "white",
                fontSize: { md: "18px", sm: "14px", xs: "10px" },
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h4" sx={{ ml: 2, mb: 2, fontWeight: "bold" }}>
              สวัสดีคุณ {userData.firstname}
            </Typography>
          </Box>
          <Box>
            <IconButton
              sx={{
                mr: 1,
                backgroundColor: "#1678D1",
                color: "white",
                fontSize: { md: "18px", sm: "14px", xs: "10px" },
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
              onClick={handlePrint}
            >
              <PrintIcon />
            </IconButton>
            <IconButton
              sx={{
                mr: 2,
                backgroundColor: "#1678D1",
                color: "white",
                fontSize: { md: "18px", sm: "14px", xs: "10px" },
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
              onClick={handleShareClick}
            >
              <ShareIcon />
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

        <Box mt={4} sx={{ justifyContent: "center",textAlign: "center", }}>
          <Typography
            variant="h3"
            sx={{
              mt: 2,
              ml: 2,
              mb: 2,
              fontWeight: "bold",
              color: "#1678D1",
            }}
          >
            ขอแสดงความยินดี
          </Typography>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              backgroundColor: "#1678D1",
              height: "auto",
              width: "1/4",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              p: 4,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {userData.TicketNumber}
            </Typography>
          </Box>
       
        <Typography
          variant="h3"
          sx={{
            mt: 6,
            ml: 2,
            mb: 2,
            fontWeight: "bold",
            color: "#1678D1",
          }}
        >
          คุณได้รับรางวัล {userData.PrizeName}
        </Typography>
        <img sx={{ width: "50px", height: "auto" }} src={userData.PicUrl} />
        </Box>
      </Box>
    </Box>
  );
};

export default Winnerpage;
