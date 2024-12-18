import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CssBaseline,
  Grid,
  IconButton,
  CircularProgress,
  Snackbar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import MuiAlert from "@mui/material/Alert";

// Airtable configuration
const AIRTABLE_API_KEY =
  "pati3doCgwfAtQ6Xa.e7c8c2d2916b71dcbf7e6b8e72e477f046d14e4193acb1f152b370a49dc79d77";
const AIRTABLE_BASE_ID = "appNG2JNEI5eGxlnE";
const AIRTABLE_TABLE_NAME = "UserInfo";

// CSS to remove spinners from number inputs
const numberInputStyle = {
  "& input[type=number]": {
    MozAppearance: "textfield",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
};

// Function to pad numbers with leading zeros
const padNumber = (num) => {
  return num.toString().padStart(5, '0');
};

function Random() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [minRange, setMinRange] = useState("");
  const [phoneEntries, setPhoneEntries] = useState([]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  

  useEffect(() => {
    if (isAuthenticated && minRange) {
      fetchPhoneNumbers();
    }
  }, [isAuthenticated, minRange]);

  const fetchPhoneNumbers = async () => {
    setIsLoading(true);
    try {
      let allRecords = [];
      let offset = null;
      
      do {
        const response = await axios.get(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
          {
            params: {
              pageSize: 100,
              offset: offset,
              filterByFormula: '{สิทธิ์}>0',
              sort: [{ field: "phoneNumber", direction: "asc" }],
            },
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            },
          }
        );

        allRecords = [...allRecords, ...response.data.records];
        offset = response.data.offset;

        // Break the loop if we've reached 1000 records or there are no more records
        if (allRecords.length >= 1000 || !offset) {
          break;
        }
      } while (true);

      const phoneEntries = allRecords.slice(0, 1000).map(record => ({
        phoneNumber: record.fields.phoneNumber,
        count: 1,
        numoftic: record.fields.สิทธิ์ || null, // Use the "สิทธิ์" field for numoftic
      }));

      setPhoneEntries(phoneEntries);
    } catch (error) {
      console.error("Error fetching phone numbers:", error);
      showSnackbar("Error fetching phone numbers from Airtable.", "error");
    } finally {
      setIsLoading(false);
    }
  };


  const calculateMaxRange = () => {
    const totalCount = phoneEntries.reduce(
      (sum, entry) =>
        sum + (entry.numoftic !== null ? entry.numoftic : entry.count),
      0
    );
    return minRange ? parseInt(minRange) + totalCount - 1 : "";
  };

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneEntries = [...phoneEntries];
    newPhoneEntries[index] = {
      ...newPhoneEntries[index],
      phoneNumber: value,
    };
    setPhoneEntries(newPhoneEntries);
  };

  const handleCountChange = (index, value) => {
    const newPhoneEntries = [...phoneEntries];
    newPhoneEntries[index].count = Number(value);
    setPhoneEntries(newPhoneEntries);
  };

  const addPhoneEntry = () => {
    setPhoneEntries([
      ...phoneEntries,
      { phoneNumber: "", count: 1, numoftic: null },
    ]);
  };

  const removePhoneEntry = (index) => {
    const newPhoneEntries = phoneEntries.filter((_, i) => i !== index);
    setPhoneEntries(newPhoneEntries);
  };

  const showSnackbar = (message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  };

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  const generateRandomNumbers = async () => {
    if (isNaN(minRange)) {
      showSnackbar("Please fill all fields correctly.", "error");
      return;
    }

    const maxRange = calculateMaxRange();
    const range = maxRange - parseInt(minRange) + 1;
    const totalCount = phoneEntries.reduce(
      (sum, entry) =>
        sum + (entry.numoftic !== null ? entry.numoftic : entry.count),
      0
    );

    if (totalCount > range) {
      showSnackbar(
        `Can't generate ${totalCount} unique numbers in the range ${minRange}-${maxRange}.`,
        "error"
      );
      return;
    }

    setIsLoading(true);
    let allNumbers = new Set();
    let allResults = [];

    try {
      for (const entry of phoneEntries) {
        if (entry.phoneNumber && (entry.numoftic !== null || entry.count > 0)) {
          let seed = entry.phoneNumber
            .split("")
            .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
          let randomNumbers = new Set();

          const targetCount =
            entry.numoftic !== null ? entry.numoftic : entry.count;

          while (randomNumbers.size < targetCount) {
            seed = (seed * 9301 + 49297) % 233280;
            let rnd = seed / 233280;
            let number = Math.floor(parseInt(minRange) + rnd * (maxRange - parseInt(minRange) + 1));
            if (!allNumbers.has(number)) {
              randomNumbers.add(number);
              allNumbers.add(number);
            }
          }

          // Convert numbers to 5-digit format and sort
          const generatedNumbers = Array.from(randomNumbers)
            .map(num => padNumber(num))
            .sort((a, b) => parseInt(a) - parseInt(b));

          allResults.push({
            phoneNumber: entry.phoneNumber,
            numbers: generatedNumbers,
          });

          // Save padded numbers to database
          await updateDatabase(entry.phoneNumber, generatedNumbers);
        }
      }

      setResults(allResults);
      showSnackbar("Random numbers generated, sorted, and saved successfully.");
    } catch (error) {
      console.error("Error generating or saving random numbers:", error);
      showSnackbar(
        "An error occurred while generating or saving numbers.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Modified updateDatabase function to handle padded numbers
  const updateDatabase = async (phoneNumber, randomNumbers) => {
    try {
      const response = await axios.get(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`,
        {
          params: {
            filterByFormula: `{phoneNumber}="${phoneNumber}"`,
          },
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        }
      );

      if (response.data.records.length === 0) {
        throw new Error("Phone number not found in the database");
      }

      const record = response.data.records[0];
      const recordId = record.id;

      await axios.patch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`,
        {
          fields: {
            randomticket: randomNumbers.join(", "),
          },
        },
        {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      console.error("Error updating Airtable:", error);
      throw error;
    }
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === "123456") {
      setIsAuthenticated(true);
    } else {
      showSnackbar("Incorrect password. Please try again.", "error");
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <CssBaseline />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            bgcolor: "background.default",
          }}
        >
          <Container
            maxWidth="sm"
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              py: 4,
            }}
          >
            <Paper elevation={3} sx={{ p: 4 }}>
              <Typography variant="h5" component="h1" gutterBottom>
                Enter Password
              </Typography>
              <form onSubmit={handlePasswordSubmit}>
                <TextField
                  fullWidth
                  type="password"
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Submit
                </Button>
              </form>
            </Paper>
          </Container>
        </Box>
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={closeSnackbar}
        >
          <MuiAlert
            onClose={closeSnackbar}
            severity={snackbar.severity}
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </MuiAlert>
        </Snackbar>
      </>
    );
  }

  return (
    <>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        <Container
          maxWidth="md"
          sx={{ flex: 1, display: "flex", flexDirection: "column", py: 4 }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Random Number Generator
          </Typography>
          <Paper
            elevation={3}
            sx={{ flex: 1, display: "flex", flexDirection: "column", p: 3 }}
          >
            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
              <TextField
                label="Minimum Range"
                type="number"
                value={minRange}
                onChange={(e) => setMinRange(e.target.value)}
                sx={{ ...numberInputStyle, width: "35%" }}
              />
              <TextField
                label="Maximum Range"
                type="number"
                value={calculateMaxRange()}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ...numberInputStyle, width: "35%" }}
              />
              <TextField
                label="Total tickets in this month"
                type="number"
                value={minRange ? calculateMaxRange() - parseInt(minRange) + 1 : ""}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ...numberInputStyle, width: "22%" }}
              />
            </Box>
            <Grid container spacing={2}>
              {phoneEntries.map((entry, index) => (
                <React.Fragment key={index}>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label={`Phone Number ${index + 1}`}
                      type="tel"
                      value={entry.phoneNumber}
                      onChange={(e) =>
                        handlePhoneNumberChange(index, e.target.value)
                      }
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label={`Random Numbers for Phone ${index + 1}`}
                      type="number"
                      value={
                        entry.numoftic !== null ? entry.numoftic : entry.count
                      }
                      InputProps={{
                        readOnly: entry.numoftic !== null,
                      }}
                      onChange={(e) => handleCountChange(index, e.target.value)}
                      sx={numberInputStyle}
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => removePhoneEntry(index)}
                      color="error"
                    >
                      <RemoveIcon />
                    </IconButton>
                  </Grid>
                </React.Fragment>
              ))}
            </Grid>
            <Button
              startIcon={<AddIcon />}
              onClick={addPhoneEntry}
              sx={{ mt: 2 }}
            >
              Add Phone Number
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={generateRandomNumbers}
              fullWidth
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? <CircularProgress size={24} /> : "Generate"}
            </Button>
            {results.length > 0 && (
              <Box mt={3}>
                <Typography variant="h6">
                  Generated Numbers (Sorted):
                </Typography>
                {results.map((result, index) => (
                  <Typography key={index}>
                    Phone {result.phoneNumber}: {result.numbers.join(", ")}
                  </Typography>
                ))}
              </Box>
            )}
          </Paper>
        </Container>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={closeSnackbar}
      >
        <MuiAlert
          onClose={closeSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </MuiAlert>
      </Snackbar>
    </>
  );
}

export default Random;