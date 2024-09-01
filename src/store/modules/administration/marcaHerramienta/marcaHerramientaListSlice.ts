
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarcaHerramientaListInterface } from "../../../../interfaces/marcaHerramienta.interface";

const initialState: MarcaHerramientaListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const marcaHerramientaListSlice = createSlice({
    name: 'marcaHerramientaListSlice',
    initialState,
    reducers: {
        setMarcaHerramientaPageResult: (state, { payload }: PayloadAction<MarcaHerramientaListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setMarcaHerramientaPageResult,
} = marcaHerramientaListSlice.actions;
