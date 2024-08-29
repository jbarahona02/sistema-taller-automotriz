import { TypeVehicleListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TypeVehicleListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const typeVehicleListSlice = createSlice({
    name: 'typeVehicleListSlice',
    initialState,
    reducers: {
        setTypeVehiclePageResult: (state, { payload }: PayloadAction<TypeVehicleListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setTypeVehiclePageResult,
} = typeVehicleListSlice.actions;
