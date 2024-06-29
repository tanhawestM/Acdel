import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Box,
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
  const theme = useTheme();

  const handleSearch = async () => {
    if (isValidPhoneNumber(phoneNumber)) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/appNG2JNEI5eGxlnE/UserInfo?filterByFormula={phoneNumber}="${phoneNumber}"`,
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
    setPhoneNumber(e.target.value);
    if (phoneNumberError) {
      setPhoneNumberError("");
    }
  };

  const isValidPhoneNumber = (number) => {
    return number.length === 10 && /^\d{10}$/.test(number);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch();
    }
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
    fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
  }}
>
<Box
  component="img"
  sx={{
    height: "auto",
    width: { xs: "90%", sm: "80%", md: "60%" },
    mt: { xs: 3, sm: 4, md: 10 },
    mb: 2,
  }}
  alt=""
  src="Symbol.png"
/>
<Box
  sx={{
    width: 1,
    backgroundColor: "#EBF1FF",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    pt: { xs: 3, sm: 4, md: 4 },
    pb: { xs: 10, sm: 11, md: 4 },
  }}
>
<Box
  sx={{
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    mb: 2,
  }}
>
  <h1
    style={{
      fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" },
      marginTop: { xs: "1rem", sm: "1.5rem", md: "2rem" },
    }}
  >
    ลุ้นรางวัลมากมายในงาน Acdelco 2024 เพียงซื้อ
  </h1>
  <h1 style={{ fontSize: { xs: "1.2rem", sm: "1.5rem", md: "2rem" }, margin: 0 }}>
    สินค้าครบ 25,000 ต่อใบเสร็จ รับสิทธิ์ 1 สิทธิ์
  </h1>
</Box>
<h2 style={{ fontSize: { xs: "1rem", sm: "1.2rem", md: "1.5rem" } }}>
  ตรวจสอบสิทธิ์ร่วมลุ้นรางวัล
</h2>
<Box sx={{ width: { xs: "90%", sm: "70%", md: "40%" } }}>
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
  />
  <Button
    variant="contained"
    onClick={handleSearch}
    disabled={loading}
    sx={{
      mt: 2,
      mb: 1,
      width: { xs: "100%", sm: "70%", md: "50%" },
      fontSize: { xs: "0.8rem", sm: "0.875rem" },
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
