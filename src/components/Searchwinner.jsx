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
  MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Searchwinnerpage = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [prizeName, setPrizeName] = useState("");
  const [ticketNumberError, setTicketNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const prizeOptions = ["iphone", "gold", "car"];

  const handleSearch = async () => {
    if (isValidTicketNumber(ticketNumber)) {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://api.airtable.com/v0/appNG2JNEI5eGxlnE/UserInfo`,
          {
            headers: {
              Authorization: `Bearer pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77`,
            },
          }
        );
  
        setLoading(false);
        const matchingRecord = response.data.records.find(record => 
          record.fields.randomticket && 
          record.fields.randomticket.split(', ').includes(ticketNumber)
        );
  
        if (matchingRecord) {
          const userData = matchingRecord.fields;
          let prizeImageURL = "";
  
          switch (prizeName.toLowerCase()) {
            case "iphone":
              prizeImageURL = userData.IphonePicURL;
              break;
            case "gold":
              prizeImageURL = userData.GoldPicURL;
              break;
            case "car":
              prizeImageURL = userData.CarPicURL;
              break;
            default:
              prizeImageURL = "";
          }
  
          navigate(`/Winner`, {
            state: {
              userData: userData,
              prizeImageURL: prizeImageURL,
              prizeName: prizeName,
              ticketNumber: ticketNumber, // Add this line
            },
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

  const handleChange = (e, field) => {
    if (field === "ticketNumber") {
      setTicketNumber(e.target.value);
      setTicketNumberError("");
    } else if (field === "prizeName") {
      setPrizeName(e.target.value);
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
            label=""
            variant="outlined"
            value={ticketNumber}
            onChange={(e) => handleChange(e, "ticketNumber")}
            onKeyPress={handleKeyPress}
            fullWidth
            margin="normal"
            error={!!ticketNumberError}
            helperText={ticketNumberError}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              placeholder: "กรอกหมายเลขตั๋ว 5 หลัก",
              style: {
                backgroundColor: "white",
                borderColor: ticketNumberError ? "red" : "",
              },
            }}
          />

          <TextField
            select
            label="เลือกรางวัลที่ได้รับ"
            variant="outlined"
            value={prizeName}
            onChange={(e) => handleChange(e, "prizeName")}
            fullWidth
            margin="normal"
            InputProps={{
              style: {
                backgroundColor: "white",
              },
            }}
          >
            {prizeOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            onClick={handleSearch}
            disabled={loading}
            sx={{
              mt: 2,
              mb: { xs: 5, sm: 2, md: 4 },
              width: { xs: "100%", sm: "70%", md: "70%" },

              fontSize: { xs: "1rem", sm: "1.2rem", md: "1.2rem" },
              backgroundColor: "#FFC008",
              "&:hover": {
                backgroundColor: "#e0a804", // This is the new hover color
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
