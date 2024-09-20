import { TipoServicioListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: TipoServicioListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const tipoServicioListSlice = createSlice({
    name: 'tipoServicioListSlice',
    initialState,
    reducers: {
        setTipoServicioPageResult: (state, { payload }: PayloadAction<TipoServicioListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setTipoServicioPageResult,
} = tipoServicioListSlice.actions;
