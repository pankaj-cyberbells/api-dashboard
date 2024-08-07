import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress,
  FormControl
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FortnightDropdown from '../components/FortnightDropdown';
import Navbar from '../components/Navbar';

const TargetKPI = () => {
  const [ppnTarget, setPpnTarget] = useState('');
  const [bundleNewTarget, setBundleNewTarget] = useState('');
  const [twdTarget, setTwdTarget] = useState('');
  const [deviceProtectTarget, setDeviceProtectTarget] = useState('');
  const [accessoryGPTarget, setAccessoryGPTarget] = useState('');
  const [selectedFortnight, setSelectedFortnight] = useState();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const dispatch = useDispatch();
  const { target, loading, error } = useSelector((state) => state.targets);

  useEffect(() => {
    if (target) {
      setPpnTarget(target?.ppn || '');
      setBundleNewTarget(target?.bundleNew || '');
      setTwdTarget(target?.twd || '');
      setDeviceProtectTarget(target?.deviceProtect || '');
      setAccessoryGPTarget(target?.accessoryGP || '');
    }
  }, [target]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    const targetData = {
      createdDate: fromDate,
      ppn: ppnTarget,
      bundleNew: bundleNewTarget,
      twd: twdTarget,
      deviceProtect: deviceProtectTarget,
      accessoryGP: accessoryGPTarget,
    };

    // Here you would dispatch your action to update or create the target
    // const result = await dispatch(updateTargetThunk(targetData));
    
    // if (result.meta.requestStatus === 'fulfilled') {
    //   toast.success('Target updated successfully!');
    // } else {
    //   toast.error('Failed to update target. Please try again.');
    // }
  };

  return (
    <>
    <Navbar/>
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="90vh"
      flexDirection="column"
      padding="20px"
    >
      <ToastContainer />
      <Box display="flex" justifyContent="center" alignItems="center" width="100%" mb={2}>
        <Typography variant="h4" component="h1" gutterBottom>
          Set KPI % Targets
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
      ) : (
        <form onSubmit={handleSubmit}>
          <TextField
            label="PPN % Target"
            type="number"
            value={ppnTarget}
            onChange={(e) => setPpnTarget(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Bundle % New Target"
            type="number"
            value={bundleNewTarget}
            onChange={(e) => setBundleNewTarget(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="TWD % Target"
            type="number"
            value={twdTarget}
            onChange={(e) => setTwdTarget(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Device Protect to Hand/Tab DPC % Target"
            type="number"
            value={deviceProtectTarget}
            onChange={(e) => setDeviceProtectTarget(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Accessory GP to Handset Sales % Target"
            type="number"
            value={accessoryGPTarget}
            onChange={(e) => setAccessoryGPTarget(e.target.value)}
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </form>
      )}
    </Box>
    </>
  );
};

export default TargetKPI;