import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EquipoTallerListInterface } from "../../../../interfaces";

const initialState: EquipoTallerListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true,
};

export const equipoTallerListSlice = createSlice({
    name: 'equipoTallerListSlice',
    initialState,
    reducers: {
        setEquipoTallerPageResult: (state, { payload }: PayloadAction<EquipoTallerListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setEquipoTallerPageResult,
} = equipoTallerListSlice.actions;
