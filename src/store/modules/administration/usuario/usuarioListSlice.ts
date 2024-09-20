import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UsuarioListInterface } from "../../../../interfaces";

const initialState: UsuarioListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const usuarioListSlice = createSlice({
    name: 'usuarioListSlice',
    initialState,
    reducers: {
        setUsuarioPageResult: (state, { payload }: PayloadAction<UsuarioListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setUsuarioPageResult,
} = usuarioListSlice.actions;
