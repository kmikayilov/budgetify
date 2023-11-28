import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ITransaction, ITransactionQuery, ITransactionResult } from '../types'

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api/' : 'https://' + window.location.host + '/api/';

export const TransactionAPI = createApi({
    baseQuery: fetchBaseQuery({ baseUrl }),
    reducerPath: 'transaction-api',
    tagTypes: ['Transaction'],
    endpoints: (builder) => ({
        getTransactions: builder.query<ITransactionResult, Partial<ITransactionQuery>>({
            query: (body) => {
                const params = new URLSearchParams();

                for (const [key, value] of Object.entries(body)) {
                    params.append(key, value);
                }

                return `transactions/filter?${params.toString()}` 
            },
            // invalidatesTags: ['Transaction'],
            providesTags: (result, error, arg) => result?.results ? [...result?.results?.map(({ id }) => ({ type: 'Transaction' as const, id })), 'Transaction'] : ['Transaction'],
            transformResponse: (response: ITransactionResult) => response
        }),
    }),
})

export const { useGetTransactionsQuery } = TransactionAPI