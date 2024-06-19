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
import { calculateYearlyFortnights, getLastFourFortnights, getAnps} from '../utils/formatDate';



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
  const [noDataMessage, setNoDataMessage] = useState('');
   // Redux hooks
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tableData);
  const { target,  loading: targetLoading, error: targetError } = useSelector((state) => state.targets);
  const { npsData,  npsLoading,  npsError } = useSelector((state) => state.nps);

  console.log(mutableData)
  
    // Fetch targets when the selected tab changes
  // useEffect(() => {
   
  //   let salelocation = selectedTab.value;
  //   if (selectedTab.value === 'All Stores') {
  //     salelocation = 'all-store';
  //   } 
  //   dispatch(getTargetThunk(salelocation));
  // }, [dispatch, selectedTab.value]);
  useEffect(() => {
    console.log({fromDate,toDate})
    let salelocation = selectedTab.value;
    if (selectedTab.value === 'All Stores') {
      salelocation = 'all-store';
    } 
    const formattedFromDate = formatDate(new Date(fromDate));
    const formattedToDate = formatDate(new Date(toDate));
        dispatch(getTargetThunk({ salelocation, startDate:formattedFromDate, endDate: formattedToDate}));
      }, [dispatch,selectedTab, fromDate,toDate]);
 


   // Initialize dates and fetch initial data
  useEffect(() => {
    const today = new Date();
    // const thirtyDaysAgo = new Date(today);
    // thirtyDaysAgo.setDate(today.getDate() - 90);
    // const formattedforFromDate =formatforDate(thirtyDaysAgo)
    // const formattedforTomDate =formatforDate(today)
    const formattedFromDate = formatDate(new Date(fromDate));
    const formattedToDate = formatDate(new Date(toDate));
    // setFromDate(formattedforFromDate);
    // setToDate(formattedforTomDate);
    dispatch(loadData({salelocation:  selectedTab.value,  startDate: formattedFromDate, endDate: formattedToDate }));
  }, [dispatch]);
 
    
 
  
  const formatDate = (date) => {
    // console.log(date);
    const day = String(date.getUTCDate()).padStart(2, '0');
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const year = String(date.getUTCFullYear()).slice(2); // Get last 2 digits of the year
    return `${day}/${month}/${year}`;
  };
  const formatforDate = (date) => {
    const day = String(date.getDate()+1).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = String(date.getFullYear()); // Get full year
    return `${year}-${month}-${day}`;
};

// useEffect(() => {
//   const startDate = fromDate.split('-').reverse().join('/');
//   const endDate = toDate.split('-').reverse().join('/');
//   fetchDataForTab(selectedTab.value, startDate, endDate);

//   // Set the no data message
//   if (data?.length === 0) {
//     setNoDataMessage(`No data found between ${fromDate} and ${toDate}`);
//   } else {
//     setNoDataMessage('');
//   }
// }, [fromDate, toDate]);
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
 
   // Handle tab change

  const handleTabChange = (event, newValue) => {
    console.log("pressed")
    // setSelectedFortnight(null);
    const selectedTabValue = tabs[newValue];
    setSelectedTab({ index: newValue, value: selectedTabValue });
    // const today = new Date();
    // const thirtyDaysAgo = new Date(today);
    // thirtyDaysAgo.setDate(today.getDate() - 90);
    // const formattedforFromDate =formatforDate(thirtyDaysAgo)
    // const formattedforTomDate =formatforDate(today)
    // const formattedFromDate = formatDate(thirtyDaysAgo);
    // const formattedToDate = formatDate(today);
    const formattedFromDate = formatDate(new Date(fromDate));
    const formattedToDate = formatDate(new Date(toDate));
    // setFromDate(formattedforFromDate);
    // setToDate(formattedforTomDate);
    fetchDataForTab(selectedTabValue, formattedFromDate, formattedToDate);
  };
console.log(error,targetError)

  // Fetch data based on current date range and tab
  const fetchData = () => {
    const startDate = fromDate.split('-').reverse().join('/');
    const endDate = toDate.split('-').reverse().join('/');
    fetchDataForTab(selectedTab.value, startDate, endDate);
  };
  // useEffect(() => {
  //   const startDate = fromDate.split('-').reverse().join('/');
  //   const endDate = toDate.split('-').reverse().join('/');
  //   dispatch(getAllNpsThunk({  startDate,  endDate }));
  //   console.log({  startDate,  endDate })
  // }, [createNpsThunk,updateNpsThunk, dispatch, selectedFortnight]);
  // console.log(startDate)

// useEffect(() => {
//   const formattedStartDate = formatDate(new Date(fromDate));
//   const formattedEndDate = formatDate(new Date(toDate));
//   dispatch(getAllNpsThunk({ startDate: formattedStartDate, endDate: formattedEndDate }));
//   console.log({ startDate: formattedStartDate, endDate: formattedEndDate });
// }, [dispatch, fromDate, toDate]);


  useEffect(() => {
    fetchData()
  }, [fromDate,toDate]);
  useEffect(() => {
    setMutableData(data?.map(item => ({ ...item }))); // Create a mutable copy of data
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
 

  const forrmatDate = (date) => {
    const d = new Date(date);
    let month = '' + (d.getUTCMonth() + 1); // Use getUTCMonth
    let day = '' + d.getUTCDate(); // Use getUTCDate
    const year = d.getUTCFullYear(); // Use getUTCFullYear
  
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
  
    return [year, month, day].join('-');
  };
  const currentDate = forrmatDate(new Date());
  let isUpdating = false;
  const handleBlur = async (rowIndex, columnId) => {
    if (editingCell && editingCell.rowIndex === rowIndex && editingCell.columnId === columnId) {
      if (isUpdating) {
        return;
      }
  
      const newData = [...mutableData];
      const originalValue = data[rowIndex][columnId];
      const newValue = newData[rowIndex][columnId];
  
      if (newValue !== originalValue) {
        isUpdating = true;
  
        newData[rowIndex][columnId] = newValue;
        setMutableData(newData);
        setEditingCell(null);
  
        const rowData = newData[rowIndex];
        const existingNpsEntry = npsData?.find(entry => entry.salesrep === rowData.salesrep);
        const filedName=columnId === 'column-1'?"NPSVol" :columnId === 'column-2'?"NPSScore":columnId === 'column-3'?"adv10_9":columnId === 'column-4'?"pass8_7":columnId === 'column-5' ?"detr_less_6":null; 
        const npsValue = {
          salesrep: rowData.salesrep,
          salelocation: selectedTab.value,
          createdDate: forrmatDate(new Date()),
          NPSVol: columnId === 'column-1' ? parseFloat(newValue) : existingNpsEntry?.NPSVol || 0,
          NPSScore: columnId === 'column-2' ? parseFloat(newValue) : existingNpsEntry?.NPSScore || 0,
          adv10_9: columnId === 'column-3' ? parseFloat(newValue) : existingNpsEntry?.adv10_9 || 0,
          pass8_7: columnId === 'column-4' ? parseFloat(newValue) : existingNpsEntry?.pass8_7 || 0,
          detr_less_6: columnId === 'column-5' ? parseFloat(newValue) : existingNpsEntry?.detr_less_6 || 0,
          updatedBy: 'Akhil',
          fieldsToBeUpdate:filedName
        };
  
        // Check if selectedFortnight is not null before proceeding
        if (selectedFortnight !== null) {
          try {
            const createdAtFormatted = existingNpsEntry ? forrmatDate(existingNpsEntry.createdDate) : null;
            console.log(createdAtFormatted,currentDate,existingNpsEntry)
            if (existingNpsEntry && createdAtFormatted === currentDate) {
              await dispatch(updateNpsThunk({ npsData: npsValue }));
            } else {
              await dispatch(createNpsThunk(npsValue));
            }
            
        // Add logging to check the values of fromDate and toDate
        
        
        if (fromDate && toDate) {
          const formattedFromDate = formatDate(new Date(fromDate));
          const formattedToDate = formatDate(new Date(toDate));
          console.log('fromDate:', formattedFromDate);
        console.log('toDate:', formattedToDate);
          await dispatch(getAllNpsThunk({ startDate: formattedFromDate, endDate: formattedToDate }));
        } else {
          console.error('fromDate or toDate is undefined:', { fromDate, toDate });
        }
          } catch (error) {
            console.error('Error updating or creating NPS data:', error);
          } finally {
            isUpdating = false;
          }
        } else {
          // Show an alert if selectedFortnight is null
          alert('Please select a fortnight to update or create data.');
        }
      }
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
  'Belong NBN',
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

  
  
  const rows = data?.map(item => {
    const rowData = { 'column-0': item.salesrep };

    // Find all matching NPS rows for the current salesrep
    const matchingNpsRows = npsData?.filter(npsItem => npsItem.salesrep === item.salesrep);
    if (matchingNpsRows?.length > 0) {
        matchingNpsRows.forEach((npsRow, index) => {
           // Calculate NPSVol
        const NPSVol = npsRow.adv10_9 + npsRow.pass8_7 + npsRow.detr_less_6;

        // Calculate NPS Score
        const NPSAdvPercentage = NPSVol !== 0 ? ((npsRow.adv10_9 / NPSVol) * 100).toFixed(2) : 0;
        const NPSDetrPercentage = NPSVol !== 0 ? ((npsRow.detr_less_6 / NPSVol) * 100).toFixed(2) : 0;
        const NPSScore = Math.round(NPSAdvPercentage - NPSDetrPercentage);
            // Add NPS data to corresponding columns
            rowData[`column-${index + 1}`] = NPSVol; // Assuming 'NPS Score' 
            rowData[`column-${index + 2}`] = NPSScore;
            rowData[`column-${index + 3}`] = npsRow.adv10_9;
            rowData[`column-${index + 4}`] = npsRow.pass8_7;
            rowData[`column-${index + 5}`] = npsRow.detr_less_6;
        });
    } else {
        // If no matching NPS rows are found, set default values or leave empty
        rowData['column-1'] = ''
    }

    // Add other columns from the 'data' object as needed
    rowData['column-6'] = item.pnncount;
    rowData['column-7'] = item.bundelnewcount;
    rowData['column-8'] = item.tmbcount;
    rowData['column-9'] = item.upgrade;
    rowData['column-13'] = item.outriCount;
    rowData['column-14'] = item.dcpcount;
    rowData['column-15'] = item['Belong NBN'];
    rowData['column-18'] = item.gpvalue;
    rowData['column-19'] = parseFloat(item.SaleValue).toFixed(2);

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
       <Box sx={{ padding: '20px', textAlign: 'center', color: 'red' }}>
       <CircularProgress sx={{ margin: '20px auto', display: 'block' }} />
     </Box>
      ) : error  ? (
        <Box sx={{ padding: '20px', textAlign: 'center', color: 'red' }}>
          {error }
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
                      style={{ minWidth: column.minWidth, fontWeight: 'bold',   backgroundColor: '#f5f5f5', border: '1px solid #e0e0e0'}}
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
                      const isEditable = colIndex >= 3   && colIndex <= 5; // Make columns 2, 3, 4, 5 editable
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
                              value={mutableData[rowIndex] ? mutableData[rowIndex][column.id] : ''}
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

