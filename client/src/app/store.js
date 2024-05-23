import { configureStore } from '@reduxjs/toolkit'
import tableDataReducer from '../features/tableDataSlice';

export const store = configureStore({
  reducer: {
    tableData: tableDataReducer
  },
})