import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import { localStorageMiddleware } from './authSlice';
import transactionSlice from './transactionSlice';
import { ListAPI } from './listsApi';
import { TransactionAPI } from './transactionApi';
import { AuthAPI } from './authApi';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    transaction: transactionSlice,
    [ListAPI.reducerPath]: ListAPI.reducer,
    [TransactionAPI.reducerPath]: TransactionAPI.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer

  },
  middleware: (gDM) => gDM().concat([ListAPI.middleware, TransactionAPI.middleware, AuthAPI.middleware, localStorageMiddleware]),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

