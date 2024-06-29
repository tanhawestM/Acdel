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

const UserPage = () => {
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
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            justifyContent: "space-between",
            mb: 2,
          }}
        >
          <Box
            sx={{ display: "flex", alignItems: "center", mb: { xs: 2, sm: 0 } }}
          >
            <IconButton
              component={Link}
              to="/"
              sx={{
                mr: 1,
                backgroundColor: "#1678D1",
                color: "white",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
                "&:hover": {
                  backgroundColor: "blue",
                  color: "white",
                },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h4" sx={{ ml: 2, fontWeight: "bold" }}>
              สวัสดีคุณ {userData.firstname}
            </Typography>
          </Box>
          <Box>
            <IconButton
              sx={{
                mr: 1,
                backgroundColor: "#1678D1",
                color: "white",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
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
                backgroundColor: "#1678D1",
                color: "white",
                fontSize: { xs: "0.8rem", sm: "1rem", md: "1.2rem" },
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

        <Typography
          variant="h4"
          sx={{ mb: 3, ml: { xs: 0, sm: 9 }, fontWeight: "bold" }}
        >
          ข้อมูลส่วนตัว
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "center",
            gap: { xs: "1rem", md: "20%" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "35%" },
            }}
          >
            <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
              ชื่อ - นามสกุล
            </Typography>
            <Typography
              sx={{
                mb: 2,
                backgroundColor: "#A1A1AC",
                py: 1,
                px: 3,
                borderRadius: 5,
              }}
            >
              {userData.firstname} {userData.lastname}
            </Typography>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
              ชื่ออู่/ร้านค้า
            </Typography>
            <Typography
              sx={{
                mb: 2,
                backgroundColor: "#A1A1AC",
                py: 1,
                px: 3,
                borderRadius: 5,
              }}
            >
              {userData.Store}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: { xs: "100%", md: "35%" },
            }}
          >
            <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
              เบอร์โทรศัพท์
            </Typography>
            <Typography
              sx={{
                mb: 2,
                backgroundColor: "#A1A1AC",
                py: 1,
                px: 3,
                borderRadius: 5,
              }}
            >
              {userData.phoneNumber}
            </Typography>
            <Typography variant="h5" sx={{ mb: 1, fontWeight: "bold" }}>
              ตัวแทนจำหน่าย
            </Typography>
            <Typography
              sx={{
                mb: 2,
                backgroundColor: "#A1A1AC",
                py: 1,
                px: 3,
                borderRadius: 5,
              }}
            >
              {userData.Sale}
            </Typography>
          </Box>
        </Box>

        <Box mt={4}>
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", sm: "center" },
              mb: 3,
            }}
          >
            <Typography
              variant="h5"
              sx={{ mb: { xs: 1, sm: 0 }, fontWeight: "normal" }}
            >
              สิทธิ์ร่วมลุ้นรางวัลของคุณคือ {userData.countTic} สิทธิ์
            </Typography>
            <Typography variant="h5">
              ข้อมูล ณ วันที่ {currentThaiDate}
            </Typography>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 2,
              overflowY: "auto",
            }}
          >
            {[...Array(Number(userData.countTic))].map((_, index) => (
              <Box
                key={index}
                sx={{
                  border: "1px solid black",
                  borderRadius: "8px",
                  backgroundColor: "#1678D1",
                  width: { xs: "90%", sm: "70%", md: "50%" },
                  aspectRatio: "2 / 1",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "black",
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
                  }}
                >
                  {userData.tickets}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
