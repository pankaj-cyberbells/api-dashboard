  import React, { useState, useEffect } from 'react';
  import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead,
    TablePagination, TableRow, Tabs, Tab, Box, TextField,CircularProgress
  } from '@mui/material';
  import Navbar from '../components/Navbar';
  import { useDispatch, useSelector } from 'react-redux';
  import { loadData,AllStore } from '../features/tableDataSlice';
  import DateInputs from '../components/DateInputs';
  import CircularIndicator from '../components/CircularIndicator';
  import { getTargetThunk } from '../features/targetSlice';
import FortnightDropdown from '../components/FortnightDropdown';
  // const headerNames = [
  //   'Traralgon',
  // 'NPSVol',
  // 'NPS Score',
  // 'adv 10-9',
  // 'Pass 8-7',
  // `Detr (${target?.detr || 'N/A'})`,
  // `PPN(6) (${target?.ppn || 'N/A'})`,
  // `Bundle New(2) (${target?.bundle || 'N/A'})`,
  // `TMB(5) (${target?.tmb || 'N/A'})`,
  // 'Upgrade & Protect',
  // `Tyro(2) (${target?.tyro || 'N/A'})`,
  // `Website BAS(1) (${target?.websitebas || 'N/A'})`,
  // `Device Security($10/m)(1) (${target?.devicesecurity || 'N/A'})`,
  // 'Outright Mobile/Tablet Inc Prepaid',
  // 'DCP Mobile/Tablet',
  // 'Smart Watch',
  // 'Acc GP',
  // 'Handset/Plan GP',
  // 'Total GP'
  // ];
  
  // const columns = headerNames.map((header, index) => ({
  //   id: `column-${index}`,
  //   label: header,
  //   minWidth: 120,
  //   align: 'center',
  //   format: (value) => value
  // }));

  export default function Dashboard() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [selectedTab, setSelectedTab] = useState({ index: 1, value: 'Traralgon' });
    const [editingCell, setEditingCell] = useState(null); // To track the cell being edited
    const [mutableData, setMutableData] = useState([]); // To hold a mutable copy of data
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [selectedFortnight, setSelectedFortnight] = useState(null);
    
    const dispatch = useDispatch();
    const { data, loading, error } = useSelector((state) => state.tableData);
    const { target,  loading: targetLoading, error: targetError } = useSelector((state) => state.targets);
   
  useEffect(() => {
    dispatch(getTargetThunk());
  }, [dispatch]);
  
    console.log(data)

    useEffect(() => {
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 90);
      const formattedFromDate = formatDate(thirtyDaysAgo);
      const formattedToDate = formatDate(today);
      setFromDate(formattedFromDate);
      setToDate(formattedToDate);
      dispatch(loadData({salelocation:  selectedTab.value,  startDate: formattedFromDate, endDate: formattedToDate }));
    }, [dispatch]);

    const formatDate = (date) => {
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = String(date.getFullYear()).slice(2); // Get last 2 digits of the year
      return `${day}/${month}/${year}`;
    };

    const fetchDataForTab = (tabValue, startDate, endDate) => {
      if (tabValue === 'All Stores') {
        console.log("pressed A")
        dispatch(AllStore({ startDate, endDate }));
      } else {
        console.log("pressed O")
        dispatch(loadData({ salelocation: tabValue, startDate, endDate }));
      }
    };
  
    const handleTabChange = (event, newValue) => {
      console.log("pressed")
      setSelectedFortnight(null);
      const selectedTabValue = tabs[newValue];
      setSelectedTab({ index: newValue, value: selectedTabValue });
      const today = new Date();
      const thirtyDaysAgo = new Date(today);
      thirtyDaysAgo.setDate(today.getDate() - 90);
      const formattedFromDate = formatDate(thirtyDaysAgo);
      const formattedToDate = formatDate(today);
      setFromDate(formattedFromDate);
      setToDate(formattedToDate);
      fetchDataForTab(selectedTabValue, formattedFromDate, formattedToDate);
    };
  
    const fetchData = () => {
      const startDate = fromDate.split('-').reverse().join('/');
      const endDate = toDate.split('-').reverse().join('/');
      fetchDataForTab(selectedTab.value, startDate, endDate);
    };
  

    // const fetchData = () => {
    //   const startDate = fromDate.split('-').reverse().join('/');
    //   const endDate = toDate.split('-').reverse().join('/');
    //   dispatch(loadData({ salelocation:  selectedTab.value,startDate, endDate }));
    // };
    // useEffect(() => {
    //   const startDate = '01/02/24'; // replace with dynamic date from your component state
    //   const endDate = '16/05/24'; 
    //   dispatch(loadData({ startDate, endDate }));
      
    // }, [dispatch]);
    // const fetchData = () => {
    //   const startDate = fromDate.split('-').reverse().join('/');
    //   const endDate = toDate.split('-').reverse().join('/');
    //   dispatch(loadData({ startDate, endDate }));
    // };
    useEffect(() => {
      setMutableData(data.map(item => ({ ...item }))); // Create a mutable copy of data
    }, [data]);

    // if (loading) return <p>Loading...</p>;
    // if (error) return <p>Error: {error}</p>;

    const handleChangePage = (event, newPage) => {
      setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
      setRowsPerPage(+event.target.value);
      setPage(0);
    };

    // const handleTabChange = (event, newValue) => {
    //   const selectedTabValue = tabs[newValue];
    //   setSelectedTab({ index: newValue, value: selectedTabValue });
    // };

    const handleDoubleClick = (rowIndex, columnId) => {
      setEditingCell({ rowIndex, columnId });
    };

    const handleInputChange = (event, rowIndex, columnId) => {
      setMutableData(prevData => {
        const newData = [...prevData];
        newData[rowIndex][columnId] = event.target.value;
        return newData;
      });
    };

    const handleBlur = (rowIndex, columnId) => {
      if (editingCell && editingCell.rowIndex === rowIndex && editingCell.columnId === columnId) {
        const newData = [...mutableData];
        newData[rowIndex][columnId] = mutableData[rowIndex][columnId]; // Update the original data with the new value
        setMutableData(newData);
        setEditingCell(null);
      }
    };
   
    const headerNames = [
      selectedTab.value,
    'NPSVol',
    'NPS Score',
    'adv 10-9',
    'Pass 8-7',
    'Detr<6',
    // `Detr (${target?.detr || 'N/A'})`,
    `PPN (${target?.ppn || 'N/A'})`,
    `Bundle New (${target?.bundel || 'N/A'})`,
    `TMB (${target?.tmb || 'N/A'})`,
    'Upgrade & Protect',
    `Tyro (${target?.tyro || 'N/A'})`,
    `Website BAS (${target?.websitebas || 'N/A'})`,
    `Device Security($10/m) (${target?.devicesecurity || 'N/A'})`,
    'Outright Mobile/Tablet Inc Prepaid',
    'DCP Mobile/Tablet',
    'Smart Watch',
    'Acc GP',
    'Handset/Plan GP',
    'Total GP'
    ];
    
    const columns = headerNames.map((header, index) => ({
      id: `column-${index}`,
      label: header,
      minWidth: 120,
      align: 'center',
      format: (value) => value
    }));
    const tabs = ['All Stores', 'Traralgon', 'Warragul', 'Torquay'];

    // Filter data to show only "Traralgon" sales location
    // const filteredData = mutableData.filter(item => item.salelocation === 'Traralgon');

    // Map filtered data to match the table structure
    const rows = data.map(item => ({
      'column-0': item.salesrep,
      // 'column-1': item.npsVol,
      // 'column-2': item.npsScore,
      // 'column-3': item.adv109,
      // 'column-4': item.pass87,
      'column-6':item.pnncount,
      'column-7':item.bundelnewcount,
      'column-8': item.tmbcount,
      'column-9': item.upgrade,
      'column-13': item.outriCount,
      'column-14': item.dcpcount,
      'column-17': item.gpvalue,
      // 'column-5': item.tbm // Make sure this matches the data structure
    }));
   
    const calculateTotals = () => {
      const totals = columns.map((column, colIndex) => {
        if (colIndex === 0) return 'Total'; // Label for the first column
        const total = rows.reduce((sum, row) => sum + (parseFloat(row[column.id]) || 0), 0);
        return total.toFixed(2); // Format the total to 2 decimal places
      });
      return totals;
    };
   
  
    const totals = calculateTotals();
  
    return (
      <>
        <Navbar />
        <Paper sx={{ width: '98%', marginTop: 5, marginLeft: '15px', padding: '10px' }}>
          <Box 
            sx={{ 
              display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
              borderBottom: '2px solid #e0e0e0', 
              borderRadius: '8px 8px 0 0',
              borderLeft: '2px solid #e0e0e0', 
              borderRight: '2px solid #e0e0e0',
              backgroundColor: '#fafafa'
            }}
          >
            <Tabs
              value={selectedTab.index}
              onChange={handleTabChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons="auto"
              aria-label="scrollable auto tabs example"
              
              sx={{ minHeight: '48px' }}
            >
              {tabs.map((tab, index) => (
                <Tab key={index} label={tab} sx={{ minWidth: '150px',
                borderRadius: '8px 8px 0 0',
                borderLeft: '2px solid #e0e0e0', 
                borderRight: '2px solid #e0e0e0',
                borderTop: '2px solid #e0e0e0',
              marginRight: '2px', paddingY:'25.5px'}} />
              ))}
            </Tabs>
            <FortnightDropdown
        selectedFortnight={selectedFortnight}
        setSelectedFortnight={setSelectedFortnight}
        setFromDate={setFromDate}
        setToDate={setToDate}
      />
            <DateInputs
              fromDate={fromDate}
              toDate={toDate}
              setFromDate={setFromDate}
              setToDate={setToDate}
              fetchData={fetchData}
            />
          </Box>
          
          <TableContainer sx={{ maxHeight: 680, borderRadius: '0 0 8px 8px', border: '2px solid #e0e0e0', borderTop: 'none' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell colSpan={6} style={{ borderRight: '1px solid #e0e0e0' }} />
                  <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>15%</TableCell>
                  <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>14%</TableCell>
                  <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>14%</TableCell>
                  <TableCell colSpan={1} style={{ borderRight: '1px solid #e0e0e0' }}/>
                  <TableCell colSpan={3} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>20% compulsory KPI</TableCell>
                  <TableCell colSpan={6} style={{ borderRight: '1px solid #e0e0e0' }}/>
                </TableRow>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0' }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {loading ? (
  <CircularProgress /> // Show loading indicator when data is loading
) : (rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, rowIndex) => (
                    <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                      {columns.map((column, colIndex) => {
                        const value = row[column.id];
                        const isEditable = colIndex >= 1 && colIndex <= 5; // Make columns 2, 3, 4, 5 editable
                        return (
                          <TableCell
                            key={column.id}
                            // align={column.align}
                            onDoubleClick={() => isEditable && handleDoubleClick(rowIndex, column.id)}
                            onBlur={() => isEditable && handleBlur(rowIndex, column.id)}
                            style={{
                              border: '1px solid #e0e0e0',
                              // display: column.id === 'column-8'|| column.id === 'column-6' ? 'flex' : 'table-cell',
                              // alignItems: column.id === 'column-8'|| column.id === 'column-6' ? 'center' : 'inherit',
                              // justifyContent: column.id === 'column-8'|| column.id === 'column-6' ? 'center' : 'inherit',
                              textAlign:'center' ,
                            }}
                          >
                            {editingCell && editingCell.rowIndex === rowIndex && editingCell.columnId === column.id ? (
                              <TextField
                                value={mutableData[rowIndex][column.id]}
                                onChange={(event) => handleInputChange(event, rowIndex, column.id)}
                                onBlur={() => handleBlur(rowIndex, column.id)}
                                autoFocus
                              />
                            ) : (
                              column.id === 'column-8'|| column.id === 'column-6' || column.id === 'column-7' ? (
                                <Box display="flex" justifyContent="center" alignItems="center" width="100%">
                                <CircularIndicator value={value} target={column.id === 'column-6' ? target?.ppn : column.id === 'column-7' ? target?.bundel : target?.tmb} />
                              </Box>
                              ) : (
                                value
                              )
                            )}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  )))}
                   <TableRow>
                {totals.map((total, index) => (
                  <TableCell
                    key={index}
                    align="center"
                    style={{
                      position: 'sticky',
                      bottom: 0,
                      backgroundColor: 'lightgrey',
                      fontWeight: 'bold',
                      borderTop: '1px solid black'
                    }}
                  >
                    {total}
                  </TableCell>
                ))}
              </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </>
    );
  }
