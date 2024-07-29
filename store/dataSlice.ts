import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

export interface DataState {
}

const initialState: DataState = {};

export const dataSlice = createSlice({
    name: 'data',
initialState,
reducers: {},

    // Special reducer for hydrating the state. Special case for next-redux-wrapper
    extraReducers: {
        [HYDRATE]: (state, action) => ({
            ...state, ...action.payload.data,
        }),
    },
});

export default dataSlice.reducer;
