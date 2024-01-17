import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './api';

interface IStatResponse {
    name: any;
    income?: any;
    expense?: any;
    net?: any;
    value?: any;
};

export const StatsAPI = createApi({
    baseQuery,
    reducerPath: 'stats-api',
    tagTypes: ['IncomeExpense', 'TotalNet', 'Categories'],
    endpoints: (builder) => ({
        getIncomeExpenseStat: builder.query<IStatResponse[], void>({
            query: () => "analysis/income-expense",
            providesTags: (result, error, arg) => result ? [...result.map(({ name }) => ({ type: 'IncomeExpense' as const, name })), 'IncomeExpense'] : ['IncomeExpense'],
            transformResponse: (response: IStatResponse[] ) => response
        }),
        getTotalNetStat: builder.query<IStatResponse[], void>({
            query: () => "analysis/total-net",
            providesTags: (result, error, arg) => result ? [...result.map(({ name }) => ({ type: 'TotalNet' as const, name })), 'TotalNet'] : ['TotalNet'],
            transformResponse: (response: IStatResponse[] ) => response
        }),
        getCategoriesStat: builder.query<IStatResponse[], void>({
            query: () => "analysis/categories",
            providesTags: (result, error, arg) => result ? [...result.map(({ name }) => ({ type: 'Categories' as const, name })), 'Categories'] : ['Categories'],
            transformResponse: (response: IStatResponse[] ) => response
        }),
    })
})

export const { useGetIncomeExpenseStatQuery, useGetTotalNetStatQuery, useGetCategoriesStatQuery } = StatsAPI