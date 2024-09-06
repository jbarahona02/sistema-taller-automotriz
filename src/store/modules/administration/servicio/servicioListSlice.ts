import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ServicioListInterface } from "../../../../interfaces";

const initialState: ServicioListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const servicioListSlice = createSlice({
    name: 'servicioListSlice',
    initialState,
    reducers: {
        setServicioPageResult: (state, { payload }: PayloadAction<ServicioListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setServicioPageResult,
} = servicioListSlice.actions;
