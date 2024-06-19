import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography,CircularProgress,FormControl, Select, MenuItem, InputLabel } from '@mui/material';
import Navbar from '../components/Navbar';
import './SetTargetForm.css'; // Import your CSS file for additional styling
import { getTargetThunk, updateTargetThunk,createTargetThunk} from '../features/targetSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FortnightDropdown from '../components/FortnightDropdown';

const SetTargetForm = () => {
  const [detrTarget, setDetrTarget] = useState('');
  const [bundleTmbTarget, setBundleTmbTarget] = useState('');
  const [ppnTarget, setPpnTarget] = useState('');
  const [tmbTarget, setTmbTarget] = useState('');
  const [tyroTarget, setTyroTarget] = useState('');
  const [websiteBasTarget, setWebsiteBasTarget] = useState('');
  const [deviceSecurityTarget, setDeviceSecurityTarget] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('TRARALGON');
  const [selectedFortnight, setSelectedFortnight] = useState();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const dispatch = useDispatch();
  const { target, loading, error } = useSelector((state) => state.targets);
console.log({fromDate,toDate})
const formatDate = (date) => {
  // console.log(date);
  const day = String(date.getUTCDate()).padStart(2, '0');
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const year = String(date.getUTCFullYear()).slice(2); // Get last 2 digits of the year
  return `${day}/${month}/${year}`;
};
  useEffect(() => {
console.log({fromDate,toDate})
const formattedFromDate = formatDate(new Date(fromDate));
const formattedToDate = formatDate(new Date(toDate));
    dispatch(getTargetThunk({ salelocation:selectedLocation, startDate:formattedFromDate, endDate: formattedToDate}));
  }, [dispatch,selectedLocation, fromDate,toDate]);


  useEffect(() => {
    if (target ) {
      console.log(target);
      
    }
  }, [target]);
  useEffect(() => {
    if (target) {
      setDetrTarget(target?.detr || '');
      setBundleTmbTarget(target?.bundel || '');
      setPpnTarget(target?.ppn || '');
      setTmbTarget(target?.tmb || '');
      setTyroTarget(target?.tyro || '');
      setWebsiteBasTarget(target?.websitebas || '');
      setDeviceSecurityTarget(target?.devicesecurity || '');
    } else {
      setDetrTarget('');
      setBundleTmbTarget('');
      setPpnTarget('');
      setTmbTarget('');
      setTyroTarget('');
      setWebsiteBasTarget('');
      setDeviceSecurityTarget('');
    }
  }, [target, fromDate]);

console.log(target,"target")

  const handleUpdateTarget = async (event) => {
    event.preventDefault();
  
    const targetData = {
      createdDate: fromDate,
      salelocation: selectedLocation,
      detr: 6,
      bundel: bundleTmbTarget,
      ppn: ppnTarget,
      tmb: tmbTarget,
      tyro: tyroTarget,
      websitebas: websiteBasTarget,
      devicesecurity: deviceSecurityTarget,
    };
  
   const formattedFromDate = formatDate(new Date(fromDate));
  const formattedTargetCreatedDate = target ? formatDate(new Date(target.createdDate)) : null;

  if (target && target._id && formattedTargetCreatedDate === formattedFromDate) {
      // Update existing target
      const result = await dispatch(updateTargetThunk({
        targetId: target._id,
        targetData,
      }));
  
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Target updated successfully!');
      } else {
        toast.error('Failed to update target. Please try again.');
      }
    } else {
      // Create new target
      const result = await dispatch(createTargetThunk(targetData));
  
      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('Target created successfully!');
      } else {
        toast.error('Failed to create target. Please try again.');
      }
    }
  };
  return (
    <>
      <Navbar />
      <ToastContainer />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
        flexDirection="column"
        padding="20px"
      >
       <Box display="flex" justifyContent="center" alignItems="center" width="100%" mb={2}>
          <Typography variant="h4" component="h1" gutterBottom>
            Set Targets
          </Typography>
          <FortnightDropdown
            selectedFortnight={selectedFortnight}
            setSelectedFortnight={setSelectedFortnight}
            setFromDate={setFromDate}
            setToDate={setToDate}
          />
        </Box>
       
        {loading ? (
          <CircularProgress />
        ) : 
        // error ? (
        //   <Typography color="error">
        //     {error.response?.status === 404
        //       ? 'Target data not found. Please check the endpoint.'
        //       : 'An error occurred. Please try again.'}
        //   </Typography>
        // ) :
        
        (
          <form className="form-container" onSubmit={handleUpdateTarget}>
            
            <FormControl variant="outlined" fullWidth margin="normal">
              <InputLabel>Select Location</InputLabel>
              <Select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                label="Select Location"
              >
                <MenuItem value="all-store">All Stores</MenuItem>
                <MenuItem value="TRARALGON">TRARALGON</MenuItem>
                <MenuItem value="WARRAGUL">WARRAGUL</MenuItem>
                <MenuItem value="TORQUAY">TORQUAY</MenuItem>
              </Select>
            </FormControl>
           
            {/* <TextField
              label="DETR Target"
              type="number"
              value={detrTarget}
              onChange={(e) => setDetrTarget(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            /> */}
            <TextField
              label="Bundle New Target"
              type="number"
              value={bundleTmbTarget}
              onChange={(e) => setBundleTmbTarget(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="PPN Target"
              type="number"
              value={ppnTarget}
              onChange={(e) => setPpnTarget(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="TMB Target"
              type="number"
              value={tmbTarget}
              onChange={(e) => setTmbTarget(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Tyro Target"
              type="number"
              value={tyroTarget}
              onChange={(e) => setTyroTarget(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Website-based Project Target"
              type="number"
              value={websiteBasTarget}
              onChange={(e) => setWebsiteBasTarget(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Device Security Target"
              type="number"
              value={deviceSecurityTarget}
              onChange={(e) => setDeviceSecurityTarget(e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
              <Button type="submit" variant="contained" color="primary">Submit</Button>
          </form>
        )}
      
      </Box>
    </>
  );
};

export default SetTargetForm;
