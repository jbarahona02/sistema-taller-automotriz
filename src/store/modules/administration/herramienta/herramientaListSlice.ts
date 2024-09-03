

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { HerramientaListInterface } from "../../../../interfaces";

const initialState: HerramientaListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const herramientaListSlice = createSlice({
    name: 'herramientaListSlice',
    initialState,
    reducers: {
        setHerramientaPageResult: (state, { payload }: PayloadAction<HerramientaListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setHerramientaPageResult,
} = herramientaListSlice.actions;
