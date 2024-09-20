import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductoListInterface } from "../../../../interfaces";

const initialState: ProductoListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const productoListSlice = createSlice({
    name: 'productoListSlice',
    initialState,
    reducers: {
        setProductoPageResult: (state, { payload }: PayloadAction<ProductoListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setProductoPageResult,
} = productoListSlice.actions;
