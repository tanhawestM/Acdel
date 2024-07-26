import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const ContentWrapper = ({ children, opacity }) => (
  <Box
    sx={{
      opacity: opacity,
      transition: "opacity 0.3s ease-in-out",
      width: "100%",
      height: "100%",
    }}
  >
    {children}
  </Box>
);

const Dashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    const unformattedNumber = phoneNumber.replace(/\D/g, "");
    if (isValidPhoneNumber(unformattedNumber)) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/appNG2JNEI5eGxlnE/UserInfo?filterByFormula={phoneNumber}="${unformattedNumber}"`,
          {
            headers: {
              Authorization: `Bearer pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77`,
            },
          }
        );

        setLoading(false);
        if (response.data.records.length > 0) {
          const userData = response.data.records[0].fields;
          if (userData.numoftic === 0) {
            setShowPopup(true);
          } else {
            navigate(`/User-page`, {
              state: { userData: userData },
            });
          }
        } else {
          setPhoneNumberError("ไม่พบข้อมูลผู้ใช้สำหรับหมายเลขโทรศัพท์นี้");
        }
      } catch (error) {
        console.error("Error searching Airtable:", error);
        setLoading(false);
        setPhoneNumberError("เกิดข้อผิดพลาดในการค้นหาข้อมูล กรุณาลองอีกครั้ง");
      }
    } else {
      setPhoneNumberError("รูปแบบของหมายเลขโทรศัพท์ไม่ถูกต้อง");
    }
  };

  const handleChange = (e) => {
    const input = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhoneNumber(formatPhoneNumber(input));
    if (phoneNumberError) {
      setPhoneNumberError("");
    }
  };

  const isValidPhoneNumber = (number) => {
    const digitsOnly = number.replace(/\D/g, "");
    return digitsOnly.length === 10;
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const formatPhoneNumber = (number) => {
    const digits = number.replace(/\D/g, "");
    if (digits.length <= 3) {
      return digits;
    } else if (digits.length <= 6) {
      return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    } else {
      return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(
        6,
        10
      )}`;
    }
  };

  const Popup = () => (
    <Box
      sx={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "white",
        padding: 5,
        borderRadius: 2,
        boxShadow: 3,
        zIndex: 1001,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        ขออภัยไม่พบข้อมูลของท่าน
      </Typography>
      <Button variant="contained" onClick={() => setShowPopup(false)}>
        ปิด
      </Button>
    </Box>
  );

  return (
    <Box
      sx={{
        position: "relative",
        minHeight: "100vh",
        width: 1,
      }}
    >
      <ContentWrapper opacity={showPopup ? 0.3 : 1}>
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
              width: 1,
              height: "auto",
              backgroundColor: "#EBF1FF",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              pt: { xs: 3, sm: 4, md: 2 },
              pb: { xs: 12, sm: 11, md: 9 },
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                textAlign: "center",
                mb: { xs: 6, sm: 2, md: 5 },
                mt: { xs: 1, sm: 2, md: 5 },
                mx: { xs: 3, sm: 2, md: 5 },
                gap: { xs: 0, sm: 1, md: 1 },
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  textAlign: "left",
                  fontWeight: "bold",
                  fontSize: { xs: 35, sm: "1.5rem", md: "2rem" },
                }}
              >
                ลุ้นรางวัลมากมายในงาน Acdelco 2024
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  fontSize: { xs: 35, sm: "1.5rem", md: "2rem" },
                  textAlign: "left",
                }}
              >
                เพียงซื้อสินค้าครบ 25,000 ต่อใบเสร็จ รับสิทธิ์ 1 สิทธิ์
              </Typography>
            </Box>
            <Typography
              variant="h5"
              sx={{
                fontSize: { xs: "1.5rem", sm: "1.5rem", md: "1.5rem" },
              }}
            >
              ตรวจสอบสิทธิ์ร่วมลุ้นรางวัล
            </Typography>
            <Box
              sx={{
                width: { xs: "90%", sm: "70%", md: "40%" },
                mb: { xs: 24, sm: 2, md: 3 },
              }}
            >
              <TextField
                label=""
                variant="outlined"
                value={phoneNumber}
                onChange={handleChange}
                onKeyPress={handleKeyPress}
                fullWidth
                margin="normal"
                error={!!phoneNumberError}
                helperText={phoneNumberError}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  placeholder: "กรอกหมายเลขโทรศัพท์ 10 หลัก",
                  style: {
                    backgroundColor: "white",
                    borderColor: phoneNumberError ? "red" : "",
                  },
                }}
                InputLabelProps={{
                  shrink: false,
                  sx: {
                    fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" },
                    ml: -1,
                    padding: "0 8px",
                  },
                }}
              />
              <Button
                variant="contained"
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  mt: 2,
                  mb: { xs: 5, sm: 2, md: 2 },
                  width: { xs: "100%", sm: "70%", md: "70%" },
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" },
                  backgroundColor: "#0072CE",
                }}
              >
                {loading ? (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CircularProgress size={20} sx={{ color: "white" }} />
                    <span style={{ color: "white" }}>กำลังค้นหา</span>
                  </Box>
                ) : (
                  <span style={{ color: "white" }}>ค้นหา</span>
                )}
              </Button>
            </Box>
          </Box>
        </Box>
      </ContentWrapper>
      {showPopup && <Popup />}
    </Box>
  );
};

export default Dashboard;
