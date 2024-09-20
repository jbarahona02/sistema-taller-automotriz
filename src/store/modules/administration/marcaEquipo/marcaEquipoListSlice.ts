import { MarcaEquipoListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: MarcaEquipoListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const marcaEquipoListSlice = createSlice({
    name: 'marcaEquipoListSlice',
    initialState,
    reducers: {
        setMarcaEquipoPageResult: (state, { payload }: PayloadAction<MarcaEquipoListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setMarcaEquipoPageResult,
} = marcaEquipoListSlice.actions;
