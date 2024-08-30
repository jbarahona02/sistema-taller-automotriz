import { MarcaProductoListaInterface } from "../../../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MarcaProductoListaInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const marcaProductoListaSlice = createSlice({
    name: 'marcaProductoListaSlice',
    initialState,
    reducers: {
        setMarcaProductoPageResult: (state, { payload }: PayloadAction<MarcaProductoListaInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setMarcaProductoPageResult,
} = marcaProductoListaSlice.actions;
