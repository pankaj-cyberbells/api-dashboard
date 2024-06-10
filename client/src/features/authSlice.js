// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../api/services';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const response = await login(email, password);
    console.log(response)
    return response;
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    status: 'idle',
    error: null,
    isCreateUserAllowed: false, 
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.admin;
        state.token = action.payload.token;
        state.isCreateUserAllowed = action.payload.admin.email === 'gauravisonline@gmail.com';
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;

export default authSlice.reducer;
