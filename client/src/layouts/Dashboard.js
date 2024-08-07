import React, { useState, useEffect } from "react";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tabs,
  Tab,
  Box,
  TextField,
  CircularProgress,
  Checkbox,
  Typography,
} from "@mui/material";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loadData, AllStore } from "../features/tableDataSlice";
import {
  createNpsThunk,
  getAllNpsThunk,
  updateNpsThunk,
} from "../features/npsSlice";
import DateInputs from "../components/DateInputs";
import CircularIndicator from "../components/CircularIndicator";
import { getTargetThunk } from "../features/targetSlice";
import FortnightDropdown from "../components/FortnightDropdown";
import {
  calculateYearlyFortnights,
  getLastFourFortnights,
  getAnps,
} from "../utils/formatDate";

export default function Dashboard() {
  // State variables
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [selectedTab, setSelectedTab] = useState({
    index: 1,
    value: "Traralgon",
  });
  const [editingCell, setEditingCell] = useState(null); // To track the cell being edited
  const [mutableData, setMutableData] = useState([]); // To hold a mutable copy of data
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedFortnight, setSelectedFortnight] = useState(null);
  const [hideColumns, setHideColumns] = useState(false);
  const [noDataMessage, setNoDataMessage] = useState("");
  // Redux hooks
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.tableData);
  const {
    target,
    loading: targetLoading,
    error: targetError,
  } = useSelector((state) => state.targets);
  const { npsData, npsLoading, npsError } = useSelector((state) => state.nps);

  console.log(mutableData);

  // Fetch targets when the selected tab changes
  // useEffect(() => {

  //   let salelocation = selectedTab.value;
  //   if (selectedTab.value === 'All Stores') {
  //     salelocation = 'all-store';
  //   }
  //   dispatch(getTargetThunk(salelocation));
  // }, [dispatch, selectedTab.value]);
  useEffect(() => {
    console.log({ fromDate, toDate });
    let salelocation = selectedTab.value;
    if (selectedTab.value === "All Stores") {
      salelocation = "all-store";
    }
    const formattedFromDate = formatDate(new Date(fromDate));
    const formattedToDate = formatDate(new Date(toDate));
    dispatch(
      getTargetThunk({
        salelocation,
        startDate: formattedFromDate,
        endDate: formattedToDate,
      })
    );
  }, [dispatch, selectedTab, fromDate, toDate]);

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
    dispatch(
      loadData({
        salelocation: selectedTab.value,
        startDate: formattedFromDate,
        endDate: formattedToDate,
      })
    );
  }, [dispatch]);
  function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    // Note: months are 0-indexed in JavaScript Date objects
    return new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
}

  const formatDate = (date) => {
    // console.log(date);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = String(date.getUTCFullYear()).slice(2); // Get last 2 digits of the year
    return `${day}/${month}/${year}`;
  };

  const formatforDate = (date) => {
    const day = String(date.getDate() + 1).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
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
    if (tabValue === "All Stores") {
      console.log("pressed A");
      dispatch(AllStore({ startDate, endDate }));
    } else {
      console.log("pressed O");
      dispatch(loadData({ salelocation: tabValue, startDate, endDate }));
    }
  };

  // Group data by sale location

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    console.log("pressed");
    // setSelectedFortnight(null);
    const selectedTabValue = tabs[newValue];
    setSelectedTab({ index: newValue, value: selectedTabValue });

    const formattedFromDate = formatDate(new Date(fromDate));
    const formattedToDate = formatDate(new Date(toDate));

    fetchDataForTab(selectedTabValue, formattedFromDate, formattedToDate);
  };
  console.log(error, targetError);



  // Fetch data based on current date range and tab
  const fetchData = () => {
    const startDate = fromDate.split("-").reverse().join("/");
    const endDate = toDate.split("-").reverse().join("/");
    fetchDataForTab(selectedTab.value, startDate, endDate);
  };



  useEffect(() => {
    const startDate = fromDate.split("-").reverse().join("/");
    const endDate = toDate.split("-").reverse().join("/");
    dispatch(getAllNpsThunk({ startDate, endDate }));
    console.log({ startDate, endDate });
  }, [createNpsThunk, updateNpsThunk, dispatch, selectedFortnight]);
 


  
  useEffect(() => {
    fetchData();
  }, [fromDate, toDate]);
  useEffect(() => {
    setMutableData(data?.map((item) => ({ ...item }))); // Create a mutable copy of data
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
    setMutableData((prevData) => {
      const newData = [...prevData];
      newData[rowIndex][columnId] = event.target.value;
      return newData;
    });
  };

  const forrmatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getUTCMonth() + 1); // Use getUTCMonth
    let day = "" + d.getUTCDate(); // Use getUTCDate
    const year = d.getUTCFullYear(); // Use getUTCFullYear

    if (month.length < 2) {
      month = "0" + month;
    }
    if (day.length < 2) {
      day = "0" + day;
    }

    return [year, month, day].join("-");
  };
  const currentDateS = forrmatDate(new Date());
  let isUpdating = false;
  const handleBlur = async (rowIndex, columnId) => {
    if (
      editingCell &&
      editingCell.rowIndex === rowIndex &&
      editingCell.columnId === columnId
    ) {
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
        const existingNpsEntry = npsData?.find(
        
          (entry) => entry.salesrep === rowData.salesrep && entry.salelocation === selectedTab.value
        );
        console.log(newData[rowIndex])
      
        console.log({existingNpsEntry})
        const fieldName =
          columnId === "column-1"
            ? "NPSVol"
            : columnId === "column-2"
            ? "NPSScore"
            : columnId === "column-3"
            ? "adv10_9"
            : columnId === "column-4"
            ? "pass8_7"
            : columnId === "column-5"
            ? "detr_less_6"
            : null;

        const npsValue = {
          salesrep: rowData.salesrep,
          salelocation: selectedTab.value,
          createdDate: forrmatDate(new Date()),
          NPSVol:
            columnId === "column-1"
              ? parseFloat(newValue)
              : existingNpsEntry?.NPSVol || 0,
          NPSScore:
            columnId === "column-2"
              ? parseFloat(newValue)
              : existingNpsEntry?.NPSScore || 0,
          adv10_9:
            columnId === "column-3"
              ? parseFloat(newValue)
              : existingNpsEntry?.adv10_9 || 0,
          pass8_7:
            columnId === "column-4"
              ? parseFloat(newValue)
              : existingNpsEntry?.pass8_7 || 0,
          detr_less_6:
            columnId === "column-5"
              ? parseFloat(newValue)
              : existingNpsEntry?.detr_less_6 || 0,
          updatedBy: "Akhil",
          fieldsToBeUpdate: fieldName,
        };

        // Check if selectedFortnight is not null before proceeding
        if (selectedFortnight !== null) {
          try {
            const createdAtFormatted = existingNpsEntry
              ? forrmatDate(existingNpsEntry.createdDate)
              : null;
            const currentDate = formatDate(new Date());
            const formattedFromDate = formatDate(new Date(fromDate));
            const formattedToDate = formatDate(new Date(toDate));
            let CfromDate = parseDate(formattedFromDate);
            let CtoDate = parseDate(formattedToDate);
            let Ccurrent = parseDate(currentDate);
            console.log(CfromDate)
            console.log(CtoDate)
            console.log(Ccurrent)
            console.log(createdAtFormatted === currentDateS)
            console.log(Ccurrent >= CfromDate)
            console.log(Ccurrent <= CtoDate)
            console.log(createdAtFormatted === currentDateS)
            console.log(currentDate >= formattedFromDate &&
              currentDate <= formattedToDate);
            // Check if current date is within the range of fromDate to toDate
            if (
              Ccurrent >= CfromDate &&
              Ccurrent <= CtoDate
            ) {
              console.log(existingNpsEntry)
              console.log(currentDate)
              console.log(createdAtFormatted === currentDateS)
              console.log(existingNpsEntry && createdAtFormatted === currentDateS);
              if (existingNpsEntry && createdAtFormatted === currentDateS) {
                console.log("updat kr rha hu")
                await dispatch(updateNpsThunk({ npsData: npsValue }));
              } else {
                console.log("create kr rha hu")
                await dispatch(createNpsThunk(npsValue));
              }

              // Fetch the updated NPS data
              await dispatch(
                getAllNpsThunk({
                  startDate: formattedFromDate,
                  endDate: formattedToDate,
                })
              );
            } else {
              // Show an alert if the current date is not within the range
              alert(
                "Current date is not within the Current fortnight range. You dont change previuos fortnight NPS ."
              );
            }
          } catch (error) {
            console.error("Error updating or creating NPS data:", error);
          } finally {
            isUpdating = false;
          }
        } else {
          // Show an alert if selectedFortnight is null
          alert("Please select a fortnight to update or create data.");
        }
      }
    }
  };
  
  const headerNames = [
    selectedTab.value,
    "NPS Vol",
    "NPS Score",
    "Adv 10-9",
    "Pass 8-7",
    "Detr <6",
    // `Detr (${target?.detr || 'N/A'})`,
    `PPN (${target?.ppn || "N/A"})`,
    `Bundle New (${target?.bundel || "N/A"})`,
    `TMB (${target?.tmb || "N/A"})`,
    "Device Protection",
    `Tyro (${target?.tyro || "N/A"})`,
    `Website BAS (${target?.websitebas || "N/A"})`,
    `Device Security($10/m) (${target?.devicesecurity || "N/A"})`,
    "Outright Mobile/Tablet Inc Prepaid",
    "DPC Mobile/Tablet",
    "Belong NBN",
    "Smart Watch",
    `Device Protect to Hand/Tab DPC (${target?.dpc || "N/A"}%)`,
    "Accessory GP to Handset Sales",
    "Acc GP",
    "Handset/Plan GP",
    "Total GP",
    "Commission",
  ];

  const columns = headerNames.map((header, index) => ({
    id: `column-${index}`,
    label: header,
    minWidth: 120,
    align: "center",
    format: (value) => value,
  }));

  const tabs = ["All Stores", "Traralgon", "Warragul", "Torquay"];

  const rows = data?.map((item) => {
    const rowData = { "column-0": item.salesrep };

    // Find all matching NPS rows for the current salesrep
    // console.log("hggwej", selectedTab.value);
    const matchingNpsRows = npsData?.filter(
      (npsItem) =>
        npsItem.salesrep === item.salesrep &&
        npsItem.salelocation === selectedTab.value
    );
    if (matchingNpsRows?.length > 0) {
      matchingNpsRows.forEach((npsRow, index) => {
        // Calculate NPSVol
        const NPSVol = npsRow.adv10_9 + npsRow.pass8_7 + npsRow.detr_less_6;

        // Calculate NPS Score
        const NPSAdvPercentage =
          NPSVol !== 0 ? ((npsRow.adv10_9 / NPSVol) * 100).toFixed(2) : 0;
        const NPSDetrPercentage =
          NPSVol !== 0 ? ((npsRow.detr_less_6 / NPSVol) * 100).toFixed(2) : 0;
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
      rowData["column-1"] = "";
    }
    const stayConnectedCount = item["Stay Connected"] || 0;
    const upgradeProtectCount = item.upgrade || 0;
    const dpcCount = item.dcpcount || 1; // Assuming 1 to avoid division by zero

    const column17Value =
      Math.round(
        ((stayConnectedCount + upgradeProtectCount) / dpcCount) * 100
      ) + "%";

    const dpcCount1 = item.dcpcount || 0;
    const outrightCount = item.outriCount || 0; // Default to 0 if item.outriCount is undefined or null
    const smartWatchCount = item.smartWatchCount || 0;

    // const columnACCValue = (
    //   item.accGP /
    //   (dpcCount1 + outrightCount + smartWatchCount)
    // ).toFixed(2);
    const columnACCValue = (() => {
      const calculatedValue =
        item.accGP / (dpcCount1 + outrightCount + smartWatchCount);
      return isFinite(calculatedValue) ? Math.round(calculatedValue) : "N/A";
    })();

    // Calculate KPI score
    let kpiScore = 0;

    // Device Protection KPI (15%)
    if (parseFloat(column17Value) > 50) {
      kpiScore += 15;
    }

    // New Bundles KPI (25%)
    if (item.bundelnewcount > 2) {
      kpiScore += 25;
    }

    // Accessory GP to Device KPI (25%)
    if (parseFloat(columnACCValue) > 60) {
      kpiScore += 25;
    }

    // PPN KPI (20%)
    if (item.pnncount > 5) {
      kpiScore += 20;
    }
       if (item.tyro >= 2 && item["Website BAS"] >= 1 && item["Device Security($10/m)"] >= 1) {
      kpiScore += 15;
    }

    // Calculate commission
    console.log({ kpiScore });
    let commission;
    if (kpiScore >= 60) {
      // Step 1: Calculate Gross Profit
      const grossProfitCommission = 0.07 * item.grossprofit;

      // Step 2: Apply KPI percentage
      const kpiAdjustedCommission = (kpiScore / 100) * grossProfitCommission;

      // Step 3: Apply NPS multiplier
      const NPSVol = rowData["column-1"];
      const NPSScore = rowData["column-2"];

      let npsMultiplier = 1;
      if (NPSVol >= 6 && NPSScore >= 75) {
        npsMultiplier = 1.5; // Increase commission by 50%
      } else if (NPSVol < 6 || NPSScore < 65) {
        npsMultiplier = 0.5; // Cut commission by 50%
      }

      commission = kpiAdjustedCommission * npsMultiplier;
      commission = commission.toFixed(2); // Format to 2 decimal places
    } else {
      commission = "Not Eligible";
    }

    // Add other columns from the 'data' object as needed
    rowData["column-6"] = item.pnncount;
    rowData["column-7"] = item.bundelnewcount;
    rowData["column-8"] = item.tmbcount;
    rowData["column-9"] = item.upgrade + item.dcpcount;
    rowData["column-10"] = item.tyro;
    rowData["column-13"] = item.outriCount;
    rowData["column-14"] = item.dcpcount;
    rowData["column-15"] = item["Belong NBN"];
    rowData["column-16"] = item.smartWatchCount;
    rowData["column-17"] = column17Value;
    rowData["column-18"] = columnACCValue;

    rowData["column-19"] = Math.round(item.accGP);
    const column20Value = item.grossprofit - item.accGP;
    const column20flot = Math.round(column20Value);
    rowData["column-20"] = column20flot;
    rowData["column-21"] = Math.round(item.grossprofit);
    rowData["column-22"] = commission;

    return rowData;
  });

 
  const calculateTotals = () => {
    let totalStayConnected = 0;
    let totalUpgradeProtect = 0;
    let totalDPC = 0;
    // let totalAdv10_9 = 0;
    // let totalPass8_7 = 0;
    // let totalDetr_less_6 = 0;

    // Calculate totals directly from data
    data?.forEach((item) => {
      totalStayConnected += isNaN(item["Stay Connected"])
        ? 0
        : parseFloat(item["Stay Connected"]);
      totalUpgradeProtect += isNaN(item.upgrade) ? 0 : parseFloat(item.upgrade);
      totalDPC += isNaN(item.dcpcount) ? 0 : parseFloat(item.dcpcount);
    });

  

    const filteredNpsData = npsData?.filter(
      (npsItem) => npsItem.salelocation === selectedTab.value
    );
    
    const totalAdv10_9 = filteredNpsData?.reduce((sum, item) => sum + item.adv10_9, 0) || 0;
    const totalPass8_7 = filteredNpsData?.reduce((sum, item) => sum + item.pass8_7, 0) || 0;
    const totalDetr_less_6 = filteredNpsData?.reduce((sum, item) => sum + item.detr_less_6, 0) || 0;
    
    // Calculate total NPS Score
    const totalNPSVol = totalAdv10_9 + totalPass8_7 + totalDetr_less_6;
    const NPSAdvPercentage =
      totalNPSVol !== 0 ? ((totalAdv10_9 / totalNPSVol) * 100).toFixed(2) : 0;
    const NPSDetrPercentage =
      totalNPSVol !== 0
        ? ((totalDetr_less_6 / totalNPSVol) * 100).toFixed(2)
        : 0;
    const totalNPSScore = Math.round(NPSAdvPercentage - NPSDetrPercentage);
    console.log(NPSAdvPercentage);
    console.log(NPSDetrPercentage);
    console.log(totalNPSScore);

    const totals = columns.map((column, colIndex) => {
      if (colIndex === 0) return "Total"; // Label for the first column
      if (colIndex === 2) {
        console.log("Setting column 1 to totalNPSScore:", totalNPSScore);
        return totalNPSScore;
      }

      const total = rows.reduce((sum, row) => {
        const value = row[column.id];
        // Remove dollar sign if present and parse the value
        const numValue =
          typeof value === "string" && value.startsWith("$")
            ? parseFloat(value.substring(1))
            : parseFloat(value);

        return sum + (isNaN(numValue) ? 0 : numValue);
      }, 0);

      return Math.round(total); // Format the total to 2 decimal places
    });

    // Calculate Device Protection to Hand/Tab DPC (50%)
    const deviceProtectToDPC =
      totalDPC !== 0
        ? Math.round(
            ((totalStayConnected + totalUpgradeProtect) / totalDPC) * 100
          ) + "%"
        : "0%";

    // Assume column-17 is for Device Protection to Hand/Tab DPC
    const column17Index = columns.findIndex(
      (column) => column.id === "column-17"
    );
    if (column17Index !== -1) {
      totals[column17Index] = deviceProtectToDPC;
    }

    return totals;
  };
  const totals = calculateTotals();

  return (
    <>
      <Navbar />
      <Paper
        sx={{ width: "98%", marginTop: 5, marginLeft: "15px", padding: "10px" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "2px solid #e0e0e0",
            borderRadius: "8px 8px 0 0",
            borderLeft: "2px solid #e0e0e0",
            borderRight: "2px solid #e0e0e0",
            backgroundColor: "#fafafa",
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
            sx={{ minHeight: "48px" }}
          >
            {tabs.map((tab, index) => (
              <Tab
                key={index}
                label={tab}
                sx={{
                  minWidth: "150px",
                  borderRadius: "8px 8px 0 0",
                  borderLeft: "2px solid #e0e0e0",
                  borderRight: "2px solid #e0e0e0",
                  borderTop: "2px solid #e0e0e0",
                  marginRight: "2px",
                  paddingY: "25.5px",
                }}
              />
            ))}
          </Tabs>
          <Box display="flex" alignItems="center">
            <Typography variant="body1" style={{ marginRight: "8px" }}>
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
          <Box sx={{ padding: "20px", textAlign: "center", color: "red" }}>
            <CircularProgress sx={{ margin: "20px auto", display: "block" }} />
          </Box>
        ) : error ? (
          <Box sx={{ padding: "20px", textAlign: "center", color: "red" }}>
            {error}
          </Box>
        ) : (
          <>
            <TableContainer
              sx={{
                maxHeight: 680,
                borderRadius: "0 0 8px 8px",
                border: "2px solid #e0e0e0",
                borderTop: "none",
              }}
            >
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    <TableCell
                      colSpan={hideColumns ? 3 : 6}
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    />
                    <TableCell
                      colSpan={1}
                      align="center"
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    >
                      20%
                    </TableCell>
                    <TableCell
                      colSpan={1}
                      align="center"
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    >
                      25%
                    </TableCell>
                    <TableCell
                      colSpan={1}
                      align="center"
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    >
                    
                    </TableCell>
                    {!hideColumns && (
                      <TableCell
                        colSpan={1}
                        align="center"
                        style={{ borderRight: "1px solid #e0e0e0" }}
                      />
                    )}
                    <TableCell
                      colSpan={3}
                      align="center"
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    >
                      15% compulsory KPI
                    </TableCell>
                    <TableCell
                      colSpan={hideColumns ? 2 : 4}
                      align="center"
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    ></TableCell>
                    <TableCell
                      colSpan={1}
                      align="center"
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    >
                      15%
                    </TableCell>
                    <TableCell
                      colSpan={1}
                      align="center"
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    >
                      25%
                    </TableCell>
                    <TableCell
                      colSpan={4}
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    />
                  </TableRow>
                  <TableRow>
                    {columns.map((column, index) =>
                      (!hideColumns || index > 5 || index < 3) &&
                      (!hideColumns ||
                        (index !== 9 && index !== 13 && index !== 14)) ? ( // Conditionally render columns
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{
                            minWidth: column.minWidth,
                            fontWeight: "bold",
                            backgroundColor: "#f5f5f5",
                            border: "1px solid #e0e0e0",
                          }}
                        >
                          {column.label}
                        </TableCell>
                      ) : null
                    )}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, rowIndex) =>
                      !hideColumns || rowIndex !== rows.length ? ( // Conditionally render rows
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={rowIndex}
                        >
                          {columns.map((column, colIndex) => {
                            const cellKey = `${rowIndex}-${column.id}`;
                            const value = row[column.id];
                            const isEditable = colIndex >= 3 && colIndex <= 5; // Make columns 2, 3, 4, 5 editable
                            return (!hideColumns ||
                              colIndex > 5 ||
                              colIndex < 3) &&
                              (!hideColumns ||
                                (colIndex !== 9 &&
                                  colIndex !== 13 &&
                                  colIndex !== 14)) ? (
                              <TableCell
                                key={cellKey}
                                align={column.align}
                                onClick={() =>
                                  isEditable &&
                                  handleDoubleClick(rowIndex, column.id)
                                }
                                onBlur={() =>
                                  isEditable && handleBlur(rowIndex, column.id)
                                }
                                style={{
                                  border: "1px solid #e0e0e0",

                                  textAlign: "center",
                                }}
                              >
                                {editingCell &&
                                editingCell.rowIndex === rowIndex &&
                                editingCell.columnId === column.id ? (
                                  <TextField
                                    // value={value}
                                    value={
                                      mutableData[rowIndex]
                                        ? mutableData[rowIndex][column.id]
                                        : ""
                                    }
                                    onChange={(event) =>
                                      handleInputChange(
                                        event,
                                        rowIndex,
                                        column.id
                                      )
                                    }
                                    onBlur={() =>
                                      handleBlur(rowIndex, column.id)
                                    }
                                    autoFocus
                                  />
                                ) : column.id === "column-8" ||
                                  column.id === "column-6" ||
                                  column.id === "column-7" ||
                                  column.id === "column-17" ? (
                                  <Box
                                    display="flex"
                                    justifyContent="center"
                                    alignItems="center"
                                    width="100%"
                                  >
                                    <CircularIndicator
                                      value={value}
                                      target={
                                        column.id === "column-6"
                                          ? target?.ppn
                                          : column.id === "column-17"
                                          ? target?.dpc
                                          : column.id === "column-7"
                                          ? target?.bundel
                                          : target?.tmb
                                      }
                                      isDpcColumn={column.id === "column-17"}
                                    />
                                  </Box>
                                ) : // Add dollar sign for the last three columns
                                column.id === "column-18" ||
                                  column.id === "column-19" ||
                                  column.id === "column-20" ||
                                  column.id === "column-21" ? (
                                  `$${value}`
                                ) : (
                                  value
                                )}
                              </TableCell>
                            ) : null;
                          })}
                        </TableRow>
                      ) : null
                    )}
                  <TableRow>
                    {totals.map((total, index) =>
                      (!hideColumns || index > 5 || index < 3) &&
                      (!hideColumns ||
                        (index !== 9 && index !== 13 && index !== 14)) ? ( // Conditionally render totals
                        <TableCell
                          key={index}
                          align="center"
                          style={{
                            position: "sticky",
                            bottom: 0,
                            backgroundColor: "lightgrey",
                            fontWeight: "bold",
                            borderTop: "1px solid black",
                          }}
                        >
                          {index === 18 ||
                          index === 19 ||
                          index === 20 ||
                          index === 21
                            ? `$${total}`
                            : total}
                        </TableCell>
                      ) : null
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[25, 50, 100]}
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
