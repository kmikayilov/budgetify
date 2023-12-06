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
        getTransaction: builder.query<ITransaction, Partial<string>>({
            query: (id) => `transactions/detail/${id}`,
            // invalidatesTags: 'Transaction',
            // providesTags: (result, error, arg) => ['Transaction'],
            transformResponse: (response: ITransaction) => response
        }),
        addTransaction: builder.mutation<ITransaction, Partial<ITransaction>>({
            query: (body) => ({ url: `transactions/create`, method: 'POST', body }),
            // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            transformResponse: (response: ITransaction) => response
        }),
        editTransaction: builder.mutation<ITransaction, Partial<{ id: string, transaction: ITransaction}>>({
            query: (data) => ({ url: `transactions/detail/${data.id}`, method: 'POST', body: data.transaction }),
            // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            transformResponse: (response: ITransaction) => response
        }),
    }),
})

export const { useGetTransactionsQuery, useGetTransactionQuery, useAddTransactionMutation, useEditTransactionMutation } = TransactionAPI