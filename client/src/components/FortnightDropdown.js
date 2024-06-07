import React, { useState, useEffect } from 'react';
import { format, addDays, startOfYear, getDay } from 'date-fns';
import { Box, Tabs, Tab, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

// Utility function to get the first Monday of the given year
const getFirstMondayOfYear = (year) => {
  const firstDay = startOfYear(new Date(year, 0, 1));
  const firstMonday = addDays(firstDay, (8 - getDay(firstDay)) % 7);
  return firstMonday;
};

// Utility function to calculate all fortnights for the given year
const calculateYearlyFortnights = (year) => {
  const firstMonday = getFirstMondayOfYear(year);
  const fortnights = [];
  let currentStart = firstMonday;

  while (currentStart.getFullYear() === year) {
    const currentEnd = addDays(currentStart, 13);
    fortnights.push({
      start: currentStart,
      end: currentEnd
    });
    currentStart = addDays(currentStart, 14);
  }

  return fortnights;
};

// Utility function to get the last 4 fortnights from the current date
const getLastFourFortnights = (fortnights) => {
  const currentDate = new Date();
  const pastFortnights = fortnights.filter(fortnight => fortnight.start <= currentDate);
  const sortedFortnights = pastFortnights.slice().sort((a, b) => b.start - a.start); // Sort in descending order
  return sortedFortnights.slice(0, 4);;
};

const FortnightDropdown = ({ selectedFortnight, setSelectedFortnight, setFromDate, setToDate }) => {
  const currentYear = new Date().getFullYear();
  const [lastFourFortnights, setLastFourFortnights] = useState([]);

  useEffect(() => {
    const fortnights = calculateYearlyFortnights(currentYear);
    setLastFourFortnights(getLastFourFortnights(fortnights));
  }, [currentYear]);

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()); // Get full year
    return `${year}-${month}-${day}`;
};
console.log({selectedFortnight})
  const handleFortnightChange = (e) => {
    const selectedIndex = e.target.value;
    const selectedFortnight = lastFourFortnights[selectedIndex];
    setSelectedFortnight(selectedFortnight);
    setFromDate(formatDate(selectedFortnight.start));
    setToDate(formatDate(selectedFortnight.end));
  };

  return (
    <FormControl variant="outlined" sx={{ minWidth: 200, marginLeft: '16px' }}>
      <InputLabel id="fortnight-select-label">Select Fortnight</InputLabel>
      <Select
        labelId="fortnight-select-label"
        id="fortnight-select"
        value={selectedFortnight ? lastFourFortnights.indexOf(selectedFortnight) : ''}
        onChange={handleFortnightChange}
        label="Select Fortnight"
      >
        <MenuItem value="" disabled>Select a fortnight</MenuItem>
        {lastFourFortnights.map((fortnight, index) => (
          <MenuItem key={index} value={index}>
            {format(fortnight.start, 'MMMM dd')} - {format(fortnight.end, 'MMMM dd')}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default FortnightDropdown;
