import { TallerListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TallerListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const tallerListSlice = createSlice({
    name: 'tallerListSlice',
    initialState,
    reducers: {
        setTallerPageResult: (state, { payload }: PayloadAction<TallerListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setTallerPageResult,
} = tallerListSlice.actions;
