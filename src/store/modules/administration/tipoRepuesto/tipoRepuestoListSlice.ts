import { TipoRepuestoListInterface } from "../../../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : TipoRepuestoListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true
}

export const tipoRepuestoListSlice = createSlice({
    name: 'tipoRepuestoListSlice',
    initialState,
    reducers: {
        setTipoRepuestoPageResult: (state, {payload} : PayloadAction<TipoRepuestoListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setTipoRepuestoPageResult
} = tipoRepuestoListSlice.actions;