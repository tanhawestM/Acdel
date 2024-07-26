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

function Random() {
  const [minRange, setMinRange] = useState();
  const [phoneEntries, setPhoneEntries] = useState([
    { phoneNumber: "", count: 1, numoftic: null },
  ]);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const calculateMaxRange = () => {
    const totalCount = phoneEntries.reduce(
      (sum, entry) =>
        sum + (entry.numoftic !== null ? entry.numoftic : entry.count),
      0
    );
    return minRange + totalCount - 1;
  };

  const fetchNumoftic = async (phoneNumber) => {
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

      if (response.data.records.length > 0) {
        return response.data.records[0].fields.numoftic;
      }
      return null;
    } catch (error) {
      console.error("Error fetching numoftic:", error);
      return null;
    }
  };

  const handlePhoneNumberChange = async (index, value) => {
    const newPhoneEntries = [...phoneEntries];
    newPhoneEntries[index] = {
      ...newPhoneEntries[index],
      phoneNumber: value,
      numoftic: null,
    };

    if (value.length === 10) {
      setIsLoading(true);
      const numoftic = await fetchNumoftic(value);
      newPhoneEntries[index].numoftic = numoftic;
      setIsLoading(false);
    }

    setPhoneEntries(newPhoneEntries);
    setMinRange(minRange); // Force re-render
  };

  const handleCountChange = (index, value) => {
    const newPhoneEntries = [...phoneEntries];
    newPhoneEntries[index].count = Number(value);
    setPhoneEntries(newPhoneEntries);
    setMinRange(minRange); // Force re-render
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
    const range = maxRange - minRange + 1;
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
            let number = Math.floor(minRange + rnd * (maxRange - minRange + 1));
            if (!allNumbers.has(number)) {
              randomNumbers.add(number);
              allNumbers.add(number);
            }
          }

          const generatedNumbers = Array.from(randomNumbers).sort(
            (a, b) => a - b
          );
          allResults.push({
            phoneNumber: entry.phoneNumber,
            numbers: generatedNumbers,
          });

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
                value={minRange || ""}
                onChange={(e) => setMinRange(Number(e.target.value))}
                sx={{ ...numberInputStyle, width: "35%" }}
              />
              <TextField
                label="Maximum Range"
                type="number"
                value={minRange ? calculateMaxRange() : ""}
                InputProps={{
                  readOnly: true,
                }}
                sx={{ ...numberInputStyle, width: "35%" }}
              />
              <TextField
                label="Total tickets in this month"
                type="number"
                value={minRange ? calculateMaxRange() - minRange + 1 || "" : ""}
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
                        endAdornment:
                          isLoading && entry.phoneNumber.length === 10 ? (
                            <CircularProgress size={20} />
                          ) : null,
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
