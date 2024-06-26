import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Dashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = async () => {
    if (isValidPhoneNumber(phoneNumber)) {
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/appNG2JNEI5eGxlnE/UserInfo?filterByFormula={phoneNumber}="${phoneNumber}"`,
          {
            headers: {
              Authorization: `Bearer pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77`,
            },
          }
        );

        if (response.data.records.length > 0) {
          navigate(`/User-page`, {
            state: { userData: response.data.records[0].fields },
          });
        } else {
          setPhoneNumberError("ไม่พบข้อมูลผู้ใช้สำหรับหมายเลขโทรศัพท์นี้");
        }
      } catch (error) {
        console.error("Error searching Airtable:", error);
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
          width: isMobile ? "90%" : "60%",
          mt: isMobile ? 5 : 10,
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
          padding: isMobile ? 2 : 4,
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
              fontSize: isMobile ? "24px" : "36px",
              marginTop: isMobile ? "16px" : "32px",
            }}
          >
            ลุ้นรางวัลมากมายในงาน Acdelco 2024 เพียงซื้อ
          </h1>
          <h1 style={{ fontSize: isMobile ? "24px" : "36px", margin: 0 }}>
            สินค้าครบ 25,000 ต่อใบเสร็จ รับสิทธิ์ 1 สิทธิ์
          </h1>
        </Box>
        <h2 style={{ fontSize: isMobile ? "20px" : "24px" }}>
          ตรวจสอบสิทธิ์ร่วมลุ้นรางวัล
        </h2>
        <Box sx={{ width: isMobile ? "90%" : "40%" }}>
          <TextField
            label="กรอกหมายเลขโทรศัพท์ 10 หลัก"
            variant="outlined"
            value={phoneNumber}
            onChange={handleChange}
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
            color="primary"
            onClick={handleSearch}
            sx={{
              mt: 2,
              mb: isMobile ? 5 : 10,
              width: isMobile ? "100%" : "50%",
              fontSize: "0.875rem",
            }}
          >
            ค้นหา
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
