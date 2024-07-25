import React, { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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

const getCurrentMonth = () => {
  const date = new Date();
  const month = thaiMonths[date.getMonth()];
  const year = date.getFullYear() + 543; // Convert to Buddhist Era
  return `${month} ${year}`;
};

const UserPage = () => {
  const location = useLocation();
  const userData = location.state?.userData;
  const [shareAnchorEl, setShareAnchorEl] = useState(null);
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const ticketNumbers = userData.CloneAlltickets.toString()
    .split(", ")
    .map((num) => num.trim());

  // const Barcode = userData.CloneBarcodeURL.toString()
  //   .split(",")
  //   .map((num) => num.trim());

  const currentThaiDate = getCurrentThaiDate();
  const currentMonth = getCurrentMonth();

  const handlePrint = () => {
    window.print();
  };

  const handleShareClick = (event) => {
    setShareAnchorEl(event.currentTarget);
  };

  const handleShareClose = () => {
    setShareAnchorEl(null);
  };

  // const handleFacebookShare = () => {
  //   window.open(
  //     `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
  //       window.location.href
  //     )}`,
  //     "_blank"
  //   );
  //   handleShareClose();
  // };

  // const handleLineShare = () => {
  //   window.open(
  //     `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(
  //       window.location.href
  //     )}`,
  //     "_blank"
  //   );
  //   handleShareClose();
  // };

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
        minHeight: "100vh",
        width: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center",
        backgroundImage: "url('BG.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Box
        component="img"
        sx={{
          height: "auto",
          width: 1,
        }}
        alt=""
        src="Key.jpg"
      />
      <Box
        sx={{
          backgroundColor: "#F3F4F6",
          minHeight: "100vh",
          width: "100%",
          color: "black",
          p: { xs: 2, sm: 3, md: 4 },
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Box
            sx={{ mt: { xs: 2, sm: 3, md: 4 }, mx: { xs: 2, sm: 5, md: 10 } }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                mb: { xs: 2, sm: 2, md: 2 },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: { xs: 1, sm: 0 },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" },
                  }}
                >
                  <IconButton
                    component={Link}
                    to="/"
                    sx={{
                      mr: { xs: 0, sm: 1 },
                      mb: { xs: 1, sm: 0 },
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
                      fontWeight: "bold",
                      fontSize: { xs: 20, sm: 30, md: 40 },
                      display: { xs: "none", sm: "block" },
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
                </Box>
              </Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 20, sm: 30, md: 40 },
                  display: { xs: "block", sm: "none" },
                  textAlign: "left",
                  mt: 1,
                }}
              >
                สวัสดีคุณ {userData.firstname}
              </Typography>
            </Box>

            <Typography
              variant="h4"
              sx={{
                mb: 3,
                ml: { xs: 0, sm: 2, md: 9 },
                fontWeight: "bold",
                fontSize: { xs: 16, sm: 26, md: 30 },
                textAlign: "left",
              }}
            >
              ข้อมูลส่วนตัว
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                justifyContent: "center",
                gap: { xs: "0", md: "18%" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: { xs: "100%", md: "35%" },
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    fontSize: { xs: 12, sm: 14, md: 18 },
                    textAlign: "left",
                  }}
                >
                  ชื่อ - นามสกุล
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    backgroundColor: "#cdcdd1",
                    fontSize: { xs: 18, sm: 20, md: 24 },
                    py: 0.5,
                    px: 3,
                    borderRadius: 5,
                    textAlign: "left",
                  }}
                >
                  {userData.firstname} {userData.lastname}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    fontSize: { xs: 12, sm: 14, md: 18 },
                    textAlign: "left",
                  }}
                >
                  ชื่ออู่/ร้านค้า
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    backgroundColor: "#cdcdd1",
                    fontSize: { xs: 18, sm: 20, md: 24 },
                    py: 0.5,
                    px: 3,
                    borderRadius: 5,
                    textAlign: "left",
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
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    fontSize: { xs: 12, sm: 14, md: 18 },
                    textAlign: "left",
                  }}
                >
                  เบอร์โทรศัพท์
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    backgroundColor: "#cdcdd1",
                    fontSize: { xs: 18, sm: 20, md: 24 },
                    py: 0.5,
                    px: 3,
                    borderRadius: 5,
                    textAlign: "left",
                  }}
                >
                  {userData.formalPhoneNum}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    mb: 1,
                    fontWeight: "bold",
                    fontSize: { xs: 12, sm: 14, md: 18 },
                    textAlign: "left",
                  }}
                >
                  ตัวแทนจำหน่าย
                </Typography>
                <Typography
                  sx={{
                    mb: 2,
                    backgroundColor: "#cdcdd1",
                    fontSize: { xs: 18, sm: 20, md: 24 },
                    py: 0.5,
                    px: 3,
                    borderRadius: 5,
                    textAlign: "left",
                  }}
                >
                  {userData.Sale}
                </Typography>
              </Box>
            </Box>

            <Box mt={2}>
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
                  sx={{
                    mb: { xs: 1, sm: 0, md: 2 },
                    fontWeight: "normal",
                    fontSize: { xs: 20, sm: 22, md: 26 },
                  }}
                >
                  สิทธิ์ร่วมลุ้นรางวัลของคุณคือ {userData.countTic} สิทธิ์
                </Typography>
                {!isXs && (
                  <Typography
                    variant="h5"
                    sx={{ fontSize: { xs: 20, sm: 20, md: 26 } }}
                  >
                    ข้อมูล ณ วันที่ {currentThaiDate}
                  </Typography>
                )}
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
                      width: { xs: "60%", sm: "40%", md: "40%" },
                      aspectRatio: "2 / 0.8",
                      display: "flex",
                      flexDirection: "column", // Change to column
                      justifyContent: "space-between", // Distribute space
                      alignItems: "center",
                      color: "white",
                      textAlign: "center",
                      backgroundImage: "url('TicBG2.png')",
                      backgroundSize: "100% 100%",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                      textShadow: "4px 4px 8px rgba(0,0,0,0.5)",
                      position: "relative", // Add this for absolute positioning of month
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <Typography
                        variant="h3"
                        sx={{
                          fontWeight: "bold",
                          textAlign: "center",
                          letterSpacing: "8px",
                          fontSize: { xs: "2rem", sm: "2rem", md: "4.5rem" },
                          mr: { xs: "1.5rem", sm: "2rem", md: "5rem" },
                        }}
                      >
                        {ticketNumbers[index] || "N/A"}
                      </Typography>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        position: "absolute",
                        bottom: "5px",
                        right: "10px",
                        fontSize: { xs: "0.6rem", sm: "0.8rem", md: "1.2rem" },
                        opacity: 1,
                        mr: { xs: "0.1rem", sm: "0.5rem", md: "0.5rem" },
                      }}
                    >
                      เดือน {currentMonth}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
        {isXs && (
          <Box sx={{ mt: "auto", py: 2 }}>
            <Typography variant="h5" sx={{ fontSize: 20 }}>
              ข้อมูล ณ วันที่ {currentThaiDate}
            </Typography>
          </Box>
        )}
      </Box>
    {/* Add the Menu component here, at the end but still inside the outermost Box */}
    <Menu
      anchorEl={shareAnchorEl}
      open={Boolean(shareAnchorEl)}
      onClose={handleShareClose}
    >
      {/* <MenuItem onClick={handleFacebookShare}>
        <FacebookIcon sx={{ mr: 1 }} /> Share on Facebook
      </MenuItem>
      <MenuItem onClick={handleLineShare}>
        <img src="line-icon.png" alt="Line" style={{ width: 24, height: 24, marginRight: 8 }} />
        Share on Line
      </MenuItem> */}
      <MenuItem onClick={handleCopyLink}>
        <LinkIcon sx={{ mr: 1 }} /> Copy Link
      </MenuItem>
    </Menu>
  </Box>
  );
};

export default UserPage;
