import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Middleware } from 'redux';

import { IAuthResponse } from '../types';
import { setToken } from './api';

const initialState: IAuthResponse = {
	user: null,
	token: '',
};

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		auth: (state, action: PayloadAction<IAuthResponse>) => {
			state.user = action.payload.user
			state.token = action.payload.token
		},
		logout: () => initialState
	},
});

export const localStorageMiddleware: Middleware<{}, {}> = (store: any) => (next: any) => (action: any) => {
  if (action.type === auth.type && !!action.payload.token) {
    window.localStorage.setItem('app-jwt-token', action.payload.token);
	} else if (action.type === logout.type) {
		window.localStorage.setItem('app-jwt-token', '');
		setToken('');
	}

	next(action);
};

export const { auth, logout } = authSlice.actions;
export default authSlice.reducer;
