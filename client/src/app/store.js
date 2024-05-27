import { configureStore } from '@reduxjs/toolkit'
import tableDataReducer from '../features/tableDataSlice';
import targetReducer from '../features/targetSlice';

export const store = configureStore({
  reducer: {
    tableData: tableDataReducer,
    targets: targetReducer
  },
})