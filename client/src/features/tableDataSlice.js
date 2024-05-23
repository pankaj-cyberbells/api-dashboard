// tableDataSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchData } from '../api/services';

export const loadData = createAsyncThunk(
  'tableData/loadData',
  async ({ startDate, endDate }) => {
    const response = await fetchData(startDate, endDate);
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
      });
  },
});

export default tableDataSlice.reducer;
