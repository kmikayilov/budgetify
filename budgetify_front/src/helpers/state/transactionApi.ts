import { createApi } from '@reduxjs/toolkit/query/react'
import type { ITransaction, ITransactionQuery, ITransactionResult } from '../types'

import { baseQuery } from './api';

export const TransactionAPI = createApi({
    baseQuery,
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
        updateTransaction: builder.mutation<ITransaction, Partial<{ id: string, transaction: ITransaction}>>({
            query: (data) => ({ url: `transactions/detail/${data.id}`, method: 'PATCH', body: data.transaction }),
            // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            transformResponse: (response: ITransaction) => response
        }),
        deleteTransaction: builder.mutation<ITransaction, Partial<string>>({
            query: (id) => ({ url: `transactions/detail/${id}`, method: 'DELETE' }),
            // invalidatesTags: [{ type: 'Posts', id: 'LIST' }],
            transformResponse: (response: ITransaction) => response
        }),
        
    }),
})

export const { useGetTransactionsQuery, useGetTransactionQuery, useAddTransactionMutation, useUpdateTransactionMutation, useDeleteTransactionMutation } = TransactionAPI