import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createKPITarget,
  getKPITarget,
  updateKPITarget,
  
} from '../api/services';

// Async thunks
export const createKPITargetThunk = createAsyncThunk(
  'kpiTargets/createKPITarget',
  async (targetData, thunkAPI) => {
    try {
      const data = await createKPITarget(targetData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getKPITargetThunk = createAsyncThunk(
  'kpiTargets/getKPITarget',
  async ({ salelocation, startDate, endDate }, thunkAPI) => { // Assuming no parameters for getTarget
    console.log({ salelocation, startDate, endDate })
    try {
      const data = await getKPITarget(salelocation, startDate, endDate);
      console.log(data)
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateKPITargetThunk = createAsyncThunk(
  'kpiTargets/updateTarget',
  async ({ targetId, targetData }, thunkAPI) => {
    console.log({ targetId, targetData })
    try {
      const data = await updateKPITarget(targetId, targetData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);



// Slice
const targetSlice = createSlice({
  name: 'KPITargets',
  initialState: {
    KPITargets: [],
    KPITarget: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createKPITargetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createKPITargetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.KPITargets.push(action.payload);
        state.error = null;
      })
      .addCase(createKPITargetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getKPITargetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getKPITargetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.KPITarget = action.payload;
        state.error = null;
      })
      .addCase(getKPITargetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.KPITarget =null
      })
      .addCase(updateKPITargetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateKPITargetThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.KPITargets.findIndex(
          (target) => target.id === action.payload.id
        
        );
        if (index !== -1) {
          state.targets[index] = action.payload;
        }
        
      })
      .addCase(updateKPITargetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
    //   .addCase(deleteTargetThunk.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(deleteTargetThunk.fulfilled, (state, action) => {
    //     state.loading = false;
    //     state.targets = state.targets.filter(
    //       (target) => target.id !== action.payload.id
    //     );
    //   })
    //   .addCase(deleteTargetThunk.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.payload.message;
    //   });
  },
});

export default targetSlice.reducer;
