import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import transactionSlice from './transactionSlice'
import { ListAPI } from './listsApi'
import { TransactionAPI } from './transactionApi'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    transaction: transactionSlice,
    [ListAPI.reducerPath]: ListAPI.reducer,
    [TransactionAPI.reducerPath]: TransactionAPI.reducer

  },
  middleware: (gDM) => gDM().concat([ListAPI.middleware, TransactionAPI.middleware]),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;