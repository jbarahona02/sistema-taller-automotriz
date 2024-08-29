import { VehiculoListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VehiculoListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const vehiculoListSlice = createSlice({
    name: 'vehiculoListSlice',
    initialState,
    reducers: {
        setVehiculoPageResult: (state, { payload }: PayloadAction<VehiculoListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setVehiculoPageResult,
} = vehiculoListSlice.actions;
