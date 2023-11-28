import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IFilter, ISort, IPagination } from '../types'

interface State {
    filters: IFilter | null;
    pagination: IPagination | null;
    sort: ISort | null;
    fetchType: string;
}

const initialState: State = {
	filters: null,
    pagination: null,
    sort: null,
    fetchType: '', // add | edit | delete
};

const transactionSlice = createSlice({
	name: 'transaction-slice',
	initialState,
	reducers: {
        setFilters: (state, action: PayloadAction<IFilter>) => {
            state.filters = action.payload
        },
        clearFilters: (state) => {
            state.filters = null
        },
        setPagination: (state, action: PayloadAction<IPagination>) => {
            state.pagination = action.payload
        },
        clearPagination: (state) => {
            state.pagination = null
        },
        setSort: (state, action: PayloadAction<ISort>) => {
            state.sort = action.payload
        },
        clearSort: (state) => {
            state.sort = null
        },
        setFetchType: (state, action: PayloadAction<string>) => {
            state.fetchType = action.payload
        },
        clearFetchType: (state) => {
            state.fetchType = ''
        },
	}
});

export const { setFilters, clearFilters, setPagination, clearPagination, setSort, clearSort, setFetchType, clearFetchType } = transactionSlice.actions;
export default transactionSlice.reducer;
