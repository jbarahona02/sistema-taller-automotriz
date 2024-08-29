import { NivelGravedadListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: NivelGravedadListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const nivelGravedadListSlice = createSlice({
    name: 'nivelGravedadListSlice',
    initialState,
    reducers: {
        setNivelGravedadPageResult: (state, { payload }: PayloadAction<NivelGravedadListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setNivelGravedadPageResult,
} = nivelGravedadListSlice.actions;
