import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ShareIcon from '@mui/icons-material/Share';
import PrintIcon from '@mui/icons-material/Print';
import FacebookIcon from '@mui/icons-material/Facebook';
import LinkIcon from '@mui/icons-material/Link';



const UserPage = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const [shareAnchorEl, setShareAnchorEl] = useState(null);

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
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
    handleShareClose();
  };

  const handleLineShare = () => {
    window.open(`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(window.location.href)}`, '_blank');
    handleShareClose();
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
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
        p: 4,
        padding: { md: "1rem", sm: "0.8rem", xs: "0.6rem" },
        fontSize: { md: "18px", sm: "14px", xs: "10px" },
      }}
    >
      <Box sx={{ mt: 4, mx: 10 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              component={Link}
              to="/"
              sx={{
                mr: 1,
                backgroundColor: "blue",
                color: "white",
                fontSize: { md: "18px", sm: "14px", xs: "10px" },
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>
            <Typography variant="h4" sx={{ ml: 2, mb: 2, fontWeight: "bold" }}>
              สวัสดีคุณ {userData.firstname}
            </Typography>
          </Box>
          <Box>
            <IconButton sx={{
                mr: 2,
                backgroundColor: "blue",
                color: "white",
                fontSize: { md: "18px", sm: "14px", xs: "10px" },
              }} onClick={handleShareClick}>
              <ShareIcon />
            </IconButton>
            <Menu
              anchorEl={shareAnchorEl}
              open={Boolean(shareAnchorEl)}
              onClose={handleShareClose}
            >
              <MenuItem onClick={handleFacebookShare}><FacebookIcon sx={{ mr: 1 }} /> Facebook</MenuItem>
              <MenuItem onClick={handleLineShare}><img src="line-icon.png" alt="Line" style={{ width: 24, height: 24, marginRight: 8 }} /> Line</MenuItem>
              <MenuItem onClick={handleCopyLink}><LinkIcon sx={{ mr: 1 }} /> Copy Link</MenuItem>
            </Menu>
            <IconButton sx={{
                mr: 1,
                backgroundColor: "blue",
                color: "white",
                fontSize: { md: "18px", sm: "14px", xs: "10px" },
              }} onClick={handlePrint}>
              <PrintIcon />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h5" sx={{ mb: 3,ml:9, fontWeight: "bold" }}>ข้อมูลส่วนตัว</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: "10%" }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>ชื่อ - นามสกุล</Typography>
            <Typography sx={{width: "30vw", mb: 2, backgroundColor: 'grey.400', py: 1, px: 3, borderRadius: 5 }}>
              {userData.firstname} {userData.lastname}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>ชื่ออู่/ร้านค้า</Typography>
            <Typography sx={{width: "30vw", mb: 2, backgroundColor: 'grey.400', py: 1, px: 3, borderRadius: 5 }}>
              {userData.Store}
            </Typography>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>เบอร์โทรศัพท์</Typography>
            <Typography sx={{width: "30vw", mb: 2, backgroundColor: 'grey.400', py: 1, px: 3, borderRadius: 5 }}>
              {userData.phoneNumber}
            </Typography>
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>ตัวแทนจำหน่าย</Typography>
            <Typography sx={{width: "30vw", mb: 2, backgroundColor: 'grey.400', py: 1, px: 3, borderRadius: 5 }}>
              {userData.Sale}
            </Typography>
          </Box>
        </Box>

        <Box mt={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: "normal" }}>
              สิทธิ์ร่วมลุ้นรางวัลของคุณคือ 10 สิทธิ์
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ข้อมูล ณ วันที่ 24 มิถุนายน 2567
            </Typography>
          </Box>
          <Box
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              backgroundColor: "white",
              height: "200px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              p: 4,
              ml: 5,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {userData.Ticket}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
