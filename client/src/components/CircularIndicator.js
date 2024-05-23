import React from 'react';
import { Box } from '@mui/material';

const CircularIndicator = ({ value }) => {
  const color = value < 5 ? 'red' : 'green';
  const backgroundColor = value < 5 ? 'rgba(255, 0, 0, 0.2)' : 'rgba(0, 128, 0, 0.2)';

  return (
    <Box
      sx={{
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: backgroundColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: color,
        fontWeight: 'bold'
      }}
    >
      {value}
    </Box>
  );
};

export default CircularIndicator;