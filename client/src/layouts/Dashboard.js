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
import { getKPITargetThunk } from "../features/kpiTargetSlice";
import FortnightDropdown from "../components/FortnightDropdown";
import {
  calculateYearlyFortnights,
  getLastFourFortnights,
  getAnps,
} from "../utils/formatDate";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const [originalValues, setOriginalValue] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedFortnight, setSelectedFortnight] = useState(null);
  const [hideColumns, setHideColumns] = useState(true);
  const [noDataMessage, setNoDataMessage] = useState("");
  const [KPITargets, setKPITargets] = useState({
    KPITMB:null,
    KPIPPN: null,
    KPIBundle: null,
    KPITWD: null,
    KPIDPC: null,
    KPIACCGP: null,
  });

  // Redux hooks
  const dispatch = useDispatch();
  const { data, message, loading, error } = useSelector(
    (state) => state.tableData
  );
  const {
    target,
    loading: targetLoading,
    error: targetError,
  } = useSelector((state) => state.targets);

  const { npsData, npsLoading, npsError } = useSelector((state) => state.nps);
  const {
    KPITarget,
    loading: KPILoading,
    error: KPIError,
  } = useSelector((state) => state.KPITargets);

  useEffect(() => {
    if (KPITarget) {
      setKPITargets({
        KPITMB:KPITarget.KPITMB ?? null,
        KPIPPN: KPITarget.KPIPPN ?? null,
        KPIBundle: KPITarget.KPIBundle ?? null,
        KPITWD: KPITarget.KPITWD ?? null,
        KPIDPC: KPITarget.KPIDPC ?? null,
        KPIACCGP: KPITarget.KPIACCGP ?? null,
      });
    } else {
      setKPITargets({
        KPITMB: null,
        KPIPPN: null,
        KPIBundle: null,
        KPITWD: null,
        KPIDPC: null,
        KPIACCGP: null,
      });
    }
  }, [KPITarget]);
  console.log(KPITarget, "hhh");

  // Fetch targets when the selected tab changes
  // useEffect(() => {

  //   let salelocation = selectedTab.value;
  //   if (selectedTab.value === 'All Stores') {
  //     salelocation = 'all-store';
  //   }
  //   dispatch(getTargetThunk(salelocation));
  // }, [dispatch, selectedTab.value]);

  useEffect(() => {
    if (message) {
      toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  }, [message]);

  // Helper function to check if a date is valid
  function isValidDate(dateString) {
    return !dateString.includes("NaN");
  }
  useEffect(() => {
    console.log({ fromDate, toDate });
    let salelocation = selectedTab.value;
    if (selectedTab.value === "All Stores") {
      salelocation = "all-store";
    }

    const formattedFromDate = formatDate(new Date(fromDate));
    const formattedToDate = formatDate(new Date(toDate));

    // Check if the dates are valid before making the API call
    if (isValidDate(formattedFromDate) && isValidDate(formattedToDate)) {
      dispatch(
        getTargetThunk({
          salelocation,
          startDate: formattedFromDate,
          endDate: formattedToDate,
        })
      );
      dispatch(
        getKPITargetThunk({
          salelocation,
          startDate: formattedFromDate,
          endDate: formattedToDate,
        })
      );
    } else {
      console.log("Invalid date detected. Waiting for correct date.");
    }
  }, [dispatch, selectedTab, fromDate, toDate]);

  // Initialize dates and fetch initial data
  useEffect(() => {
    const today = new Date();
    const formattedFromDate = formatDate(new Date(fromDate));
    const formattedToDate = formatDate(new Date(toDate));

    // Check if the dates are valid before making the API call
    if (isValidDate(formattedFromDate) && isValidDate(formattedToDate)) {
      dispatch(
        loadData({
          salelocation: selectedTab.value,
          startDate: formattedFromDate,
          endDate: formattedToDate,
        })
      );
    } else {
      console.log("Invalid date detected. Waiting for correct date.");
    }
  }, [dispatch]);

  function parseDate(dateString) {
    const [day, month, year] = dateString.split("/");
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
    // Store the original value when starting to edit
    const value = mutableData[rowIndex] ? mutableData[rowIndex][columnId] : "";
    setOriginalValue(value);
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
      // Get the current value
      const value = mutableData[rowIndex]
        ? mutableData[rowIndex][columnId]
        : "";
      if (value === originalValues || value.trim() === "") {
        setEditingCell(null);
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
          (entry) =>
            entry.salesrep === rowData.salesrep &&
            entry.salelocation === selectedTab.value
        );
        console.log(newData[rowIndex]);

        console.log({ existingNpsEntry });
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

            
              console.log(existingNpsEntry);
              console.log(currentDate);
              console.log(createdAtFormatted === currentDateS);
              console.log(
                existingNpsEntry && createdAtFormatted === currentDateS
              );

            const createdDate = existingNpsEntry && Ccurrent >= CfromDate && Ccurrent <= CtoDate
          ? forrmatDate(new Date())
          : forrmatDate(new Date(fromDate));

        npsValue.createdDate = createdDate;


              if (existingNpsEntry && createdAtFormatted === currentDateS) {
                console.log("updat kr rha hu");
                await dispatch(updateNpsThunk({ npsData: npsValue }));
              } else {
                console.log("create kr rha hu");
                await dispatch(createNpsThunk(npsValue));
              }

              // Fetch the updated NPS data
              await dispatch(
                getAllNpsThunk({
                  startDate: formattedFromDate,
                  endDate: formattedToDate,
                })
              );
             
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
    `Accessory GP to Handset Sales(${target?.AcceGP_Handset_Sales || "N/A"})`,
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
    const rowData = {
      "column-0":
        item.salesrep === "" || item.salesrep === null
          ? "unknown salesrep"
          : item.salesrep,
    };

    // Find all matching NPS rows for the current salesrep
    // console.log("hggwej", selectedTab.value);
    const matchingNpsRows = npsData?.filter((npsItem) => {
      if (selectedTab.value === 'All Stores') {
        return npsItem.salesrep === item.salesrep;
      } else {
        return npsItem.salesrep === item.salesrep && npsItem.salelocation === selectedTab.value;
      }
    });
    if (matchingNpsRows?.length > 0) {
      let aggregatedData = {
        adv10_9: 0,
        pass8_7: 0,
        detr_less_6: 0
      };
      matchingNpsRows.forEach((npsRow, index) => {
        aggregatedData.adv10_9 += npsRow.adv10_9;
        aggregatedData.pass8_7 += npsRow.pass8_7;
        aggregatedData.detr_less_6 += npsRow.detr_less_6;
        // console.log(`Salesrep: ${npsRow.salesrep}, Aggregated Data:`, aggregatedData);
        // Calculate NPSVol
        const NPSVol = aggregatedData.adv10_9 + aggregatedData.pass8_7 + aggregatedData.detr_less_6;

        // Calculate NPS Score
        const NPSAdvPercentage =
        NPSVol !== 0 ? ((aggregatedData.adv10_9 / NPSVol) * 100).toFixed(2) : 0;
        const NPSDetrPercentage =
          NPSVol !== 0 ? ((aggregatedData.detr_less_6 / NPSVol) * 100).toFixed(2) : 0;
        const NPSScore = Math.round(NPSAdvPercentage - NPSDetrPercentage);
        // console.log(`Final Aggregated Data for ${item.salesrep}:`, aggregatedData);
        // console.log(NPSVol, `NPSScore: ${NPSScore}`);
        // Add NPS data to corresponding columns
        rowData['column-1'] = NPSVol;
        rowData['column-2'] = NPSScore;
        rowData['column-3'] = aggregatedData.adv10_9;
        rowData['column-4'] = aggregatedData.pass8_7;
        rowData['column-5'] = aggregatedData.detr_less_6;
      });
    } else {
     // If no matching NPS rows are found, set default values or leave empty
  rowData["column-1"] = "";
  rowData["column-2"] = "";
  rowData["column-3"] = "";
  rowData["column-4"] = "";
  rowData["column-5"] = "";
    }
    const stayConnectedCount =
      item["Upgrade & Protect Plus (Stay Connected)"] || 0;
    const upgradeProtectCount = item.upgrade || 0;
    const dpcCount = item.dcpcount || 1; // Assuming 1 to avoid division by zero

    const column17Value =
      Math.round((stayConnectedCount / dpcCount) * 100) + "%";

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

    // PPN KPI (20%)
   

    if (item.pnncount >= (target?.ppn!== null ? target?.ppn : 0) ) {
     
      kpiScore +=  KPITargets.KPIPPN !== null ? KPITargets.KPIPPN : 0;

    }

    // New Bundles KPI (25%)
    if (item.bundelnewcount >= (target?.bundel!== null ? target?.bundel : 0)) {
      kpiScore +=KPITargets.KPIBundle !== null ? KPITargets.KPIBundle : 0;
     
    }
      // TMB
      if (
        item.tyro >= (target?.tyro!== null ? target?.tyro : 0) &&
        item["Website BAS"] >= (target?.websitebas!== null ? target?.websitebas : 0) &&
        item["Device Security($10/m)"] >= (target?.devicesecurity!== null ? target?.devicesecurity : 0)
      ) {
        kpiScore += KPITargets.KPITWD !== null ? KPITargets.KPITWD : 0;
        
      }

    // Device Protection KPI (15%)
    if (parseFloat(column17Value) >= (target?.devicesecurity!== null ? target?.devicesecurity : 0)) {
      kpiScore += KPITargets.KPIDPC !== null ? KPITargets.KPIDPC : 0;
     
    }

    // Accessory GP to Device KPI (25%)
    if (parseFloat(columnACCValue) >= (target?.AcceGP_Handset_Sales!== null ? target?.AcceGP_Handset_Sales : 0)) {
      kpiScore += KPITargets.KPIACCGP !== null ? KPITargets.KPIACCGP : 0;
    
    }

  

    // Calculate commission
    // console.log({ kpiScore });
    let commission;
    if (kpiScore >= 65) {
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
    rowData["column-10"] = item.tyro||0;
    rowData["column-11"] = 0;
    rowData["column-12"] = 0;
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
      totalStayConnected += isNaN(
        item["Upgrade & Protect Plus (Stay Connected)"]
      )
        ? 0
        : parseFloat(item["Upgrade & Protect Plus (Stay Connected)"]);
      totalUpgradeProtect += isNaN(item.upgrade) ? 0 : parseFloat(item.upgrade);
      totalDPC += isNaN(item.dcpcount) ? 0 : parseFloat(item.dcpcount);
    });

    // Filter NPS data based on selected tab
    const filteredNpsData = npsData?.filter((npsItem) => 
    selectedTab.value === 'All Stores' ? true : npsItem.salelocation === selectedTab.value
  );  

    const totalAdv10_9 =
      filteredNpsData?.reduce((sum, item) => sum + item.adv10_9, 0) || 0;
    const totalPass8_7 =
      filteredNpsData?.reduce((sum, item) => sum + item.pass8_7, 0) || 0;
    const totalDetr_less_6 =
      filteredNpsData?.reduce((sum, item) => sum + item.detr_less_6, 0) || 0;

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

      const total =
        rows &&
        rows.reduce((sum, row) => {
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
        ? Math.round((totalStayConnected / totalDPC) * 100) + "%"
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

  const headers = [
    { colSpan: hideColumns ? 3 : 6, align: "left", percentage: "", visible: true },
  { colSpan: 1, align: "center", kpi: "KPIPPN", visible: true },
  { colSpan: 1, align: "center", kpi: "KPIBundle", visible: true },
  { colSpan: 1, align: "center", kpi: "KPITMB", visible: true  },
  { colSpan: hideColumns ? 0 : 1, align: "center", percentage: "", visible: !hideColumns },
  { colSpan: 3, align: "center", kpi: "KPITWD", visible: true },
  { colSpan: hideColumns ? 1 : 4, align: "center", percentage: "", visible: true },
  { colSpan: 1, align: "center", kpi: "KPIDPC", visible: true },
  { colSpan: 1, align: "center", kpi: "KPIACCGP", visible: true },
  { colSpan: hideColumns ? 2 : 4, align: "left", percentage: "", visible: true},
  ];

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
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
            TabIndicatorProps={{
              sx: {
                backgroundColor: '#54595f', // Set your desired color for the underline
                height: '3px', // You can also adjust the height/thickness of the underline
              },
            }}
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
                  '&:hover': {
                    backgroundColor: '#54595f', // Set your desired hover background color
                    color: '#FFFFFF', // Set your desired hover text color
                  },
                  '&.Mui-selected': {
                    borderLeft: "2px solid #54595f",
                    borderRight: "2px solid #54595f",
                    borderTop: "2px solid #54595f",
                    backgroundColor: '#54595f',
                    color: '#FFFFFF', // Keep the selected tab color as primary (or any other color)
                  },
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
              sx={{
                color: '#54595f', // Color when unchecked
                '&.Mui-checked': {
                  color: '#54595f', // Color when checked
                },
                '&:hover': {
                  backgroundColor: '#54595f', // Set your desired hover background color
                  color: '#FFFFFF', // Set your desired hover text color
                },
              }}
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
                  {/* <TableRow>
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
                    ></TableCell>
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
                      colSpan={hideColumns ? 1 : 4}
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
                      colSpan={hideColumns ? 2 : 4}
                      style={{ borderRight: "1px solid #e0e0e0" }}
                    />
                  </TableRow> */}
                 <TableRow>
  {headers.filter(header => header.visible).map((header, index) => (
    <TableCell
      key={index}
      colSpan={header.colSpan}
      align={header.align}
      style={{ borderRight: "1px solid #e0e0e0" }}
    >
      {header.kpi && KPITargets && (
        <div>
          {KPITargets[header.kpi] != null
            ? `${KPITargets[header.kpi]}%`
            : "N/A"}
        </div>
      )}

      {header.colSpan === 3 && "compulsory KPI"} {/* Special case handling */}
    </TableCell>
  ))}
</TableRow>
                  <TableRow>
                    {columns.map((column, index) =>
                      (!hideColumns || index > 5 || index < 3) &&
                      (!hideColumns ||
                        (index !== 9 &&
                          index !== 13 &&
                          index !== 14 &&
                          index !== 16 &&
                          index !== 19 &&
                          index !== 20)) ? ( // Conditionally render columns
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
                  {rows &&
                    rows
                      .slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
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
                                    colIndex !== 14 &&
                                    colIndex !== 16 &&
                                    colIndex !== 19 &&
                                    colIndex !== 20)) ? (
                                <TableCell
                                  key={cellKey}
                                  align={column.align}
                                  onClick={() =>
                                    selectedTab.value !== "All Stores" &&
                                    isEditable &&
                                    handleDoubleClick(rowIndex, column.id)
                                  }
                                  onBlur={() =>
                                    selectedTab.value !== "All Stores" &&
                                    isEditable &&
                                    handleBlur(rowIndex, column.id)
                                  }
                                  style={{
                                    border: "1px solid #e0e0e0",
                                    cursor: isEditable ? "pointer" : "default",
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
                                    column.id === "column-10" ||
                                    column.id === "column-11" ||
                                    column.id === "column-12" ||
                                    column.id === "column-18" ||
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
                                            : column.id === "column-10"
                                            ? target?.tyro
                                            :column.id === "column-11"
                                            ? target?.websitebas
                                            :column.id === "column-12"
                                            ? target?.devicesecurity
                                            :  column.id === "column-18"
                                            ? target?.AcceGP_Handset_Sales
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
                        (index !== 9 &&
                          index !== 13 &&
                          index !== 14 &&
                          index !== 16 &&
                          index !== 19 &&
                          index !== 20)) ? ( // Conditionally render totals
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
              count={rows && rows.length}
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
