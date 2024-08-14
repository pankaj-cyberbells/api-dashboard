import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FortnightDropdown from '../components/FortnightDropdown';
import Navbar from '../components/Navbar';
import { getKPITargetThunk, updateKPITargetThunk, createKPITargetThunk } from '../features/kpiTargetSlice';

const TargetKPI = () => {
  const [KPITMB, setKPITMB] = useState('');
  const [KPIPPN, setKPIPPN] = useState('');
  const [KPIBundle, setKPIBundle] = useState('');
  const [KPITWD,  setKPITWD] = useState('');
  const [KPIDPC, setKPIDPC] = useState('');
  const [KPIACCGP, setKPIACCGP] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('TRARALGON');
  const [selectedFortnight, setSelectedFortnight] = useState();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [errors, setErrors] = useState({
    KPIPPN: false,
    KPIBundle: false,
    KPITMB: false,
    KPITWD: false,
    KPIDPC: false,
    KPIACCGP: false,
  });
  const [totalError, setTotalError] = useState(false);
  const dispatch = useDispatch();
  const { KPITarget, loading, error } = useSelector((state) => state.KPITargets);
  
  const formatDate = (date) => {
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(2);
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (fromDate && toDate) {
      const formattedFromDate = formatDate(new Date(fromDate));
      const formattedToDate = formatDate(new Date(toDate));
      dispatch(getKPITargetThunk({ salelocation: selectedLocation, startDate: formattedFromDate, endDate: formattedToDate }));
    }
  }, [dispatch, selectedLocation, fromDate, toDate]);

  useEffect(() => {
    if ( KPITarget) {
      setKPITMB( KPITarget?.KPITMB || '');
      setKPIPPN( KPITarget?.KPIPPN || '');
      setKPIBundle( KPITarget?.KPIBundle || '');
      setKPITWD( KPITarget?.KPITWD || '');
      setKPIDPC( KPITarget?.KPIDPC || '');
      setKPIACCGP( KPITarget?.KPIACCGP || '');
    } else {
      setKPITMB('');
      setKPIPPN('');
      setKPIBundle('');
      setKPITWD('');
      setKPIDPC('');
      setKPIACCGP('');
    }
  }, [ KPITarget, fromDate]);

  const validateAndUpdateField = (field, value) => {
    const numValue = Number(value);
    const otherFieldsTotal = ['KPIPPN', 'KPIBundle', 'KPITMB', 'KPITWD', 'KPIDPC', 'KPIACCGP']
      .filter(f => f !== field)
      .reduce((sum, f) => sum + Number(eval(f)), 0);

    if (numValue + otherFieldsTotal > 100) {
      setErrors(prev => ({ ...prev, [field]: true }));
      setTotalError(true);
    } else {
      setErrors(prev => ({ ...prev, [field]: false }));
      setTotalError(false);
    }

    // Update the field value
    eval(`set${field}(value)`);
  };
  const isFormValid = () => {
    return !totalError && Object.values(errors).every(error => !error);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isFormValid()) {
      toast.error('Please correct the errors before submitting.');
      return;
    }
    const targetData = {
      createdDate: fromDate,
      salelocation: selectedLocation,
      KPIPPN,
      KPIBundle,
      KPITWD,
      KPIDPC,
      KPIACCGP,
      KPITMB,
      updatedBy: 'Current User', // Replace with actual user info
    };

    const formattedFromDate = formatDate(new Date(fromDate));
    const formattedKPICreatedDate = KPITarget ? formatDate(new Date(KPITarget.createdDate)) : null;

    if (KPITarget && KPITarget._id && formattedKPICreatedDate === formattedFromDate) {
      // Update existing KPI
      const result = await dispatch( updateKPITargetThunk({
        targetId: KPITarget._id,
        targetData,
      }));

      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('KPI target updated successfully!');
      } else {
        toast.error('Failed to update KPI target. Please try again.');
      }
    } else {
      // Create new KPI
      const result = await dispatch(createKPITargetThunk(targetData));

      if (result.meta.requestStatus === 'fulfilled') {
        toast.success('KPI target created successfully!');
      } else {
        toast.error('Failed to create KPI target. Please try again.');
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
            Set KPI Targets
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
            
            <TextField
              label="PPN % Target"
              type="number"
              value={KPIPPN}
              onChange={(e) => validateAndUpdateField('KPIPPN', e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
              error={errors.KPIPPN || totalError}
          helperText={errors.KPIPPN || totalError ? "Total of all fields cannot exceed 100%" : ""}
            />
            <TextField
          label="Bundle % Target"
          type="number"
          value={KPIBundle}
          onChange={(e) => validateAndUpdateField('KPIBundle', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.KPIBundle || totalError}
          helperText={errors.KPIBundle || totalError ? "Total of all fields cannot exceed 100%" : ""}
        />
        <TextField
          label="TMB % Target"
          type="number"
          value={KPITMB}
          onChange={(e) => validateAndUpdateField('KPITMB', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.KPITMB || totalError}
          helperText={errors.KPITMB || totalError ? "Total of all fields cannot exceed 100%" : ""}
        />
        <TextField
          label="TWD % Target"
          type="number"
          value={KPITWD}
          onChange={(e) => validateAndUpdateField('KPITWD', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.KPITWD || totalError}
          helperText={errors.KPITWD || totalError ? "Total of all fields cannot exceed 100%" : ""}
        />
        <TextField
          label="DPC % Target"
          type="number"
          value={KPIDPC}
          onChange={(e) => validateAndUpdateField('KPIDPC', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.KPIDPC || totalError}
          helperText={errors.KPIDPC || totalError ? "Total of all fields cannot exceed 100%" : ""}
        />
        <TextField
          label="Accessory GP % Target"
          type="number"
          value={KPIACCGP}
          onChange={(e) => validateAndUpdateField('KPIACCGP', e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
          error={errors.KPIACCGP || totalError}
          helperText={errors.KPIACCGP || totalError ? "Total of all fields cannot exceed 100%" : ""}
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