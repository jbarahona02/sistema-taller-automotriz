import { MechanicalSpecialtyListInterface } from "../../../../interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState : MechanicalSpecialtyListInterface = {
    content: [],
    totalElements: 0,
    totalPages: 0,
    firstPage: true,
    lastPage: true
}

export const mechanicalSpecialtyListSlice = createSlice({
    name: 'mechanicalSpecialtyListSlice',
    initialState,
    reducers: {
        setMechanicalSpecialtyPageResult: (state, {payload} : PayloadAction<MechanicalSpecialtyListInterface>) => {
            state.content = payload.content;
            state.firstPage = payload.firstPage;
            state.lastPage = payload.lastPage;
            state.totalElements = payload.totalElements;
            state.totalPages = payload.totalPages;
        }
    }
});

export const {
    setMechanicalSpecialtyPageResult
} = mechanicalSpecialtyListSlice.actions;