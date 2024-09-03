
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CotizacionListInterface } from "../../../../interfaces/cotizacion.interface";

const initialState: CotizacionListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const cotizacionListSlice = createSlice({
    name: 'cotizacionListSlice',
    initialState,
    reducers: {
        setCotizacionPageResult: (state, { payload }: PayloadAction<CotizacionListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setCotizacionPageResult,
} = cotizacionListSlice.actions;
