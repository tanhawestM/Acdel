import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const SearchwinnerforQpage = () => {
  const [ticketNumber, setTicketNumber] = useState("");
  const [prizeName, setPrizeName] = useState("");
  const [ticketNumberError, setTicketNumberError] = useState("");
  const [loading, setLoading] = useState(false);
  const [availablePrizes, setAvailablePrizes] = useState([]);
  const navigate = useNavigate();

  // Updated prize structure with quantities
  const defaultPrizes = [
    { name: "Iphone 16 Pro max 256 GB*", quantity: 3 },
    { name: "Motorcycle HONDA Grom", quantity: 1 },
    { name: "ทองคำมูลค่า 1 บาท", quantity: 3 },
    { name: "I-Pad 64 Gb Wifi", quantity: 3 },
    { name: 'Smart TV 55"', quantity: 2 },
    { name: "JBL Speaker Party box 110", quantity: 2 },
  ];

  useEffect(() => {
    fetchAvailablePrizes();
  }, []);

  const fetchAvailablePrizes = async () => {
    try {
      const response = await axios.get(
        "https://api.airtable.com/v0/appNG2JNEI5eGxlnE/Winner",
        {
          headers: {
            Authorization: `Bearer pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77`,
          },
        }
      );

      // Create a map to count claimed prizes
      const claimedPrizeCounts = {};
      response.data.records.forEach((record) => {
        const prizeName = record.fields.PrizeName.split(" (")[0];
        claimedPrizeCounts[prizeName] =
          (claimedPrizeCounts[prizeName] || 0) + 1;
      });

      // Calculate remaining prizes
      const remainingPrizes = defaultPrizes
        .map((prize) => ({
          ...prize,
          quantity: prize.quantity - (claimedPrizeCounts[prize.name] || 0),
        }))
        .filter((prize) => prize.quantity > 0)
        .map((prize) => ({
          ...prize,
          displayName: `${prize.name} (${prize.quantity} รางวัล)`,
        }));

      setAvailablePrizes(remainingPrizes);
    } catch (error) {
      console.error("Error fetching available prizes:", error);
      setAvailablePrizes(
        defaultPrizes.map((prize) => ({
          ...prize,
          displayName: `${prize.name} (${prize.quantity})`,
        }))
      );
    }
  };

  const recordWinner = async (
    phoneNumber,
    selectedPrize,
    ticketNumber,
    Sale
  ) => {
    try {
      await axios.post(
        "https://api.airtable.com/v0/appNG2JNEI5eGxlnE/Winner",
        {
          records: [
            {
              fields: {
                PhoneNumber: phoneNumber,
                PrizeName: selectedPrize,
                TicketNumber: ticketNumber,
                Sale: Sale,
              },
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77`,
            "Content-Type": "application/json",
          },
        }
      );

      setAvailablePrizes((prev) =>
        prev
          .map((prize) => {
            if (prize.displayName === selectedPrize) {
              const newQuantity = prize.quantity - 1;
              return newQuantity > 0
                ? {
                    ...prize,
                    quantity: newQuantity,
                    displayName: `${prize.name} (${newQuantity})`,
                  }
                : null;
            }
            return prize;
          })
          .filter(Boolean)
      );

      return true;
    } catch (error) {
      console.error("Error recording winner:", error);
      return false;
    }
  };

  const handleSearch = async () => {
    if (isValidTicketNumber(ticketNumber)) {
      setLoading(true);
      try {
        let allRecords = [];
        let offset = null;

        do {
          const response = await axios.get(
            `https://api.airtable.com/v0/appNG2JNEI5eGxlnE/UserInfo`,
            {
              headers: {
                Authorization: `Bearer pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77`,
              },
              params: { pageSize: 100, offset: offset },
            }
          );

          allRecords = [...allRecords, ...response.data.records];
          offset = response.data.offset;
        } while (offset);

        const matchingRecord = allRecords.find(
          (record) =>
            record.fields.randomticket &&
            record.fields.randomticket.split(", ").includes(ticketNumber)
        );

        if (matchingRecord) {
          const userData = matchingRecord.fields;
          const success = await recordWinner(
            userData.phoneNumber,
            prizeName,
            ticketNumber
          );

          if (success) {
            const basePrizeName = prizeName.split(" (")[0];
            let prizeImageURL = "";
            switch (basePrizeName) {
              case "Iphone 16 Pro max 256 GB*":
                prizeImageURL = "Iphone.png";
                break;
              case "Motorcycle HONDA Grom":
                prizeImageURL = "HondaG.png";
                break;
              case "ทองคำมูลค่า 1 บาท":
                prizeImageURL = "Goldchain.png";
                break;
              case "I-Pad 64 Gb Wifi":
                prizeImageURL = "Ipad.png";
                break;
              case 'Smart TV 55"':
                prizeImageURL = "SmartTV.png";
                break;
              case "JBL Speaker Party box 110":
                prizeImageURL = "JBL.png";
                break;
              default:
                prizeImageURL = "";
            }

            navigate(`/Winner`, {
              state: {
                userData: {
                  firstname: userData.firstname,
                  lastname: userData.lastname,
                  phoneNumber: userData.phoneNumber,
                  Sale: userData.Sale,
                },
                prizeImageURL,
                prizeName,
                ticketNumber,
              },
            });
          } else {
            setTicketNumberError(
              "เกิดข้อผิดพลาดในการบันทึกข้อมูล กรุณาลองอีกครั้ง"
            );
          }
        } else {
          setTicketNumberError("ไม่พบหมายเลขตั๋วใบนี้");
        }
      } catch (error) {
        console.error("Error:", error);
        setTicketNumberError("เกิดข้อผิดพลาดในการค้นหาข้อมูล กรุณาลองอีกครั้ง");
      } finally {
        setLoading(false);
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
    return number.length === 5; //check for number of ticket
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
            {availablePrizes.map((prize) => (
              <MenuItem key={prize.displayName} value={prize.displayName}>
                {prize.displayName}
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
                backgroundColor: "#e0a804",
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

export default SearchwinnerforQpage;
