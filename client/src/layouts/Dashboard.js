import React, { useState, useEffect } from 'react';
import {
  Paper, Table, TableBody, TableCell, TableContainer, TableHead,
  TablePagination, TableRow, Tabs, Tab, Box, TextField,CircularProgress,Checkbox,Typography
} from '@mui/material';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { loadData,AllStore } from '../features/tableDataSlice';
import { createNpsThunk,getAllNpsThunk ,updateNpsThunk } from '../features/npsSlice';
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

// Define the Dashboard component
export default function Dashboard() {

    // State variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedTab, setSelectedTab] = useState({ index: 1, value: 'Traralgon' });
  const [editingCell, setEditingCell] = useState(null); // To track the cell being edited
  const [mutableData, setMutableData] = useState([]); // To hold a mutable copy of data
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedFortnight, setSelectedFortnight] = useState(null);
  const [hideColumns, setHideColumns] = useState(false); 

   // Redux hooks
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tableData);
  const { target,  loading: targetLoading, error: targetError } = useSelector((state) => state.targets);
  const { npsData,  npsLoading,  npsError } = useSelector((state) => state.nps);
 

    // Fetch targets when the selected tab changes
  useEffect(() => {
    let salelocation = selectedTab.value;
    if (selectedTab.value === 'All Stores') {
      salelocation = 'all-store';
    }
    dispatch(getTargetThunk(salelocation));
  }, [dispatch, selectedTab.value]);

  useEffect(() => {
    dispatch(getAllNpsThunk()); // Assuming fetchData is an action that fetches data from the server
  }, [createNpsThunk]);
  console.log(npsData)


   // Initialize dates and fetch initial data
  useEffect(() => {
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 90);
    const formattedforFromDate =formatforDate(thirtyDaysAgo)
    const formattedforTomDate =formatforDate(today)
    const formattedFromDate = formatDate(thirtyDaysAgo);
    const formattedToDate = formatDate(today);
    setFromDate(formattedforFromDate);
    setToDate(formattedforTomDate);
    dispatch(loadData({salelocation:  selectedTab.value,  startDate: formattedFromDate, endDate: formattedToDate }));
  }, [dispatch]);


   // Helper functions to format dates
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()).slice(2); // Get last 2 digits of the year
    return `${day}/${month}/${year}`;
  };
  const formatforDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()); // Get full year
    return `${year}-${month}-${day}`;
};


 // Fetch data based on tab and date range
  const fetchDataForTab = (tabValue, startDate, endDate) => {
    if (tabValue === 'All Stores') {
      console.log("pressed A")
      dispatch(AllStore({ startDate, endDate }));
    } else {
      console.log("pressed O")
      dispatch(loadData({ salelocation: tabValue, startDate, endDate }));
    }
  };

    // Group data by sale location
  // const groupedData = data.reduce((acc, item) => {
  //   if (!acc[item.salelocation]) {
  //     acc[item.salelocation] = [];
  //   }
  //   acc[item.salelocation].push(item);
  //   return acc;
  // }, {});

  // const createNewData = (newData) => {
  //   // Dispatch an action to send the new data to the server
  //   dispatch(createNpsThunk(newData));
  // };
   // Handle tab change

  const handleTabChange = (event, newValue) => {
    console.log("pressed")
    setSelectedFortnight(null);
    const selectedTabValue = tabs[newValue];
    setSelectedTab({ index: newValue, value: selectedTabValue });
    const today = new Date();
    const thirtyDaysAgo = new Date(today);
    thirtyDaysAgo.setDate(today.getDate() - 90);
    const formattedforFromDate =formatforDate(thirtyDaysAgo)
    const formattedforTomDate =formatforDate(today)
    const formattedFromDate = formatDate(thirtyDaysAgo);
    const formattedToDate = formatDate(today);
    setFromDate(formattedforFromDate);
    setToDate(formattedforTomDate);
    fetchDataForTab(selectedTabValue, formattedFromDate, formattedToDate);
  };


  // Fetch data based on current date range and tab
  const fetchData = () => {
    const startDate = fromDate.split('-').reverse().join('/');
    const endDate = toDate.split('-').reverse().join('/');
    fetchDataForTab(selectedTab.value, startDate, endDate);
  };


  useEffect(() => {
    fetchData()
  }, [fromDate]);
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
 
console.log(mutableData)

  // const handleBlur = async (rowIndex, columnId) => {
  //   if (editingCell && editingCell.rowIndex === rowIndex && editingCell.columnId === columnId) {
  //     const newData = npsData.NPSs;
  //     newData[rowIndex][columnId] = mutableData[rowIndex][columnId]; // Update the original data with the new value
  //     setMutableData(newData);
  //     setEditingCell(null);
  // console.log(newData,'jj')
  // console.log(newData[rowIndex].salesrep,'llj')
  
  //     // Check if the NPS value exists for the corresponding ID
  //     const salesrep = newData[rowIndex].salesrep; // Assuming 'column-0' contains the salesrep ID
  //     // const npsValue = newData[rowIndex][columnId]; // Assuming the columnId contains the NPS value
  //     const npsValue = {
  //       salesrep: newData[rowIndex].salesrep,
  //       salelocation: newData[rowIndex].salelocation,
  //       NPSVol: newData[rowIndex].NPSVol,
  //       NPSScore: newData[rowIndex].NPSScore,
  //       adv10_9: newData[rowIndex].adv10_9,
  //       pass8_7: newData[rowIndex].pass8_7,
  //       detr_less_6: newData[rowIndex].detr_less_6,
  //       updatedBy: newData[rowIndex].updatedBy,
  //     };
  //     // Assuming 'npsData.NPSs' is an array of existing NPS entries
  //     const existingNpsEntry = npsData.NPSs.find(entry => entry.salesrep === salesrep);
  // console.log(newData[rowIndex],"21")
  //     if (existingNpsEntry) {
  //       console.log(existingNpsEntry._id,"21")
  //       // If an existing NPS entry is found, update it
  //       await dispatch(updateNpsThunk({ npsId: existingNpsEntry._id, npsData: npsValue }));
  //     } else {
  //       console.log("21")
  //       // If no existing NPS entry is found, create a new one
  //       await dispatch(createNpsThunk( npsValue ));
  //     }
  //   }
  // };
  let isUpdating = false;
  const handleBlur = async (rowIndex, columnId) => {
    if (editingCell && editingCell.rowIndex === rowIndex && editingCell.columnId === columnId) {
      if (isUpdating) {
        // If an update is already in progress, return without doing anything
        return;
      }
  
      isUpdating = true; // Set the flag to true to indicate that an update is in progress
  
      const newData = [...mutableData];
      newData[rowIndex][columnId] = mutableData[rowIndex][columnId]; // Update the original data with the new value
      setMutableData(newData);
      setEditingCell(null);
  
      // Prepare the data to be sent to the API
      const rowData = newData[rowIndex];
      const existingNpsEntry = npsData.NPSs?.find(entry => entry.salesrep === rowData.salesrep);
  
      const npsValue = {
        salesrep: rowData.salesrep,
        salelocation: selectedTab.value,
        NPSVol: columnId === 'column-1' ? parseFloat(rowData[columnId]) : existingNpsEntry?.NPSVol || 0,
        NPSScore: columnId === 'column-2' ? parseFloat(rowData[columnId]) : existingNpsEntry?.NPSScore || 0,
        adv10_9: columnId === 'column-3' ? parseFloat(rowData[columnId]) : existingNpsEntry?.adv10_9 || 0,
        pass8_7: columnId === 'column-4' ? parseFloat(rowData[columnId]) : existingNpsEntry?.pass8_7 || 0,
        detr_less_6: columnId === 'column-5' ? parseFloat(rowData[columnId]) : existingNpsEntry?.detr_less_6 || 0,
        updatedBy: 'Your_Name_Here' // Replace with the actual user's name or ID
      };
  
      try {
        if (existingNpsEntry) {
          // If an existing NPS entry is found, update it
          await dispatch(updateNpsThunk({ npsId: existingNpsEntry._id, npsData: npsValue }));
        } else {
          // If no existing NPS entry is found, create a new one
          await dispatch(createNpsThunk(npsValue));
        }
      } catch (error) {
        console.error('Error updating or creating NPS data:', error);
      } finally {
        isUpdating = false; // Reset the flag after the update is complete
      }
    }
  };

  // const handleBlur = (rowIndex, columnId) => {
  //   if (editingCell && editingCell.rowIndex === rowIndex && editingCell.columnId === columnId) {
  //     const newData = [...mutableData];
  //     newData[rowIndex][columnId] = mutableData[rowIndex][columnId]; // Update the original data with the new value
  //     setMutableData(newData);
  //     setEditingCell(null);
  //   }
  // };
 
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
  // const rows = data.map(item => ({
  //   'column-0': item.salesrep,
  //   // 'column-1': item.npsVol,
  //   // 'column-2': item.npsScore,
  //   // 'column-3': item.adv109,
  //   // 'column-4': item.pass87,
  //   // 'column-5': item.detr,
  //   'column-6':item.pnncount,
  //   'column-7':item.bundelnewcount,
  //   'column-8': item.tmbcount,
  //   'column-9': item.upgrade,
  //   'column-13': item.outriCount,
  //   'column-14': item.dcpcount,
  //   'column-17': item.gpvalue,
  //   // 'column-5': item.tbm // Make sure this matches the data structure
  // }));

  
  const rows = data.map(item => {
    const rowData = { 'column-0': item.salesrep };

    // Find all matching NPS rows for the current salesrep
    const matchingNpsRows = npsData.NPSs?.filter(npsItem => npsItem.salesrep === item.salesrep);
// console.log(matchingNpsRows)
    // If there are matching NPS rows, add them to the corresponding columns
    if (matchingNpsRows?.length > 0) {
        matchingNpsRows.forEach((npsRow, index) => {
            // Add NPS data to corresponding columns
            rowData[`column-${index + 1}`] = npsRow.NPSVol; // Assuming 'NPS Score' should be added to column-1
            // Add other NPS data to corresponding columns as needed
            // Example:
            rowData[`column-${index + 2}`] = npsRow.NPSScore;
            rowData[`column-${index + 3}`] = npsRow.adv10_9;
            rowData[`column-${index + 4}`] = npsRow.pass8_7;
            rowData[`column-${index + 5}`] = npsRow.detr_less_6;
        });
    } else {
        // If no matching NPS rows are found, set default values or leave empty
        rowData['column-1'] = ''; // Or any default value if NPS data is not found
        // Set default or empty values for other NPS columns
    }

    // Add other columns from the 'data' object as needed
    rowData['column-6'] = item.pnncount;
    rowData['column-7'] = item.bundelnewcount;
    rowData['column-8'] = item.tmbcount;
    rowData['column-9'] = item.upgrade;
    rowData['column-13'] = item.outriCount;
    rowData['column-14'] = item.dcpcount;
    rowData['column-17'] = item.gpvalue;

    return rowData;
});

 
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
          <Box display="flex" alignItems="center">
          <Typography variant="body1" style={{ marginRight: '8px' }}>
    Hide Optional Data
  </Typography>
          <Checkbox
            checked={hideColumns}
            onChange={(e) => setHideColumns(e.target.checked)}
            color="primary"
          />
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
        </Box>
        {loading || targetLoading ? (
        <CircularProgress sx={{ margin: '20px auto', display: 'block' }} />
      ) : error || targetError ? (
        <Box sx={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          {error || targetError}
        </Box>
      ) : (
        <>
        
        <TableContainer sx={{ maxHeight: 680, borderRadius: '0 0 8px 8px', border: '2px solid #e0e0e0', borderTop: 'none' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={hideColumns ? 1 : 6} style={{ borderRight: '1px solid #e0e0e0' }} />
                <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>15%</TableCell>
                <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>14%</TableCell>
                <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>14%</TableCell>
                <TableCell colSpan={1} style={{ borderRight: '1px solid #e0e0e0' }}/>
                <TableCell colSpan={3} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>20% compulsory KPI</TableCell>
                <TableCell colSpan={6} style={{ borderRight: '1px solid #e0e0e0' }}/>
              </TableRow>
              <TableRow>
              {columns.map((column, index) => (
                    !hideColumns || index > 5 || index <1 ? ( // Conditionally render columns
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth, fontWeight: 'bold', backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0'}}
                    >
                      {column.label}
                    </TableCell>
                    ) : null
                  ))}
              </TableRow>
            </TableHead>
            <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, rowIndex) => (
                  !hideColumns || ( rowIndex !== rows.length ) ? ( // Conditionally render rows
                  <TableRow hover role="checkbox" tabIndex={-1} key={rowIndex}>
                    {columns.map((column, colIndex) => {
                      const cellKey = `${rowIndex}-${column.id}`;
                      const value = row[column.id];
                      const isEditable = colIndex >= 1 && colIndex <= 5; // Make columns 2, 3, 4, 5 editable
                      return (
                        !hideColumns || colIndex > 5  || colIndex < 1 ? (
                        <TableCell
                          key={cellKey}
                          align={column.align}
                          onClick={() => isEditable && handleDoubleClick(rowIndex, column.id)}
                          onBlur={() => isEditable && handleBlur(rowIndex, column.id)}

                          
                          style={{
                            border: '1px solid #e0e0e0',
                         
                            textAlign:'center' ,
                          }}
                        >
                          {editingCell &&
                          editingCell.rowIndex === rowIndex &&
                          editingCell.columnId === column.id ? (
                            <TextField
                              // value={value}
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
                            ): (
                              value
                            )
                          )}
                        </TableCell>
                        ) : null
                      );
                    })}
                  </TableRow>
                  ) : null
                ))}
                <TableRow>
                  {totals.map((total, index) => (
                    !hideColumns || index > 5 ||index<1 ? ( // Conditionally render totals
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
                    ) : null
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
         </>
      )}
      </Paper>
    </>
  );
}

