import React from 'react'
import {  AppBar, Toolbar, Typography,  } from '@mui/material';
function Navbar() {
  return (
    <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Dashboard
      </Typography>
    </Toolbar>
  </AppBar>
  )
}

export default Navbar

