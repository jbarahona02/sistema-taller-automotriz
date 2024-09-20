

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RepuestoListInterface } from "../../../../interfaces";

const initialState: RepuestoListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const repuestoListSlice = createSlice({
    name: 'repuestoListSlice',
    initialState,
    reducers: {
        setRepuestoPageResult: (state, { payload }: PayloadAction<RepuestoListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setRepuestoPageResult,
} = repuestoListSlice.actions;
