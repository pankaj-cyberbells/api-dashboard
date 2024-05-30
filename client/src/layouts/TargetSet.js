import React, { useState ,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Button, TextField, Typography,CircularProgress } from '@mui/material';
import Navbar from '../components/Navbar';
import './SetTargetForm.css'; // Import your CSS file for additional styling
import { getTargetThunk, updateTargetThunk} from '../features/targetSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SetTargetForm = () => {
  const [detrTarget, setDetrTarget] = useState('');
  const [bundleTmbTarget, setBundleTmbTarget] = useState('');
  const [ppnTarget, setPpnTarget] = useState('');
  const [tmbTarget, setTmbTarget] = useState('');
  const [tyroTarget, setTyroTarget] = useState('');
  const [websiteBasTarget, setWebsiteBasTarget] = useState('');
  const [deviceSecurityTarget, setDeviceSecurityTarget] = useState('');

  const dispatch = useDispatch();
  const { target, loading, error } = useSelector((state) => state.targets);

  useEffect(() => {
    dispatch(getTargetThunk());
  }, [dispatch]);
  useEffect(() => {
    if (target ) {
      console.log(target);
      
    }
  }, [target]);
  useEffect(() => {
    if (target) {
      setDetrTarget(target.detr || '');
      setBundleTmbTarget(target.bundel || '');
      setPpnTarget(target.ppn || '');
      setTmbTarget(target.tmb || '');
      setTyroTarget(target.tyro || '');
      setWebsiteBasTarget(target.websitebas || '');
      setDeviceSecurityTarget(target.devicesecurity || '');
    }
  }, [target]);

//   const handleUpdateTarget = (event) => {
//     event.preventDefault(); 
//     dispatch(updateTargetThunk({ targetId: target._id, targetData: {
//         // detr: detrTarget,
//         detr: 6,
//         bundel: bundleTmbTarget,
//         ppn: ppnTarget,
//         tmb: tmbTarget,
//         tyro: tyroTarget,
//         websitebas: websiteBasTarget,
//         devicesecurity: deviceSecurityTarget,
//       } }));
//     // Repeat the above line for other target fields if needed
//   };

const handleUpdateTarget = async (event) => {
    event.preventDefault();
    const result = await dispatch(updateTargetThunk({
      targetId: target._id,
      targetData: {
        // detr: detrTarget,
        detr: 6,
        bundel: bundleTmbTarget,
        ppn: ppnTarget,
        tmb: tmbTarget,
        tyro: tyroTarget,
        websitebas: websiteBasTarget,
        devicesecurity: deviceSecurityTarget,
      }
    }));
    console.log(result.meta)

    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Target set successfully!');
    } else {
      toast.error('Failed to set target. Please try again.');
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
        <Typography variant="h4" component="h1" gutterBottom>
          Set Targets
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">
            {error.response?.status === 404
              ? 'Target data not found. Please check the endpoint.'
              : 'An error occurred. Please try again.'}
          </Typography>
        ) : (
          <form className="form-container" onSubmit={handleUpdateTarget}>
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
