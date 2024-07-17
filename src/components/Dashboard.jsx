import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
  Button,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Dashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (isValidPhoneNumber(phoneNumber)) {
      setLoading(true);
      try {
        const unformattedNumber = phoneNumber.replace(/\D/g, "");
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
          navigate(`/User-page`, {
            state: { userData: response.data.records[0].fields },
          });
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
    return digitsOnly.length === 10 && /^\d{10}$/.test(digitsOnly);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const formatPhoneNumber = (number) => {
    if (number.length === 10) {
      return `${number.slice(0, 3)}-${number.slice(3, 6)}-${number.slice(6)}`;
    }
    return number;
  };

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
          width: { xs: "70%", sm: "60%", md: "40%" },
          mt: { xs: 10, sm: 8, md: 11 },
          mb: 2,
        }}
        alt=""
        src="Symbol.png"
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
            label="กรอกหมายเลขโทรศัพท์ 10 หลัก"
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
              style: {
                backgroundColor: "white",
                borderColor: phoneNumberError ? "red" : "",
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" },
                opacity: 0.9,
                backgroundColor: "rgb(245,245,245)",
                ml: -1,
                padding: "0 8px",
                "&.MuiInputLabel-shrink": {
                  transform: "translate(14px, -6px) scale(0.75)",
                },
              },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: phoneNumberError ? "red" : "rgba(0, 0, 0, 0.23)",
                },
              },
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
            sx={{
              mt: 2,
              mb: { xs: 5, sm: 2, md: 5 },
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
  );
};

export default Dashboard;
