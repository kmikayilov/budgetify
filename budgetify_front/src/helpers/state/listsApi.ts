import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ICategory, IAccounting, IPaymentMethod } from '../types'

const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8000/api/' : 'https://' + window.location.host + '/api/';

export const ListAPI = createApi({
  baseQuery: fetchBaseQuery({ baseUrl }),
  reducerPath: 'lists-api',
  tagTypes: ['Categories', 'Accountings', 'PaymentMethods'],
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], void>({
      query: () => "list/category",
      providesTags: (result, error, arg) => result ? [...result.map(({ id }) => ({ type: 'Categories' as const, id })), 'Categories'] : ['Categories'],
      transformResponse: (response: ICategory[] ) => response
    }),
    getAccountings: builder.query<IAccounting[], void>({
      query: () => "list/accounting",
      providesTags: (result, error, arg) => result ? [...result.map(({ id }) => ({ type: 'Accountings' as const, id })), 'Accountings'] : ['Accountings'],
      transformResponse: (response: IAccounting[] ) => response
    }),
    getPaymentMethods: builder.query<IPaymentMethod[], void>({
      query: () => "list/payment-method",
      providesTags: (result, error, arg) => result ? [...result.map(({ id }) => ({ type: 'PaymentMethods' as const, id })), 'PaymentMethods'] : ['PaymentMethods'],
      transformResponse: (response: IPaymentMethod[] ) => response
    }),
  }),
})

export const { useGetCategoriesQuery, useGetAccountingsQuery, useGetPaymentMethodsQuery } = ListAPI