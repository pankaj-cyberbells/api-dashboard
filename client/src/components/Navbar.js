import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar sx={{ justifyContent: 'start' }}>
        {/* <Typography variant="h6" component="div">
          Dashboard
        </Typography> */}
         <Button component={Link} to="/dashboard" color="inherit">DASHBOARD</Button>
        <Button component={Link} to="/settarget" color="inherit">SETTARGET</Button>
        <Button component={Link} to="/signup" color="inherit">NEW SIGNUP</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
