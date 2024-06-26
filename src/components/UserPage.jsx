import React from "react";
import { useLocation, Link } from "react-router-dom";
import {
  Box,
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  IconButton,
  Typography,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { blue } from "@mui/material/colors";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const UserPage = () => {
  const location = useLocation();
  const userData = location.state?.userData;

  if (!userData) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography variant="h6">
          No user data found. Please go back and search again.
        </Typography>
        <Link to="/">Back to Search</Link>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        backgroundColor: "#F3F4F6",
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        color: "black",
        p: 4,
      }}
    >
      <Box sx={{ m: 5 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <IconButton
            component={Link}
            to="/"
            sx={{
              mr: 1,
              backgroundColor: "blue",
              colo: "white",
            }}
          >
            <ArrowBackIosNewIcon />
          </IconButton>
          {/* <Typography component={Link} to="/" variant="h6" color="primary">
            กลับสู่หน้าค้นหา
          </Typography> */}
        </Box>
        <Typography variant="h4" sx={{ mb: 2 }}>
          สวัสดีคุณ&nbsp;{userData.firstname}
        </Typography>
        <Typography variant="h5" sx={{ mb: 2 }}>
          ข้อมูลส่วนตัว
        </Typography>
        {/* <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="user information table">
          <TableBody>
            <TableRow>
              <TableCell component="th" scope="row">
                ชื่อ - นามสกุล
              </TableCell>
              <TableCell>{userData.firstname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                เบอร์โทรศัพท์
              </TableCell>
              <TableCell>{userData.phoneNumber}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                ชื่ออู่/ร้านค้า
              </TableCell>
              <TableCell>{userData.Store}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">
                ตัวแทนจำหน่าย
              </TableCell>
              <TableCell>{userData.Sale}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer> */}

        <Box mt={4}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              สิทธิ์ร่วมลุ้นรางวัลของคุณคือ 10 สิทธิ์
            </Typography>
            <Typography variant="h6" sx={{ mb: 2 }}>
              ข้อมูล ณ วันที่ 24 มิถุนายน 2567
            </Typography>
          </Box>

          <Box
            sx={{
              border: "1px solid black",
              borderRadius: "8px",
              backgroundColor: "white",
              height: "200px",
              width: "300px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "black",
              p: 4,
              ml: 5,
            }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              {userData.ticketNumber}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UserPage;
