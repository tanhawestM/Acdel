import React, { useState } from "react";
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
} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

// CSS to remove spinners from number inputs
const numberInputStyle = {
  "& input[type=number]": {
    "-moz-appearance": "textfield"
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    "-webkit-appearance": "none",
    margin: 0
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: 0
  }
};

function App() {
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const [phoneEntries, setPhoneEntries] = useState([{ phoneNumber: "", count: 1 }]);
  const [results, setResults] = useState([]);

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

  const generateRandomNumbers = () => {
    if (isNaN(minRange) || isNaN(maxRange)) {
      alert("Please fill all fields correctly.");
      return;
    }

    const range = maxRange - minRange + 1;
    const totalCount = phoneEntries.reduce((sum, entry) => sum + entry.count, 0);

    if (totalCount > range) {
      alert(`Can't generate ${totalCount} unique numbers in the range ${minRange}-${maxRange}.`);
      return;
    }

    let allNumbers = new Set();
    let allResults = [];

    phoneEntries.forEach((entry) => {
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

        allResults.push({
          phoneNumber: entry.phoneNumber,
          numbers: Array.from(randomNumbers)
        });
      }
    });

    setResults(allResults);
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
        <Container maxWidth="md" sx={{ flex: 1, display: "flex", flexDirection: "column", py: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Random Number Generator
          </Typography>
          <Paper elevation={3} sx={{ flex: 1, display: "flex", flexDirection: "column", p: 3 }}>
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
                      onChange={(e) => handlePhoneNumberChange(index, e.target.value)}
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
                    <IconButton onClick={() => removePhoneEntry(index)} color="error">
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
            >
              Generate
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
    </>
  );
}

export default App;