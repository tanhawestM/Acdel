import React, { useState } from "react";
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

function App() {
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const [phoneEntries, setPhoneEntries] = useState([
    { phoneNumber: "", count: 1 },
  ]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const handlePhoneNumberChange = (index, value) => {
    const newPhoneEntries = [...phoneEntries];
    newPhoneEntries[index].phoneNumber = value;
    setPhoneEntries(newPhoneEntries);
  };

  const handleCountChange = (index, value) => {
    const newPhoneEntries = [...phoneEntries];
    newPhoneEntries[index].count = Number(value);
    setPhoneEntries(newPhoneEntries);
  };

  const addPhoneEntry = () => {
    setPhoneEntries([...phoneEntries, { phoneNumber: "", count: 1 }]);
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
    if (isNaN(minRange) || isNaN(maxRange)) {
      showSnackbar("Please fill all fields correctly.", "error");
      return;
    }

    const range = maxRange - minRange + 1;
    const totalCount = phoneEntries.reduce(
      (sum, entry) => sum + entry.count,
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
        if (entry.phoneNumber && entry.count > 0) {
          let seed = entry.phoneNumber
            .split("")
            .reduce((acc, digit) => acc + parseInt(digit, 10), 0);
          let randomNumbers = new Set();

          while (randomNumbers.size < entry.count) {
            seed = (seed * 9301 + 49297) % 233280;
            let rnd = seed / 233280;
            let number = Math.floor(minRange + rnd * (maxRange - minRange + 1));
            if (!allNumbers.has(number)) {
              randomNumbers.add(number);
              allNumbers.add(number);
            }
          }

          const generatedNumbers = Array.from(randomNumbers);
          allResults.push({
            phoneNumber: entry.phoneNumber,
            numbers: generatedNumbers,
          });

          await updateDatabase(entry.phoneNumber, generatedNumbers);
        }
      }

      setResults(allResults);
      showSnackbar("Random numbers generated and saved successfully.");
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

  const updateDatabase = async (phoneNumber, randomNumbers) => {
    try {
      // First, fetch the record ID for the given phone number
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

      const recordId = response.data.records[0].id;

      // Then, update the record with the new random numbers
      await axios.patch(
        `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}/${recordId}`,
        {
          fields: {
            randomticket: randomNumbers.join(", "), // Changed from join(',') to join(', ')
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
                fullWidth
                label="Minimum Range"
                type="number"
                value={minRange}
                onChange={(e) => setMinRange(Number(e.target.value))}
                sx={numberInputStyle}
              />
              <TextField
                fullWidth
                label="Maximum Range"
                type="number"
                value={maxRange}
                onChange={(e) => setMaxRange(Number(e.target.value))}
                sx={numberInputStyle}
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
                    />
                  </Grid>
                  <Grid item xs={5}>
                    <TextField
                      fullWidth
                      label={`Random Numbers for Phone ${index + 1}`}
                      type="number"
                      value={entry.count}
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
                <Typography variant="h6">Generated Numbers:</Typography>
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

export default App;
