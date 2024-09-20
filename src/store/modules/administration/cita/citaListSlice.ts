import { CitaListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CitaListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const citaListSlice = createSlice({
    name: 'citaListSlice',
    initialState,
    reducers: {
        setCitaPageResult: (state, { payload }: PayloadAction<CitaListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setCitaPageResult,
} = citaListSlice.actions;
