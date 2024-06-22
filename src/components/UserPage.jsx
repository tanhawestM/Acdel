import React from "react";
import {
  Box,
  Table,
  TableContainer,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const UserPage = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#F3F4F6",
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        color: "black",
        p: 4,
      }}
    >
      {/* Symbol and "Back to Search" Link */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <IconButton component={Link} to="/" sx={{ mr: 1 }} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography component={Link} to="/" variant="h6" color="blue">
          กลับสู่หน้าค้นหา
        </Typography>
      </Box>

      <h2>ข้อมูลผู้ใช้</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user information table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                ชื่อ - นามสกุล
              </TableCell>
              <TableCell>John Doe</TableCell> {/* Replace with actual name */}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                Sale ภูมิภาค
              </TableCell>
              <TableCell>Miss A</TableCell>{" "}
              {/* Replace with actual sale amount */}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                บริษัท
              </TableCell>
              <TableCell>Store ABC</TableCell>{" "}
              {/* Replace with actual store name */}
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                เบอร์โทรศัพท์
              </TableCell>
              <TableCell>123-456-7890</TableCell>{" "}
              {/* Replace with actual phone number */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Box mt={4}>
        <h2>ตั๋วของคุณ</h2>
        <Box
          sx={{
            border: "1px solid black",
            borderRadius: "8px",
            backgroundColor: "white",
            height: "1/4",
            width: "3/4",
            display: "flex",
            flexDirection: "column",
            color: "black",
            p: 4,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              textAlign: "center",
              fontSize: "80px",
              fontWeight: "bold",
            }}
          >
            10875
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
