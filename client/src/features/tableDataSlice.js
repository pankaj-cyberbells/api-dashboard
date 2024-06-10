// tableDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData,AllStoreData } from '../api/services';

export const loadData = createAsyncThunk(
  'tableData/loadData',
  async ({salelocation, startDate, endDate }) => {
    const response = await fetchData(salelocation,startDate, endDate);
    return response;
  }
);
export const AllStore = createAsyncThunk(
  'tableData/allstore',
  async ({startDate, endDate }) => {
    const response = await AllStoreData(startDate, endDate);
    console.log(response, "all-store");
    return response;
  }
);

const tableDataSlice = createSlice({
  name: 'tableData',
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(loadData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(AllStore.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AllStore.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(AllStore.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

  },
});

export default tableDataSlice.reducer;
