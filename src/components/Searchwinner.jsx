import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Searchwinnerpage = () => {
  const [TicketNumber, setTicketNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [TicketNumberError, setTicketNumberError] = useState("");
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (isValidTicketNumber(TicketNumber)) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/appNG2JNEI5eGxlnE/AllTicket?filterByFormula={TicketNumber}="${TicketNumber}"`,
          {
            headers: {
              Authorization: `Bearer pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77`,
            },
          }
        );

        setLoading(false);
        if (response.data.records.length > 0) {
          navigate(`/Winner`, {
            state: { userData: response.data.records[0].fields },
          });
        } else {
          setTicketNumberError("ไม่พบหมายเลขตั๋วใบนี้");
        }
      } catch (error) {
        console.error("Error searching Airtable:", error);
        setLoading(false);
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
      }}
    >
      <Box
        component="img"
        sx={{
          height: "auto",
          width: { xs: "90%", sm: "80%", md: "60%" },
          mt: { xs: 10, sm: 8, md: 11 },
          mb: 2,
        }}
        alt=""
        src="Symbol.png"
      />
      <Box
        sx={{
          width: 1,
          height:"auto",
          backgroundColor: "#EBF1FF",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          pt: { xs: 3, sm: 4, md: 2 },
          pb: { xs: 12, sm: 11, md: 2 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            mb: { xs: 6, sm: 2, md: 5 },
            mt: { xs: 5, sm: 2, md: 5 },
            mx: { xs: 3, sm: 2, md: 5 },
            gap: { xs: 0, sm: 1, md: 1 },
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: 40, sm: "1.5rem", md: 50 },
              textAlign: "left",
            }}
          >
            ค้นหาผู้โชคดี
          </Typography>
        </Box>
        <Box
          sx={{
            width: { xs: "90%", sm: "70%", md: "40%" },
            mb: { xs: 24, sm: 2, md: 5 },
          }}
        >
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
            disabled={loading}
            sx={{
              mt: 2,
              mb: { xs: 21, sm: 2, md: 10 },
              width: { xs: "100%", sm: "70%", md: "50%" },
              fontSize: { xs: "0.8rem", sm: "0.875rem" },
              backgroundColor: "orange",
              "&:hover": {
                backgroundColor: "#e69500",
              },
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

export default Searchwinnerpage;
