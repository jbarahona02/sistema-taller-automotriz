import { ClienteListInterface } from "../../../../interfaces";

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: ClienteListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const clienteListSlice = createSlice({
    name: 'clienteListSlice',
    initialState,
    reducers: {
        setClientePageResult: (state, { payload }: PayloadAction<ClienteListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setClientePageResult,
} = clienteListSlice.actions;
