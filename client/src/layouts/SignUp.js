import React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

// Image URL
const bgImage = 'https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg';

// Styled components
const CoverLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  backgroundImage: `url(${bgImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 400,
  width: '100%',
  textAlign: 'center',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
}));

const StyledBox = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  width: '100%',
}));

const SignUp = () => {
  return (
    <CoverLayout>
      <StyledCard elevation={3}>
        <Box mb={1} textAlign="center">
          <Typography variant="h5" fontWeight="medium">
            Register with
          </Typography>
        </Box>
        <Box mb={2}>
          {/* Social login buttons can go here */}
        </Box>
        <Box px={12}>
          <Box my={2}>
            <Typography variant="body2" color="textSecondary">
              or
            </Typography>
          </Box>
        </Box>
        <Box pt={2} pb={3} px={3}>
          <Box component="form" role="form">
            <StyledBox>
              <TextField 
                placeholder="Name" 
                fullWidth 
                variant="outlined" 
              />
            </StyledBox>
            <StyledBox>
              <TextField 
                type="email" 
                placeholder="Email" 
                fullWidth 
                variant="outlined" 
              />
            </StyledBox>
            <StyledBox>
              <TextField 
                type="password" 
                placeholder="Password" 
                fullWidth 
                variant="outlined" 
              />
            </StyledBox>
            <Box display="flex" alignItems="center">
              <Checkbox defaultChecked />
              <Typography
                variant="button"
                fontWeight="regular"
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </Typography>
              <Typography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                sx={{ textDecoration: 'underline' }}
              >
                Terms and Conditions
              </Typography>
            </Box>
            <Box mt={4} mb={1}>
              <Button variant="contained" color="primary" fullWidth>
                Sign Up
              </Button>
            </Box>
            <Box mt={2}>
              <Typography variant="button" color="textSecondary" fontWeight="regular">
                Already have an account?&nbsp;
                <Typography
                  component={Link}
                  to="/login"
                  variant="button"
                  color="primary"
                  fontWeight="bold"
                  sx={{ textDecoration: 'underline' }}
                >
                  Sign in
                </Typography>
              </Typography>
            </Box>
          </Box>
        </Box>
      </StyledCard>
    </CoverLayout>
  );
}

export default SignUp;

