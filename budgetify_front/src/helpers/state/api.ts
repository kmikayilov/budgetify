import { fetchBaseQuery } from "@reduxjs/toolkit/query";

import { RootState } from './store'

export const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api/' : 'https://' + window.location.host + '/api/';

let token: string | null = null;
export const setToken = (newToken: string) => (token = newToken);
export const getToken = () => token;

let logoutFn: any = null;
export const setLogoutFn = (logout: any) => (logoutFn = logout);
export const getLogoutFn = () => logoutFn

export const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        const storeToken = (getState() as RootState).auth?.token

        if (storeToken) {
            headers.set('authorization', `Bearer ${storeToken}`)
        } else if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
})