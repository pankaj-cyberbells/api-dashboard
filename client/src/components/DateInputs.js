// DateInputs.js

import React, { useState, useEffect } from 'react';
import { Box, TextField, Button } from '@mui/material';

function DateInputs() {
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format

  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 30);
    const formattedDate = thirtyDaysAgo.toISOString().split('T')[0];
    setFromDate(formattedDate);
    setToDate(currentDate);
  }, []); // Empty dependency array to run this effect only once on initial render

  const handleFromDateChange = (event) => {
    const selectedFromDate = event.target.value;
    setFromDate(selectedFromDate);

    // If the selected "From Date" is today, set the "To Date" to today to prevent selecting the next day or next month
    if (selectedFromDate === currentDate) {
      setToDate(currentDate);
    } else {
      setToDate('');
    }
  };

  const handleToDateChange = (event) => {
    const selectedToDate = event.target.value;
    setToDate(selectedToDate);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}>
      <TextField
        id="from-date"
        label="From Date"
        type="date"
        value={fromDate}
        onChange={handleFromDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        sx={{ marginRight: '10px' }}
      />
      <TextField
        id="to-date"
        label="To Date"
        type="date"
        value={toDate}
        onChange={handleToDateChange}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          min: fromDate, // Limit selectable dates based on "From Date"
        }}
        variant="outlined"
        sx={{ marginRight: '10px' }}
      />
      <Button variant="contained">Apply</Button>
    </Box>
  );
}

export default DateInputs;
