import { DiasNoDisponiblesListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: DiasNoDisponiblesListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const diasNoDisponiblesListSlice = createSlice({
    name: 'diasNoDisponiblesListSlice',
    initialState,
    reducers: {
        setDiasNoDisponiblesPageResult: (state, { payload }: PayloadAction<DiasNoDisponiblesListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setDiasNoDisponiblesPageResult,
} = diasNoDisponiblesListSlice.actions;
