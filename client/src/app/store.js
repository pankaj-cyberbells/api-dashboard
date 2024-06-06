import { configureStore } from '@reduxjs/toolkit'
import tableDataReducer from '../features/tableDataSlice';
import targetReducer from '../features/targetSlice';
import adminReducer from '../features/adminSlice';
import authReducer from '../features/authSlice';
import npsReducer from '../features/npsSlice';

export const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
    targets: targetReducer,
    admin: adminReducer,
    auth: authReducer,
    nps: npsReducer,
  },
})