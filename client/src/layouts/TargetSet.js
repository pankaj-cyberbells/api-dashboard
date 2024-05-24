import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import Navbar from '../components/Navbar';
import './SetTargetForm.css'; // Import your CSS file for additional styling

const SetTargetForm = () => {
  const [detrTarget, setDetrTarget] = useState('');
  const [bundleTmbTarget, setBundleTmbTarget] = useState('');
  const [ppnTarget, setPpnTarget] = useState('');
  const [tmbTarget, setTmbTarget] = useState('');
  const [tyroTarget, setTyroTarget] = useState('');
  const [websiteBasTarget, setWebsiteBasTarget] = useState('');
  const [deviceSecurityTarget, setDeviceSecurityTarget] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission logic here
    console.log({
      detrTarget,
      bundleTmbTarget,
      ppnTarget,
      tmbTarget,
      tyroTarget,
      websiteBasTarget,
      deviceSecurityTarget
    });
  };

  return (
    <>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        flexDirection="column"
        padding="20px"
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Set Targets
        </Typography>
        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            label="DETR Target"
            type="number"
            value={detrTarget}
            onChange={(e) => setDetrTarget(parseInt(e.target.value))}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bundle New Target"
            type="number"
            value={bundleTmbTarget}
            onChange={(e) => setBundleTmbTarget(parseInt(e.target.value))}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="PPN Target"
            type="number"
            value={ppnTarget}
            onChange={(e) => setPpnTarget(parseInt(e.target.value))}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="TMB Target"
            type="number"
            value={tmbTarget}
            onChange={(e) => setTmbTarget(parseInt(e.target.value))}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Tyro Target"
            type="number"
            value={tyroTarget}
            onChange={(e) => setTyroTarget(parseInt(e.target.value))}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Website-based Project Target"
            type="number"
            value={websiteBasTarget}
            onChange={(e) => setWebsiteBasTarget(parseInt(e.target.value))}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Device Security Target"
            type="number"
            value={deviceSecurityTarget}
            onChange={(e) => setDeviceSecurityTarget(parseInt(e.target.value))}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" size="large">
            Set Targets
          </Button>
        </form>
      </Box>
    </>
  );
};

export default SetTargetForm;
