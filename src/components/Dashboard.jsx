import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Container, Box } from "@mui/material";

const Dashboard = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState(false); // State to track error

  const navigate = useNavigate();

  const handleSearch = () => {
    if (isValidPhoneNumber(phoneNumber)) {
      navigate(`/User-page`);
    } else {
      // Show error by changing border color and setting error state
      setPhoneNumberError(true);
    }
  };

  const handleChange = (e) => {
    setPhoneNumber(e.target.value);
    // Reset error state when user starts typing again
    if (phoneNumberError) {
      setPhoneNumberError(false);
    }
  };

  // Function to validate phone number format (example: simple length check)
  const isValidPhoneNumber = (number) => {
    // Example: Check if length is 10 (for a basic example)
    return number.length === 10;
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <h1>ค้นหาด้วยหมายเลขโทรศัพท์</h1>
      <Box sx={{ width: "70%" }}>
        <TextField
          label="กรอกหมายเลขโทรศัพท์ 10 หลัก"
          variant="outlined"
          value={phoneNumber}
          onChange={handleChange}
          fullWidth
          margin="normal"
          error={phoneNumberError} // Apply error state to TextField
          helperText={
            phoneNumberError ? "รูปแบบของหมายเลขโทรศัพท์ไม่ถูกต้อง" : ""
          }
          InputProps={{
            style: { borderColor: phoneNumberError ? "red" : "" }, // Apply red border if error
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSearch}
          sx={{ mt: 2 }}
          fullWidth
        >
          ค้นหา
        </Button>
      </Box>
    </Container>
  );
};

export default Dashboard;
