import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { createAdminThunk, getAllAdminsThunk, deleteAdminThunk } from '../features/adminSlice'; // Ensure the correct import path

const CoverLayout = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  // alignItems: 'center',
  minHeight: '80vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  padding: theme.spacing(3),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  padding: theme.spacing(3),
  maxWidth: 500,
  width: '100%',
  textAlign: 'center',
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
}));

const StyledForm = styled(Box)(({ theme }) => ({
  width: '100%',
  '& > *': {
    marginBottom: theme.spacing(3),
  },
}));

const StyledTable = styled(Box)(({ theme }) => ({
  width: '100%',
  overflowX: 'auto',
  '& table': {
    width: '100%',
    borderCollapse: 'collapse',
    '& th, td': {
      borderBottom: '1px solid #ddd',
      padding: theme.spacing(1),
    },
  },
}));

const SignUp = () => {
  const dispatch = useDispatch();
  const { isCreateUserAllowed } = useSelector((state) => state.auth);
  const { admins, loading, error } = useSelector((state) => state.admin);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [open, setOpen] = useState(false);
 
  useEffect(() => {
    dispatch(getAllAdminsThunk());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Name is required';
    if (!formData.email) errors.email = 'Email is required';
    if (!formData.password) errors.password = 'Password is required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await dispatch(createAdminThunk(formData)).unwrap();
        setOpen(true);
        setFormData({ name: '', email: '', password: '' }); // Clear form on success
        dispatch(getAllAdminsThunk()); // Refresh the user list
      } catch (error) {
        console.error('Failed to create admin:', error);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (userId) => {
    await dispatch(deleteAdminThunk(userId));
    dispatch(getAllAdminsThunk());
  };

  return (
    <>
      <Navbar />
      <CoverLayout>
        <StyledCard elevation={3}>
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h5" fontWeight="medium" gutterBottom>
              CREATE USER
            </Typography>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                User created successfully!
              </Alert>
            </Snackbar>
            <StyledForm component="form" role="form" onSubmit={handleSubmit}>
              <TextField
                name="name"
                label="Name"
                fullWidth
                variant="outlined"
                value={formData.name}
                onChange={handleChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="email"
                type="email"
                label="Email"
                fullWidth
                variant="outlined"
                value={formData.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
                sx={{ marginBottom: 2 }}
              />
              <TextField
                name="password"
                type="password"
                label="Password"
                fullWidth
                variant="outlined"
                value={formData.password}
                onChange={handleChange}
                error={!!formErrors.password}
                helperText={formErrors.password}
                sx={{ marginBottom: 2 }}
              />
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
               
                disabled={loading}
              >
                {loading ? 'Signing up...' : 'Sign Up'}
              </Button>
              {error && (
                <Typography variant="body2" color="error" align="center" gutterBottom>
                  {error.message}
                </Typography>
              )}
            </StyledForm>
          </Box>
        </StyledCard>
        <Box width="50%" bgcolor="grey.300" height="100%" />
        <StyledTable>
          <Typography variant="h6" gutterBottom>
            Users List
          </Typography>
          {admins?.length === 0 ? (
            <Typography>No users found.</Typography>
          ) : (
            <table tyle={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>#</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Name</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Email</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Created Date</th>
                  <th style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {admins?.map((user, index) => (
                  <tr key={user._id}>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{index + 1}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}> {user.name}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{user.email}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td style={{ borderBottom: '1px solid #ddd', padding: '8px', textAlign: 'center' }} >
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => handleDelete(user._id)}
                        disabled={user.email === 'gauravisonline@gmail.com'}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </StyledTable>
      </CoverLayout>
    </>
  );
};

export default SignUp;
