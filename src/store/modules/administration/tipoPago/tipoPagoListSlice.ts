

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TipoPagoListInterface } from "../../../../interfaces";

const initialState: TipoPagoListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const tipoPagoListSlice = createSlice({
    name: 'tipoPagoListSlice',
    initialState,
    reducers: {
        setTipoPagoPageResult: (state, { payload }: PayloadAction<TipoPagoListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setTipoPagoPageResult,
} = tipoPagoListSlice.actions;
