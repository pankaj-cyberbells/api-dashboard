import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, AppBar, Toolbar, Typography, Tabs, Tab, Box } from '@mui/material';
import Navbar from '../components/Navbar';

const headerNames = [
  'Traralgon',
  'Pass 8-7',
  'Detr<6',
  'PPN(6)',
  'Bundle New (2)',
  'TMB (5)',
  'Upgrade & Protect',
  'Tyro (2)',
  'Website BAS (1)',
  'Device Security($10/m)(1)',
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
  minWidth: 100,
  align: 'center',
  format: (value) => value
}));

function createData(name, ...values) {
  const rowData = { name };
  values.forEach((value, index) => {
    const columnId = `column-${index}`;
    rowData[columnId] = value;
  });
  return rowData;
}

const rows = Array.from({ length: 10 }, (_, rowIndex) =>
  createData(`Row ${rowIndex + 1}`, ...Array.from({ length: 16 }, () => Math.floor(Math.random() * 1000)))
);

export default function Dashboard() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabs = ['All Stores', 'Traralgon', 'Warragul', 'Torquay'];

  return (
    <>
       <Navbar/>
      <Paper sx={{ width: '98%', marginTop: 5, marginLeft: '15px', padding: '10px' }}>
        <Box 
          sx={{ 
            borderBottom: '2px solid #e0e0e0', 
            // marginBottom: '2px', 
            borderRadius: '8px 8px 0 0',
            borderLeft: '2px solid #e0e0e0', 
            borderRight: '2px solid #e0e0e0',
            // borderTop: '2px solid #e0e0e0',
            backgroundColor: '#fafafa'
          }}
        >
          <Tabs
            value={selectedTab}
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
             marginRight: '2px', }} />
            ))}
          </Tabs>
        </Box>
        
        <TableContainer sx={{ maxHeight: 480, borderRadius: '0 0 8px 8px', border: '2px solid #e0e0e0', borderTop: 'none' }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
            <TableRow>
                <TableCell colSpan={3} style={{ borderRight: '1px solid #e0e0e0' }} />
                <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>15%</TableCell>
                <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>14%</TableCell>
                <TableCell colSpan={1} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>14%</TableCell>
                <TableCell colSpan={1} style={{ borderRight: '1px solid #e0e0e0' }}/>
                <TableCell colSpan={3} align="center" style={{ borderRight: '1px solid #e0e0e0' }}>20% cumpulsary kpi</TableCell>
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
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align} style={{ border: '1px solid #e0e0e0', position: 'relative' }}>
                          {column.label === 'Pass 8-7' && (
                            <>
                              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '50%', height: '50%', borderRadius: '50%', backgroundColor: '#c8e6c9' }} />
                              <div style={{ position: 'relative', zIndex: 1 }}>{value}</div>
                            </>
                          )}
                          {column.label !== 'Pass 8-7' && (value)}
                        </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
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