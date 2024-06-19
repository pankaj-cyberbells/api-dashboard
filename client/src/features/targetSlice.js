import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTarget,
  getTarget,
  updateTarget,
  deleteTarget,
} from '../api/services';

// Async thunks
export const createTargetThunk = createAsyncThunk(
  'targets/createTarget',
  async (targetData, thunkAPI) => {
    try {
      const data = await createTarget(targetData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const getTargetThunk = createAsyncThunk(
  'targets/getTarget',
  async ({ salelocation, startDate, endDate }, thunkAPI) => { // Assuming no parameters for getTarget
    try {
      const data = await getTarget(salelocation, startDate, endDate);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const updateTargetThunk = createAsyncThunk(
  'targets/updateTarget',
  async ({ targetId, targetData }, thunkAPI) => {
    console.log({ targetId, targetData })
    try {
      const data = await updateTarget(targetId, targetData);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const deleteTargetThunk = createAsyncThunk(
  'targets/deleteTarget',
  async (targetId, thunkAPI) => {
    try {
      const data = await deleteTarget(targetId);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Slice
const targetSlice = createSlice({
  name: 'targets',
  initialState: {
    targets: [],
    target: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTargetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTargetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.targets.push(action.payload);
        state.error = null;
      })
      .addCase(createTargetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(getTargetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTargetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.target = action.payload;
        state.error = null;
      })
      .addCase(getTargetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      .addCase(updateTargetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTargetThunk.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.targets.findIndex(
          (target) => target.id === action.payload.id
        
        );
        if (index !== -1) {
          state.targets[index] = action.payload;
        }
        
      })
      .addCase(updateTargetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deleteTargetThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTargetThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.targets = state.targets.filter(
          (target) => target.id !== action.payload.id
        );
      })
      .addCase(deleteTargetThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default targetSlice.reducer;
