import React from 'react';
import { Box, Tooltip } from '@mui/material';

const CircularIndicator = ({ value, target, isDpcColumn }) => {
  const numericValue = parseFloat(value);
  const numericTarget = parseFloat(target);

  const color = numericValue < numericTarget ? 'red' : 'green';
  const backgroundColor = numericValue < numericTarget ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 128, 0, 0.2)';
// console.log(numericValue,"value")
  return (
    <Tooltip title={`Target: ${target}${isDpcColumn ? '%' : ''}`} arrow>
      <Box
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: backgroundColor,
          color: color,
          fontWeight: 'bold',
          borderRadius: '50%',
          padding: '8px',
          minWidth: 24,
          minHeight: 24,
        }}
      >
        {value}
      </Box>
    </Tooltip>
  );
};

export default CircularIndicator;