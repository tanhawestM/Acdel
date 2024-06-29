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

const Searchwinnerpage = () => {
  const [TicketNumber, setTicketNumber] = useState("");
  const [TicketNumberError, setTicketNumberError] = useState("");
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSearch = async () => {
    if (isValidTicketNumber(TicketNumber)) {
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/appNG2JNEI5eGxlnE/AllTicket?filterByFormula={TicketNumber}="${TicketNumber}"`,
          {
            headers: {
              Authorization: `Bearer pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77`,
            },
          }
        );

        if (response.data.records.length > 0) {
          navigate(`/Winner`, {
            state: { userData: response.data.records[0].fields },
          });
        } else {
          setTicketNumberError("ไม่พบหมายเลขตั๋วใบนี้");
        }
      } catch (error) {
        console.error("Error searching Airtable:", error);
        setTicketNumberError("เกิดข้อผิดพลาดในการค้นหาข้อมูล กรุณาลองอีกครั้ง");
      }
    } else {
      setTicketNumberError("รูปแบบของหมายเลขตั๋วไม่ถูกต้อง");
    }
  };

  const handleChange = (e) => {
    setTicketNumber(e.target.value);
    if (TicketNumberError) {
      setTicketNumberError("");
    }
  };

  const isValidTicketNumber = (number) => {
    return number.length === 5;
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
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
          minHeight:"60vh",
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
            ค้นหาผู้โชคดี
          </h1>
        </Box>
        {/* <h2 style={{ fontSize: isMobile ? "20px" : "24px" }}>
          ตรวจสอบสิทธิ์ร่วมลุ้นรางวัล
        </h2> */}
        <Box sx={{ width: isMobile ? "90%" : "40%" }}>
          <TextField
            label="กรอกหมายเลขตั๋ว 5 หลัก"
            variant="outlined"
            value={TicketNumber}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            fullWidth
            margin="normal"
            error={!!TicketNumberError}
            helperText={TicketNumberError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                backgroundColor: "white",
                borderColor: TicketNumberError ? "red" : "",
              },
            }}
          />
          <Button
            variant="contained"
            
            onClick={handleSearch}
            sx={{
              mt: 2,
              mb: isMobile ? 5 : 10,
              width: isMobile ? "100%" : "50%",
              fontSize: "0.875rem",
              backgroundColor:"Orange",
             "&:hover":{
              backgroundColor:"#e69500",
             }
            }}
          >
            ค้นหา
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Searchwinnerpage;
