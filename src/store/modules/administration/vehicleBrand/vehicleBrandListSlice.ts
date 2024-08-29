import { VehicleBrandListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: VehicleBrandListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const vehicleBrandListSlice = createSlice({
    name: 'vehicleBrandListSlice',
    initialState,
    reducers: {
        setVehicleBrandPageResult: (state, { payload }: PayloadAction<VehicleBrandListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setVehicleBrandPageResult,
} = vehicleBrandListSlice.actions;
