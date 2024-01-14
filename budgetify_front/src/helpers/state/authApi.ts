import { createApi } from '@reduxjs/toolkit/query/react';
import { IUser, IAuth, IAuthResponse } from '../types';

import { baseQuery } from './api';

export const AuthAPI = createApi({
    baseQuery,
    reducerPath: 'auth-api',
    tagTypes: ['Auth'],
    endpoints: (builder) => ({
        register: builder.mutation<IUser, Partial<IAuth>>({
            query: (body) => ({ url: `user/register`, method: 'POST', body }),
            transformResponse: (response: IUser) => response
        }),
        login: builder.mutation<IAuthResponse, Partial<IAuth>>({
            query: (body) => ({ url: `user/login`, method: 'POST', body }),
            transformResponse: (response: IAuthResponse) => response
        }),
        auth: builder.query<IAuthResponse, void>({
            query: (body) => ({ url: `user/auth`, method: 'GET' }),
            transformResponse: (response: IAuthResponse) => response
        }),
        logout: builder.mutation<any, void>({
            query: (body) => ({ url: `user/logout`, method: 'POST' }),
            transformResponse: (response: any) => response
        })
    }),
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation, useAuthQuery } = AuthAPI