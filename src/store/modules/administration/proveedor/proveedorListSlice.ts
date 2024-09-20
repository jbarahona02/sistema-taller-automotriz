
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProveedorListInterface } from "../../../../interfaces";

const initialState: ProveedorListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const proveedorListSlice = createSlice({
    name: 'proveedorListSlice',
    initialState,
    reducers: {
        setProveedorPageResult: (state, { payload }: PayloadAction<ProveedorListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setProveedorPageResult,
} = proveedorListSlice.actions;
