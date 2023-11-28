import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import api from './api';

import { IUser } from '../types';

interface AuthState {
    user?: IUser | null;
}

const initialState: AuthState = {
	user: null,
	// isLoading: false,
	// token: null,
	// error: null,
};

// export const registerUser = createAsyncThunk('auth/register', async (data, thunkAPI) => {
// 	const response = await api.AuthAPI.registerUser(data);
// 	if (!!response.error) return thunkAPI.rejectWithValue(response.error.errors);
// 	return response;
// });

// export const loginUser = createAsyncThunk('auth/login', async (data, thunkAPI) => {
// 	const response = await api.AuthAPI.loginUser(data);
// 	if (!!response.error) return thunkAPI.rejectWithValue(response.error.errors);
// 	return response;
// });

// export const fetchLoggedUser = createAsyncThunk('auth/fetch', async (data, thunkAPI) => {
// 	const response = await api.AuthAPI.fetchUser();
// 	if (!!response.error) return thunkAPI.rejectWithValue(response.error.errors);
// 	return response;
// });

const authSlice = createSlice({
	name: 'authSlice',
	initialState,
	reducers: {
		logout: () => initialState,
        userInfo: (state, action: PayloadAction<AuthState>) => {
            state.user = action.payload.user;
        },
	},
	// extraReducers: {
		// [registerUser.pending]: (state, action) => {
		// 	state.isLoading = true;
		// },
		// [registerUser.fulfilled]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = null;
		// },
		// [registerUser.rejected]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload || action.error;
		// },
		// [loginUser.pending]: (state, action) => {
		// 	state.isLoading = true;
		// },
		// [loginUser.fulfilled]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.token = action.payload.token;
		// 	state.loggedUser = action.payload.user;
		// 	state.error = null;
		// },
		// [loginUser.rejected]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload || action.error;
		// },
		// [fetchLoggedUser.pending]: (state, action) => {
		// 	state.isLoading = true;
		// },
		// [fetchLoggedUser.fulfilled]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.token = action.payload.token;
		// 	state.loggedUser = action.payload.user;
		// 	state.error = null;
		// },
		// [fetchLoggedUser.rejected]: (state, action) => {
		// 	state.isLoading = false;
		// 	state.error = action.payload || action.error;
		// },
	// },
});

export const { logout, userInfo } = authSlice.actions;
export default authSlice.reducer;
