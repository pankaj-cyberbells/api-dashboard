import { configureStore } from '@reduxjs/toolkit'
import tableDataReducer from '../features/tableDataSlice';
import targetReducer from '../features/targetSlice';
import adminReducer from '../features/adminSlice';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
    targets: targetReducer,
    admin: adminReducer,
    auth: authReducer,
  },
})